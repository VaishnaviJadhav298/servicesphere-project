"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import API from "@/services/api";

export default function BookingPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const serviceId =
    searchParams.get("serviceId");

  const amount =
    searchParams.get("amount");

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    date: "",
    time: "",
  });

  // CONFIRM BOOKING
  const handleConfirm = async () => {

    if (
      !form.name ||
      !form.address ||
      !form.date ||
      !form.time
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      // GET LOGGED IN USER
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      // BOOKING PAYLOAD
      const payload = {

        customerId: user.id,

        serviceId: Number(serviceId),

        vendorId: null,

        bookingDate: form.date,

        bookingTime: form.time,

        address: form.address,

        amount: Number(amount),

        status: "PENDING",

      };

      // SAVE BOOKING
      await API.post(
        "/bookings",
        payload
      );

      // SUCCESS POPUP
      alert(
        "Booking Completed Successfully"
      );

      // REDIRECT
      router.push(
        "/customer/bookings"
      );

    } catch (error) {

      console.log(error);

      alert("Booking Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-white p-4">

      {/* CARD */}
      <div className="w-[420px] bg-gray-900 rounded-2xl p-6 shadow-2xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-6 text-white">

          Complete Booking

        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full p-4 mb-4 rounded-2xl bg-gray-200 outline-none"
        />

        {/* ADDRESS */}
        <input
          type="text"
          placeholder="Address *"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
          className="w-full p-4 mb-4 rounded-2xl bg-gray-200 outline-none"
        />

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
          className="w-full p-4 mb-4 rounded-2xl bg-gray-200 outline-none"
        />

        {/* TIME */}
        <input
          type="time"
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
          className="w-full p-4 mb-4 rounded-2xl bg-gray-200 outline-none"
        />

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">

          {/* CANCEL */}
          <button
            onClick={() => router.back()}
            className="w-1/2 bg-gray-500 hover:bg-gray-600 transition py-3 rounded-2xl font-semibold text-white"
          >
            Cancel
          </button>

          {/* CONFIRM */}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 transition py-3 rounded-2xl font-semibold text-white"
          >

            {loading
              ? "Booking..."
              : "Confirm"}

          </button>

        </div>

      </div>

    </div>
  );
}