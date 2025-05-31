import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Impor Sidebar

import {
    Menu,
    Package,
    ShoppingCart,
    FileText,
    Users,
    LogOut,
    ChevronDown,
    AlertTriangle,
    Bell,
    Home,
    Plus,
    User,
    Calendar,
    Sun,
    Moon,
    TrendingUp,
} from "lucide-react";

// Mock data - expanded
const lowStockItems = [
    { id: 1, name: "Amoxicillin 500mg", stock: 15, minStock: 20 },
    { id: 2, name: "Paracetamol 500mg", stock: 12, minStock: 25 },
    { id: 3, name: "Cetirizine 10mg", stock: 8, minStock: 15 },
    { id: 4, name: "Ibuprofen 400mg", stock: 18, minStock: 30 },
    { id: 5, name: "Omeprazole 20mg", stock: 5, minStock: 20 },
    { id: 6, name: "Metformin 500mg", stock: 22, minStock: 40 },
    { id: 7, name: "Amlodipine 5mg", stock: 14, minStock: 25 },
    { id: 8, name: "Simvastatin 20mg", stock: 9, minStock: 15 },
    { id: 9, name: "Losartan 50mg", stock: 11, minStock: 20 },
    { id: 10, name: "Captopril 25mg", stock: 7, minStock: 18 },
    { id: 11, name: "Aspirin 100mg", stock: 16, minStock: 35 },
    { id: 12, name: "Furosemide 40mg", stock: 6, minStock: 12 },
];

