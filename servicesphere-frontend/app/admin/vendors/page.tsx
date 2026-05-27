"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Search,
  Moon,
  Sun,
  X,
  Check,
  Ban,
  Briefcase,
  MapPin,
  CalendarDays,
} from "lucide-react";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminVendorsPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  // ✅ CHANGED: static removed → API data
  const [vendors, setVendors] = useState<any[]>([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/vendor/all")
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-[#0f172a] text-white" : "bg-[#f4f7fb] text-black"
      }`}
    >
      {/* TOPBAR */}
      <div
        className={`sticky top-0 z-40 border-b px-6 py-4 ${
          darkMode ? "bg-[#111827] border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-3xl font-bold">Vendor Management</h1>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Manage and monitor all vendors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center px-4 h-[48px] w-[320px] rounded-xl ${
                darkMode ? "bg-[#1e293b]" : "bg-gray-100"
              }`}
            >
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search vendor..."
                className="bg-transparent outline-none ml-3 w-full text-sm"
              />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="px-6 py-6 space-y-4">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() => setSelectedVendor(vendor)}
            className={`w-full rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 border ${
              darkMode
                ? "bg-[#111827] border-white/10 hover:bg-[#1e293b]"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <p className="text-sm mt-1 text-gray-400">
                  Vendor ID: #{vendor.id}
                </p>
              </div>

              {/* ✅ FIXED STATUS (from backend verified field) */}
              <div
                className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                  vendor.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {vendor.verified ? "Approved" : "Pending"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl rounded-3xl p-7 relative border ${
              darkMode
                ? "bg-[#111827] border-white/10"
                : "bg-white border-gray-200"
            }`}
          >
            <button
              onClick={() => setSelectedVendor(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200"
            >
              <X size={18} />
            </button>

            <h2 className="text-3xl font-bold mb-6">
              {selectedVendor.name}
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between p-4 rounded-xl bg-gray-100">
                <span>Service</span>
                <span>{selectedVendor.serviceName}</span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-gray-100">
                <span>Email</span>
                <span>{selectedVendor.email}</span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-gray-100">
                <span>Phone</span>
                <span>{selectedVendor.phone}</span>
              </div>
            </div>

            {/* ACTIONS (only UI - no backend hook yet) */}
            <div className="flex gap-3 mt-8">
              <button className="flex-1 h-[52px] bg-green-600 text-white rounded-xl">
                Approve
              </button>

              <button className="flex-1 h-[52px] bg-red-600 text-white rounded-xl">
                Reject
              </button>

              <button className="w-[70px] h-[52px] bg-yellow-500 text-white rounded-xl">
                <Ban size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}