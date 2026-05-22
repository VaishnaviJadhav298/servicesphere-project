"use client";

import { useState } from "react";

import {
  Plus,
  Trash2,
  ArrowLeft,
  Briefcase,
  Moon,
  Sun,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function AdminServicesPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const [serviceName, setServiceName] = useState("");

  const [services, setServices] = useState([
    "Car Wash",
    "Home Cleaning",
    "Electrician",
    "Plumbing",
  ]);

  // ADD SERVICE
  const handleAddService = () => {

    if (serviceName.trim() === "") return;

    setServices([...services, serviceName]);

    setServiceName("");

  };

  // DELETE
  const handleDelete = (index: number) => {

    const updatedServices = services.filter(
      (_, i) => i !== index
    );

    setServices(updatedServices);

  };

  return (

    <div
      className={`min-h-screen p-8 transition duration-500 ${
        darkMode
          ? "bg-[#0f172a]"
          : "bg-[#f5f7fb]"
      }`}
    >

      {/* TOPBAR */}
      <div className="flex items-center justify-between mb-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* BACK */}
          <button
            onClick={() => router.push("/admin/dashboard")}
            className={`p-3 rounded-xl border transition duration-300 hover:scale-105
              ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700 text-white"
                  : "bg-white border-gray-200 text-black"
              }`}
          >

            <ArrowLeft size={22} />

          </button>

          <div>

            <h1
              className={`text-4xl font-bold ${
                darkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >

              Manage Services

            </h1>

            <p
              className={`mt-1 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >

              Add and manage predefined services

            </p>

          </div>

        </div>

        {/* MODE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-4 rounded-2xl transition duration-300 hover:scale-105
            ${
              darkMode
                ? "bg-yellow-400 text-black"
                : "bg-black text-white"
            }`}
        >

          {darkMode ? <Sun /> : <Moon />}

        </button>

      </div>

      {/* ADD CARD */}
      <div
        className={`rounded-3xl border p-6 mb-8 shadow-sm hover:shadow-lg transition duration-300
          ${
            darkMode
              ? "bg-[#1e293b] border-gray-700"
              : "bg-white border-gray-200"
          }`}
      >

        {/* HEADING */}
        <div className="flex items-center gap-3 mb-5">

          <div className="bg-blue-100 p-3 rounded-xl">

            <Plus className="text-blue-600" size={22} />

          </div>

          <h2
            className={`text-2xl font-bold ${
              darkMode
                ? "text-white"
                : "text-gray-800"
            }`}
          >

            Add New Service

          </h2>

        </div>

        {/* INPUT */}
        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Enter service name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className={`flex-1 rounded-xl px-5 py-3 text-lg outline-none border transition
              ${
                darkMode
                  ? "bg-[#0f172a] border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
          />

          {/* ADD BUTTON */}
          <button
            onClick={handleAddService}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition duration-300 text-white px-7 rounded-xl font-semibold flex items-center gap-2"
          >

            <Plus size={20} />
            Add

          </button>

        </div>

      </div>

      {/* SERVICES */}
      <div className="grid grid-cols-2 gap-5">

        {services.map((service, index) => (

          <div
            key={index}
            className={`rounded-3xl p-5 border flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition duration-300
              ${
                darkMode
                  ? "bg-[#1e293b] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className="bg-blue-100 p-3 rounded-xl">

                <Briefcase
                  className="text-blue-600"
                  size={22}
                />

              </div>

              <div>

                <h1
                  className={`text-xl font-semibold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >

                  {service}

                </h1>

                <p
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >

                  Active Service

                </p>

              </div>

            </div>

            {/* DELETE */}
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-100 hover:bg-red-200 hover:scale-105 transition duration-300 p-3 rounded-xl"
            >

              <Trash2
                className="text-red-600"
                size={20}
              />

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}