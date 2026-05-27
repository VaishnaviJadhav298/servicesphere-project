"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

export default function VendorDeskPage() {

  const [open, setOpen] = useState(false);

  // ACTIVE TAB
  const [activeTab, setActiveTab] =
    useState("active");

  // DATA
  const [activeWorks, setActiveWorks] =
    useState([]);

  const [completedWorks, setCompletedWorks] =
    useState([]);

  const [earnings, setEarnings] =
    useState([]);

  // OTP INPUTS
  const [otpValues, setOtpValues] =
    useState({});

  useEffect(() => {

    fetchVendorWorks();

  }, []);

  // FETCH WORKS
  const fetchVendorWorks = async () => {

    try {

      const vendorId =
        localStorage.getItem("vendorId");

      if (!vendorId) return;

      const res = await axios.get(
        `http://localhost:8080/vendor/requests/${vendorId}`
      );

      const allWorks = res.data;

      // ACTIVE
      const active =
        allWorks.filter(
          (item: any) =>
            item.status === "ACCEPTED"
        );

      // COMPLETED
      const completed =
        allWorks.filter(
          (item: any) =>
            item.status === "COMPLETED"
        );

      setActiveWorks(active);

      setCompletedWorks(completed);

      setEarnings(completed);

    } catch (err) {

      console.log(err);

    }
  };

  // VERIFY OTP
  const verifyOtp = async (
    bookingId: number,
    realOtp: string
  ) => {

    const enteredOtp =
      otpValues[bookingId];

    if (!enteredOtp) {

      alert("Enter OTP");
      return;
    }

    if (enteredOtp !== realOtp) {

      alert("Wrong OTP");
      return;
    }

    try {

      await axios.put(
        `http://localhost:8080/vendor/complete/${bookingId}`
      );

      alert("Work Completed!");

      fetchVendorWorks();

    } catch (err) {

      console.log(err);

      alert("Completion failed");
    }
  };

  // TOTAL EARNINGS
  const totalEarnings =
    earnings.reduce(
      (sum: number, item: any) =>
        sum + (item.amount || 0),
      0
    );

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

            {/* Active */}
            <button
              onClick={() => setActiveTab("active")}
              className={`px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base
              ${
                activeTab === "active"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              Active Work
            </button>

            {/* Completed */}
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base
              ${
                activeTab === "completed"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              Completed
            </button>

            {/* Earnings */}
            <button
              onClick={() => setActiveTab("earnings")}
              className={`px-4 sm:px-5 py-2 rounded-2xl font-medium transition text-sm sm:text-base
              ${
                activeTab === "earnings"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              Earnings
            </button>

          </div>

          {/* ACTIVE TAB */}
          {activeTab === "active" && (

            <div className="space-y-5">

              {activeWorks.length === 0 ? (

                <p className="text-gray-500 dark:text-gray-400">
                  No active works
                </p>

              ) : (

                activeWorks.map((work: any) => (

                  <div
                    key={work.id}
                    className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >

                    {/* LEFT */}
                    <div>

                      <h2 className="text-lg sm:text-xl font-bold dark:text-white">
                        Service Work
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                        Booking ID #{work.id}
                      </p>

                      <p className="text-green-600 font-semibold mt-2">
                        ₹{work.amount}
                      </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={
                          otpValues[work.id] || ""
                        }
                        onChange={(e) =>
                          setOtpValues({
                            ...otpValues,
                            [work.id]:
                              e.target.value
                          })
                        }
                        className="w-full sm:w-52 px-4 py-2 rounded-2xl border dark:border-gray-700 dark:bg-[#0f172a] dark:text-white outline-none"
                      />

                      <button
                        onClick={() =>
                          verifyOtp(
                            work.id,
                            work.otp
                          )
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-2xl transition"
                      >
                        Verify
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          )}

          {/* COMPLETED TAB */}
          {activeTab === "completed" && (

            <div className="space-y-5">

              {completedWorks.length === 0 ? (

                <p className="text-gray-500 dark:text-gray-400">
                  No completed works
                </p>

              ) : (

                completedWorks.map((work: any) => (

                  <div
                    key={work.id}
                    className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >

                    <div>

                      <h2 className="text-lg sm:text-xl font-bold dark:text-white">
                        Completed Service
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
                        Booking ID #{work.id}
                      </p>

                    </div>

                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl font-medium w-fit">
                      Completed
                    </div>

                  </div>

                ))

              )}

            </div>

          )}

          {/* EARNINGS TAB */}
          {activeTab === "earnings" && (

            <div className="space-y-6">

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* Total */}
                <div className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm">

                  <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Total Earnings
                  </h2>

                  <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-4">
                    ₹{totalEarnings}
                  </p>

                </div>

                {/* Completed */}
                <div className="bg-white dark:bg-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-sm">

                  <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Completed Works
                  </h2>

                  <p className="text-3xl sm:text-4xl font-bold text-indigo-600 mt-4">
                    {completedWorks.length}
                  </p>

                </div>

              </div>

              {/* Recent Earnings */}
              <div className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm p-5 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-6">
                  Recent Earnings
                </h2>

                <div className="space-y-5">

                  {earnings.map((item: any) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 dark:border-gray-700"
                    >

                      <div>

                        <h3 className="font-semibold dark:text-white">
                          Service Work
                        </h3>

                        <p className="text-sm text-gray-500">
                          Booking #{item.id}
                        </p>

                      </div>

                      <p className="font-bold text-green-600">
                        ₹{item.amount}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}