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

  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH SERVICES
  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices = async () => {

    try {

      const response =
        await API.get("/services");

      setServices(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // CREATE BOOKING
  const bookService = async (
    serviceId: number,
    amount: number
  ) => {

    try {

      await API.post("/bookings", {

        customerId: 1,
        vendorId: 1,
        serviceId: serviceId,
        bookingDate: "2026-05-25",
        address: "Aurangabad",
        amount: amount,

      });

      alert("Booking Created Successfully");

      router.push("/customer/bookings");

    } catch (error) {

      console.error(error);

      alert("Booking Failed");
    }
  };

  return (

    <div className="min-h-screen bg-[#f4f7fb] p-5">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center"
        >

          <ArrowLeft
            size={18}
            className="text-gray-700"
          />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-900">

            Explore Services

          </h1>

          <p className="text-sm text-gray-500 mt-1">

            Choose and book services instantly

          </p>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center mt-20 text-lg font-semibold">

          Loading services...

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {services.map((service) => (

            <div
              key={service.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
            >

              {/* ICON */}
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">

                <Briefcase
                  size={26}
                  className="text-blue-600"
                />

              </div>

              {/* NAME */}
              <h2 className="text-2xl font-bold text-gray-900">

                {service.name}

              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-2 leading-6">

                {service.description}

              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2 mt-4">

                <IndianRupee
                  size={18}
                  className="text-green-600"
                />

                <span className="text-xl font-bold text-green-600">

                  {service.price}

                </span>

              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  bookService(
                    service.id,
                    service.price
                  )
                }
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
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