import { useState } from "react";
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
function DaftarMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [stockItems, setStockItems] = useState(lowStockItems);
    const [restockModal, setRestockModal] = useState({
        open: false,
        item: null,
    });
    const [restockAmount, setRestockAmount] = useState("");

    return (
        <div
            className={`bg-[#1A6291] text-white ${
                sidebarOpen ? "w-64" : "w-20"
            } transition-all duration-300 ease-in-out flex flex-col`}
        >
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

            <div className="mt-8 flex-1">
                <div
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
                </div>

                <div
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
                </div>

                <div
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
                </div>

                <div
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
                </div>
            </div>

            <div className="mt-auto mb-4">
                <div className="px-4 py-3 flex items-center text-white font-medium hover:bg-[#134b73] cursor-pointer">
                    <div className="w-8 flex justify-center">
                        <LogOut size={20} />
                    </div>
                    {sidebarOpen && <span className="ml-3">Keluar</span>}
                </div>
            </div>
        </div>
    );
}

export default DaftarMenu;
