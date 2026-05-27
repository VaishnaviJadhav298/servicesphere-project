"use client";

import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Star,
  LogOut,
  Search,
  Bell,
  CheckCircle,
  Clock,
  Moon,
  Sun,
} from "lucide-react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import API from "@/services/api";

export default function CustomerDashboard() {

  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(false);

  const [bookings, setBookings] =
    useState<any[]>([]);

   // GET USER FROM LOCAL STORAGE
 const user =
   typeof window !== "undefined"
     ? JSON.parse(
         localStorage.getItem("user") || "{}"
       )
     : {};

 // USER NAME
 const userName =
   user.fullName || "Customer";

 // FIRST LETTER
 const firstLetter =
   userName.charAt(0).toUpperCase();

  // FETCH BOOKINGS
  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const response = await API.get(
        "/bookings/customer/1"
      );

      setBookings(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  // STATS
  const totalBookings =
    bookings.length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status === "COMPLETED"
    ).length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status === "PENDING"
    ).length;

  const totalPayments =
    bookings.reduce(
      (total, booking) =>
        total + booking.amount,
      0
    );

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
          <h1 className="text-[34px] font-bold mb-14">

            Service
            <span className="text-blue-500">
              Sphere
            </span>

          </h1>

          {/* MENU */}
          <div className="space-y-5">

            {/* HOME */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <LayoutDashboard size={22} />
              Home

            </button>

            <button
            onClick={() => router.push("/customer/services")}
            className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

            <Briefcase size={22} />
            Explore Services

            </button>

            {/* BOOKINGS */}
            <Link
              href="/customer/bookings"
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition"
            >

              <Briefcase size={22} />
              My Bookings

            </Link>

            {/* PAYMENTS */}
            <button className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition">

              <CreditCard size={22} />
              Payments

            </button>

            {/* RATINGS */}
             <button onClick={() => router.push("/customer/ratings")
             }
              className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition">

              <Star size={22} />
               Ratings
 
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

      {/* MAIN CONTENT */}
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

              Welcome Back 👋

            </h1>

            <p
              className={`mt-1 text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >

              Book and manage your services

            </p>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div
              className={`flex items-center px-4 py-3 rounded-2xl w-[280px] ${
                darkMode
                  ? "bg-[#334155]"
                  : "bg-gray-100"
              }`}
            >

              <Search
                className={
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-500"
                }
                size={18}
              />

              <input
                type="text"
                placeholder="Search..."
                className={`bg-transparent outline-none ml-3 w-full text-sm ${
                  darkMode
                    ? "text-white placeholder-gray-400"
                    : "text-gray-700"
                }`}
              />

            </div>

            {/* DARK MODE */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`p-3 rounded-2xl hover:scale-105 transition duration-300 ${
                darkMode
                  ? "bg-yellow-400 text-black"
                  : "bg-black text-white"
              }`}
            >

              {darkMode
                ? <Sun size={20} />
                : <Moon size={20} />}

            </button>

            {/* BELL */}
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

            {/* PROFILE */}
            <button
              onClick={() =>
                router.push(
                  "/customer/profile"
                )
              }
              className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition hover:scale-105 ${
                darkMode
                  ? "bg-[#334155]"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >

              {/* PROFILE LETTER */}
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

                {firstLetter}

              </div>

              <div className="text-left">

                <h2
                  className={`font-semibold text-sm ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >

                  {userName}

                </h2>

                <p
                  className={`text-xs ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >

                  Customer

                </p>

              </div>

            </button>

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

              <div className="flex items-center justify-between">

                <div>

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
                    className={`text-4xl font-bold mt-3 ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >

                    {totalBookings}

                  </h1>

                </div>

                <div className="bg-blue-100 p-4 rounded-2xl">

                  <Briefcase
                    size={24}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>

            {/* CARD 2 */}
            <div
              className={`rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >

                    Completed

                  </p>

                  <h1
                    className={`text-4xl font-bold mt-3 ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >

                    {completedBookings}

                  </h1>

                </div>

                <div className="bg-green-100 p-4 rounded-2xl">

                  <CheckCircle
                    size={24}
                    className="text-green-600"
                  />

                </div>

              </div>

            </div>

            {/* CARD 3 */}
            <div
              className={`rounded-3xl p-5 border hover:-translate-y-1 hover:shadow-xl transition duration-300 ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className={`text-sm ${
                      darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >

                    Pending

                  </p>

                  <h1
                    className={`text-4xl font-bold mt-3 ${
                      darkMode
                        ? "text-white"
                        : "text-black"
                    }`}
                  >

                    {pendingBookings}

                  </h1>

                </div>

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Clock
                    size={24}
                    className="text-yellow-600"
                  />

                </div>

              </div>

            </div>

            {/* CARD 4 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-500 rounded-3xl p-5 text-white hover:-translate-y-1 hover:shadow-xl transition duration-300">

              <p className="text-sm">

                Total Payments

              </p>

              <h1 className="text-5xl font-bold mt-5">

                ₹{totalPayments}

              </h1>

            </div>

          </div>

          {/* RECENT BOOKINGS */}
          <div
            className={`rounded-3xl border p-6 mb-8 transition duration-500 ${
              darkMode
                ? "bg-[#1e293b] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">

              <div>

                <h2
                  className={`text-2xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >

                  Recent Bookings

                </h2>

                <p
                  className={`text-sm mt-1 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >

                  Your latest booked services

                </p>

              </div>

              <Link
                href="/customer/bookings"
                className="text-blue-600 font-medium hover:underline"
              >

                View All

              </Link>

            </div>

            {/* NO BOOKINGS */}
            {bookings.length === 0 ? (

              <div
                className={`flex flex-col items-center justify-center py-14 text-center ${
                  darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >

                <div className="bg-blue-100 p-5 rounded-full mb-5">

                  <Briefcase
                    size={36}
                    className="text-blue-600"
                  />

                </div>

                <h2
                  className={`text-2xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >

                  No Services Booked Yet

                </h2>

                <p className="mt-3 text-base max-w-lg">

                  You haven’t booked any services yet.
                  Explore services and make your first booking.

                </p>

                <button
                  onClick={() =>
                    router.push("/customer/services")
                  }
                  className="mt-7 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-300 text-white px-8 py-3 rounded-2xl text-base font-semibold"
                >

                  Explore Services

                </button>

              </div>

            ) : (

              <div className="space-y-4">

                {bookings.slice(0, 3).map((booking) => (

                  <div
                    key={booking.id}
                    className={`flex items-center justify-between p-5 rounded-2xl transition duration-300 ${
                      darkMode
                        ? "bg-[#334155]"
                        : "bg-gray-50"
                    }`}
                  >

                    {/* LEFT */}
                    <div>

                      <h3
                        className={`text-lg font-semibold ${
                          darkMode
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >

                        Booking #{booking.id}

                      </h3>

                      <p
                        className={`text-sm mt-1 ${
                          darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >

                        {booking.address}

                      </p>

                    </div>

                    {/* RIGHT */}
                    <div className="text-right">

                      <p className="text-green-600 font-bold text-lg">

                        ₹{booking.amount}

                      </p>

                      <p
                        className={`text-sm mt-1 font-medium ${
                          booking.status === "COMPLETED"
                            ? "text-green-600"
                            : booking.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >

                        {booking.status}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}