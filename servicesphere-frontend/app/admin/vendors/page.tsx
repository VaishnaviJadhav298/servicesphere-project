"use client";

import { useState } from "react";

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

export default function AdminVendorsPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true);

  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const vendors = [
    {
      id: "V001",
      name: "Rahul Sharma",
      service: "Car Wash",
      experience: "3 Years",
      location: "Pune, Maharashtra",
      joined: "12 May 2024",
      status: "Pending",
    },

    {
      id: "V002",
      name: "Aman Verma",
      service: "Cleaning",
      experience: "5 Years",
      location: "Mumbai, Maharashtra",
      joined: "10 May 2024",
      status: "Approved",
    },

    {
      id: "V003",
      name: "Sneha Patil",
      service: "Electrician",
      experience: "2 Years",
      location: "Nagpur, Maharashtra",
      joined: "08 May 2024",
      status: "Blocked",
    },

    {
      id: "V004",
      name: "Deepak Kumar",
      service: "Plumbing",
      experience: "4 Years",
      location: "Delhi",
      joined: "06 May 2024",
      status: "Approved",
    },
  ];

  return (

    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-black"
      }`}
    >

      {/* TOPBAR */}
      <div
        className={`sticky top-0 z-40 border-b px-6 py-4 ${
          darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* BACK */}
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

            {/* TITLE */}
            <div>

              <h1 className="text-3xl font-bold">
                Vendor Management
              </h1>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Manage and monitor all vendors
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div
              className={`flex items-center px-4 h-[48px] w-[320px] rounded-xl ${
                darkMode
                  ? "bg-[#1e293b]"
                  : "bg-gray-100"
              }`}
            >

              <Search
                size={18}
                className={
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              />

              <input
                type="text"
                placeholder="Search vendor..."
                className={`bg-transparent outline-none ml-3 w-full text-sm ${
                  darkMode
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
              />

            </div>

            {/* THEME */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >

              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}

            </button>

          </div>

        </div>

      </div>

      {/* VENDOR LIST */}
      <div className="px-6 py-6 space-y-4">

        {vendors.map((vendor) => (

          <div
            key={vendor.id}
            onClick={() => setSelectedVendor(vendor)}
            className={`w-full rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 border ${
              darkMode
                ? "bg-[#111827] border-white/10 hover:bg-[#1e293b]"
                : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
            }`}
          >

            <div className="flex items-center justify-between">

              {/* LEFT */}
              <div>

                <h2 className="text-xl font-semibold">
                  {vendor.name}
                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Vendor ID: #{vendor.id}
                </p>

              </div>

              {/* STATUS */}
              <div
                className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                  vendor.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : vendor.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {vendor.status}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {selectedVendor && (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div
            className={`w-full max-w-2xl rounded-3xl p-7 relative border ${
              darkMode
                ? "bg-[#111827] border-white/10"
                : "bg-white border-gray-200"
            }`}
          >

            {/* CLOSE */}
            <button
              onClick={() => setSelectedVendor(null)}
              className={`absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <X size={18} />
            </button>

            {/* HEADER */}
            <div className="flex items-center mb-8">

              <div>

                <h2 className="text-4xl font-bold">
                  {selectedVendor.name}
                </h2>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Vendor ID: #{selectedVendor.id}
                </p>

                <div
                  className={`inline-block mt-3 px-4 py-2 rounded-xl text-sm font-semibold ${
                    selectedVendor.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedVendor.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedVendor.status}
                </div>

              </div>

            </div>

            {/* DETAILS */}
            <div className="space-y-4">

              {/* SERVICE */}
              <div
                className={`flex items-center justify-between rounded-2xl p-5 border ${
                  darkMode
                    ? "bg-[#1e293b] border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
              >

                <div className="flex items-center gap-3">

                  <Briefcase className="text-blue-500" />

                  <span className="font-medium">
                    Service Type
                  </span>

                </div>

                <span className="font-semibold">
                  {selectedVendor.service}
                </span>

              </div>

              {/* EXPERIENCE */}
              <div
                className={`flex items-center justify-between rounded-2xl p-5 border ${
                  darkMode
                    ? "bg-[#1e293b] border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
              >

                <div className="flex items-center gap-3">

                  <Check className="text-green-500" />

                  <span className="font-medium">
                    Experience
                  </span>

                </div>

                <span className="font-semibold">
                  {selectedVendor.experience}
                </span>

              </div>

              {/* LOCATION */}
              <div
                className={`flex items-center justify-between rounded-2xl p-5 border ${
                  darkMode
                    ? "bg-[#1e293b] border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
              >

                <div className="flex items-center gap-3">

                  <MapPin className="text-purple-500" />

                  <span className="font-medium">
                    Location
                  </span>

                </div>

                <span className="font-semibold">
                  {selectedVendor.location}
                </span>

              </div>

              {/* JOINED */}
              <div
                className={`flex items-center justify-between rounded-2xl p-5 border ${
                  darkMode
                    ? "bg-[#1e293b] border-white/10"
                    : "bg-gray-100 border-gray-200"
                }`}
              >

                <div className="flex items-center gap-3">

                  <CalendarDays className="text-cyan-500" />

                  <span className="font-medium">
                    Joined On
                  </span>

                </div>

                <span className="font-semibold">
                  {selectedVendor.joined}
                </span>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-8">

              <button className="flex-1 h-[52px] rounded-2xl bg-green-600 hover:bg-green-700 transition text-white font-semibold flex items-center justify-center gap-2">
                <Check size={18} />
                Approve
              </button>

              <button className="flex-1 h-[52px] rounded-2xl bg-red-600 hover:bg-red-700 transition text-white font-semibold flex items-center justify-center gap-2">
                <X size={18} />
                Reject
              </button>

              <button className="w-[70px] h-[52px] rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition text-white flex items-center justify-center">
                <Ban size={18} />
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}