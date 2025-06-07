<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ObatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('obats')->insert([
            [
                'nama_obat' => 'Paracetamol 500mg',
                'kategori' => 'Analgesik',
                'stok' => 100,
                'stok_minimum' => 10,
                'harga' => 5000,
                'tanggal_kedaluwarsa' => Carbon::now()->addMonths(12),
                'supplier' => 'PT Kimia Farma',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_obat' => 'Amoxicillin 500mg',
                'kategori' => 'Antibiotik',
                'stok' => 80,
                'stok_minimum' => 15,
                'harga' => 7000,
                'tanggal_kedaluwarsa' => Carbon::now()->addMonths(10),
                'supplier' => 'PT Dexa Medica',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_obat' => 'Ibuprofen 400mg',
                'kategori' => 'Anti Inflamasi',
                'stok' => 50,
                'stok_minimum' => 10,
                'harga' => 6000,
                'tanggal_kedaluwarsa' => Carbon::now()->addMonths(14),
                'supplier' => 'PT Kalbe Farma',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
