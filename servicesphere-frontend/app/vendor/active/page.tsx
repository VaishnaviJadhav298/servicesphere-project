"use client";

import { useState } from "react";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

// ✅ TYPE DEFINITION
type Service = {
  id: number;
  service: string;
};

export default function ActivePage() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"available" | "my">("available");

  // Available Services
  const [availableServices, setAvailableServices] = useState<Service[]>([
    { id: 1, service: "AC Repair" },
    { id: 2, service: "Cleaning" },
    { id: 3, service: "Plumbing" },
    { id: 4, service: "Painting" },
  ]);

  // My Services
  const [myServices, setMyServices] = useState<Service[]>([
    { id: 101, service: "Electric Repair" },
  ]);

  // SELECT SERVICE → move to My Services
  const handleSelectService = (service: Service) => {
    setMyServices((prev) => {
      // prevent duplicate
      if (prev.some((s) => s.service === service.service)) return prev;

      return [
        ...prev,
        {
          id: Date.now(),
          service: service.service,
        },
      ];
    });

    setAvailableServices((prev) =>
      prev.filter((item) => item.id !== service.id)
    );
  };

  // CANCEL SERVICE → move back to Available
  const handleCancelService = (service: Service) => {
    setAvailableServices((prev) => {
      if (prev.some((s) => s.service === service.service)) return prev;

      return [
        ...prev,
        {
          id: Date.now(),
          service: service.service,
        },
      ];
    });

    setMyServices((prev) =>
      prev.filter((item) => item.service !== service.service)
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* Sidebar */}
      <VendorSidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <VendorNavbar setOpen={setOpen} />

        {/* Content */}
        <div className="p-6 overflow-y-auto">

          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            Services
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">

            <button
              onClick={() => setActiveTab("available")}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                activeTab === "available"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              Available Services
            </button>

            <button
              onClick={() => setActiveTab("my")}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                activeTab === "my"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              My Services
            </button>

          </div>

          {/* AVAILABLE */}
          {activeTab === "available" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {availableServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {service.service}
                  </h2>

                  <button
                    onClick={() => handleSelectService(service)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm rounded-lg"
                  >
                    Select Service
                  </button>
                </div>
              ))}

            </div>
          )}

          {/* MY SERVICES */}
          {activeTab === "my" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {myServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {service.service}
                  </h2>

                  <button
                    onClick={() => handleCancelService(service)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}