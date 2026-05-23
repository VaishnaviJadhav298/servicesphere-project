"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  IndianRupee,
  MapPin,
  CreditCard,
} from "lucide-react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

type Booking = {
  id: number;
  bookingDate: string;
  address: string;
  amount: number;
  otp: string | null;
  status: string;
  paymentStatus: string;
};

export default function CustomerBookingsPage() {

  const router = useRouter();

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      setLoading(true);

      setError("");

      
      const user =
  JSON.parse(
    localStorage.getItem("user") || "{}"
  );

const response =
  await API.get(
    `/bookings/customer/${user.id}`
  );

      setBookings(response.data);

    } catch (error) {

      console.error(error);

      setError("Failed to load bookings");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#f4f7fb] p-4">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">

        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center hover:scale-105 transition"
        >

          <ArrowLeft
            size={18}
            className="text-gray-700"
          />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-gray-900">

            My Bookings

          </h1>

          <p className="text-gray-500 mt-1 text-sm">

            Track all your service bookings

          </p>

          {/* REFRESH BUTTON */}
          <button
            onClick={fetchBookings}
            className="mt-3 text-sm bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
          >

            Refresh Bookings

          </button>

        </div>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="text-center mt-20 text-base font-semibold text-gray-700">

          Loading bookings...

        </div>

      ) : error ? (

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">

          <h2 className="text-red-600 font-semibold text-lg">

            {error}

          </h2>

        </div>

      ) : bookings.length === 0 ? (

        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200">

          <h2 className="text-2xl font-bold text-gray-900">

            No Bookings Found

          </h2>

          <p className="text-gray-500 mt-2 text-sm">

            You haven't booked any services yet.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {bookings.map((booking) => (

            <div
              key={booking.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
            >

              {/* TOP */}
              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">

                    Booking #{booking.id}

                  </h2>

                  <p className="text-base text-gray-700 mt-1">

                    Status :

                    <span
                      className={`font-semibold ml-2 ${
                        booking.status === "COMPLETED"
                          ? "text-green-600"
                          : booking.status === "PENDING"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}
                    >

                      {booking.status}

                    </span>

                  </p>

                </div>

                <div className="px-4 py-1.5 rounded-xl bg-blue-100 text-blue-700 font-semibold text-sm">

                  {booking.paymentStatus}

                </div>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                {/* DATE */}
                <div className="bg-[#f4f7fb] rounded-xl p-4 border border-gray-100">

                  <div className="flex items-center gap-2 mb-2">

                    <CalendarDays
                      className="text-blue-600"
                      size={18}
                    />

                    <span className="font-medium text-sm text-gray-700">

                      Booking Date

                    </span>

                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">

                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}

                  </h3>

                </div>

                {/* ADDRESS */}
                <div className="bg-[#f4f7fb] rounded-xl p-4 border border-gray-100">

                  <div className="flex items-center gap-2 mb-2">

                    <MapPin
                      className="text-red-500"
                      size={18}
                    />

                    <span className="font-medium text-sm text-gray-700">

                      Address

                    </span>

                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">

                    {booking.address}

                  </h3>

                </div>

                {/* AMOUNT */}
                <div className="bg-[#f4f7fb] rounded-xl p-4 border border-gray-100">

                  <div className="flex items-center gap-2 mb-2">

                    <IndianRupee
                      className="text-green-600"
                      size={18}
                    />

                    <span className="font-medium text-sm text-gray-700">

                      Amount

                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-green-600">

                    ₹ {booking.amount}

                  </h3>

                </div>

              </div>

              {/* OTP */}
              {booking.otp ? (

                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

                  <div className="flex items-center gap-3">

                    <div className="bg-yellow-100 p-2 rounded-lg">

                      <CreditCard
                        className="text-yellow-700"
                        size={18}
                      />

                    </div>

                    <div>

                      <p className="text-xs text-gray-600 font-medium">

                        Service OTP

                      </p>

                      <h2 className="text-2xl font-bold tracking-[4px] text-yellow-700">

                        {booking.otp}

                      </h2>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="mt-4 text-sm text-gray-400">

                  OTP not generated yet

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );
}