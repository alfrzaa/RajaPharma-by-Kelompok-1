import React, { useState } from 'react';
import { Menu, Search, Package, ShoppingCart, FileText, Users, LogOut, ChevronDown, Plus, Filter, Edit, Trash2, Calendar, AlertTriangle, Home } from 'lucide-react';
import Sidebar from "../components/Sidebar"; // Impor Sidebar
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
  const [activeMenu, setActiveMenu] = useState('stock');
  const [medications, setMedications] = useState(initialMedications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    minStock: '',
    price: '',
    expiryDate: '',
    supplier: ''
  });
  
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
    setFormData({
      name: '',
      category: '',
      stock: '',
      minStock: '',
      price: '',
      expiryDate: '',
      supplier: ''
    });
    setShowAddModal(true);
  };
  
  const handleEditMedication = (medication) => {
    setCurrentMedication(medication);
    setFormData({
      name: medication.name,
      category: medication.category,
      stock: medication.stock.toString(),
      minStock: medication.minStock.toString(),
      price: medication.price.toString(),
      expiryDate: medication.expiryDate,
      supplier: medication.supplier
    });
    setShowAddModal(true);
  };
  
  const handleDeleteMedication = (medication) => {
    setCurrentMedication(medication);
    setShowConfirmDelete(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.stock || !formData.minStock || !formData.price || !formData.expiryDate || !formData.supplier) {
      alert('Semua field harus diisi!');
      return;
    }
    
    const medicationData = {
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      price: parseInt(formData.price),
      expiryDate: formData.expiryDate,
      supplier: formData.supplier
    };
    
    if (currentMedication) {
      // Edit existing medication
      setMedications(medications.map(med => 
        med.id === currentMedication.id 
          ? { ...medicationData, id: currentMedication.id }
          : med
      ));
    } else {
      // Add new medication
      const newId = Math.max(...medications.map(m => m.id)) + 1;
      setMedications([...medications, { ...medicationData, id: newId }]);
    }
    
    setShowAddModal(false);
  };
  
  const confirmDelete = () => {
    if (currentMedication) {
      setMedications(medications.filter(med => med.id !== currentMedication.id));
      setShowConfirmDelete(false);
    }
  };

  // Function to handle restock from dashboard
  const handleRestock = (medicationId, amount) => {
    setMedications(medications.map(med => 
      med.id === medicationId 
        ? { ...med, stock: med.stock + amount }
        : med
    ));
  };
  
  return (
      <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
              {/* Top navigation */}
              <header className="bg-white shadow-sm">
                  <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                          <h1 className="text-2xl font-semibold text-gray-800">
                              Manajemen Stok Obat
                          </h1>
                      </div>

                      <div className="flex items-center">
                          <div className="flex items-center">
                              <div className="text-right">
                                  <div className="text-sm font-semibold text-gray-800">
                                      Administrator
                                  </div>
                                  <div className="text-xs text-gray-500">
                                      admin@apotekraja.com
                                  </div>
                              </div>
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
                              className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <Search
                              className="absolute left-3 top-2.5 text-gray-400"
                              size={18}
                          />
                      </div>

                      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                          <div className="relative">
                              <select
                                  className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#1A6291] w-full"
                                  value={filterCategory}
                                  onChange={(e) =>
                                      setFilterCategory(e.target.value)
                                  }
                              >
                                  <option value="">Semua Kategori</option>
                                  {categories.map((category) => (
                                      <option key={category} value={category}>
                                          {category}
                                      </option>
                                  ))}
                              </select>
                              <Filter
                                  className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
                                  size={18}
                              />
                          </div>

                          <button
                              className="flex items-center justify-center bg-[#1A6291] text-white px-4 py-2 rounded-lg hover:bg-[#134b73] w-full md:w-auto"
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
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Nama Obat
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Kategori
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Stok
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Harga
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Kedaluwarsa
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Supplier
                                      </th>
                                      <th
                                          scope="col"
                                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      >
                                          Aksi
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                  {filteredMedications.map((medication) => (
                                      <tr
                                          key={medication.id}
                                          className="hover:bg-gray-50"
                                      >
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm font-medium text-gray-900">
                                                  {medication.name}
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm text-gray-500">
                                                  {medication.category}
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              {medication.stock <=
                                              medication.minStock ? (
                                                  <div className="flex items-center">
                                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                          {medication.stock}
                                                      </span>
                                                      <AlertTriangle
                                                          className="ml-1 text-red-500"
                                                          size={14}
                                                      />
                                                  </div>
                                              ) : (
                                                  <div className="text-sm text-gray-500">
                                                      {medication.stock}
                                                  </div>
                                              )}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm text-gray-500">
                                                  Rp{" "}
                                                  {medication.price.toLocaleString()}
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              {new Date(
                                                  medication.expiryDate
                                              ) <=
                                              new Date(
                                                  new Date().setMonth(
                                                      new Date().getMonth() + 3
                                                  )
                                              ) ? (
                                                  <div className="flex items-center">
                                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                          {new Date(
                                                              medication.expiryDate
                                                          ).toLocaleDateString(
                                                              "id-ID",
                                                              {
                                                                  day: "numeric",
                                                                  month: "short",
                                                                  year: "numeric",
                                                              }
                                                          )}
                                                      </span>
                                                      <Calendar
                                                          className="ml-1 text-yellow-500"
                                                          size={14}
                                                      />
                                                  </div>
                                              ) : (
                                                  <div className="text-sm text-gray-500">
                                                      {new Date(
                                                          medication.expiryDate
                                                      ).toLocaleDateString(
                                                          "id-ID",
                                                          {
                                                              day: "numeric",
                                                              month: "short",
                                                              year: "numeric",
                                                          }
                                                      )}
                                                  </div>
                                              )}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="text-sm text-gray-500">
                                                  {medication.supplier}
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="flex items-center justify-center gap-2">
                                                  <button
                                                      className="inline-flex items-center justify-center w-8 h-8 text-[#1A6291] hover:text-white hover:bg-[#1A6291] rounded-full transition-all duration-200 group"
                                                      onClick={() =>
                                                          handleEditMedication(
                                                              medication
                                                          )
                                                      }
                                                      title="Edit obat"
                                                  >
                                                      <Edit size={16} />
                                                  </button>
                                                  <button
                                                      className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition-all duration-200 group"
                                                      onClick={() =>
                                                          handleDeleteMedication(
                                                              medication
                                                          )
                                                      }
                                                      title="Hapus obat"
                                                  >
                                                      <Trash2 size={16} />
                                                  </button>
                                              </div>
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
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                      <h2 className="text-xl font-semibold mb-4">
                          {currentMedication ? "Edit Obat" : "Tambah Obat Baru"}
                      </h2>

                      <div className="space-y-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Nama Obat
                              </label>
                              <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleFormChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Kategori
                              </label>
                              <select
                                  name="category"
                                  value={formData.category}
                                  onChange={handleFormChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                              >
                                  <option value="">Pilih Kategori</option>
                                  {categories.map((category) => (
                                      <option key={category} value={category}>
                                          {category}
                                      </option>
                                  ))}
                              </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Stok
                                  </label>
                                  <input
                                      type="number"
                                      name="stock"
                                      value={formData.stock}
                                      onChange={handleFormChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                                      min="0"
                                  />
                              </div>

                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Stok Minimum
                                  </label>
                                  <input
                                      type="number"
                                      name="minStock"
                                      value={formData.minStock}
                                      onChange={handleFormChange}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                                      min="0"
                                  />
                              </div>
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Harga (Rp)
                              </label>
                              <input
                                  type="number"
                                  name="price"
                                  value={formData.price}
                                  onChange={handleFormChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                                  min="0"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Tanggal Kedaluwarsa
                              </label>
                              <input
                                  type="date"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={handleFormChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Supplier
                              </label>
                              <input
                                  type="text"
                                  name="supplier"
                                  value={formData.supplier}
                                  onChange={handleFormChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291]"
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
                              className="px-4 py-2 bg-[#1A6291] text-white rounded-md hover:bg-[#134b73]"
                              onClick={handleSubmit}
                          >
                              {currentMedication
                                  ? "Simpan Perubahan"
                                  : "Tambah Obat"}
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {/* Delete Confirmation Modal */}
          {showConfirmDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                      <h2 className="text-xl font-semibold mb-4">
                          Konfirmasi Penghapusan
                      </h2>
                      <p className="text-gray-600 mb-6">
                          Apakah Anda yakin ingin menghapus obat{" "}
                          <span className="font-medium">
                              {currentMedication?.name}
                          </span>
                          ? Tindakan ini tidak dapat dibatalkan.
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