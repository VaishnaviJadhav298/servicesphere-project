"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

type Service = {
  id: number;
  vendorId?: number;
  name: string;
  description: string;
  price: number;
};

export default function ActivePage() {

  const [open, setOpen] = useState(false);

  const [activeTab, setActiveTab] =
    useState<"available" | "my">("available");

  const [availableServices, setAvailableServices] =
    useState<Service[]>([]);

  const [myServices, setMyServices] =
    useState<Service[]>([]);

  // FETCH SERVICES
  const fetchServices = async () => {

    try {

      const vendorId =
        localStorage.getItem("vendorId");

      if (!vendorId) return;

      const res = await axios.get(
        "http://localhost:8080/api/services"
      );

      const allServices = res.data;

      // AVAILABLE SERVICES
      const available =
        allServices.filter(
          (service: Service) =>
            !service.vendorId
        );

      // MY SERVICES
      const mine =
        allServices.filter(
          (service: Service) =>
            service.vendorId === Number(vendorId)
        );

      setAvailableServices(available);

      setMyServices(mine);

    } catch (err) {

      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {

    fetchServices();

  }, []);

  // SELECT SERVICE
  const handleSelectService = async (
    service: Service
  ) => {

    try {

      const vendorId =
        localStorage.getItem("vendorId");

      if (!vendorId) {

        alert("Vendor not logged in");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/services/assign",
        null,
        {
          params: {
            serviceId: service.id,
            vendorId: Number(vendorId),
          },
        }
      );

      alert("Service selected");

      // REFRESH DATA
      fetchServices();

      // SWITCH TAB
      setActiveTab("my");

    } catch (err) {

      console.log("Select error:", err);

      alert(
        "Service assign failed"
      );
    }
  };

  // CANCEL SERVICE
  const handleCancelService = async (
    service: Service
  ) => {

    try {

      await axios.put(
        `http://localhost:8080/api/services/${service.id}`,
        {
          ...service,
          vendorId: null,
        }
      );

      alert("Service cancelled");

      fetchServices();

      setActiveTab("available");

    } catch (err) {

      console.log(err);

      alert("Cancel failed");
    }
  };

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a] transition">

      {/* SIDEBAR */}
      <VendorSidebar
        open={open}
        setOpen={setOpen}
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <VendorNavbar
          setOpen={setOpen}
        />

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">

          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            Services
          </h1>

          {/* TABS */}
          <div className="flex gap-4 mb-8">

            <button
              onClick={() =>
                setActiveTab("available")
              }
              className={`px-5 py-2 rounded-xl font-medium transition ${
                activeTab === "available"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              Available Services
            </button>

            <button
              onClick={() =>
                setActiveTab("my")
              }
              className={`px-5 py-2 rounded-xl font-medium transition ${
                activeTab === "my"
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#1e293b] dark:text-white"
              }`}
            >
              My Services
            </button>

          </div>

          {/* AVAILABLE SERVICES */}
          {activeTab === "available" && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {availableServices.length === 0 ? (

                <p className="text-gray-500 dark:text-gray-300">
                  No services available
                </p>

              ) : (

                availableServices.map((service) => (

                  <div
                    key={service.id}
                    className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow"
                  >

                    <h2 className="text-xl font-semibold dark:text-white mb-3">
                      {service.name}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {service.description}
                    </p>

                    <p className="text-indigo-600 font-semibold mb-4">
                      ₹{service.price}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleSelectService(service)
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Select Service
                    </button>

                  </div>

                ))
              )}

            </div>
          )}

          {/* MY SERVICES */}
          {activeTab === "my" && (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {myServices.length === 0 ? (

                <p className="text-gray-500 dark:text-gray-300">
                  No selected services
                </p>

              ) : (

                myServices.map((service) => (

                  <div
                    key={service.id}
                    className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow"
                  >

                    <h2 className="text-xl font-semibold dark:text-white mb-3">
                      {service.name}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {service.description}
                    </p>

                    <p className="text-indigo-600 font-semibold mb-4">
                      ₹{service.price}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleCancelService(service)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>

                  </div>

                ))
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}