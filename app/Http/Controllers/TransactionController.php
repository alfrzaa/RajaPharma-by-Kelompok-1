<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Obat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        return Inertia::render('Sales-Kasir', [
            'products' => Obat::all(), // ✅ pastikan ini ada
        ]);
    }

    public function store(Request $request)
    {
        // Validasi
        $validated = $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric',
            'cash' => 'required|numeric',
        ]);

        // Simpan transaksi
        $transaction = Transaction::create([
            'invoice_number' => 'INV-' . strtoupper(uniqid()),
            'total_amount' => $validated['total'],
            'cash' => $validated['cash'],
            'change' => $validated['cash'] - $validated['total'],
        ]);

        // Update stok + siapkan data item
        $itemsData = [];

        foreach ($validated['items'] as $item) {
            $product = Obat::findOrFail($item['id']);

            if ($product->stok < $item['quantity']) {
                return back()->withErrors([
                    'stok' => 'Stok tidak cukup untuk produk: ' . $product->nama_obat,
                ]);
            }

            $product->stok -= $item['quantity'];
            $product->save();

            $itemsData[] = [
                'id' => $product->id,
                'name' => $product->nama_obat,
                'price' => $product->harga,
                'quantity' => $item['quantity'],
            ];
        }


        $products = Obat::all();

        return Inertia::render('Sales-Kasir', [
            'products' => $products,
            'receipt' => [
                'id' => $transaction->invoice_number,
                'date' => now()->format('d/m/Y H:i:s'),
                'items' => $itemsData,
                'total' => $transaction->total_amount,
                'cash' => $transaction->cash,
                'change' => $transaction->change,
            ],
        ]);
    }
}
