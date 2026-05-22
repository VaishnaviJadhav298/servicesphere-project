"use client";

import {
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Star,
  User,
  LogOut,
} from "lucide-react";

export default function CustomerDashboard() {

  return (

    <div className="min-h-screen bg-[#0b0f19] text-white flex">

      {/* SIDEBAR */}
      <div className="w-[280px] bg-white/5 border-r border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-extrabold mb-12">
            Service<span className="text-blue-500">Sphere</span>
          </h1>

          <div className="space-y-4">

            <button className="w-full flex items-center gap-4 bg-blue-600 px-5 py-4 rounded-2xl text-lg font-semibold">
              <LayoutDashboard />
              Dashboard
            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 px-5 py-4 rounded-2xl text-lg transition">
              <Briefcase />
              My Bookings
            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 px-5 py-4 rounded-2xl text-lg transition">
              <CreditCard />
              Payments
            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 px-5 py-4 rounded-2xl text-lg transition">
              <Star />
              Ratings
            </button>

            <button className="w-full flex items-center gap-4 hover:bg-white/10 px-5 py-4 rounded-2xl text-lg transition">
              <User />
              Profile
            </button>

          </div>

        </div>

        <button className="flex items-center gap-4 hover:bg-red-500/20 px-5 py-4 rounded-2xl text-lg transition text-red-400">
          <LogOut />
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-10">

        {/* TOP */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Customer Dashboard
            </h1>

            <p className="text-gray-400 mt-2 text-lg">
              Book and manage your services
            </p>

          </div>

          <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl">

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-blue-500"
            />

            <div>

              <h2 className="font-semibold text-lg">
                John Customer
              </h2>

              <p className="text-gray-400 text-sm">
                Customer
              </p>

            </div>

          </div>

        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white/10 rounded-3xl p-6 border border-white/10">

            <h2 className="text-gray-400 text-lg">
              Total Bookings
            </h2>

            <h1 className="text-5xl font-bold mt-4 text-blue-500">
              18
            </h1>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 border border-white/10">

            <h2 className="text-gray-400 text-lg">
              Completed
            </h2>

            <h1 className="text-5xl font-bold mt-4 text-green-400">
              12
            </h1>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 border border-white/10">

            <h2 className="text-gray-400 text-lg">
              Pending
            </h2>

            <h1 className="text-5xl font-bold mt-4 text-yellow-400">
              4
            </h1>

          </div>

          <div className="bg-white/10 rounded-3xl p-6 border border-white/10">

            <h2 className="text-gray-400 text-lg">
              Payments
            </h2>

            <h1 className="text-5xl font-bold mt-4 text-pink-400">
              ₹12K
            </h1>

          </div>

        </div>

      </div>

    </div>

  );

}