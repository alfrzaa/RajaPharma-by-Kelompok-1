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
            'name' => 'radhiy',
            'username' => 'radhiy',
            'email' => 'radhiy@example.com',
            'password' => Hash::make('radhiy'), // password aman
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);
    }
}
