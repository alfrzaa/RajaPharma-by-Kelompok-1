import React, { useState, useEffect } from 'react';
import { Menu, Package, FileText, Users, LogOut, Calendar, Download, Eye, Printer, X, Home, CreditCard } from 'lucide-react';

// Mock data for transactions
const allTransactions = [
  { 
    id: 'INV-237856', 
    date: '29/04/2025, 08:15', 
    cashier: 'Siti Rahma', 
    items: [
      { id: 1, name: 'Paracetamol 500mg', quantity: 2, price: 15000 },
      { id: 4, name: 'Vitamin C 500mg', quantity: 1, price: 20000 }
    ],
    subtotal: 50000,
    total: 50000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237855', 
    date: '29/04/2025, 07:32', 
    cashier: 'Siti Rahma', 
    items: [
      { id: 6, name: 'Ambroxol Sirup', quantity: 1, price: 25000 },
      { id: 3, name: 'Cetirizine 10mg', quantity: 1, price: 15000 }
    ],
    subtotal: 40000,
    total: 40000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237854', 
    date: '28/04/2025, 16:45', 
    cashier: 'Joko Prabowo', 
    items: [
      { id: 2, name: 'Amoxicillin 500mg', quantity: 1, price: 20000 },
      { id: 9, name: 'Promag Tablet', quantity: 2, price: 8000 }
    ],
    subtotal: 36000,
    total: 36000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237853', 
    date: '28/04/2025, 14:23', 
    cashier: 'Siti Rahma', 
    items: [
      { id: 11, name: 'Salbutamol Inhaler', quantity: 1, price: 65000 }
    ],
    subtotal: 65000,
    total: 65000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237852', 
    date: '28/04/2025, 11:08', 
    cashier: 'Siti Rahma', 
    items: [
      { id: 5, name: 'Ibuprofen 400mg', quantity: 2, price: 12000 },
      { id: 10, name: 'Antasida Sirup', quantity: 1, price: 18000 }
    ],
    subtotal: 42000,
    total: 42000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237851', 
    date: '28/04/2025, 09:47', 
    cashier: 'Joko Prabowo', 
    items: [
      { id: 1, name: 'Paracetamol 500mg', quantity: 1, price: 15000 },
      { id: 4, name: 'Vitamin C 500mg', quantity: 3, price: 20000 }
    ],
    subtotal: 75000,
    total: 75000,
    paymentMethod: 'Tunai'
  },
  { 
    id: 'INV-237850', 
    date: '27/04/2025, 16:38', 
    cashier: 'Joko Prabowo', 
    items: [
      { id: 8, name: 'Amlodipine 10mg', quantity: 2, price: 22000 },
      { id: 7, name: 'Metformin 500mg', quantity: 1, price: 18000 }
    ],
    subtotal: 62000,
    total: 62000,
    paymentMethod: 'Tunai'
  }
];

const ReportAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('reports');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filteredTransactions, setFilteredTransactions] = useState(allTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  
  // Filter transactions based on date range
  useEffect(() => {
    if (!dateRange.start && !dateRange.end) {
      setFilteredTransactions(allTransactions);
      return;
    }
    
    const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0);
    const endDate = dateRange.end ? new Date(dateRange.end) : new Date();
    
    // Set time to end of day for end date
    endDate.setHours(23, 59, 59, 999);
    
    // Filter transactions
    const filtered = allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date.split(', ')[0].split('/').reverse().join('-'));
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
  }, [dateRange]);
  
  // Calculate sales summary
  const getSalesSummary = () => {
    const totalSales = filteredTransactions.reduce((sum, transaction) => sum + transaction.total, 0);
    const totalItems = filteredTransactions.reduce((sum, transaction) => {
      return sum + transaction.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    
    return {
      totalTransactions: filteredTransactions.length,
      totalSales,
      totalItems
    };
  };

  // View transaction detail
  const viewTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetail(true);
  };

  // Print transaction receipt
  const printTransactionReceipt = (transaction) => {
    alert(`Mencetak struk untuk transaksi ${transaction.id}`);
  };

  // Reprint transaction
  const reprintTransaction = (transaction) => {
    alert(`Mencetak ulang transaksi ${transaction.id}`);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
  };
  
  // Generate PDF (mock function)
  const generatePDF = () => {
    alert('Unduh laporan PDF berhasil!');
  };

  // Get page title based on active menu
  const getPageTitle = () => {
    switch(activeMenu) {
      case 'dashboard': return 'Dashboard';
      case 'stock': return 'Stok Obat';
      case 'reports': return 'Laporan Penjualan';
      case 'users': return 'Manajemen Pengguna';
      default: return 'Laporan Penjualan';
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
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
            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${activeMenu === 'stock' ? 'bg-[#134b73] border-r-4 border-white' : ''}`}
            onClick={() => setActiveMenu('stock')}
          >
            <div className="w-8 flex justify-center">
              <Package size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Stok Obat</span>}
          </div>
          
          <div 
            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${activeMenu === 'reports' ? 'bg-[#134b73] border-r-4 border-white' : ''}`}
            onClick={() => setActiveMenu('reports')}
          >
            <div className="w-8 flex justify-center">
              <FileText size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Laporan</span>}
          </div>
          
          <div 
            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${activeMenu === 'users' ? 'bg-[#134b73] border-r-4 border-white' : ''}`}
            onClick={() => setActiveMenu('users')}
          >
            <div className="w-8 flex justify-center">
              <Users size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Pengguna</span>}
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
        <div className="bg-white shadow-sm z-10">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              {getPageTitle()}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin RajaPharma</span>
            </div>
          </div>
        </div>
        
        {/* Content based on active menu */}
        {activeMenu === 'reports' && (
          <div className="flex-1 p-6 overflow-auto">
            {/* Date Range Filter */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <label className="text-sm font-medium text-gray-700">Filter Tanggal:</label>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <span className="text-gray-500">sampai</span>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  onClick={generatePDF}
                >
                  <Download size={18} className="mr-2" />
                  Unduh PDF
                </button>
              </div>
            </div>
            
            {/* Sales Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Transaksi</p>
                    <p className="text-2xl font-bold text-gray-900">{getSalesSummary().totalTransactions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CreditCard size={24} className="text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                    <p className="text-2xl font-bold text-gray-900">Rp {formatCurrency(getSalesSummary().totalSales)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Package size={24} className="text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Item Terjual</p>
                    <p className="text-2xl font-bold text-gray-900">{getSalesSummary().totalItems}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Riwayat Transaksi</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No. Invoice
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kasir
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metode Bayar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{transaction.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {transaction.cashier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-green-600">
                            Rp {formatCurrency(transaction.total)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {transaction.paymentMethod}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => viewTransactionDetail(transaction)}
                              title="Lihat Detail"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              className="text-green-600 hover:text-green-900"
                              onClick={() => printTransactionReceipt(transaction)}
                              title="Cetak Struk"
                            >
                              <Printer size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Tidak ada transaksi untuk periode yang dipilih
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder for other menu sections */}
        {activeMenu !== 'reports' && (
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-xl font-medium mb-2">Halaman {getPageTitle()} Sedang Dikembangkan</h2>
              <p>Fitur ini akan segera tersedia</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Transaction Detail Modal */}
      {showTransactionDetail && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Detail Transaksi</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowTransactionDetail(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">No. Invoice</label>
                  <p className="font-medium">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tanggal</label>
                  <p className="font-medium">{selectedTransaction.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Kasir</label>
                  <p className="font-medium">{selectedTransaction.cashier}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Metode Bayar</label>
                  <p className="font-medium">{selectedTransaction.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Item yang Dibeli:</h4>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Item</th>
                        <th className="px-4 py-2 text-right">Qty</th>
                        <th className="px-4 py-2 text-right">Harga</th>
                        <th className="px-4 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTransaction.items.map(item => (
                        <tr key={item.id} className="border-t">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">Rp {formatCurrency(item.price)}</td>
                          <td className="px-4 py-2 text-right">Rp {formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>Rp {formatCurrency(selectedTransaction.total)}</span>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  onClick={() => reprintTransaction(selectedTransaction)}
                >
                  <Printer size={18} className="mr-2" />
                  Cetak Ulang
                </button>
                <button 
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => setShowTransactionDetail(false)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportAdmin;