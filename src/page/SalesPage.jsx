import React, { useState, useEffect } from 'react';
import { Menu, Search, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, Plus, Minus, X, Printer, CreditCard } from 'lucide-react';

// Mock data for medications
const allProducts = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Analgesik', price: 15000, stock: 120 },
  { id: 2, name: 'Amoxicillin 500mg', category: 'Antibiotik', price: 20000, stock: 15 },
  { id: 3, name: 'Cetirizine 10mg', category: 'Antihistamin', price: 15000, stock: 8 },
  { id: 4, name: 'Vitamin C 500mg', category: 'Vitamin', price: 20000, stock: 200 },
  { id: 5, name: 'Ibuprofen 400mg', category: 'Analgesik', price: 12000, stock: 85 },
  { id: 6, name: 'Ambroxol Sirup', category: 'Batuk & Flu', price: 25000, stock: 45 },
  { id: 7, name: 'Metformin 500mg', category: 'Antidiabetes', price: 18000, stock: 60 },
  { id: 8, name: 'Amlodipine 10mg', category: 'Antihipertensi', price: 22000, stock: 75 },
  { id: 9, name: 'Promag Tablet', category: 'Saluran Cerna', price: 8000, stock: 110 },
  { id: 10, name: 'Antasida Sirup', category: 'Saluran Cerna', price: 18000, stock: 40 },
  { id: 11, name: 'Salbutamol Inhaler', category: 'Pernapasan', price: 65000, stock: 25 },
  { id: 12, name: 'Betadine Solution', category: 'Antiseptik', price: 28000, stock: 30 }
];

const categories = [...new Set(allProducts.map(product => product.category))];

const SalesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cashAmount, setCashAmount] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [showSummary, setShowSummary] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [receipt, setReceipt] = useState({
    id: '',
    date: '',
    items: [],
    subtotal: 0,
    total: 0,
    cash: 0,
    change: 0
  });
  
  // Filter products based on search term and category
  useEffect(() => {
    const filtered = allProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (filterCategory === '' || product.category === filterCategory)
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, filterCategory]);
  
  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = 0; // Tax can be added if needed
  const total = subtotal + tax;
  
  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  // Update product quantity in cart
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const product = allProducts.find(p => p.id === productId);
    if (newQuantity > product.stock) return;
    
    const updatedCart = cart.map(item => 
      item.id === productId 
      ? { ...item, quantity: newQuantity } 
      : item
    );
    setCart(updatedCart);
  };
  
  // Process payment
  const processPayment = () => {
    const cashValue = parseFloat(cashAmount || '0');
    
    if (isNaN(cashValue) || cashValue < total) {
      alert('Jumlah pembayaran tidak mencukupi');
      return;
    }
    
    // Create receipt
    const newReceipt = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString('id-ID'),
      items: [...cart],
      subtotal,
      tax,
      total,
      cash: cashValue,
      change: cashValue - total
    };
    
    setReceipt(newReceipt);
    setShowPaymentModal(false);
    setShowSummary(true);
    setTransactionComplete(true);
  };
  
  // Start new transaction
  const startNewTransaction = () => {
    setCart([]);
    setCashAmount('');
    setShowSummary(false);
    setTransactionComplete(false);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
  };
  
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
          <div className="px-4 py-3 flex items-center text-white font-medium bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <ShoppingCart size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Penjualan</span>}
          </div>
          
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <Package size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Stok Obat</span>}
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
        
        <div className="absolute bottom-0 left-0 p-4">
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
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
            <h1 className="text-2xl font-bold text-gray-800">Penjualan Obat</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin RajaPharma</span>
            </div>
          </div>
        </div>
        
        {/* Sales Content */}
        {showSummary ? (
          <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transaksi Berhasil</h2>
                <p className="text-green-600 font-semibold">Nomor Transaksi: {receipt.id}</p>
                <p className="text-gray-600">{receipt.date}</p>
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="pb-2">Item</th>
                      <th className="pb-2 text-right">Jumlah</th>
                      <th className="pb-2 text-right">Harga</th>
                      <th className="pb-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map(item => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2 text-right">{item.quantity}</td>
                        <td className="py-2 text-right">Rp {formatCurrency(item.price)}</td>
                        <td className="py-2 text-right">Rp {formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">Rp {formatCurrency(receipt.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tunai:</span>
                  <span>Rp {formatCurrency(receipt.cash)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="font-medium">Kembalian:</span>
                  <span className="font-bold">Rp {formatCurrency(receipt.change)}</span>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                  <Printer size={18} className="mr-2" />
                  Cetak Struk
                </button>
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={startNewTransaction}
                >
                  Transaksi Baru
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Main POS Interface
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Product List */}
            <div className="w-full md:w-3/5 p-4 md:p-6 overflow-auto">
              <div className="mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari obat..."
                    className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative w-full md:w-auto">
                  <select
                    className="pl-4 pr-10 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                    onClick={() => product.stock > 0 && addToCart(product)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        product.stock > 20 ? 'bg-green-100 text-green-800' : 
                        product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        Stok: {product.stock}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold text-blue-600">Rp {formatCurrency(product.price)}</span>
                      <button 
                        className={`px-3 py-1 rounded text-white ${
                          product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
                        }`}
                        disabled={product.stock === 0}
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart */}
            <div className="w-full md:w-2/5 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Keranjang Belanja</h2>
                <p className="text-gray-600">{cart.length} item</p>
              </div>
              
              <div className="flex-1 overflow-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart size={48} strokeWidth={1} />
                    <p className="mt-2">Keranjang kosong</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">Rp {formatCurrency(item.price)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button 
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                          >
                            <Minus size={16} />
                          </button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <button 
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                          >
                            <Plus size={16} />
                          </button>
                          
                          <button 
                            className="p-1 ml-2 rounded-full text-red-500 hover:bg-red-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCart(item.id);
                            }}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp {formatCurrency(subtotal)}</span>
                  </div>
                  {tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pajak</span>
                      <span>Rp {formatCurrency(tax)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rp {formatCurrency(total)}</span>
                  </div>
                </div>
                
                <button 
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                  disabled={cart.length === 0}
                  onClick={() => setShowPaymentModal(true)}
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Pembayaran</h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={() => setShowPaymentModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total Pembayaran</span>
                  <span className="font-bold text-lg">Rp {formatCurrency(total)}</span>
                </div>
                
                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">Jumlah Tunai</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
                    <input 
                      type="text" 
                      className="pl-10 pr-4 py-3 border rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={cashAmount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setCashAmount(value);
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[10000, 20000, 50000, 100000, 200000, 500000].map(amount => (
                    <button 
                      key={amount}
                      className="py-2 border rounded-lg hover:bg-gray-50"
                      onClick={() => setCashAmount(amount.toString())}
                    >
                      Rp {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className="flex-1 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Batal
                </button>
                <button 
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center"
                  onClick={processPayment}
                >
                  <CreditCard size={20} className="mr-2" />
                  Proses Pembayaran
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;