import React from "react";
import { Menu, Home, Package, FileText, Users, LogOut } from "lucide-react";
import { InertiaLink } from "@inertiajs/inertia-react"; // Impor InertiaLink

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    activeMenu,
    setActiveMenu,
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
                    href="/dashboard/admin"
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

                {/* Stok Obat Link */}
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
                    {sidebarOpen && <span className="ml-3">Stok Obat</span>}
                </InertiaLink>

                {/* Laporan Link */}
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
                    {sidebarOpen && <span className="ml-3">Laporan</span>}
                </InertiaLink>

                {/* Pengguna Link */}
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
                    {sidebarOpen && <span className="ml-3">Pengguna</span>}
                </InertiaLink>
            </div>

            {/* Footer Menu (Logout) */}
            <div className="mt-auto mb-4">
                <InertiaLink
                    href="/logout" // Rute logout sesuai dengan Laravel
                    className="px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer"
                >
                    <div className="w-8 flex justify-center">
                        <LogOut size={20} />
                    </div>
                    {sidebarOpen && <span className="ml-3">Keluar</span>}
                </InertiaLink>
            </div>
        </div>
    );
};

export default Sidebar;
