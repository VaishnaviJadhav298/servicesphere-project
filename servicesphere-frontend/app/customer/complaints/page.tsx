"use client";

import { useState } from "react";
import axios from "axios";

export default function CustomerComplaintsPage() {

  const [bookingId, setBookingId] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  // SUBMIT
  const handleSubmit = async () => {

    if (
      !bookingId ||
      !subject ||
      !message
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await axios.post(
        "http://localhost:8080/complaints",
        {
          customerId: user.id,
          bookingId: Number(
            bookingId
          ),
          subject,
          message,
        }
      );

      alert(
        "Complaint Submitted Successfully"
      );

      setBookingId("");
      setSubject("");
      setMessage("");

    } catch (err) {

      console.log(err);

      alert("Failed to submit complaint");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-[550px] bg-white rounded-3xl shadow-xl p-7">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">

          Raise Complaint

        </h1>

        <p className="text-gray-500 mb-6">

          Submit your complaint regarding any booking

        </p>

        {/* BOOKING ID */}
        <div className="mb-5">

          <label className="block mb-2 font-semibold text-gray-700">

            Booking ID

          </label>

          <input
            type="number"
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) =>
              setBookingId(
                e.target.value
              )
            }
            className="w-full p-4 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* SUBJECT */}
        <div className="mb-5">

          <label className="block mb-2 font-semibold text-gray-700">

            Subject

          </label>

          <input
            type="text"
            placeholder="Enter complaint subject"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            className="w-full p-4 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* MESSAGE */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold text-gray-700">

            Complaint Message

          </label>

          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full p-4 border border-gray-300 rounded-2xl outline-none h-40 resize-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-2xl font-semibold text-lg"
        >

          Submit Complaint

        </button>

      </div>

    </div>

  );
}