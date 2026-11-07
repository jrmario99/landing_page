<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SystemController extends Controller
{
    private const SYSTEMS = [
        'criecurriculo' => ['type' => 'laravel', 'path' => '/var/www/criecurriculo'],
        'calculadora'   => ['type' => 'laravel', 'path' => '/var/www/calculadora_tributaria'],
        'trataplan'     => ['type' => 'laravel', 'path' => '/var/www/trataplan'],
        'jornada-api'   => ['type' => 'laravel', 'path' => '/var/www/jornada_mentoria/jornada-api'],
        'jornada-app'   => ['type' => 'static',  'path' => '/var/www/jornada_mentoria/jornada-app'],
    ];

    // Quando a API sobe/desce, o app acompanha
    private const LINKED = [
        'jornada-api' => 'jornada-app',
    ];

    public function toggle(string $slug): JsonResponse
    {
        if (!array_key_exists($slug, self::SYSTEMS)) {
            return response()->json(['error' => 'Sistema não encontrado.'], 404);
        }

        $maintenance = $this->toggleSystem($slug);

        // Se tiver sistema vinculado, aplica o mesmo estado
        if (isset(self::LINKED[$slug])) {
            $this->applyState(self::LINKED[$slug], $maintenance);
        }

        return response()->json([
            'slug'        => $slug,
            'maintenance' => $maintenance,
        ]);
    }

    private function toggleSystem(string $slug): bool
    {
        $sys  = self::SYSTEMS[$slug];
        $path = $sys['path'];

        if ($sys['type'] === 'static') {
            $flag = $path . '/.maintenance';
            file_exists($flag) ? unlink($flag) : touch($flag);
            return file_exists($flag);
        }

        $isDown = file_exists($path . '/storage/framework/down');
        $cmd    = $isDown
            ? '/usr/bin/php ' . $path . '/artisan up 2>&1'
            : '/usr/bin/php ' . $path . '/artisan down --render=maintenance 2>&1';
        shell_exec($cmd);
        return file_exists($path . '/storage/framework/down');
    }

    private function applyState(string $slug, bool $maintenance): void
    {
        $sys  = self::SYSTEMS[$slug];
        $path = $sys['path'];

        if ($sys['type'] === 'static') {
            $flag = $path . '/.maintenance';
            $isDown = file_exists($flag);
            if ($maintenance && !$isDown) touch($flag);
            if (!$maintenance && $isDown) unlink($flag);
            return;
        }

        $isDown = file_exists($path . '/storage/framework/down');
        if ($maintenance && !$isDown) {
            shell_exec('/usr/bin/php ' . $path . '/artisan down --render=maintenance 2>&1');
        } elseif (!$maintenance && $isDown) {
            shell_exec('/usr/bin/php ' . $path . '/artisan up 2>&1');
        }
    }
}
