<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class LogController extends Controller
{
    private const APPS = [
        'CrieCurrículo' => '/var/www/criecurriculo/storage/logs/laravel.log',
        'Quanto Subiu'  => '/var/www/quantosubiu/storage/logs/laravel.log',
        'Calc. Tributária' => '/var/www/calculadora_tributaria/storage/logs/laravel.log',
        'TrataPlan'     => '/var/www/trataplan/storage/logs/laravel.log',
        'Jornada API'   => '/var/www/jornada_mentoria/jornada-api/storage/logs/laravel.log',
    ];

    private const LEVELS = ['ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY'];
    private const LINES_TO_READ = 3000;
    private const MAX_ERRORS_PER_APP = 8;

    public function index(): JsonResponse
    {
        $result = [];

        foreach (self::APPS as $name => $path) {
            $result[] = [
                'app'    => $name,
                'errors' => $this->parseErrors($path),
            ];
        }

        return response()->json($result);
    }

    private function parseErrors(string $path): array
    {
        if (!file_exists($path) || !is_readable($path)) {
            return [];
        }

        $lines  = $this->tailFile($path, self::LINES_TO_READ);
        $errors = [];
        $entry  = null;

        foreach ($lines as $line) {
            // New log entry starts with [YYYY-MM-DD HH:MM:SS]
            if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \w+\.(\w+): (.+)/', $line, $m)) {
                if ($entry) {
                    $errors[] = $entry;
                }
                $level = strtoupper($m[2]);
                $entry = in_array($level, self::LEVELS) ? [
                    'at'      => $m[1],
                    'level'   => $level,
                    'message' => mb_substr(trim($m[3]), 0, 200),
                ] : null;
            }
        }

        if ($entry) {
            $errors[] = $entry;
        }

        return array_slice(array_reverse($errors), 0, self::MAX_ERRORS_PER_APP);
    }

    private function tailFile(string $path, int $lines): array
    {
        $fp   = fopen($path, 'rb');
        $size = filesize($path);
        $pos  = max(0, $size - 256 * 1024); // lê últimos ~256KB

        fseek($fp, $pos);
        $content = fread($fp, $size - $pos);
        fclose($fp);

        return explode("\n", $content);
    }
}
