"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import {
  IndianRupee,
  ClipboardList,
  Wrench,
  TrendingUp,
} from "lucide-react";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";
import RevenueChart from "@/components/RevenueChart";

export default function Dashboard() {

  const [open, setOpen] = useState(false);

  const [totalRequests, setTotalRequests] = useState(0);

  const [activeServices, setActiveServices] = useState(0);

  const [totalEarnings, setTotalEarnings] = useState(0);

  const [monthlyGrowth, setMonthlyGrowth] = useState(18);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      // ✅ VENDOR ID
      const vendorId =
        localStorage.getItem("vendorId");

      if (!vendorId) return;

      // ✅ GET ALL REQUESTS OF VENDOR
      const res = await axios.get(
        `http://localhost:8080/vendor/requests/${vendorId}`
      );

      const requests = res.data || [];

      // ✅ TOTAL REQUESTS
      setTotalRequests(requests.length);

      // ✅ ACTIVE SERVICES
      const active = requests.filter(
        (item: any) =>
          item.status === "ACCEPTED"
      );

      setActiveServices(active.length);

      // ✅ COMPLETED SERVICES
      const completed = requests.filter(
        (item: any) =>
          item.status === "COMPLETED"
      );

      // ✅ TOTAL EARNINGS
      let earnings = 0;

      completed.forEach((item: any) => {

        earnings += item.amount || 0;

      });

      setTotalEarnings(earnings);

      // OPTIONAL GROWTH LOGIC
      if (earnings > 0) {

        setMonthlyGrowth(25);

      }

    } catch (err) {

      console.log(
        "Dashboard Fetch Error:",
        err
      );

    }
  };

  return (

    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <VendorSidebar
        open={open}
        setOpen={setOpen}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <VendorNavbar
          setOpen={setOpen}
        />

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
                    {totalRequests}
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
                    {activeServices}
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
                    ₹{totalEarnings}
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
                    +{monthlyGrowth}%
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

        </div>

      </div>

    </div>
  );
}