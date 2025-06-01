import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { AlertTriangle, Bell, Home, User, Clock } from "lucide-react";
import { LogOut } from "lucide-react";
import Sidebar from "../components/Sidebar"; // Impor Sidebar

const DashboardKasir = ({ lowStockItems, expiringItems }) => {
    console.log("Low Stock Items:", lowStockItems); // Tambahkan ini untuk debugging
    console.log("Expiring Items:", expiringItems); // Tambahkan ini untuk debugging

    const currentLowStockItems = (lowStockItems || []).filter(
        (item) => item.stock < item.minStock
    );
    const currentExpiringItems = (expiringItems || []).filter(
        (item) => item.remainingDays <= 60
    );

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    // Get current time for greeting
    const currentHour = new Date().getHours();
    const getGreeting = () => {
        if (currentHour < 12) return "Selamat Pagi";
        if (currentHour < 17) return "Selamat Siang";
        if (currentHour < 19) return "Selamat Sore";
        return "Selamat Malam";
    };

    const getCurrentDate = () => {
        const today = new Date();
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return today.toLocaleDateString("id-ID", options);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                role="kasir" // Ini penting!
            />
            ;{/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-white shadow-sm z-10 border-b border-gray-200">
                    <div className="p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Dashboard Kasir
                        </h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                                Kasir RajaPharma
                            </span>
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
                                    <User
                                        className="mr-3 text-blue-200"
                                        size={24}
                                    />
                                    <h2 className="text-2xl font-bold">
                                        Hai, {getGreeting()}!
                                    </h2>
                                </div>
                                <p className="text-blue-100 text-lg mb-1">
                                    Selamat datang di RajaPharma, Anda masuk
                                    sebagai Kasir
                                </p>
                                <div className="flex items-center mt-4 text-blue-200">
                                    <Clock className="mr-2" size={16} />
                                    <span className="text-sm">
                                        {getCurrentDate()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Status Sistem
                                    </p>
                                    <h3 className="text-xl font-bold text-green-600">
                                        Online
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Semua sistem berjalan normal
                                    </p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Stok Menipis
                                    </p>
                                    <h3 className="text-2xl font-bold text-yellow-600">
                                        {currentLowStockItems.length}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Item perlu restok
                                    </p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <AlertTriangle
                                        className="text-yellow-500"
                                        size={24}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Mendekati Kedaluwarsa
                                    </p>
                                    <h3 className="text-2xl font-bold text-red-600">
                                        {currentExpiringItems.length}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Dalam 60 hari ke depan
                                    </p>
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
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Stok Menipis
                                    </h2>
                                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                        {currentLowStockItems.length} item
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Item yang memerlukan restok segera
                                </p>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {currentLowStockItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-lg hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                Stok:{" "}
                                                <span className="font-semibold text-red-600">
                                                    {item.stock}
                                                </span>{" "}
                                                /
                                                <span className="text-gray-500">
                                                    {" "}
                                                    minimum {item.minStock}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expiring Soon */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Mendekati Kedaluwarsa
                                    </h2>
                                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                        {currentExpiringItems.length} item
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Obat yang akan kedaluwarsa dalam 60 hari
                                </p>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {currentExpiringItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 rounded-lg hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                Kedaluwarsa:{" "}
                                                <span className="font-semibold text-amber-600">
                                                    {item.expiry}
                                                </span>
                                                <span className="text-gray-500">
                                                    {" "}
                                                    ({item.remainingDays} hari
                                                    lagi)
                                                </span>
                                            </div>
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
