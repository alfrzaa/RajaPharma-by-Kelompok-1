import React, { useState, useEffect } from 'react';
import { Menu, Search, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, 
  Filter, Calendar, Download, Eye, Edit, Trash, BarChart4, PieChart, 
  Clock, TrendingUp, CreditCard, Table, RefreshCw } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Component for reports section
const ReportsSection = () => {
  // State for reports
  const [reportType, setReportType] = useState('penjualan');
  const [dateRange, setDateRange] = useState({ 
    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0], 
    end: new Date().toISOString().split('T')[0] 
  });
  const [periodType, setPeriodType] = useState('weekly');
  const [chartView, setChartView] = useState('bar');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [reportDetail, setReportDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Mock transactions data
  const allTransactions = [
    { 
      id: 'INV-237856', 
      date: '29/04/2025, 08:15', 
      cashier: 'Siti Rahma', 
      items: [
        { id: 1, name: 'Paracetamol 500mg', quantity: 2, price: 15000, category: 'Analgesik' },
        { id: 4, name: 'Vitamin C 500mg', quantity: 1, price: 20000, category: 'Vitamin' }
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
        { id: 6, name: 'Ambroxol Sirup', quantity: 1, price: 25000, category: 'Batuk & Flu' },
        { id: 3, name: 'Cetirizine 10mg', quantity: 1, price: 15000, category: 'Antihistamin' }
      ],
      subtotal: 40000,
      total: 40000,
      paymentMethod: 'QRIS'
    },
    { 
      id: 'INV-237854', 
      date: '28/04/2025, 16:45', 
      cashier: 'Joko Prabowo', 
      items: [
        { id: 2, name: 'Amoxicillin 500mg', quantity: 1, price: 20000, category: 'Antibiotik' },
        { id: 9, name: 'Promag Tablet', quantity: 2, price: 8000, category: 'Saluran Cerna' }
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
        { id: 11, name: 'Salbutamol Inhaler', quantity: 1, price: 65000, category: 'Pernapasan' }
      ],
      subtotal: 65000,
      total: 65000,
      paymentMethod: 'Kartu Debit'
    },
    { 
      id: 'INV-237852', 
      date: '28/04/2025, 11:08', 
      cashier: 'Siti Rahma', 
      items: [
        { id: 5, name: 'Ibuprofen 400mg', quantity: 2, price: 12000, category: 'Analgesik' },
        { id: 10, name: 'Antasida Sirup', quantity: 1, price: 18000, category: 'Saluran Cerna' }
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
        { id: 1, name: 'Paracetamol 500mg', quantity: 1, price: 15000, category: 'Analgesik' },
        { id: 4, name: 'Vitamin C 500mg', quantity: 3, price: 20000, category: 'Vitamin' }
      ],
      subtotal: 75000,
      total: 75000,
      paymentMethod: 'QRIS'
    },
    { 
      id: 'INV-237850', 
      date: '27/04/2025, 16:38', 
      cashier: 'Joko Prabowo', 
      items: [
        { id: 8, name: 'Amlodipine 10mg', quantity: 2, price: 22000, category: 'Antihipertensi' },
        { id: 7, name: 'Metformin 500mg', quantity: 1, price: 18000, category: 'Antidiabetes' }
      ],
      subtotal: 62000,
      total: 62000,
      paymentMethod: 'Tunai'
    },
    { 
      id: 'INV-237849', 
      date: '27/04/2025, 13:45', 
      cashier: 'Siti Rahma', 
      items: [
        { id: 12, name: 'Betadine Solution', quantity: 1, price: 28000, category: 'Antiseptik' },
        { id: 6, name: 'Ambroxol Sirup', quantity: 2, price: 25000, category: 'Batuk & Flu' }
      ],
      subtotal: 78000,
      total: 78000,
      paymentMethod: 'Kartu Kredit'
    },
    { 
      id: 'INV-237848', 
      date: '26/04/2025, 15:20', 
      cashier: 'Joko Prabowo', 
      items: [
        { id: 1, name: 'Paracetamol 500mg', quantity: 3, price: 15000, category: 'Analgesik' },
        { id: 3, name: 'Cetirizine 10mg', quantity: 2, price: 15000, category: 'Antihistamin' }
      ],
      subtotal: 75000,
      total: 75000,
      paymentMethod: 'Tunai'
    },
    { 
      id: 'INV-237847', 
      date: '26/04/2025, 10:35', 
      cashier: 'Siti Rahma', 
      items: [
        { id: 4, name: 'Vitamin C 500mg', quantity: 2, price: 20000, category: 'Vitamin' },
        { id: 9, name: 'Promag Tablet', quantity: 1, price: 8000, category: 'Saluran Cerna' }
      ],
      subtotal: 48000,
      total: 48000,
      paymentMethod: 'QRIS'
    },
    { 
      id: 'INV-237846', 
      date: '25/04/2025, 17:12', 
      cashier: 'Joko Prabowo', 
      items: [
        { id: 2, name: 'Amoxicillin 500mg', quantity: 2, price: 20000, category: 'Antibiotik' }
      ],
      subtotal: 40000,
      total: 40000,
      paymentMethod: 'Tunai'
    },
    { 
      id: 'INV-237845', 
      date: '25/04/2025, 11:08', 
      cashier: 'Siti Rahma', 
      items: [
        { id: 11, name: 'Salbutamol Inhaler', quantity: 1, price: 65000, category: 'Pernapasan' },
        { id: 5, name: 'Ibuprofen 400mg', quantity: 1, price: 12000, category: 'Analgesik' }
      ],
      subtotal: 77000,
      total: 77000,
      paymentMethod: 'Kartu Debit'
    },
  ];

  // Mock inventory history data
  const inventoryHistory = [
    { id: 1, date: '29/04/2025', type: 'Masuk', product: 'Paracetamol 500mg', quantity: 50, by: 'Budi Santoso', notes: 'Pengiriman rutin dari distributor' },
    { id: 2, date: '29/04/2025', type: 'Masuk', product: 'Vitamin C 500mg', quantity: 100, by: 'Budi Santoso', notes: 'Pengiriman rutin dari distributor' },
    { id: 3, date: '28/04/2025', type: 'Keluar', product: 'Amoxicillin 500mg', quantity: 5, by: 'Maya Indah', notes: 'Obat kadaluarsa' },
    { id: 4, date: '28/04/2025', type: 'Masuk', product: 'Ibuprofen 400mg', quantity: 25, by: 'Maya Indah', notes: 'Pengiriman dari supplier baru' },
    { id: 5, date: '27/04/2025', type: 'Keluar', product: 'Cetirizine 10mg', quantity: 2, by: 'Budi Santoso', notes: 'Kemasan rusak' },
    { id: 6, date: '27/04/2025', type: 'Masuk', product: 'Promag Tablet', quantity: 40, by: 'Maya Indah', notes: 'Pengiriman rutin' },
    { id: 7, date: '26/04/2025', type: 'Masuk', product: 'Amlodipine 10mg', quantity: 30, by: 'Budi Santoso', notes: 'Pengiriman rutin' },
    { id: 8, date: '26/04/2025', type: 'Keluar', product: 'Salbutamol Inhaler', quantity: 1, by: 'Maya Indah', notes: 'Kemasan rusak' },
    { id: 9, date: '25/04/2025', type: 'Masuk', product: 'Antasida Sirup', quantity: 20, by: 'Budi Santoso', notes: 'Pengiriman rutin' },
    { id: 10, date: '25/04/2025', type: 'Keluar', product: 'Vitamin C 500mg', quantity: 3, by: 'Maya Indah', notes: 'Sampel untuk dokter' },
  ];

  // Format currency
  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
  };

  // Format date from DD/MM/YYYY to Date object
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length < 3) return null;
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  // Filter transactions based on date range
  useEffect(() => {
    if (!dateRange.start && !dateRange.end) {
      setFilteredTransactions(allTransactions);
      setFilteredInventory(inventoryHistory);
      return;
    }
    
    const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0);
    const endDate = dateRange.end ? new Date(dateRange.end) : new Date();
    
    // Set time to end of day for end date
    endDate.setHours(23, 59, 59, 999);
    
    // Filter transactions
    const filtered = allTransactions.filter(transaction => {
      const transactionDateParts = transaction.date.split(', ')[0].split('/');
      const transactionDate = new Date(
        transactionDateParts[2], 
        transactionDateParts[1] - 1, 
        transactionDateParts[0]
      );
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    setFilteredTransactions(filtered);
    
    // Filter inventory
    const filteredInv = inventoryHistory.filter(item => {
      const itemDateParts = item.date.split('/');
      const itemDate = new Date(
        itemDateParts[2], 
        itemDateParts[1] - 1, 
        itemDateParts[0]
      );
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredInventory(filteredInv);
  }, [dateRange]);

  // Process data for reports
  useEffect(() => {
    if (filteredTransactions.length === 0) return;

    // Process top products
    const productsMap = {};
    filteredTransactions.forEach(transaction => {
      transaction.items.forEach(item => {
        if (!productsMap[item.name]) {
          productsMap[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
            category: item.category
          };
        }
        productsMap[item.name].quantity += item.quantity;
        productsMap[item.name].revenue += (item.price * item.quantity);
      });
    });

    const topProductsList = Object.values(productsMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
    setTopProducts(topProductsList);

    // Process sales trend
    const salesByDate = {};
    filteredTransactions.forEach(transaction => {
      const date = transaction.date.split(', ')[0];
      if (!salesByDate[date]) {
        salesByDate[date] = 0;
      }
      salesByDate[date] += transaction.total;
    });

    const trendData = Object.entries(salesByDate)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
      });
    setSalesTrend(trendData);

    // Process payment methods
    const paymentMethods = {};
    filteredTransactions.forEach(transaction => {
      if (!paymentMethods[transaction.paymentMethod]) {
        paymentMethods[transaction.paymentMethod] = 0;
      }
      paymentMethods[transaction.paymentMethod] += transaction.total;
    });

    const paymentMethodList = Object.entries(paymentMethods)
      .map(([name, value]) => ({ name, value }));
    setPaymentMethodData(paymentMethodList);

    // Process categories
    const categoriesMap = {};
    filteredTransactions.forEach(transaction => {
      transaction.items.forEach(item => {
        if (!categoriesMap[item.category]) {
          categoriesMap[item.category] = 0;
        }
        categoriesMap[item.category] += (item.price * item.quantity);
      });
    });

    const categoriesList = Object.entries(categoriesMap)
      .map(([name, value]) => ({ name, value }));
    setCategoryData(categoriesList);

  }, [filteredTransactions]);

  // Set preset periods
  const setPeriod = (period) => {
    const today = new Date();
    let startDate;
    
    switch(period) {
      case 'today':
        startDate = new Date(today);
        break;
      case 'weekly':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarterly':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'yearly':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
    }
    
    setPeriodType(period);
    setDateRange({
      start: startDate.toISOString().split('T')[0],
      end: today.toISOString().split('T')[0]
    });
  };

  // Calculate sales summary
  const getSalesSummary = () => {
    const totalSales = filteredTransactions.reduce((sum, transaction) => sum + transaction.total, 0);
    const totalItems = filteredTransactions.reduce((sum, transaction) => {
      return sum + transaction.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    
    const paymentMethods = {};
    filteredTransactions.forEach(transaction => {
      paymentMethods[transaction.paymentMethod] = (paymentMethods[transaction.paymentMethod] || 0) + 1;
    });
    
    return {
      totalTransactions: filteredTransactions.length,
      totalSales,
      totalItems,
      paymentMethods
    };
  };

  // Get inventory summary
  const getInventorySummary = () => {
    const inItems = filteredInventory.filter(item => item.type === 'Masuk')
      .reduce((sum, item) => sum + item.quantity, 0);
    const outItems = filteredInventory.filter(item => item.type === 'Keluar')
      .reduce((sum, item) => sum + item.quantity, 0);
    
    const productsMap = {};
    filteredInventory.forEach(item => {
      if (!productsMap[item.product]) {
        productsMap[item.product] = { in: 0, out: 0 };
      }
      if (item.type === 'Masuk') {
        productsMap[item.product].in += item.quantity;
      } else {
        productsMap[item.product].out += item.quantity;
      }
    });
    
    const topMovement = Object.entries(productsMap)
      .map(([product, movement]) => ({
        product,
        movement: movement.in + movement.out
      }))
      .sort((a, b) => b.movement - a.movement)
      .slice(0, 5);
    
    return {
      totalMovements: filteredInventory.length,
      inItems,
      outItems,
      topMovement
    };
  };

  // View transaction details
  const viewTransactionDetails = (transaction) => {
    setReportDetail(transaction);
    setShowDetailModal(true);
  };

  // Generate PDF (mock function)
  const generatePDF = () => {
    alert('Unduh laporan PDF berhasil!');
  };

  // Generate Excel (mock function)
  const generateExcel = () => {
    alert('Unduh laporan Excel berhasil!');
  };

  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            {/* Report Type Selector */}
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg font-medium ${
                  reportType === 'penjualan' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setReportType('penjualan')}
              >
                <div className="flex items-center">
                  <BarChart4 size={18} className="mr-2" />
                  Laporan Penjualan
                </div>
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium ${
                  reportType === 'inventaris' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setReportType('inventaris')}
              >
                <div className="flex items-center">
                  <Package size={18} className="mr-2" />
                  Riwayat Inventaris
                </div>
              </button>
            </div>
            
            {/* Period Selector */}
            <div className="flex">
              <div className="border rounded-lg overflow-hidden flex">
                <button 
                  className={`px-3 py-2 ${periodType === 'today' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setPeriod('today')}
                >
                  Hari Ini
                </button>
                <button 
                  className={`px-3 py-2 ${periodType === 'weekly' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setPeriod('weekly')}
                >
                  7 Hari
                </button>
                <button 
                  className={`px-3 py-2 ${periodType === 'monthly' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setPeriod('monthly')}
                >
                  30 Hari
                </button>
                <button 
                  className={`px-3 py-2 ${periodType === 'quarterly' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setPeriod('quarterly')}
                >
                  90 Hari
                </button>
                <button 
                  className={`px-3 py-2 ${periodType === 'yearly' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setPeriod('yearly')}
                >
                  1 Tahun
                </button>
              </div>
            </div>
          </div>
          
          {/* Custom Date Range */}
          <div className="flex space-x-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tanggal Mulai</label>
              <input 
                type="date" 
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tanggal Akhir</label>
              <input 
                type="date"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() => setPeriod('weekly')}
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              onClick={generateExcel}
            >
              <Table size={16} className="mr-2" />
              Ekspor Excel
            </button>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              onClick={generatePDF}
            >
              <Download size={16} className="mr-2" />
              Ekspor PDF
            </button>
          </div>
        </div>
        
        {/* Sales Report Content */}
        {reportType === 'penjualan' && (
          <div className="p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-blue-800 font-medium mb-1">Total Transaksi</h3>
                    <p className="text-2xl font-bold">{getSalesSummary().totalTransactions}</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-full">
                    <ShoppingCart size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-green-800 font-medium mb-1">Total Penjualan</h3>
                    <p className="text-2xl font-bold">Rp {formatCurrency(getSalesSummary().totalSales)}</p>
                  </div>
                  <div className="bg-green-200 p-3 rounded-full">
                    <CreditCard size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-purple-800 font-medium mb-1">Item Terjual</h3>
                    <p className="text-2xl font-bold">{getSalesSummary().totalItems}</p>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-full">
                    <Package size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-orange-800 font-medium mb-1">Rata-rata Transaksi</h3>
                    <p className="text-2xl font-bold">Rp {formatCurrency(
                      getSalesSummary().totalTransactions ? 
                      Math.round(getSalesSummary().totalSales / getSalesSummary().totalTransactions) : 0
                    )}</p>
                  </div>
                  <div className="bg-orange-200 p-3 rounded-full">
                    <TrendingUp size={24} className="text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart View Selector */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Tren Penjualan</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  className={`px-3 py-1 rounded-md ${chartView === 'bar' ? 'bg-white shadow' : ''}`} 
                  onClick={() => setChartView('bar')}
                >
                  <BarChart4 size={18} />
                </button>
                <button 
                  className={`px-3 py-1 rounded-md ${chartView === 'line' ? 'bg-white shadow' : ''}`} 
                  onClick={() => setChartView('line')}
                >
                  <TrendingUp size={18} />
                </button>
              </div>
            </div>
            
            {/* Sales Trend Chart */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  {chartView === 'bar' ? (
                    <BarChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `Rp ${formatCurrency(value)}`} />
                      <Legend />
                      <Bar dataKey="total" fill="#0088FE" name="Total Penjualan" />
                    </BarChart>
                  ) : (
                    <LineChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => `Rp ${formatCurrency(value)}`} />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#0088FE" name="Total Penjualan" />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Analytics Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Top Products Section */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Produk Terlaris</h3>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Rp {formatCurrency(product.revenue)}</p>
                        <p className="text-sm text-gray-500">{product.quantity} unit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment Method Pie Chart */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <RechartsPieChart>
                      <Pie
                        data={paymentMethodData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `Rp ${formatCurrency(value)}`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Category Distribution */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Distribusi Kategori</h3>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `Rp ${formatCurrency(value)}`} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Sales By Cashier */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Penjualan per Kasir</h3>
                <div style={{ width: '100%', height: 250 }}>
                  {(() => {
                    // Process cashier data
                    const cashierData = {};
                    filteredTransactions.forEach(transaction => {
                      if (!cashierData[transaction.cashier]) {
                        cashierData[transaction.cashier] = 0;
                      }
                      cashierData[transaction.cashier] += transaction.total;
                    });
                    
                    const cashierList = Object.entries(cashierData)
                      .map(([name, value]) => ({ name, value }));
                    
                    return (
                      <ResponsiveContainer>
                        <BarChart data={cashierList}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => `Rp ${formatCurrency(value)}`} />
                          <Legend />
                          <Bar dataKey="value" fill="#82ca9d" name="Total Penjualan" />
                        </BarChart>
                      </ResponsiveContainer>
                    );
                  })()}
                </div>
              </div>
            </div>
            
            {/* Transactions List */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Daftar Transaksi</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Transaksi
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal & Waktu
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kasir
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metode Pembayaran
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {transaction.cashier}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          Rp {formatCurrency(transaction.total)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {transaction.paymentMethod}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => viewTransactionDetails(transaction)}
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Report Content */}
        {reportType === 'inventaris' && (
          <div className="p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-blue-800 font-medium mb-1">Total Pergerakan</h3>
                    <p className="text-2xl font-bold">{getInventorySummary().totalMovements}</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-full">
                    <RefreshCw size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-green-800 font-medium mb-1">Item Masuk</h3>
                    <p className="text-2xl font-bold">{getInventorySummary().inItems}</p>
                  </div>
                  <div className="bg-green-200 p-3 rounded-full">
                    <Package size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-red-800 font-medium mb-1">Item Keluar</h3>
                    <p className="text-2xl font-bold">{getInventorySummary().outItems}</p>
                  </div>
                  <div className="bg-red-200 p-3 rounded-full">
                    <Package size={24} className="text-red-600" />
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-purple-800 font-medium mb-1">Perubahan Bersih</h3>
                    <p className="text-2xl font-bold">{getInventorySummary().inItems - getInventorySummary().outItems}</p>
                  </div>
                  <div className="bg-purple-200 p-3 rounded-full">
                    <TrendingUp size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Movement Products */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
              <h3 className="text-lg font-bold mb-4">Produk dengan Pergerakan Terbanyak</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Produk
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Pergerakan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getInventorySummary().topMovement.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.product}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.movement} unit
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inventory Movement List */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Riwayat Pergerakan Inventaris</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jenis
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produk
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kuantitas
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Petugas
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.date}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.type === 'Masuk' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.product}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity} unit
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.by}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {item.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Detail Transaksi {reportDetail.id}</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowDetailModal(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                  <p className="font-medium">{reportDetail.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kasir</p>
                  <p className="font-medium">{reportDetail.cashier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Metode Pembayaran</p>
                  <p className="font-medium">{reportDetail.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-medium">Rp {formatCurrency(reportDetail.total)}</p>
                </div>
              </div>
              
              <h4 className="font-bold mb-3">Item</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportDetail.items.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        Rp {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        Rp {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Subtotal
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Rp {formatCurrency(reportDetail.subtotal)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="4" className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                      Total
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                      Rp {formatCurrency(reportDetail.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  onClick={() => setShowDetailModal(false)}
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

export default ReportsSection;