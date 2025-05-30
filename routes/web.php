<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;


Route::get('/', [AppController::class, 'index'])->name('index');
Route::get('/login', [AppController::class, 'login'])->name('login');
Route::get('/dashboard/kasir', [AppController::class, 'dashboard_kasir'])->name('dashboard_kasir');
Route::get('/dashboard/admin', [AppController::class, 'dashboard_admin'])->name('dashboard_admin');

