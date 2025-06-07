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
            'products' => Obat::all(),
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric',
            'cash' => 'required|numeric',
        ]);

        // Simpan transaksi utama
        $transaction = Transaction::create([
            'invoice_number' => 'INV-' . strtoupper(uniqid()),
            'total_amount' => $validated['total'],
            'cash' => $validated['cash'],
            'change' => $validated['cash'] - $validated['total'],
        ]);

        // Proses item & update stok
        $itemsData = [];

        foreach ($validated['items'] as $item) {
            $product = Obat::findOrFail($item['id']);

            if ($product->stok < $item['quantity']) {
                return back()->withErrors([
                    'stok' => 'Stok tidak cukup untuk produk: ' . $product->nama_obat,
                ]);
            }

            // Kurangi stok
            $product->stok -= $item['quantity'];
            $product->save();

            // Simpan item ke transaction_items
            $transaction->items()->create([
                'product_id' => $product->id,
                'name' => $product->nama_obat,
                'kategori' => $product->kategori,
                'quantity' => $item['quantity'],
                'price' => $product->harga,
            ]);

            // Simpan untuk ditampilkan di struk
            $itemsData[] = [
                'id' => $product->id,
                'name' => $product->nama_obat,
                'kategori' => $product->kategori,
                'price' => $product->harga,
                'quantity' => $item['quantity'],
            ];
        }

        return Inertia::render('Sales-Kasir', [
            'products' => Obat::all(),
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
