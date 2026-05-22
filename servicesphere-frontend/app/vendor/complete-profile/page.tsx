"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompleteProfilePage() {

  const router = useRouter();

  const [services, setServices] = useState([
    {
      title: "",
      price: "",
      description: "",
      active: true,
    },
  ]);

  // Add Service
  const addService = () => {

    setServices([
      ...services,
      {
        title: "",
        price: "",
        description: "",
        active: true,
      },
    ]);

  };

  return (

    <div
      className="min-h-screen bg-cover bg-center relative px-20 py-16"
      style={{
        backgroundImage: "url('/background-img.png')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-white">

            Complete Provider Profile

          </h1>

          <p className="text-gray-300 mt-3 text-lg">

            Add your business details and services

          </p>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">

          {/* Business Name */}
          <input
            type="text"
            placeholder="Business Name"
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500"
          />

          {/* Experience */}
          <input
            type="text"
            placeholder="Years of Experience"
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500"
          />

          {/* Opening Time */}
          <input
            type="time"
            className="bg-white/20 border border-white/10 text-white p-4 rounded-xl outline-none focus:border-blue-500"
          />

          {/* Closing Time */}
          <input
            type="time"
            className="bg-white/20 border border-white/10 text-white p-4 rounded-xl outline-none focus:border-blue-500"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Business Location"
            className="col-span-2 bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500"
          />

          {/* About */}
          <textarea
            rows={5}
            placeholder="About Your Business"
            className="col-span-2 bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500 resize-none"
          />

        </div>

        {/* SERVICES SECTION */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-white">

              Services

            </h2>

            <button
              onClick={addService}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
            >

              + Add Service

            </button>

          </div>

          {/* Services List */}
          <div className="space-y-6">

            {services.map((service, index) => (

              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-2xl p-6"
              >

                <div className="grid grid-cols-2 gap-5">

                  {/* Service Name */}
                  <input
                    type="text"
                    placeholder="Service Name"
                    className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500"
                  />

                  {/* Price */}
                  <input
                    type="number"
                    placeholder="Price"
                    className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500"
                  />

                  {/* Description */}
                  <textarea
                    rows={4}
                    placeholder="Service Description"
                    className="col-span-2 bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500 resize-none"
                  />

                </div>

                {/* Active Toggle */}
                <div className="flex items-center justify-between mt-5">

                  <p className="text-white text-lg">
                    Service Active
                  </p>

                  <button className="bg-green-500 px-5 py-2 rounded-full text-white font-semibold">

                    Active

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Submit Button */}
        <button
          onClick={() => router.push("/vendor/dashboard")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition mt-10 p-4 rounded-xl text-white font-semibold text-xl shadow-lg"
        >

          Save & Continue

        </button>

      </div>

    </div>

  );

}