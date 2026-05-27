<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'mario.braz.dev@gmail.com')],
            [
                'name' => 'Mario Braz',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'Flamengo2026*')),
                'email_verified_at' => now(),
            ]
        );
    }
}
