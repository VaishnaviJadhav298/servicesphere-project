"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  IndianRupee,
  Briefcase,
} from "lucide-react";
import API from "@/services/api";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await API.get("/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ONLY NAVIGATE (NO BOOKING HERE)
  const bookService = (serviceId: number, amount: number) => {
    router.push(
      `/customer/booking?serviceId=${serviceId}&amount=${amount}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-5">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-3xl font-bold">Explore Services</h1>
          <p className="text-sm text-gray-500">
            Choose and book instantly
          </p>
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-5 rounded-2xl shadow-sm border"
            >
              <Briefcase className="text-blue-600 mb-3" />

              <h2 className="text-xl font-bold">
                {service.name}
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                {service.description}
              </p>

              <div className="flex items-center mt-3 text-green-600 font-bold">
                <IndianRupee size={16} />
                {service.price}
              </div>

              <button
                onClick={() =>
                  bookService(service.id, service.price)
                }
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl"
              >
                Book Now
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}