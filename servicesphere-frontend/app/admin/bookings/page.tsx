"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Search,
  Sun,
  Moon,
  Bell,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function AdminBookingsPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true);

  const bookings = [
    {
      id: "BK001",
      customer: "Vaishnavi Jadhav",
      status: "Accepted",
    },

    {
      id: "BK002",
      customer: "Aman Verma",
      status: "Pending",
    },

    {
      id: "BK003",
      customer: "Sneha Patil",
      status: "OTP Verified",
    },

    {
      id: "BK004",
      customer: "Rahul Sharma",
      status: "Completed",
    },
  ];

  return (

    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-[#0f172a]"
      }`}
    >

      {/* TOPBAR */}
      <div
        className={`flex items-center justify-between px-8 py-5 border-b ${
          darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition ${
              darkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >

            <ArrowLeft size={20} />

          </button>

          {/* TITLE */}
          <div>

            <h1 className="text-[28px] font-bold">
              Booking Monitoring
            </h1>

            <p
              className={`text-[13px] mt-1 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Track and manage customer bookings
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div
            className={`flex items-center px-4 h-[48px] w-[320px] rounded-2xl ${
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
              placeholder="Search bookings..."
              className={`bg-transparent outline-none ml-3 w-full text-[14px] ${
                darkMode
                  ? "placeholder-gray-400"
                  : "placeholder-gray-500"
              }`}
            />

          </div>

          {/* THEME */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition ${
              darkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >

            {darkMode ? <Sun size={18} /> : <Moon size={18} />}

          </button>

          {/* NOTIFICATION */}
          <button
            className={`w-11 h-11 rounded-2xl flex items-center justify-center relative ${
              darkMode
                ? "bg-white/10 hover:bg-white/20"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >

            <Bell size={18} />

            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></div>

          </button>

          {/* PROFILE */}
          {/* <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              A
            </div>

            <div>

              <h2 className="text-[14px] font-semibold">
                Admin
              </h2>

              <p
                className={`text-[12px] ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Super Admin
              </p>

            // </div>

          </div> */}

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-8">

        <div className="space-y-4">

          {bookings.map((booking, index) => (

            <button
              key={index}
              onClick={() =>
                router.push(`/admin/bookings/${booking.id}`)
              }
              className={`w-full rounded-[24px] px-6 py-5 border flex items-center justify-between transition-all duration-300 hover:scale-[1.01] ${
                darkMode
                  ? "bg-[#111827] border-white/10 hover:bg-[#172033]"
                  : "bg-white border-gray-200 hover:shadow-md"
              }`}
            >

              {/* LEFT */}
              <div className="text-left">

                <h2 className="text-[19px] font-bold">
                  {booking.customer}
                </h2>

                <p
                  className={`text-[13px] mt-1 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Booking ID : {booking.id}
                </p>

              </div>

              {/* STATUS */}
              <div
                className={`px-5 py-2 rounded-xl text-[13px] font-semibold ${
                  booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking.status === "Accepted"
                    ? "bg-blue-100 text-blue-700"
                    : booking.status === "OTP Verified"
                    ? "bg-green-100 text-green-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {booking.status}
              </div>

            </button>

          ))}

        </div>

      </div>

    </div>

  );

}