<?php

use Inertia\Inertia;  // Import Inertia class
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicationController;use 
App\Http\Controllers\Admin\DashboardController;

Route::middleware(['auth'])->prefix('dashboard/admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::put('/restock/{id}', [DashboardController::class, 'restock'])->name('medications.restock');
});

// Route untuk menampilkan halaman utama
Route::get('/', [AppController::class, 'landing'])->name('landing');

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

// Route untuk halaman user management admin
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

// Route untuk medications
Route::get('/medications', [MedicationController::class, 'index']);
Route::post('/medications', [MedicationController::class, 'store'])->name('add_medication');
Route::put('/medications/{id}', [MedicationController::class, 'update'])->name('update_medication');
Route::delete('/medications/{id}', [MedicationController::class, 'destroy'])->name('delete_medication');

Route::get('/dashboard/admin', [MedicationController::class, 'dashboard'])->name('dashboard_admin');
Route::post('/medications/{id}/restock', [MedicationController::class, 'restock'])->name('medications.restock');
