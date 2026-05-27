"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  Circle,
} from "lucide-react";

export default function SchedulePage() {

  const [open, setOpen] = useState(false);

  const [available, setAvailable] =
    useState(true);

  const [schedules, setSchedules] =
    useState([]);

  useEffect(() => {

    fetchSchedules();

  }, []);

  // FETCH SCHEDULES
  const fetchSchedules = async () => {

    try {

      const vendorId =
        localStorage.getItem("vendorId");

      if (!vendorId) return;

      const res = await axios.get(
        `http://localhost:8080/vendor/requests/${vendorId}`
      );

      // ✅ only accepted + completed
      const filtered =
        res.data.filter(
          (item: any) =>
            item.status === "ACCEPTED" ||
            item.status === "COMPLETED"
        );

      setSchedules(filtered);

    } catch (err) {

      console.log(err);

    }
  };

  // COUNTS
  const completedCount =
    schedules.filter(
      (item: any) =>
        item.status === "COMPLETED"
    ).length;

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <VendorSidebar
        open={open}
        setOpen={setOpen}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <VendorNavbar setOpen={setOpen} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Vendor Schedule
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage your daily appointments & availability
              </p>

            </div>

            {/* Availability */}
            <button
              onClick={() =>
                setAvailable(!available)
              }
              className={`px-5 py-3 rounded-2xl text-white font-medium transition shadow-md

              ${
                available
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {available
                ? "🟢 Available Today"
                : "🔴 Unavailable"}
            </button>

          </div>

          {/* TOP CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* TOTAL */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Appointments
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    {schedules.length}
                  </h2>

                </div>

                <div className="bg-indigo-100 p-4 rounded-2xl">
                  <CalendarDays className="text-indigo-600" />
                </div>

              </div>

            </div>

            {/* HOURS */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Working Hours
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    8h
                  </h2>

                </div>

                <div className="bg-orange-100 p-4 rounded-2xl">
                  <Clock3 className="text-orange-600" />
                </div>

              </div>

            </div>

            {/* COMPLETED */}
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Completed Today
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    {completedCount}
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">
                  <CheckCircle2 className="text-green-600" />
                </div>

              </div>

            </div>

          </div>

          {/* SCHEDULE LIST */}
          <div className="mt-10 bg-white dark:bg-[#1e293b] rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h2 className="text-2xl font-bold dark:text-white">
                  Today’s Schedule
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Upcoming & active services
                </p>

              </div>

            </div>

            {/* LIST */}
            <div className="space-y-5">

              {schedules.length === 0 ? (

                <p className="text-gray-500 dark:text-gray-400">
                  No schedules found
                </p>

              ) : (

                schedules.map((item: any) => (

                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-[#0f172a] rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition"
                  >

                    {/* LEFT */}
                    <div className="flex gap-4">

                      {/* STATUS DOT */}
                      <div className="mt-1">

                        {item.status === "COMPLETED" ? (

                          <div className="w-4 h-4 rounded-full bg-green-500"></div>

                        ) : item.status === "ACCEPTED" ? (

                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>

                        ) : (

                          <Circle
                            size={16}
                            className="text-yellow-500 fill-yellow-500"
                          />

                        )}

                      </div>

                      {/* DETAILS */}
                      <div>

                        <h3 className="text-lg font-semibold dark:text-white">
                          Service Work
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                          Booking ID: #{item.id}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          ₹{item.amount}
                        </p>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div>

                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-medium

                        ${
                          item.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : item.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "ACCEPTED"
                          ? "In Progress"
                          : item.status}
                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}