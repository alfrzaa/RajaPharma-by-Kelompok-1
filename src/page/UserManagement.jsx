import React, { useState, useEffect } from 'react';
import { Menu, Search, Users, Plus, Edit, Trash, X, LogOut, Home, FileText } from 'lucide-react';

// Mock data for users
const allUsers = [
  { id: 1, name: 'Admin Utama', username: 'admin', role: 'Admin', lastLogin: '28/04/2025, 09:45' },
  { id: 2, name: 'Siti Rahma', username: 'siti', role: 'Kasir', lastLogin: '28/04/2025, 09:15' },
  { id: 3, name: 'Joko Prabowo', username: 'joko', role: 'Kasir', lastLogin: '27/04/2025, 17:20' },
];

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    id: null,
    name: '',
    username: '',
    password: '',
    role: 'Kasir'
  });

  // Filter users based on search term
  useEffect(() => {
    const filtered = allUsers.filter(user => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
  }, [searchTerm]);

  // Handle user form change
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  // Save user
  const saveUser = () => {
    if (!userForm.name || !userForm.username || (!userForm.id && !userForm.password)) {
      alert('Silakan lengkapi semua field yang diperlukan');
      return;
    }

    if (userForm.id) {
      // Update existing user
      console.log('Updating user:', userForm);
      alert('Pengguna berhasil diperbarui');
    } else {
      // Add new user
      const newUser = {
        id: allUsers.length + 1,
        name: userForm.name,
        username: userForm.username,
        role: userForm.role,
        lastLogin: '-'
      };
      console.log('Adding user:', newUser);
      alert('Pengguna baru berhasil ditambahkan');
    }

    resetUserForm();
    setShowUserModal(false);
  };

  // Edit user
  const editUser = (user) => {
    setUserForm({
      id: user.id,
      name: user.name,
      username: user.username,
      password: '',
      role: user.role
    });
    setShowUserModal(true);
  };

  // Delete user
  const deleteUser = (userId) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      console.log('Deleting user:', userId);
      alert('Pengguna berhasil dihapus');
    }
  };

  // Reset user form
  const resetUserForm = () => {
    setUserForm({
      id: null,
      name: '',
      username: '',
      password: '',
      role: 'Kasir'
    });
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
          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <Home size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </div>

          <div className="px-4 py-3 flex items-center text-white font-medium bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <Users size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Manajemen Pengguna</span>}
          </div>

          <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-blue-700 cursor-pointer">
            <div className="w-8 flex justify-center">
              <FileText size={20} />
            </div>
            {sidebarOpen && <span className="ml-3">Laporan</span>}
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
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin RajaPharma</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
              <div className="relative w-full md:w-64">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                onClick={() => {
                  resetUserForm();
                  setShowUserModal(true);
                }}
              >
                <Plus size={18} className="mr-2" />
                Tambah Pengguna Baru
              </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Nama</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Username</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Role</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Login Terakhir</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-gray-600 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">#{user.id}</td>
                      <td className="px-4 py-3">
                        <td className="px-4 py-3">{user.name}</td>
                      </td>
                      <td className="px-4 py-3">{user.username}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                          user.role === 'Apoteker' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.lastLogin !== '-' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.lastLogin !== '-' ? 'Aktif' : 'Belum Login'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => editUser(user)}
                            title="Edit pengguna"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => deleteUser(user.id)}
                            title="Hapus pengguna"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Tidak ada pengguna yang ditemukan</p>
              </div>
            )}
          </div>
        </div>

        {/* User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {userForm.id ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
                </h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={() => setShowUserModal(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    name="name"
                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userForm.name}
                    onChange={handleUserFormChange}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Username *</label>
                  <input 
                    type="text" 
                    name="username"
                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userForm.username}
                    onChange={handleUserFormChange}
                    placeholder="Masukkan username"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    {userForm.id ? 'Password (kosongkan jika tidak diubah)' : 'Password *'}
                  </label>
                  <input 
                    type="password" 
                    name="password"
                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userForm.password}
                    onChange={handleUserFormChange}
                    placeholder={userForm.id ? "Kosongkan jika tidak diubah" : "Masukkan password"}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Role *</label>
                  <select
                    name="role"
                    className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userForm.role}
                    onChange={handleUserFormChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Kasir">Kasir</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  onClick={() => setShowUserModal(false)}
                >
                  Batal
                </button>
                <button 
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={saveUser}
                >
                  {userForm.id ? 'Simpan Perubahan' : 'Tambah Pengguna'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;