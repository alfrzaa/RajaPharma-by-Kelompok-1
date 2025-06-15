import React from "react";
import {
    Menu,
    Home,
    Package,
    FileText,
    Users,
    LogOut,
    User,
} from "lucide-react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const handleLogout = () => {
    Inertia.post(
        route("logout"),
        {},
        {
            onSuccess: () => {
                // Update status to "Offline" on the frontend
                setFilteredUsers(
                    filteredUsers.map((user) => {
                        return {
                            ...user,
                            status: "Offline", // Explicitly setting status to "Offline"
                        };
                    })
                );

                // Optionally redirect to login or reset state
                toast.success("Logout berhasil!");
                Inertia.visit(route("login")); // Redirect to login page after logout
            },
            onError: (errors) => {
                console.error("Logout failed", errors);
                toast.error("Terjadi kesalahan saat logout.");
            },
        }
    );
};

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    activeMenu,
    setActiveMenu,
    role = "admin", // default role
}) => {
    return (
        <div
            className={`bg-[#1A6291] text-white ${
                sidebarOpen ? "w-64" : "w-20"
            } transition-all duration-300 ease-in-out flex flex-col`}
        >
            {/* Sidebar Header */}
            <div className="p-5 flex justify-between items-center">
                {sidebarOpen && (
                    <span className="font-bold text-xl">RajaPharma</span>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 rounded-md hover:bg-[#134b73]"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Menu Items */}
            <div className="mt-8 flex-1">
                {/* Dashboard Link */}
                <InertiaLink
                    href={
                        role === "kasir"
                            ? "/dashboard/kasir"
                            : "/dashboard/admin"
                    }
                    className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${
                        activeMenu === "dashboard"
                            ? "bg-[#134b73] border-r-4 border-white"
                            : ""
                    }`}
                    onClick={() => setActiveMenu("dashboard")}
                >
                    <div className="w-8 flex justify-center">
                        <Home size={20} />
                    </div>
                    {sidebarOpen && <span className="ml-3">Dashboard</span>}
                </InertiaLink>

                {/* === KASIR MENU === */}
                {role === "kasir" && (
                    <InertiaLink
                        href="/dashboard/kasir/sales"
                        className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${
                            activeMenu === "sales"
                                ? "bg-[#134b73] border-r-4 border-white"
                                : ""
                        }`}
                        onClick={() => setActiveMenu("sales")}
                    >
                        <div className="w-8 flex justify-center">
                            <User size={20} />
                        </div>
                        {sidebarOpen && <span className="ml-3">Penjualan</span>}
                    </InertiaLink>
                )}

                {/* === ADMIN MENU === */}
                {role === "admin" && (
                    <>
                        <InertiaLink
                            href="/dashboard/admin/stock-management"
                            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${
                                activeMenu === "stock"
                                    ? "bg-[#134b73] border-r-4 border-white"
                                    : ""
                            }`}
                            onClick={() => setActiveMenu("stock")}
                        >
                            <div className="w-8 flex justify-center">
                                <Package size={20} />
                            </div>
                            {sidebarOpen && (
                                <span className="ml-3">Stok Obat</span>
                            )}
                        </InertiaLink>

                        <InertiaLink
                            href="/dashboard/admin/report"
                            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${
                                activeMenu === "reports"
                                    ? "bg-[#134b73] border-r-4 border-white"
                                    : ""
                            }`}
                            onClick={() => setActiveMenu("reports")}
                        >
                            <div className="w-8 flex justify-center">
                                <FileText size={20} />
                            </div>
                            {sidebarOpen && (
                                <span className="ml-3">Laporan</span>
                            )}
                        </InertiaLink>

                        <InertiaLink
                            href="/dashboard/admin/user-management"
                            className={`px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer ${
                                activeMenu === "users"
                                    ? "bg-[#134b73] border-r-4 border-white"
                                    : ""
                            }`}
                            onClick={() => setActiveMenu("users")}
                        >
                            <div className="w-8 flex justify-center">
                                <Users size={20} />
                            </div>
                            {sidebarOpen && (
                                <span className="ml-3">Pengguna</span>
                            )}
                        </InertiaLink>
                    </>
                )}
            </div>

            {/* Footer - Logout */}
            <div className="mt-auto mb-4">
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer"
                >
                    <div className="w-8 flex justify-center">
                        <LogOut size={20} />
                    </div>
                    {sidebarOpen && <span className="ml-3">Keluar</span>}
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default Sidebar;
