<?php

use Inertia\Inertia;  // Import Inertia class
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CashierDashboardController;
use App\Http\Controllers\TransactionController;

use App\Http\Controllers\ProductController;

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
Route::get('/dashboard/kasir', [CashierDashboardController::class, 'dashboard'])->name('dashboard_kasir');

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

Route::post('/logout', function () {
    Auth::logout(); // Log the user out
    return response()->json(['message' => 'Successfully logged out']);
});


// Route untuk medications
Route::get('/medications', [MedicationController::class, 'index']);
Route::post('/medications', [MedicationController::class, 'store'])->name('add_medication');
Route::put('/medications/{id}', [MedicationController::class, 'update'])->name('update_medication');
Route::delete('/medications/{id}', [MedicationController::class, 'destroy'])->name('delete_medication');

Route::get('/dashboard/admin', [MedicationController::class, 'dashboard'])->name('dashboard_admin');
Route::post('/medications/{id}/restock', [MedicationController::class, 'restock'])->name('medications.restock');


Route::prefix('dashboard/admin')->group(function () {
    Route::get('/user-management', [UserController::class, 'index'])->name('users.index');
    Route::post('/user-management', [UserController::class, 'store'])->name('users.store');
    Route::put('/user-management/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/user-management/{id}', [UserController::class, 'destroy'])->name('users.destroy');
});

Route::get('stok-obat', [CashierDashboardController::class, 'getLowStockItems']);
Route::get('obat-kedaluwarsa', [CashierDashboardController::class, 'getExpiringItems']);

// Route::post('/transactions', [TransactionController::class, 'store']);
// Route::get('/transactions', [TransactionController::class, 'store']);

// // Route::get('/dashboard/kasir/sales', [TransactionController::class, 'index'])->name('dashboard.kasir.sales');
// // Route::post('/dashboard/kasir/sales/store', [TransactionController::class, 'store'])->name('store_medication');
// // Route::put('/dashboard/kasir/sales/update/{id}', [TransactionController::class, 'update'])->name('update_medication');
// // Route::delete('/dashboard/kasir/sales/delete/{id}', [TransactionController::class, 'destroy'])->name('delete_medication');
// // Route::post('/transactions', [TransactionController::class, 'store']); // POST request to store a transaction
// // Route::get('/transactions', [TransactionController::class, 'index']); // GET request to fetch all transactions
// // routes/web.php

Route::get('/dashboard/kasir/sales', [TransactionController::class, 'index']);
Route::post('/dashboard/kasir/sales', [TransactionController::class, 'store']);
Route::get('/dashboard/kasir/sales', [TransactionController::class, 'index'])->name('transactions.index');
Route::post('/dashboard/kasir/sales', [TransactionController::class, 'store'])->name('transactions.store');
Route::post('/dashboard/kasir/sales', [TransactionController::class, 'store']);

use App\Http\Controllers\ReportController;

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/admin/report', [ReportController::class, 'index'])->name('admin.report');
});

use App\Http\Controllers\ReportExportController;
use App\Http\Controllers\ReceiptController;
Route::get('/admin/report/pdf', [ReportExportController::class, 'download'])->name('report.download');
Route::get('/admin/report/pdf', [ReportExportController::class, 'download']);
Route::get('/admin/receipt/{invoice}', [ReceiptController::class, 'download']);
