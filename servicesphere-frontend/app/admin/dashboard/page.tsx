"use client";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  ShieldCheck,
  CreditCard,
  BarChart3,
  LogOut,
  Bell,
  Moon,
  Sun,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDashboard() {

  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  return (

    <div
      className={`flex min-h-screen transition duration-500 ${
        darkMode
          ? "bg-[#0f172a]"
          : "bg-[#f5f7fb]"
      }`}
    >

      {/* SIDEBAR */}
      <div
        className={`w-[300px] flex flex-col justify-between p-8 transition duration-500 ${
          darkMode
            ? "bg-[#020817] text-white"
            : "bg-[#07122b] text-white"
        }`}
      >

        <div>

          {/* LOGO */}
          <h1 className="text-[36px] font-bold mb-14">

            Service
            <span className="text-blue-500">
              Sphere
            </span>

          </h1>

          {/* MENU */}
          <div className="space-y-5">

            {/* DASHBOARD */}
            {/* <button className="flex items-center gap-4 text-lg font-medium text-blue-400">

              <LayoutDashboard size={22} />
              Dashboard

            </button> */}

            {/* SERVICES */}
            {/* <button
              onClick={() => router.push("/admin/services")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <Briefcase size={22} />
              Manage Services

            </button> */}

            {/* CUSTOMERS */}
            <button
              onClick={() => router.push("/admin/customers")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <Users size={22} />
              Customers

            </button>

            {/* VENDORS */}
            <button
              onClick={() => router.push("/admin/vendors")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <UserCheck size={22} />
              Vendors

            </button>

            {/* BOOKINGS */}
            <button
              onClick={() => router.push("/admin/bookings")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <ShieldCheck size={22} />
              Bookings

            </button>
            {/* COMPLAINTS */}
             <button
             onClick={() => router.push("/admin/complaints")}
             className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <ShieldCheck size={22} />
              Complaints

            </button>

            {/* OTP */}
            <button
              onClick={() => router.push("/admin/otp")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <ShieldCheck size={22} />
              OTP Control

            </button>

            {/* PAYMENTS */}
            <button
              onClick={() => router.push("/admin/payments")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <CreditCard size={22} />
              Payments

            </button>

            {/* ANALYTICS */}
            <button
              onClick={() => router.push("/admin/analytics")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <BarChart3 size={22} />
              Analytics

            </button>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition"
        >

          <LogOut />
          Logout

        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOPBAR */}
        <div
          className={`flex items-center justify-between border-b px-10 py-5 transition duration-500 ${
            darkMode
              ? "bg-[#1e293b] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          {/* LEFT */}
          <div>

            <h1
              className={`text-3xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >

              Admin Dashboard

            </h1>

            <p
              className={`mt-1 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >

              Manage your complete platform

            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl hover:scale-105 transition duration-300 ${
                darkMode
                  ? "bg-yellow-400 text-black"
                  : "bg-black text-white"
              }`}
            >

              {darkMode ? <Sun /> : <Moon />}

            </button>

            {/* NOTIFICATION */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                darkMode
                  ? "bg-[#334155]"
                  : "bg-gray-100"
              }`}
            >

              <Bell
                className={
                  darkMode
                    ? "text-white"
                    : "text-gray-700"
                }
              />

            </div>

            {/* ADMIN */}
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-2xl ${
                darkMode
                  ? "bg-[#334155]"
                  : "bg-gray-100"
              }`}
            >

              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

                A

              </div>

              <div>

                <h2
                  className={`font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >

                  Admin

                </h2>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >

                  Super Admin

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* STATS */}
          <div className="grid grid-cols-4 gap-5 mb-8">

            {/* CARD 1 */}
            <div
              className={`rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >

                Total Customers

              </p>

              <h1
                className={`text-4xl font-bold mt-4 ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >

                0

              </h1>

            </div>

            {/* CARD 2 */}
            <div
              className={`rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >

                Total Vendors

              </p>

              <h1
                className={`text-4xl font-bold mt-4 ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >

                0

              </h1>

            </div>

            {/* CARD 3 */}
            <div
              className={`rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <p
                className={`text-sm ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >

                Total Bookings

              </p>

              <h1
                className={`text-4xl font-bold mt-4 ${
                  darkMode
                    ? "text-white"
                    : "text-black"
                }`}
              >

                0

              </h1>

            </div>

            {/* CARD 4 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-3xl p-5 text-white hover:-translate-y-1 hover:shadow-xl transition duration-300">

              <p className="text-sm">

                Revenue

              </p>

              <h1 className="text-5xl font-bold mt-5">

                ₹0

              </h1>

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div
            className={`rounded-3xl p-8 border transition duration-500 ${
              darkMode
                ? "bg-[#1e293b] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >

            <h1
              className={`text-2xl font-bold mb-8 ${
                darkMode
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >

              Quick Actions

            </h1>

            <div className="grid grid-cols-3 gap-5">

              {/* SERVICES */}
              <button
                onClick={() => router.push("/admin/services")}
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-300 text-white rounded-2xl p-6 text-lg font-semibold"
              >

                Manage Services

              </button>

              {/* VENDORS */}
              <button
                onClick={() => router.push("/admin/vendors")}
                className="bg-green-600 hover:bg-green-700 hover:scale-105 transition duration-300 text-white rounded-2xl p-6 text-lg font-semibold"
              >

                Manage Vendors

              </button>

              {/* BOOKINGS */}
              <button
                onClick={() => router.push("/admin/bookings")}
                className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition duration-300 text-white rounded-2xl p-6 text-lg font-semibold"
              >

                Manage Bookings

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}