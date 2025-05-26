import React, { useState } from 'react';
import { Menu, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, AlertTriangle, Bell } from 'lucide-react';

// Mock data - expanded
const lowStockItems = [
  { name: 'Amoxicillin 500mg', stock: 15, minStock: 20 },
  { name: 'Paracetamol 500mg', stock: 12, minStock: 25 },
  { name: 'Cetirizine 10mg', stock: 8, minStock: 15 },
  { name: 'Ibuprofen 400mg', stock: 18, minStock: 30 },
  { name: 'Omeprazole 20mg', stock: 5, minStock: 20 },
  { name: 'Metformin 500mg', stock: 22, minStock: 40 },
  { name: 'Amlodipine 5mg', stock: 14, minStock: 25 },
  { name: 'Simvastatin 20mg', stock: 9, minStock: 15 },
  { name: 'Losartan 50mg', stock: 11, minStock: 20 },
  { name: 'Captopril 25mg', stock: 7, minStock: 18 },
  { name: 'Aspirin 100mg', stock: 16, minStock: 35 },
  { name: 'Furosemide 40mg', stock: 6, minStock: 12 },
];

const expiringItems = [
  { name: 'Vitamin C 500mg', expiry: '15 Mei 2025', remainingDays: 16 },
  { name: 'Ibuprofen 400mg', expiry: '30 Mei 2025', remainingDays: 31 },
  { name: 'Ambroxol Sirup', expiry: '10 Juni 2025', remainingDays: 42 },
  { name: 'Parasetamol Sirup', expiry: '25 Mei 2025', remainingDays: 26 },
  { name: 'Cetirizine 10mg', expiry: '5 Juni 2025', remainingDays: 37 },
  { name: 'Omeprazole 20mg', expiry: '20 Juni 2025', remainingDays: 52 },
  { name: 'Antasida Tablet', expiry: '12 Mei 2025', remainingDays: 13 },
  { name: 'Betadine 15ml', expiry: '28 Mei 2025', remainingDays: 29 },
  { name: 'Salbutamol Inhaler', expiry: '8 Juni 2025', remainingDays: 40 },
  { name: 'Diclofenac Gel', expiry: '15 Juni 2025', remainingDays: 47 },
  { name: 'Loratadine 10mg', expiry: '3 Juni 2025', remainingDays: 35 },
  { name: 'Dextromethorphan Sirup', expiry: '22 Mei 2025', remainingDays: 23 },
  { name: 'Chlorpheniramine 4mg', expiry: '18 Juni 2025', remainingDays: 50 },
  { name: 'Ranitidine 150mg', expiry: '7 Mei 2025', remainingDays: 8 },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                  <h3 className="text-2xl font-bold text-gray-800">14</h3>
                  <p className="text-xs text-red-500 mt-1">Dalam 3 bulan ke depan</p>
                </div>
                <div className="bg-red-100 p-2 rounded-md">
                  <Bell className="text-red-500" size={24} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Items */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-800">Stok Menipis</h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <div>
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600">Stok: <span className="font-medium text-red-600">{item.stock}</span> / min {item.minStock}</div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      Restok
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expiring Soon */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-800">Obat Kedaluwarsa</h2>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
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