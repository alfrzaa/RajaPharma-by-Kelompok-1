import React, { useState } from "react";
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
} from "lucide-react";
import DaftarMenu from "./menu";
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
            setRestockModal({ open: false, item: null });
            setRestockAmount("");
        }
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
            <DaftarMenu />
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-white shadow-sm">
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

                {/* Dashboard content */}
                <main className="flex-1 overflow-y-auto p-4">
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
                                            className="ml-3 px-3 py-1 bg-[#1A6291] text-white text-sm rounded hover:bg-[#134b73] transition-colors flex items-center"
                                        >
                                            <Plus size={14} className="mr-1" />
                                            Restok
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

            {/* Restock Modal */}
            {restockModal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Restok Obat
                        </h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Nama Obat:
                            </p>
                            <p className="font-medium text-gray-800">
                                {restockModal.item?.name}
                            </p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Stok Saat Ini:{" "}
                                <span className="font-medium text-red-600">
                                    {restockModal.item?.stock}
                                </span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Minimum Stok:{" "}
                                <span className="font-medium">
                                    {restockModal.item?.minStock}
                                </span>
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm text-gray-600 mb-2">
                                Jumlah Tambahan Stok:
                            </label>
                            <input
                                type="number"
                                value={restockAmount}
                                onChange={(e) =>
                                    setRestockAmount(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A6291] focus:border-transparent"
                                placeholder="Masukkan jumlah..."
                                min="1"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() =>
                                    setRestockModal({ open: false, item: null })
                                }
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmRestock}
                                disabled={
                                    !restockAmount ||
                                    parseInt(restockAmount) <= 0
                                }
                                className="flex-1 px-4 py-2 bg-[#1A6291] text-white rounded-md hover:bg-[#134b73] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Restok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
