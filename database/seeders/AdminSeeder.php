<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AdminSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'), 
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);
        User::create([
            'name' => 'kasir',
            'username' => 'kasir',
            'email' => 'kasir@example.com',
            'password' => Hash::make('kasir123'), 
            'role' => 'kasir',
            'remember_token' => Str::random(10),
        ]);
    }
}
