<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\PageVisit;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'kpis'             => $this->kpis(),
            'systems'          => $this->systemsHealth(),
            'server'           => $this->serverStats(),
            'visits'           => $this->visitStats(),
            'visitors_country' => $this->visitorsByCountry(),
            'visitors_system'  => $this->visitorsBySystem(),
        ]);
    }

    private function kpis(): array
    {
        $today = now()->startOfDay();

        return [
            'unread_messages' => ContactMessage::where('is_read', false)->count(),
            'total_messages'  => ContactMessage::count(),
            'visits_today'    => PageVisit::where('action', 'visit')->where('created_at', '>=', $today)->count(),
            'visits_week'     => PageVisit::where('action', 'visit')->where('created_at', '>=', now()->subDays(7))->count(),
        ];
    }

    private function systemsHealth(): array
    {
        $systems = [
            ['slug' => 'criecurriculo', 'name' => 'CrieCurrículo',    'url' => 'https://criecurriculo.com.br',           'color' => '#818cf8', 'path' => '/var/www/criecurriculo',               'type' => 'laravel'],
            ['slug' => 'calculadora',   'name' => 'Calc. Tributária', 'url' => 'https://calculadoraimposto.com',         'color' => '#34d399', 'path' => '/var/www/calculadora_tributaria',       'type' => 'laravel'],
            ['slug' => 'quantosubiu',   'name' => 'Quanto Subiu',     'url' => 'https://quantosubiu.com.br',             'color' => '#fb923c', 'path' => '/var/www/quantosubiu',                 'type' => 'laravel'],
            ['slug' => 'trataplan',     'name' => 'TrataPlan',        'url' => 'https://trataplan.com.br',               'color' => '#22d3ee', 'path' => '/var/www/trataplan',                   'type' => 'laravel'],
            ['slug' => 'jornada-app',   'name' => 'Jornada — App',    'url' => 'https://app.silvoneisonntag.com.br',     'color' => '#f472b6', 'path' => '/var/www/jornada_mentoria/jornada-app',  'type' => 'static'],
            ['slug' => 'jornada-api',   'name' => 'Jornada — API',    'url' => 'https://api.silvoneisonntag.com.br',     'color' => '#fb7185', 'path' => '/var/www/jornada_mentoria/jornada-api',  'type' => 'laravel'],
        ];

        $results = [];
        foreach ($systems as $sys) {
            $results[] = $this->ping($sys);
        }

        return $results;
    }

    private function ping(array $sys): array
    {
        $start = microtime(true);
        $status = 'offline';
        $code   = 0;

        try {
            $ch = curl_init($sys['url']);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_NOBODY         => true,
                CURLOPT_TIMEOUT        => 5,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_MAXREDIRS      => 3,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_USERAGENT      => 'MB-Sistemas-Monitor/1.0',
            ]);
            curl_exec($ch);
            $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);

            $status = ($code >= 200 && $code < 400) ? 'online' : 'degraded';
        } catch (\Throwable) {
            $status = 'offline';
        }

        $latency = round((microtime(true) - $start) * 1000);

        return [
            'slug'        => $sys['slug'],
            'name'        => $sys['name'],
            'url'         => $sys['url'],
            'color'       => $sys['color'],
            'status'      => $status,
            'code'        => $code,
            'latency'     => $latency,
            'maintenance' => $sys['path'] && (
                ($sys['type'] ?? 'laravel') === 'static'
                    ? file_exists($sys['path'] . '/.maintenance')
                    : file_exists($sys['path'] . '/storage/framework/down')
            ),
        ];
    }

    private function serverStats(): array
    {
        // CPU load
        $load = sys_getloadavg();

        // Memory — /proc/meminfo
        $mem = ['total' => 0, 'available' => 0, 'used' => 0, 'percent' => 0];
        if (file_exists('/proc/meminfo')) {
            $raw = file_get_contents('/proc/meminfo');
            preg_match('/MemTotal:\s+(\d+)/', $raw, $mt);
            preg_match('/MemAvailable:\s+(\d+)/', $raw, $ma);
            $total     = (int) ($mt[1] ?? 0);
            $available = (int) ($ma[1] ?? 0);
            $used      = $total - $available;
            $mem = [
                'total'   => round($total / 1024),
                'used'    => round($used / 1024),
                'percent' => $total > 0 ? round($used / $total * 100) : 0,
            ];
        }

        // Disk
        $diskTotal = disk_total_space('/');
        $diskFree  = disk_free_space('/');
        $diskUsed  = $diskTotal - $diskFree;

        return [
            'load'    => [
                'one'     => round($load[0], 2),
                'five'    => round($load[1], 2),
                'fifteen' => round($load[2], 2),
            ],
            'memory'  => $mem,
            'disk'    => [
                'total'   => round($diskTotal / 1073741824, 1),
                'used'    => round($diskUsed  / 1073741824, 1),
                'percent' => round($diskUsed / $diskTotal * 100),
            ],
            'php'     => PHP_VERSION,
        ];
    }

    private function visitorsByCountry(): array
    {
        return PageVisit::query()
            ->where('action', 'visit')
            ->whereNotNull('country_code')
            ->selectRaw('country, country_code, COUNT(*) as total')
            ->groupBy('country', 'country_code')
            ->orderByDesc('total')
            ->limit(10)
            ->get()
            ->map(fn($r) => [
                'country'      => $r->country,
                'country_code' => strtolower($r->country_code),
                'total'        => $r->total,
            ])
            ->all();
    }

    private function visitorsBySystem(): array
    {
        $logFile = '/var/log/nginx/visitors.log';

        if (!file_exists($logFile) || !is_readable($logFile)) {
            return [];
        }

        $domains = [
            'criecurriculo.com.br'     => 'CrieCurrículo',
            'calculadoraimposto.com'   => 'Calc. Tributária',
            'quantosubiu.com.br'       => 'Quanto Subiu',
            'trataplan.com.br'         => 'TrataPlan',
            'app.silvoneisonntag.com.br' => 'Jornada — App',
            'api.silvoneisonntag.com.br' => 'Jornada — API',
            'mbsistemas.site'          => 'MB Sistemas',
        ];

        $counts = array_fill_keys(array_keys($domains), 0);

        // Lê os últimos 512KB do log
        $fp   = fopen($logFile, 'rb');
        $size = filesize($logFile);
        $pos  = max(0, $size - 512 * 1024);
        fseek($fp, $pos);
        $content = fread($fp, $size - $pos);
        fclose($fp);

        foreach (explode("\n", $content) as $line) {
            if (!$line) continue;
            $parts = explode(' ', $line, 2);
            $host  = $parts[0] ?? '';
            // strip www.
            $host = preg_replace('/^www\./', '', $host);
            if (isset($counts[$host])) {
                $counts[$host]++;
            }
        }

        $result = [];
        foreach ($counts as $domain => $total) {
            if ($total === 0) continue;
            $result[] = ['system' => $domains[$domain], 'domain' => $domain, 'total' => $total];
        }

        usort($result, fn($a, $b) => $b['total'] <=> $a['total']);
        return $result;
    }

    private function visitStats(): array
    {
        $days = collect(range(6, 0))->map(fn($i) => now()->subDays($i)->format('Y-m-d'));

        $counts = PageVisit::query()
            ->where('action', 'visit')
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->selectRaw("DATE(created_at) as date, COUNT(*) as total")
            ->groupBy('date')
            ->pluck('total', 'date');

        return $days->map(fn($d) => [
            'date'  => $d,
            'label' => \Carbon\Carbon::parse($d)->locale('pt_BR')->isoFormat('DD/MM'),
            'total' => $counts[$d] ?? 0,
        ])->values()->all();
    }
}
