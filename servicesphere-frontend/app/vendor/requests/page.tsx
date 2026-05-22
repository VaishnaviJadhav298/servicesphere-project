"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function RequestsPage() {

  const [open, setOpen] = useState(false);

  // Requests State
  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: "Rahul",
      service: "AC Repair",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sneha",
      service: "Cleaning",
      status: "Pending",
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* Page Content */}
        <div className="p-6">

          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            Service Requests
          </h1>

          <div className="space-y-4">

            {requests.map((req) => (

              <div
                key={req.id}
                className="
                  bg-white dark:bg-[#1e293b]
                  p-5 rounded-2xl shadow
                  flex justify-between items-center
                  transition
                "
              >

                {/* Left Side */}
                <div>

                  <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {req.service}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400">
                    Customer: {req.customer}
                  </p>

                  {/* Dynamic Status */}
                  <p
                    className={`
                      font-medium mt-1

                      ${
                        req.status === "Accepted"
                          ? "text-green-600"
                          : req.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    `}
                  >
                    {req.status}
                  </p>

                </div>

                {/* Right Side Buttons */}
                <div className="flex gap-3">

                  {req.status === "Pending" && (

                    <>

                      {/* Accept */}
                      <button
                        onClick={() => {

                          setRequests(
                            requests.map((item) =>
                              item.id === req.id
                                ? {
                                    ...item,
                                    status: "Accepted",
                                  }
                                : item
                            )
                          );

                          toast.success("Request Accepted");

                        }}
                        className="
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          px-4 py-2
                          rounded-xl
                          transition
                        "
                      >
                        Accept
                      </button>

                      {/* Reject */}
                      <button
                        onClick={() => {

                          setRequests(
                            requests.map((item) =>
                              item.id === req.id
                                ? {
                                    ...item,
                                    status: "Rejected",
                                  }
                                : item
                            )
                          );

                          toast.error("Request Rejected");

                        }}
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-4 py-2
                          rounded-xl
                          transition
                        "
                      >
                        Reject
                      </button>

                    </>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}