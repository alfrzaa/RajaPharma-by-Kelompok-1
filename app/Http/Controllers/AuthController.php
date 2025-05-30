<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Ambil kredensial dari request (username dan password)
        $credentials = $request->only('username', 'password');

        // Cek apakah kredensial valid
        if (Auth::attempt($credentials)) {
            // Login berhasil, ambil data user
            $user = Auth::user();
            
            // Kembalikan respons sukses dengan data user
            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
        }

        // Login gagal, kembalikan pesan error
        return response()->json([
            'status' => 'error',
            'message' => 'Invalid credentials'
        ], 401);
    }
}
