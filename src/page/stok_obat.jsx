import React, { useState } from 'react';
import { Menu, Search, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, Plus, Filter, Edit, Trash2, Calendar, AlertTriangle } from 'lucide-react';

// Mock data for medications
const initialMedications = [
  { 
    id: 1, 
    name: 'Paracetamol 500mg', 
    category: 'Analgesik', 
    stock: 120, 
    minStock: 30, 
    price: 15000, 
    expiryDate: '2025-12-15',
    supplier: 'PT Kimia Farma'
  },
  { 
    id: 2, 
    name: 'Amoxicillin 500mg', 
    category: 'Antibiotik', 
    stock: 15, 
    minStock: 20, 
    price: 20000, 
    expiryDate: '2025-08-10',
    supplier: 'PT Indofarma'
  },
  { 
    id: 3, 
    name: 'Cetirizine 10mg', 
    category: 'Antihistamin', 
    stock: 8, 
    minStock: 15, 
    price: 15000, 
    expiryDate: '2025-07-23',
    supplier: 'PT Dexa Medica'
  },
  { 
    id: 4, 
    name: 'Vitamin C 500mg', 
    category: 'Vitamin', 
    stock: 200, 
    minStock: 50, 
    price: 20000, 
    expiryDate: '2025-05-15',
    supplier: 'PT Kalbe Farma'
  },
  { 
    id: 5, 
    name: 'Ibuprofen 400mg', 
    category: 'Analgesik', 
    stock: 85, 
    minStock: 25, 
    price: 12000, 
    expiryDate: '2025-05-30',
    supplier: 'PT Kimia Farma'
  },
  { 
    id: 6, 
    name: 'Ambroxol Sirup', 
    category: 'Batuk & Flu', 
    stock: 45, 
    minStock: 10, 
    price: 25000, 
    expiryDate: '2025-06-10',
    supplier: 'PT Dexa Medica'
  },
  { 
    id: 7, 
    name: 'Metformin 500mg', 
    category: 'Antidiabetes', 
    stock: 60, 
    minStock: 20, 
    price: 18000, 
    expiryDate: '2026-01-25',
    supplier: 'PT Indofarma'
  },
  { 
    id: 8, 
    name: 'Amlodipine 10mg', 
    category: 'Antihipertensi', 
    stock: 75, 
    minStock: 25, 
    price: 22000, 
    expiryDate: '2026-02-10',
    supplier: 'PT Kalbe Farma'
  }
];

const StockManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [medications, setMedications] = useState(initialMedications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const categories = [...new Set(initialMedications.map(item => item.category))];
  
  // Filter medications based on search term and category
  const filteredMedications = medications.filter(medication => {
    return (
      medication.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (filterCategory === '' || medication.category === filterCategory)
    );
  });
  
  const handleAddMedication = () => {
    setCurrentMedication(null);
    setShowAddModal(true);
  };
  
  const handleEditMedication = (medication) => {
    setCurrentMedication(medication);
    setShowAddModal(true);
  };
  
  const handleDeleteMedication = (medication) => {
    setCurrentMedication(medication);
    setShowConfirmDelete(true);
  };
  
  const confirmDelete = () => {
    if (currentMedication) {
      setMedications(medications.filter(med => med.id !== currentMedication.id));
      setShowConfirmDelete(false);
    }
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
              <h1 className="text-2xl font-semibold text-gray-800">Manajemen Stok Obat</h1>
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
        
        {/* Stock Management content */}
        <main className="flex-1 overflow-y-auto p-4">
          {/* Action bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Cari obat..."
                className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <select 
                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">Semua Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
              </div>
              
              <button 
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
                onClick={handleAddMedication}
              >
                <Plus size={18} className="mr-2" />
                Tambah Obat
              </button>
            </div>
          </div>
          
          {/* Medication table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Obat
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stok
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kedaluwarsa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMedications.map((medication) => (
                    <tr key={medication.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{medication.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {medication.stock <= medication.minStock ? (
                          <div className="flex items-center">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {medication.stock}
                            </span>
                            <AlertTriangle className="ml-1 text-red-500" size={14} />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">{medication.stock}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Rp {medication.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(medication.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 3)) ? (
                          <div className="flex items-center">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {new Date(medication.expiryDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <Calendar className="ml-1 text-yellow-500" size={14} />
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">
                            {new Date(medication.expiryDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{medication.supplier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => handleEditMedication(medication)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteMedication(medication)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredMedications.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Tidak ada data obat yang sesuai dengan pencarian.
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Modal for Add/Edit Medication */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {currentMedication ? 'Edit Obat' : 'Tambah Obat Baru'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Obat</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={currentMedication?.name || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={currentMedication?.category || ''}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="new">+ Kategori Baru</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={currentMedication?.stock || ''}
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok Minimum</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={currentMedication?.minStock || ''}
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={currentMedication?.price || ''}
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Kedaluwarsa</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={currentMedication?.expiryDate || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={currentMedication?.supplier || ''}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAddModal(false)}
              >
                Batal
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setShowAddModal(false)}
              >
                {currentMedication ? 'Simpan Perubahan' : 'Tambah Obat'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Penghapusan</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus obat <span className="font-medium">{currentMedication?.name}</span>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowConfirmDelete(false)}
              >
                Batal
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagement;