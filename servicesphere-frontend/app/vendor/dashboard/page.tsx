"use client";

import { useState } from "react";

import {
  IndianRupee,
  ClipboardList,
  Wrench,
  TrendingUp,
} from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RevenueChart from "@/components/RevenueChart";

export default function Dashboard() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* Content */}
        <div className="p-4 md:p-8 overflow-y-auto flex-1">

          {/* Welcome */}
          <div className="mb-8">

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Here's what's happening today.
            </p>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Total Requests */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Requests
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    0
                  </h2>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <ClipboardList className="text-blue-600" />

                </div>

              </div>

            </div>

            {/* Active Services */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Active Services
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    0
                  </h2>

                </div>

                <div className="bg-orange-100 p-4 rounded-2xl">

                  <Wrench className="text-orange-600" />

                </div>

              </div>

            </div>

            {/* Earnings */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm hover:shadow-xl transition">

              <div className="flex justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Earnings
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    ₹0
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <IndianRupee className="text-green-600" />

                </div>

              </div>

            </div>

            {/* Growth */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-6 text-white shadow-lg">

              <div className="flex justify-between">

                <div>

                  <p className="text-sm opacity-80">
                    Monthly Growth
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    +18%
                  </h2>

                </div>

                <TrendingUp />

              </div>

            </div>

          </div>

          {/* Revenue Chart */}
          <div className="mt-10">

            <RevenueChart />

          </div>

          {/* Activity + Requests + Top Services */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-6">

              {/* Recent Activity */}
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

                <h2 className="text-xl font-bold dark:text-white mb-6">
                  Recent Activity
                </h2>

                <div className="space-y-6">

                  <div className="flex gap-4">

                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        Service Completed
                      </h3>

                      <p className="text-gray-500 text-sm">
                        AC Repair completed successfully
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        2 mins ago
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        New Request Received
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Cleaning service requested
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        10 mins ago
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        Payment Received
                      </h3>

                      <p className="text-gray-500 text-sm">
                        ₹2500 payment credited
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        1 hour ago
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Recent Requests */}
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm p-6">

                <div className="flex justify-between mb-6">

                  <h2 className="text-xl font-bold dark:text-white">
                    Recent Requests
                  </h2>

                  <button className="text-blue-600 font-medium hover:underline">
                    View All
                  </button>

                </div>

                <div className="space-y-4">

                  <div className="flex justify-between border-b pb-4 dark:border-gray-700">

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        AC Repair
                      </h3>

                      <p className="text-sm text-gray-500">
                        Rahul Sharma
                      </p>

                    </div>

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>

                  </div>

                  <div className="flex justify-between border-b pb-4 dark:border-gray-700">

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        Cleaning Service
                      </h3>

                      <p className="text-sm text-gray-500">
                        Sneha Patil
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Accepted
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold dark:text-white">
                        Plumbing Service
                      </h3>

                      <p className="text-sm text-gray-500">
                        Amit Verma
                      </p>

                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      In Progress
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

              <h2 className="text-xl font-bold mb-6 dark:text-white">
                Top Services
              </h2>

              <div className="space-y-5">

                {/* AC Repair */}
                <div>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium dark:text-white">
                      AC Repair
                    </span>

                    <span className="text-sm text-gray-500">
                      85%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>

                  </div>

                </div>

                {/* Cleaning */}
                <div>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium dark:text-white">
                      Cleaning
                    </span>

                    <span className="text-sm text-gray-500">
                      70%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div className="bg-green-500 h-full w-[70%] rounded-full"></div>

                  </div>

                </div>

                {/* Plumbing */}
                <div>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium dark:text-white">
                      Plumbing
                    </span>

                    <span className="text-sm text-gray-500">
                      55%
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div className="bg-orange-500 h-full w-[55%] rounded-full"></div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Customer Reviews */}
          <div className="mt-10 bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

            {/* Heading */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Customer Reviews
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Latest feedback from customers
                </p>

              </div>

              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition">
                View All
              </button>

            </div>

            {/* Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Review 1 */}
              <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-5">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    R
                  </div>

                  <div>

                    <h3 className="font-semibold dark:text-white">
                      Rahul Sharma
                    </h3>

                    <p className="text-sm text-gray-500">
                      AC Repair
                    </p>

                  </div>

                </div>

                <div className="text-yellow-400 text-lg mb-3">
                  ★★★★★
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
                  Excellent service and quick response.
                  Very professional vendor experience.
                </p>

              </div>

              {/* Review 2 */}
              <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-5">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    S
                  </div>

                  <div>

                    <h3 className="font-semibold dark:text-white">
                      Sneha Patil
                    </h3>

                    <p className="text-sm text-gray-500">
                      Cleaning Service
                    </p>

                  </div>

                </div>

                <div className="text-yellow-400 text-lg mb-3">
                  ★★★★☆
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
                  Cleaning quality was very good and
                  completed on time.
                </p>

              </div>

              {/* Review 3 */}
              <div className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-5">

                <div className="flex items-center gap-4 mb-4">

                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>

                  <div>

                    <h3 className="font-semibold dark:text-white">
                      Amit Verma
                    </h3>

                    <p className="text-sm text-gray-500">
                      Plumbing Service
                    </p>

                  </div>

                </div>

                <div className="text-yellow-400 text-lg mb-3">
                  ★★★★★
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-6">
                  Fast work and affordable pricing.
                  Highly recommended vendor.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}