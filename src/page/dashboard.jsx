import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Bell, Menu, Search, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, AlertTriangle } from 'lucide-react';

// Mock data
const salesData = [
  { name: 'Sen', sales: 3400 },
  { name: 'Sel', sales: 2800 },
  { name: 'Rab', sales: 4300 },
  { name: 'Kam', sales: 2900 },
  { name: 'Jum', sales: 3800 },
  { name: 'Sab', sales: 4800 },
  { name: 'Min', sales: 3500 },
];

const topSellingProducts = [
  { name: 'Paracetamol', sales: 145, revenue: 2175000 },
  { name: 'Amoxicillin', sales: 98, revenue: 1960000 },
  { name: 'Cetirizine', sales: 87, revenue: 1305000 },
  { name: 'Vitamin C', sales: 76, revenue: 1520000 },
  { name: 'Ibuprofen', sales: 65, revenue: 975000 },
];

const lowStockItems = [
  { name: 'Amoxicillin 500mg', stock: 15, minStock: 20 },
  { name: 'Paracetamol 500mg', stock: 12, minStock: 25 },
  { name: 'Cetirizine 10mg', stock: 8, minStock: 15 },
];

const expiringItems = [
  { name: 'Vitamin C 500mg', expiry: '15 Mei 2025', remainingDays: 16 },
  { name: 'Ibuprofen 400mg', expiry: '30 Mei 2025', remainingDays: 31 },
  { name: 'Ambroxol Sirup', expiry: '10 Juni 2025', remainingDays: 42 },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-5 flex justify-between items-center">
          {sidebarOpen && <span className="font-bold text-xl">RajaPharma</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-blue-700">
            <Menu size={24} />
          </button>
        </div>
        
        <div className="mt-8">
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <Package size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Stok Obat</span>}
          </div>
          
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <ShoppingCart size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Penjualan</span>}
          </div>
          
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <FileText size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Laporan</span>}
          </div>
          
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <Users size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Pengguna</span>}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer rounded-md">
            <div className="w-8 flex justify-center">
              <LogOut size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Keluar</span>}
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Cari..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-4">
                <Bell size={20} />
                <span className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center">
                <div className="h-9 w-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
                  A
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-700">Admin</div>
                  <div className="text-xs text-gray-500">admin@apotekraja.com</div>
                </div>
                <ChevronDown className="ml-2 text-gray-500" size={16} />
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Penjualan Hari Ini</p>
                  <h3 className="text-2xl font-bold text-gray-800">Rp 4.325.000</h3>
                  <p className="text-xs text-green-500 mt-1">+12% dari kemarin</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md">
                  <ShoppingCart className="text-blue-500" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaksi Hari Ini</p>
                  <h3 className="text-2xl font-bold text-gray-800">87</h3>
                  <p className="text-xs text-green-500 mt-1">+8% dari kemarin</p>
                </div>
                <div className="bg-green-100 p-2 rounded-md">
                  <FileText className="text-green-500" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Stok Menipis</p>
                  <h3 className="text-2xl font-bold text-gray-800">12</h3>
                  <p className="text-xs text-red-500 mt-1">Perlu pengadaan segera</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-md">
                  <AlertTriangle className="text-yellow-500" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Obat Kedaluwarsa</p>
                  <h3 className="text-2xl font-bold text-gray-800">8</h3>
                  <p className="text-xs text-red-500 mt-1">Dalam 3 bulan ke depan</p>
                </div>
                <div className="bg-red-100 p-2 rounded-md">
                  <Bell className="text-red-500" size={24} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Penjualan Minggu Ini</h2>
                <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                  7 Hari Terakhir
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Penjualan']} />
                    <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Top Selling Products */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Produk Terlaris</h2>
                <div className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                  Bulan Ini
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-xs font-medium text-gray-500">Produk</th>
                      <th className="text-right py-2 text-xs font-medium text-gray-500">Terjual</th>
                      <th className="text-right py-2 text-xs font-medium text-gray-500">Pendapatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSellingProducts.map((product, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 text-sm font-medium text-gray-800">{product.name}</td>
                        <td className="py-3 text-right text-sm text-gray-600">{product.sales}</td>
                        <td className="py-3 text-right text-sm text-gray-600">
                          Rp {product.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Items */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Stok Menipis</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Stok: <span className="font-medium text-red-600">{item.stock}</span> / min {item.minStock}</div>
                    </div>
                    <button className="px-3 py-1 bg-white border border-blue-500 text-blue-500 text-sm rounded hover:bg-blue-50">
                      Restok
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expiring Soon */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Obat Kedaluwarsa</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                {expiringItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Kedaluwarsa: <span className="font-medium text-yellow-600">{item.expiry}</span> ({item.remainingDays} hari)</div>
                    </div>
                    <div className="text-sm text-yellow-600 font-medium">
                      Segera jual
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;