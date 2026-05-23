"use client";

import { useState } from "react";

import {
  Star,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function RatingsPage() {

  const router = useRouter();

  const [rating, setRating] =
    useState(0);

  const [hover, setHover] =
    useState(0);

  const [review, setReview] =
    useState("");

  const handleSubmit = () => {

    alert("Review Submitted");

    setRating(0);

    setReview("");
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden p-6"
      style={{
        backgroundImage:
          "url('/background-img.png')",
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition"
      >

        <ArrowLeft
          size={20}
          className="text-white"
        />

      </button>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7">

        {/* ICON */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto shadow-lg">

          <Sparkles
            size={34}
            className="text-white"
          />

        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center text-white mt-6">

          Rate Your Experience

        </h1>

        <p className="text-center text-gray-200 mt-3 text-base">

          Your feedback helps us improve our services

        </p>

        {/* STARS */}
        <div className="flex justify-center gap-4 mt-10">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() =>
                setHover(star)
              }
              onMouseLeave={() =>
                setHover(0)
              }
              className="hover:scale-125 transition duration-300"
            >

              <Star
                size={40}
                className={`drop-shadow-lg ${
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/40"
                }`}
              />

            </button>

          ))}

        </div>

        {/* TEXTAREA */}
        <div className="mt-10">

          <textarea
            placeholder="Tell us about your experience..."
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            className="w-full min-h-[140px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300 text-base resize-none"
          />

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="mt-7 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition duration-300 text-white py-3 rounded-2xl text-base font-semibold shadow-2xl"
        >

          Submit Review

        </button>

      </div>

    </div>

  );
}