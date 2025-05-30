<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;


Route::get('/', [AppController::class, 'index'])->name('index');
Route::get('/login', [AppController::class, 'login'])->name('login');
Route::get('/dashboard/kasir', [AppController::class, 'dashboard_kasir'])->name('dashboard_kasir');
Route::get('/dashboard/kasir/sales', [AppController::class, 'sales'])->name('sales');
Route::get('/dashboard/admin', [AppController::class, 'dashboard_admin'])->name('dashboard_admin');
Route::get('/dashboard/admin/report', [AppController::class, 'report_admin'])->name('report_admin');
Route::get('/dashboard/admin/stock-management', [AppController::class, 'stock_management'])->name('stock_management');
Route::get('/test', [AppController::class, 'test'])->name('test');
