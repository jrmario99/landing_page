<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\TrackerController;
use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\MessageController;
use App\Http\Controllers\Api\Admin\SystemController;
use App\Http\Controllers\Api\Admin\LogController;
use Illuminate\Support\Facades\Route;

// Públicas
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/track', [TrackerController::class, 'store']);

// Auth admin
Route::post('/admin/login', [AuthController::class, 'login']);

// Admin (protegidas)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::post('/systems/{slug}/toggle', [SystemController::class, 'toggle']);
    Route::get('/logs', [LogController::class, 'index']);

    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/unread-count', [MessageController::class, 'unreadCount']);
    Route::get('/messages/{message}', [MessageController::class, 'show']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
    Route::delete('/messages', [MessageController::class, 'bulkDestroy']);
});
