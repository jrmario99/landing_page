<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials, true)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $request->session()->regenerate();

        return response()->json(['user' => Auth::user()->only('id', 'name', 'email')]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => 'ok']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()->only('id', 'name', 'email')]);
    }
}
