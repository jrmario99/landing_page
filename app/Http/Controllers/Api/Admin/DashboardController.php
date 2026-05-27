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
            'kpis'    => $this->kpis(),
            'systems' => $this->systemsHealth(),
            'server'  => $this->serverStats(),
            'visits'  => $this->visitStats(),
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
            ['name' => 'CrieCurrículo',    'url' => 'https://criecurriculo.com.br',    'color' => '#818cf8'],
            ['name' => 'Calc. Tributária','url' => 'https://calculadoraimposto.com',   'color' => '#34d399'],
            ['name' => 'Quanto Subiu',    'url' => 'https://quantosubiu.com.br',       'color' => '#fb923c'],
            ['name' => 'TrataPlan',       'url' => 'https://trataplan.com.br',         'color' => '#22d3ee'],
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
            'name'    => $sys['name'],
            'url'     => $sys['url'],
            'color'   => $sys['color'],
            'status'  => $status,
            'code'    => $code,
            'latency' => $latency,
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