const expiringItems = [
    {
        id: 1,
        name: "Vitamin C 500mg",
        expiry: "15 Mei 2025",
        remainingDays: 16,
    },
    {
        id: 2,
        name: "Ibuprofen 400mg",
        expiry: "30 Mei 2025",
        remainingDays: 31,
    },
    {
        id: 3,
        name: "Ambroxol Sirup",
        expiry: "10 Juni 2025",
        remainingDays: 42,
    },
    {
        id: 4,
        name: "Parasetamol Sirup",
        expiry: "25 Mei 2025",
        remainingDays: 26,
    },
    {
        id: 5,
        name: "Cetirizine 10mg",
        expiry: "5 Juni 2025",
        remainingDays: 37,
    },
    {
        id: 6,
        name: "Omeprazole 20mg",
        expiry: "20 Juni 2025",
        remainingDays: 52,
    },
    {
        id: 7,
        name: "Antasida Tablet",
        expiry: "12 Mei 2025",
        remainingDays: 13,
    },
    { id: 8, name: "Betadine 15ml", expiry: "28 Mei 2025", remainingDays: 29 },
    {
        id: 9,
        name: "Salbutamol Inhaler",
        expiry: "8 Juni 2025",
        remainingDays: 40,
    },
    {
        id: 10,
        name: "Diclofenac Gel",
        expiry: "15 Juni 2025",
        remainingDays: 47,
    },
    {
        id: 11,
        name: "Loratadine 10mg",
        expiry: "3 Juni 2025",
        remainingDays: 35,
    },
    {
        id: 12,
        name: "Dextromethorphan Sirup",
        expiry: "22 Mei 2025",
        remainingDays: 23,
    },
    {
        id: 13,
        name: "Chlorpheniramine 4mg",
        expiry: "18 Juni 2025",
        remainingDays: 50,
    },
    {
        id: 14,
        name: "Ranitidine 150mg",
        expiry: "7 Mei 2025",
        remainingDays: 8,
    },
];

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [stockItems, setStockItems] = useState(lowStockItems);
    const [restockModal, setRestockModal] = useState({
        open: false,
        item: null,
    });
    const [restockAmount, setRestockAmount] = useState("");

    // Function to handle restock - this will be connected to stock management
    const handleRestock = (item) => {
        setRestockModal({ open: true, item });
        setRestockAmount("");
    };

    const confirmRestock = () => {
        if (restockModal.item && restockAmount) {
            const updatedItems = stockItems.map((item) => {
                if (item.id === restockModal.item.id) {
                    return {
                        ...item,
                        stock: item.stock + parseInt(restockAmount),
                    };
                }
                return item;
            });
            setStockItems(updatedItems);

            // Simulate sending data to stock management page
            console.log("Restock data to be sent to stock management:", {
                medicationId: restockModal.item.id,
                amount: parseInt(restockAmount),
                newStock: restockModal.item.stock + parseInt(restockAmount),
            });

            setRestockModal({ open: false, item: null });
            setRestockAmount("");
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    const getCurrentDate = () => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date().toLocaleDateString("id-ID", options);
    };

    const getGreetingIcon = () => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18 ? Sun : Moon;
    };

    const currentLowStockItems = stockItems.filter(
        (item) => item.stock < item.minStock
    );
    const currentExpiringItems = expiringItems.filter(
        (item) => item.remainingDays <= 60
    );

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
                <header className="bg-white shadow-sm border-b-2 border-[#1A6291]">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Dashboard
                            </h1>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-800">
                                        Administrator RajaPharma
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard content */}
                <main className="flex-1 overflow-y-auto p-4">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-br from-[#1A6291] via-[#2B7CB3] to-[#3A8CC7] rounded-2xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-20 -translate-y-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center mb-3">
                                        {React.createElement(
                                            getGreetingIcon(),
                                            {
                                                className:
                                                    "mr-3 text-blue-200 animate-pulse",
                                                size: 28,
                                            }
                                        )}
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                            {getGreeting()}, Administrator!
                                        </h2>
                                    </div>

                                    <p className="text-blue-100 text-lg mb-2 leading-relaxed">
                                        Selamat datang kembali di{" "}
                                        <span className="font-semibold text-white">
                                            RajaPharma
                                        </span>
                                    </p>

                                    <div className="flex items-center text-blue-200">
                                        <div className="flex items-center">
                                            <Calendar
                                                className="mr-2"
                                                size={18}
                                            />
                                            <span className="text-sm font-medium">
                                                {getCurrentDate()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Stok Menipis
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {currentLowStockItems.length}
                                    </h3>
                                </div>
                                <div className="bg-yellow-100 p-2 rounded-md">
                                    <AlertTriangle
                                        className="text-yellow-500"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Obat Kedaluwarsa
                                    </p>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {currentExpiringItems.length}
                                    </h3>
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
                                <h2 className="text-lg font-medium text-gray-800">
                                    Stok Menipis
                                </h2>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {currentLowStockItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-red-500 rounded"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Stok:{" "}
                                                <span className="font-medium text-red-600">
                                                    {item.stock}
                                                </span>{" "}
                                                / min {item.minStock}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRestock(item)}
                                            className="ml-3 group relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1A6291] to-[#2B7CB3] rounded-lg hover:from-[#134b73] hover:to-[#246ba5] transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <TrendingUp
                                                size={14}
                                                className="mr-2 group-hover:animate-pulse"
                                            />
                                            <span>Restok</span>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1A6291] to-[#2B7CB3] rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expiring Soon */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="mb-4">
                                <h2 className="text-lg font-medium text-gray-800">
                                    Obat Kedaluwarsa
                                </h2>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {currentExpiringItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded"
                                    >
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Kedaluwarsa:{" "}
                                                <span className="font-medium text-yellow-600">
                                                    {item.expiry}
                                                </span>{" "}
                                                ({item.remainingDays} hari)
                                            </div>
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

            {/* Enhanced Restock Modal */}
            {restockModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-[#1A6291] to-[#2B7CB3] p-6 rounded-t-2xl">
                            <div className="flex items-center">
                                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                                    <TrendingUp
                                        className="text-white"
                                        size={24}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                    Restok Obat
                                </h3>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                        Nama Obat:
                                    </p>
                                    <p className="font-semibold text-gray-800 text-lg">
                                        {restockModal.item?.name}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                        <p className="text-xs text-red-600 mb-1">
                                            Stok Saat Ini
                                        </p>
                                        <p className="font-bold text-red-700 text-xl">
                                            {restockModal.item?.stock}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <p className="text-xs text-blue-600 mb-1">
                                            Minimum Stok
                                        </p>
                                        <p className="font-bold text-blue-700 text-xl">
                                            {restockModal.item?.minStock}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jumlah Tambahan Stok:
                                </label>
                                <input
                                    type="number"
                                    value={restockAmount}
                                    onChange={(e) =>
                                        setRestockAmount(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent transition-colors text-lg"
                                    placeholder="Masukkan jumlah..."
                                    min="1"
                                />
                                {restockAmount && (
                                    <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-sm text-green-700">
                                            Stok setelah restok:{" "}
                                            <span className="font-bold">
                                                {restockModal.item?.stock +
                                                    parseInt(
                                                        restockAmount || 0
                                                    )}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() =>
                                        setRestockModal({
                                            open: false,
                                            item: null,
                                        })
                                    }
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmRestock}
                                    disabled={
                                        !restockAmount ||
                                        parseInt(restockAmount) <= 0
                                    }
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1A6291] to-[#2B7CB3] text-white rounded-lg hover:from-[#134b73] hover:to-[#246ba5] transition-all font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 duration-200 shadow-lg"
                                >
                                    Konfirmasi Restok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
