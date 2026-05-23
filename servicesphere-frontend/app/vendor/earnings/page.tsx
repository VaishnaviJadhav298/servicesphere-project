"use client";

import { useState } from "react";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

export default function VendorDeskPage() {

  const [open, setOpen] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState("active");

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <VendorSidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <VendorNavbar setOpen={setOpen} />

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">
              Vendor Desk
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Manage your work, completed services and earnings
            </p>

          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-8 flex-wrap">

            {/* Active Work */}
            <button
              onClick={() => setActiveTab("active")}
              className={`
                px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base

                ${
                  activeTab === "active"
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-[#1e293b] dark:text-white"
                }
              `}
            >
              Active Work
            </button>

            {/* Completed */}
            <button
              onClick={() => setActiveTab("completed")}
              className={`
                px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base

                ${
                  activeTab === "completed"
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-[#1e293b] dark:text-white"
                }
              `}
            >
              Completed
            </button>

            {/* Earnings */}
            <button
              onClick={() => setActiveTab("earnings")}
              className={`
                px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base

                ${
                  activeTab === "earnings"
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-[#1e293b] dark:text-white"
                }
              `}
            >
              Earnings
            </button>

          </div>

          {/* ACTIVE WORK TAB */}
          {activeTab === "active" && (

            <div className="space-y-5">

              {/* Card */}
              <div
                className="
                  bg-white dark:bg-[#1e293b]
                  p-5 sm:p-6 rounded-3xl shadow-sm
                  flex flex-col md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
              >

                {/* Left */}
                <div>

                  <h2 className="text-lg sm:text-xl font-bold dark:text-white">
                    AC Repair
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                    Rahul Sharma
                  </p>

                </div>

                {/* Right */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="
                      w-full sm:w-52
                      px-4 py-2 rounded-2xl
                      border dark:border-gray-700
                      dark:bg-[#0f172a]
                      dark:text-white
                      outline-none
                    "
                  />

                  <button
                    className="
                      bg-indigo-600 hover:bg-indigo-700
                      text-white px-5 py-2
                      rounded-2xl transition
                    "
                  >
                    Verify
                  </button>

                </div>

              </div>

              {/* Card */}
              <div
                className="
                  bg-white dark:bg-[#1e293b]
                  p-5 sm:p-6 rounded-3xl shadow-sm
                  flex flex-col md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
              >

                {/* Left */}
                <div>

                  <h2 className="text-lg sm:text-xl font-bold dark:text-white">
                    Cleaning Service
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                    Sneha Patil
                  </p>

                </div>

                {/* Right */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="
                      w-full sm:w-52
                      px-4 py-2 rounded-2xl
                      border dark:border-gray-700
                      dark:bg-[#0f172a]
                      dark:text-white
                      outline-none
                    "
                  />

                  <button
                    className="
                      bg-indigo-600 hover:bg-indigo-700
                      text-white px-5 py-2
                      rounded-2xl transition
                    "
                  >
                    Verify
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* COMPLETED TAB */}
          {activeTab === "completed" && (

            <div className="space-y-5">

              {/* Completed Card */}
              <div
                className="
                  bg-white dark:bg-[#1e293b]
                  p-5 sm:p-6 rounded-3xl shadow-sm
                  flex flex-col sm:flex-row
                  sm:items-center
                  justify-between
                  gap-4
                "
              >

                <div>

                  <h2 className="text-lg sm:text-xl font-bold dark:text-white">
                    Plumbing Service
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                    Amit Verma
                  </p>

                </div>

                <div
                  className="
                    bg-green-100
                    text-green-700
                    px-4 py-2
                    rounded-2xl
                    font-medium
                    w-fit
                  "
                >
                  Completed
                </div>

              </div>

            </div>

          )}

          {/* EARNINGS TAB */}
          {activeTab === "earnings" && (

            <div className="space-y-6">

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Total Earnings */}
                <div className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm">

                  <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Total Earnings
                  </h2>

                  <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-4">
                    ₹45,000
                  </p>

                </div>

                {/* Today */}
                <div className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm">

                  <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Today's Earnings
                  </h2>

                  <p className="text-3xl sm:text-4xl font-bold text-indigo-600 mt-4">
                    ₹2,500
                  </p>

                </div>

                {/* Monthly */}
                <div className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm">

                  <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Monthly Earnings
                  </h2>

                  <p className="text-3xl sm:text-4xl font-bold text-orange-500 mt-4">
                    ₹12,500
                  </p>

                </div>

              </div>

              {/* Recent Earnings */}
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm p-5 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6">
                  Recent Earnings
                </h2>

                <div className="space-y-5">

                  {/* Item */}
                  <div className="flex items-center justify-between border-b pb-4 dark:border-gray-700">

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        AC Repair
                      </h3>

                      <p className="text-sm text-gray-500">
                        Rahul Sharma
                      </p>

                    </div>

                    <p className="font-bold text-green-600">
                      ₹1500
                    </p>

                  </div>

                  {/* Item */}
                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        Cleaning Service
                      </h3>

                      <p className="text-sm text-gray-500">
                        Sneha Patil
                      </p>

                    </div>

                    <p className="font-bold text-green-600">
                      ₹900
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}