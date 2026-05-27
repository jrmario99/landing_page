<?php

use Illuminate\Support\Facades\Route;

// Serve o SPA Vue para todas as rotas não-API
Route::get('/{any}', function () {
    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return file_get_contents($indexPath);
    }
    return response('<h1>Aguardando build do frontend</h1>', 200)->header('Content-Type', 'text/html');
})->where('any', '.*');
