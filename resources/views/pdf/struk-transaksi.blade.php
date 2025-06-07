<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        td, th { padding: 4px; }
    </style>
</head>
<body>
    <h2 style="text-align: center;">Struk Pembelian</h2>
    <p>No. Invoice: {{ $transaction->invoice_number }}</p>
    <p>Tanggal: {{ $transaction->created_at->format('d/m/Y H:i') }}</p>

    <table>
        <thead>
            <tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
            @foreach ($transaction->items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>x{{ $item->quantity }}</td>
                    <td>Rp {{ number_format($item->price, 0, ',', '.') }}</td>
                    <td>Rp {{ number_format($item->price * $item->quantity, 0, ',', '.') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <hr>
    <p><strong>Total:</strong> Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}</p>
    <p><strong>Tunai:</strong> Rp {{ number_format($transaction->cash, 0, ',', '.') }}</p>
    <p><strong>Kembali:</strong> Rp {{ number_format($transaction->change, 0, ',', '.') }}</p>
    <p style="text-align: center;">Terima Kasih!</p>
</body>
</html>
