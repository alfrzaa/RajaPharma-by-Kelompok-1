import React, { useState } from 'react';
import { Menu, ShoppingCart, LogOut, AlertTriangle, Bell, Home, User, Clock } from 'lucide-react';

// Mock data - expanded
const lowStockItems = [
  { id: 1, name: 'Amoxicillin 500mg', stock: 15, minStock: 20 },
  { id: 2, name: 'Paracetamol 500mg', stock: 12, minStock: 25 },
  { id: 3, name: 'Cetirizine 10mg', stock: 8, minStock: 15 },
  { id: 4, name: 'Ibuprofen 400mg', stock: 18, minStock: 30 },
  { id: 5, name: 'Omeprazole 20mg', stock: 5, minStock: 20 },
  { id: 6, name: 'Metformin 500mg', stock: 22, minStock: 40 },
  { id: 7, name: 'Amlodipine 5mg', stock: 14, minStock: 25 },
  { id: 8, name: 'Simvastatin 20mg', stock: 9, minStock: 15 },
  { id: 9, name: 'Losartan 50mg', stock: 11, minStock: 20 },
  { id: 10, name: 'Captopril 25mg', stock: 7, minStock: 18 },
  { id: 11, name: 'Aspirin 100mg', stock: 16, minStock: 35 },
  { id: 12, name: 'Furosemide 40mg', stock: 6, minStock: 12 },
];

const expiringItems = [
  { id: 1, name: 'Vitamin C 500mg', expiry: '15 Mei 2025', remainingDays: 16 },
  { id: 2, name: 'Ibuprofen 400mg', expiry: '30 Mei 2025', remainingDays: 31 },
  { id: 3, name: 'Ambroxol Sirup', expiry: '10 Juni 2025', remainingDays: 42 },
  { id: 4, name: 'Parasetamol Sirup', expiry: '25 Mei 2025', remainingDays: 26 },
  { id: 5, name: 'Cetirizine 10mg', expiry: '5 Juni 2025', remainingDays: 37 },
  { id: 6, name: 'Omeprazole 20mg', expiry: '20 Juni 2025', remainingDays: 52 },
  { id: 7, name: 'Antasida Tablet', expiry: '12 Mei 2025', remainingDays: 13 },
  { id: 8, name: 'Betadine 15ml', expiry: '28 Mei 2025', remainingDays: 29 },
  { id: 9, name: 'Salbutamol Inhaler', expiry: '8 Juni 2025', remainingDays: 40 },
  { id: 10, name: 'Diclofenac Gel', expiry: '15 Juni 2025', remainingDays: 47 },
  { id: 11, name: 'Loratadine 10mg', expiry: '3 Juni 2025', remainingDays: 35 },
  { id: 12, name: 'Dextromethorphan Sirup', expiry: '22 Mei 2025', remainingDays: 23 },
  { id: 13, name: 'Chlorpheniramine 4mg', expiry: '18 Juni 2025', remainingDays: 50 },
  { id: 14, name: 'Ranitidine 150mg', expiry: '7 Mei 2025', remainingDays: 8 },
];

const DashboardKasir = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  const currentLowStockItems = lowStockItems.filter(item => item.stock < item.minStock);
  const currentExpiringItems = expiringItems.filter(item => item.remainingDays <= 60);
  
  // Get current time for greeting
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Selamat Pagi';
    if (currentHour < 17) return 'Selamat Siang';
    if (currentHour < 19) return 'Selamat Sore';
    return 'Selamat Malam';
  };
  
  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('id-ID', options);
  };
  
  return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`bg-[#1A6291] text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col`}>
          <div className="p-5 flex justify-between items-center">
            {sidebarOpen && <span className="font-bold text-xl">RajaPharma</span>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-[#134b73]">
              <Menu size={24} />
            </button>
          </div>
          
          <div className="mt-8 flex-1">
            <div 
              className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${activeMenu === 'dashboard' ? 'bg-[#134b73] border-r-4 border-white' : ''}`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <div className="w-8 flex justify-center">
                <Home size={20} />
              </div>
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </div>
            
            <div 
              className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${activeMenu === 'sales' ? 'bg-[#134b73] border-r-4 border-white' : ''}`}
              onClick={() => setActiveMenu('sales')}
            >
              <div className="w-8 flex justify-center">
                <ShoppingCart size={20} />
              </div>
              {sidebarOpen && <span className="ml-3">Penjualan</span>}
            </div>
          </div>
          
          <div className="mt-auto mb-4">
            <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer">
              <div className="w-8 flex justify-center">
                <LogOut size={20} />
              </div>
              {sidebarOpen && <span className="ml-3">Keluar</span>}
            </div>
          </div>
        </div>
        
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Kasir RajaPharma</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#1A6291] to-[#2B7CB3] rounded-xl p-6 mb-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <User className="mr-3 text-blue-200" size={24} />
                  <h2 className="text-2xl font-bold">Hai, {getGreeting()}!</h2>
                </div>
                <p className="text-blue-100 text-lg mb-1">
                  Selamat datang di RajaPharma, Anda masuk sebagai Kasir 
                </p>
                <div className="flex items-center mt-4 text-blue-200">
                  <Clock className="mr-2" size={16} />
                  <span className="text-sm">{getCurrentDate()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status Sistem</p>
                  <h3 className="text-xl font-bold text-green-600">Online</h3>
                  <p className="text-xs text-gray-400 mt-1">Semua sistem berjalan normal</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Stok Menipis</p>
                  <h3 className="text-2xl font-bold text-yellow-600">{currentLowStockItems.length}</h3>
                  <p className="text-xs text-gray-400 mt-1">Item perlu restok</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <AlertTriangle className="text-yellow-500" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mendekati Kedaluwarsa</p>
                  <h3 className="text-2xl font-bold text-red-600">{currentExpiringItems.length}</h3>
                  <p className="text-xs text-gray-400 mt-1">Dalam 60 hari ke depan</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <Bell className="text-red-500" size={24} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Low Stock Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Stok Menipis</h2>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {currentLowStockItems.length} item
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Item yang memerlukan restok segera</p>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentLowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Stok: <span className="font-semibold text-red-600">{item.stock}</span> / 
                        <span className="text-gray-500"> minimum {item.minStock}</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                        Urgent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Expiring Soon */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Mendekati Kedaluwarsa</h2>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    {currentExpiringItems.length} item
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Obat yang akan kedaluwarsa dalam 60 hari</p>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentExpiringItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Kedaluwarsa: <span className="font-semibold text-amber-600">{item.expiry}</span>
                        <span className="text-gray-500"> ({item.remainingDays} hari lagi)</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        item.remainingDays <= 15 
                          ? 'bg-red-100 text-red-700' 
                          : item.remainingDays <= 30 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.remainingDays <= 15 ? 'Sangat Urgent' : item.remainingDays <= 30 ? 'Urgent' : 'Perhatian'}
                      </span>
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

export default DashboardKasir;