"use client";

import { useState } from "react";

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

  const [available, setAvailable] = useState(true);

  const schedules = [
    {
      id: 1,
      time: "5:00 PM",
      service: "AC Repair",
      customer: "Rahul Sharma",
      status: "Upcoming",
    },
    {
      id: 2,
      time: "1:30 PM",
      service: "Cleaning Service",
      customer: "Sneha Patil",
      status: "In Progress",
    },
    {
      id: 3,
      time: "10:00 AM",
      service: "Plumbing Service",
      customer: "Amit Verma",
      status: "Completed",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <VendorSidebar open={open} setOpen={setOpen} />

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

            {/* Availability Toggle */}
            <button
              onClick={() => setAvailable(!available)}
              className={`
                px-5 py-3 rounded-2xl
                text-white font-medium
                transition shadow-md

                ${
                  available
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }
              `}
            >
              {available
                ? "🟢 Available Today"
                : "🔴 Unavailable"}
            </button>

          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Appointments */}
            <div
              className="
                bg-white dark:bg-[#1e293b]
                rounded-3xl p-6 shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Total Appointments
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    3
                  </h2>

                </div>

                <div className="bg-indigo-100 p-4 rounded-2xl">
                  <CalendarDays className="text-indigo-600" />
                </div>

              </div>

            </div>

            {/* Working Hours */}
            <div
              className="
                bg-white dark:bg-[#1e293b]
                rounded-3xl p-6 shadow-sm
              "
            >

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

            {/* Completed */}
            <div
              className="
                bg-white dark:bg-[#1e293b]
                rounded-3xl p-6 shadow-sm
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500 text-sm">
                    Completed Today
                  </p>

                  <h2 className="text-4xl font-bold mt-3 dark:text-white">
                    1
                  </h2>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">
                  <CheckCircle2 className="text-green-600" />
                </div>

              </div>

            </div>

          </div>

          {/* Schedule List */}
          <div
            className="
              mt-10
              bg-white dark:bg-[#1e293b]
              rounded-3xl p-6 shadow-sm
            "
          >

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

            {/* Schedule Cards */}
            <div className="space-y-5">

              {schedules.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-gray-50 dark:bg-[#0f172a]
                    rounded-2xl p-5
                    flex flex-col md:flex-row
                    md:items-center md:justify-between
                    gap-4 transition
                  "
                >

                  {/* Left */}
                  <div className="flex gap-4">

                    {/* Status Dot */}
                    <div className="mt-1">

                      {item.status === "Completed" ? (

                        <div className="w-4 h-4 rounded-full bg-green-500"></div>

                      ) : item.status === "In Progress" ? (

                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>

                      ) : (

                        <Circle
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />

                      )}

                    </div>

                    {/* Details */}
                    <div>

                      <h3 className="text-lg font-semibold dark:text-white">
                        {item.service}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Customer: {item.customer}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        {item.time}
                      </p>

                    </div>

                  </div>

                  {/* Right */}
                  <div>

                    <span
                      className={`
                        px-4 py-2 rounded-xl
                        text-sm font-medium

                        ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}