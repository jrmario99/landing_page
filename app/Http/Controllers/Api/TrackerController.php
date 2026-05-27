<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageVisit;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class TrackerController extends Controller
{
    private const RATE_LIMIT = 5;
    private const RATE_WINDOW = 3600;

    public function store(Request $request): JsonResponse
    {
        $data   = $request->json()->all();
        $action = $data['action'] ?? '';
        $ip     = $request->ip();

        if (!in_array($action, ['visit', 'clicks'])) {
            return response()->json(['status' => 'ignored']);
        }

        PageVisit::create([
            'action'     => $action,
            'ip_address' => $ip,
            'user_agent' => $action === 'visit' ? ($data['user_agent'] ?? null) : null,
            'referrer'   => $action === 'visit' ? substr($data['referrer'] ?? '', 0, 500) : null,
            'screen'     => $action === 'visit' ? ($data['screen'] ?? null) : null,
            'language'   => $action === 'visit' ? ($data['language'] ?? null) : null,
            'links'      => $action === 'clicks' ? ($data['links'] ?? null) : null,
            'duration'   => $action === 'clicks' ? ($data['duration'] ?? null) : null,
        ]);

        if ($this->isRateLimited($ip)) {
            return response()->json(['status' => 'ok']);
        }

        $this->sendEmail($action, $data, $ip);

        return response()->json(['status' => 'ok']);
    }

    private function isRateLimited(string $ip): bool
    {
        $key   = 'tracker_rate_' . md5($ip);
        $count = Cache::get($key, 0);

        if ($count >= self::RATE_LIMIT) {
            return true;
        }

        Cache::put($key, $count + 1, self::RATE_WINDOW);

        return false;
    }

    private function sendEmail(string $action, array $data, string $ip): void
    {
        try {
            $to = env('TRACKER_MAIL_TO', 'contato@quantosubiu.com.br');

            if ($action === 'visit') {
                $subject = "[MB Sistemas] Nova visita — {$ip}";
                $body    = $this->buildVisitHtml($data, $ip);
            } else {
                $subject = "[MB Sistemas] Cliques — {$ip}";
                $body    = $this->buildClicksHtml($data, $ip);
            }

            Mail::html($body, fn($m) => $m->to($to)->subject($subject));
        } catch (\Throwable $e) {
            logger()->error('TrackerController mail error: ' . $e->getMessage());
        }
    }

    private function buildVisitHtml(array $d, string $ip): string
    {
        $ua  = htmlspecialchars($d['user_agent'] ?? '');
        $ref = htmlspecialchars($d['referrer'] ?? 'Direto');
        $sc  = htmlspecialchars($d['screen'] ?? '');
        $lg  = htmlspecialchars($d['language'] ?? '');

        return <<<HTML
        <div style="font-family:Inter,sans-serif;max-width:600px;background:#08090d;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
            <h2 style="color:#34d399;margin:0 0 16px">Nova visita — MB Sistemas</h2>
            <p><strong>IP:</strong> {$ip}</p>
            <p><strong>Referrer:</strong> {$ref}</p>
            <p><strong>Tela:</strong> {$sc}</p>
            <p><strong>Idioma:</strong> {$lg}</p>
            <p style="font-size:12px;color:#64748b">{$ua}</p>
        </div>
        HTML;
    }

    private function buildClicksHtml(array $d, string $ip): string
    {
        $duration = $d['duration'] ?? 0;
        $links    = $d['links'] ?? [];
        $rows     = '';

        foreach ($links as $link) {
            $text = htmlspecialchars($link['text'] ?? '');
            $url  = htmlspecialchars($link['url'] ?? '');
            $time = htmlspecialchars($link['time'] ?? '');
            $rows .= "<tr><td>{$text}</td><td style='color:#06b6d4'>{$url}</td><td>{$time}</td></tr>";
        }

        return <<<HTML
        <div style="font-family:Inter,sans-serif;max-width:600px;background:#08090d;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
            <h2 style="color:#818cf8;margin:0 0 16px">Cliques — {$ip} ({$duration}s)</h2>
            <table width="100%" style="border-collapse:collapse;font-size:13px">
                <thead><tr style="color:#64748b"><th align="left">Texto</th><th align="left">URL</th><th align="left">Hora</th></tr></thead>
                <tbody>{$rows}</tbody>
            </table>
        </div>
        HTML;
    }
}
