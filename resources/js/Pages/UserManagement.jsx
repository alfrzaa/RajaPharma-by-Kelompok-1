import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Impor Sidebar
import {
    Menu,
    Search,
    Users,
    Plus,
    Edit,
    Trash,
    X,
    LogOut,
    Home,
    Package,
    FileText,
} from "lucide-react";

// Mock data for users
const allUsers = [
    {
        id: 1,
        name: "Admin Utama",
        username: "admin",
        role: "Admin",
        lastLogin: "28/04/2025, 09:45",
    },
    {
        id: 2,
        name: "Siti Rahma",
        username: "siti",
        role: "Kasir",
        lastLogin: "28/04/2025, 09:15",
    },
    {
        id: 3,
        name: "Joko Prabowo",
        username: "joko",
        role: "Kasir",
        lastLogin: "27/04/2025, 17:20",
    },
];

const UserManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("users");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(allUsers);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userForm, setUserForm] = useState({
        id: null,
        name: "",
        username: "",
        password: "",
        role: "Kasir",
    });

    // Filter users based on search term
    useEffect(() => {
        const filtered = allUsers.filter((user) => {
            return (
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    }, [searchTerm]);

    // Handle user form change
    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    // Save user
    const saveUser = () => {
        if (
            !userForm.name ||
            !userForm.username ||
            (!userForm.id && !userForm.password)
        ) {
            alert("Silakan lengkapi semua field yang diperlukan");
            return;
        }

        if (userForm.id) {
            // Update existing user
            console.log("Updating user:", userForm);
            alert("Pengguna berhasil diperbarui");
        } else {
            // Add new user
            const newUser = {
                id: allUsers.length + 1,
                name: userForm.name,
                username: userForm.username,
                role: userForm.role,
                lastLogin: "-",
            };
            console.log("Adding user:", newUser);
            alert("Pengguna baru berhasil ditambahkan");
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
            password: "",
            role: user.role,
        });
        setShowUserModal(true);
    };

    // Delete user
    const deleteUser = (userId) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
            console.log("Deleting user:", userId);
            alert("Pengguna berhasil dihapus");
        }
    };

    // Reset user form
    const resetUserForm = () => {
        setUserForm({
            id: null,
            name: "",
            username: "",
            password: "",
            role: "Kasir",
        });
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white shadow-sm border-b-2 border-[#1A6291]">
                    <div className="p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Manajemen Pengguna
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="font-semibold text-[#1A6291]">
                                    Admin RajaPharma
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-[#1A6291] rounded-lg">
                                        <Users
                                            size={24}
                                            className="text-white"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Daftar Pengguna
                                        </h2>
                                        <p className="text-gray-600">
                                            Total {filteredUsers.length}{" "}
                                            pengguna terdaftar
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                                    <div className="relative">
                                        <Search
                                            size={20}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Cari nama, username, atau role..."
                                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <button
                                        className="px-6 py-3 bg-[#1A6291] text-white rounded-lg hover:bg-[#134b73] flex items-center justify-center font-medium transition-colors shadow-md"
                                        onClick={() => {
                                            resetUserForm();
                                            setShowUserModal(true);
                                        }}
                                    >
                                        <Plus size={20} className="mr-2" />
                                        Tambah Pengguna
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Nama Lengkap
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Username
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Login Terakhir
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className={`hover:bg-gray-50 transition-colors ${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-gray-25"
                                            }`}
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-[#1A6291]">
                                                    #
                                                    {user.id
                                                        .toString()
                                                        .padStart(3, "0")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">
                                                    {user.name}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-700 font-medium">
                                                    @{user.username}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                        user.role === "Admin"
                                                            ? "bg-red-100 text-red-800 border border-red-200"
                                                            : "bg-green-100 text-green-800 border border-green-200"
                                                    }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-600">
                                                    {user.lastLogin}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                                        user.lastLogin !== "-"
                                                            ? "bg-green-100 text-green-800 border border-green-200"
                                                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                                    }`}
                                                >
                                                    {user.lastLogin !== "-"
                                                        ? "Aktif"
                                                        : "Belum Login"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        className="p-2 text-[#1A6291] hover:text-[#134b73] hover:bg-blue-50 rounded-lg transition-colors"
                                                        onClick={() =>
                                                            editUser(user)
                                                        }
                                                        title="Edit pengguna"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                                        onClick={() =>
                                                            deleteUser(user.id)
                                                        }
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
                            <div className="text-center py-12">
                                <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <Users
                                        size={32}
                                        className="text-gray-400"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Tidak ada pengguna ditemukan
                                </h3>
                                <p className="text-gray-500">
                                    Coba ubah kata kunci pencarian atau tambah
                                    pengguna baru
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Modal */}
                {showUserModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {userForm.id
                                                ? "Edit Pengguna"
                                                : "Tambah Pengguna Baru"}
                                        </h2>
                                        <p className="text-gray-600 mt-1">
                                            {userForm.id
                                                ? "Perbarui informasi pengguna"
                                                : "Masukkan data pengguna baru"}
                                        </p>
                                    </div>
                                    <button
                                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                        onClick={() => setShowUserModal(false)}
                                    >
                                        <X
                                            size={24}
                                            className="text-gray-500"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-semibold">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                            value={userForm.name}
                                            onChange={handleUserFormChange}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-semibold">
                                            Username *
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                            value={userForm.username}
                                            onChange={handleUserFormChange}
                                            placeholder="Masukkan username"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-semibold">
                                            {userForm.id
                                                ? "Password (kosongkan jika tidak diubah)"
                                                : "Password *"}
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                            value={userForm.password}
                                            onChange={handleUserFormChange}
                                            placeholder={
                                                userForm.id
                                                    ? "Kosongkan jika tidak diubah"
                                                    : "Masukkan password"
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-semibold">
                                            Role *
                                        </label>
                                        <select
                                            name="role"
                                            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                            value={userForm.role}
                                            onChange={handleUserFormChange}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Kasir">Kasir</option>
                                        </select>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Admin memiliki akses penuh, Kasir
                                            hanya untuk transaksi
                                        </p>
                                    </div>
                                </div>

                                <div className="flex space-x-4 mt-8">
                                    <button
                                        className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                        onClick={() => setShowUserModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="flex-1 py-3 bg-[#1A6291] text-white rounded-lg font-semibold hover:bg-[#134b73] transition-colors shadow-md"
                                        onClick={saveUser}
                                    >
                                        {userForm.id
                                            ? "Simpan Perubahan"
                                            : "Tambah Pengguna"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagement;
