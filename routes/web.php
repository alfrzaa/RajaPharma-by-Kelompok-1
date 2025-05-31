<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Route untuk menampilkan halaman utama
Route::get('/', [AppController::class, 'index'])->name('index');

// Route untuk halaman login (GET)
Route::get('/login', [AppController::class, 'login'])->name('login');

// Route untuk menangani login (POST)
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Route untuk halaman dashboard kasir
Route::get('/dashboard/kasir', [AppController::class, 'dashboard_kasir'])->name('dashboard_kasir');

// Route untuk halaman sales kasir
Route::get('/dashboard/kasir/sales', [AppController::class, 'sales'])->name('sales');

// Route untuk halaman dashboard admin
Route::get('/dashboard/admin', [AppController::class, 'dashboard_admin'])->name('dashboard_admin');

// Route untuk halaman report admin
Route::get('/dashboard/admin/report', [AppController::class, 'report_admin'])->name('report_admin');

// Route untuk halaman stock management admin
Route::get('/dashboard/admin/stock-management', [AppController::class, 'stock_management'])->name('stock_management');

Route::get('/dashboard/admin/user-management', [AppController::class, 'user_management'])->name('user_management');

// Route untuk halaman tes
Route::get('/test', [AppController::class, 'test'])->name('test');

// Middleware untuk route admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
});

// Middleware untuk route kasir
Route::middleware(['auth', 'role:kasir'])->group(function () {
    Route::get('/kasir/dashboard', [KasirController::class, 'index']);
});
// Route untuk logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

