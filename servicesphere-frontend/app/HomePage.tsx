"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white">

      {/* HERO SECTION */}
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background-img.png')" }}
      >
        <div className="bg-black/60 min-h-[100vh]">

          <Navbar />

          <section className="flex flex-col justify-center items-start
            px-4 sm:px-6 md:px-12 lg:px-20
            min-h-[90vh]">

            {/* TITLE */}
            <h1 className="
              text-3xl sm:text-4xl md:text-6xl lg:text-7xl
              font-extrabold leading-tight
              max-w-3xl
            ">
              Book Trusted Services <br />
              Anytime with{" "}
              <span className="text-blue-500">
                ServiceSphere
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="
              text-gray-300
              text-sm sm:text-base md:text-lg lg:text-xl
              mt-5 md:mt-8
              max-w-2xl
            ">
              Connect with trusted service providers for car wash,
              home services, repairs, cleaning, and more — all in one platform.
            </p>

            {/* BUTTONS */}
            <div className="
              flex flex-col sm:flex-row
              gap-4 sm:gap-5
              mt-8 md:mt-10
              w-full sm:w-auto
            ">

              <button
                onClick={() => router.push("/services")}
                className="
                  bg-blue-600 hover:bg-blue-700
                  px-6 sm:px-8 py-3 sm:py-4
                  rounded-xl text-base sm:text-lg
                  font-semibold transition
                  w-full sm:w-auto
                "
              >
                Explore Services
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="
                  border border-white/30 bg-white/5
                  hover:bg-white hover:text-black
                  px-6 sm:px-8 py-3 sm:py-4
                  rounded-xl text-base sm:text-lg
                  font-semibold transition
                  w-full sm:w-auto
                "
              >
                Become Provider
              </button>

            </div>

          </section>

        </div>
      </div>
 {/* RATINGS SECTION */}
<section className="bg-gray-50 text-black py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">

  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
    User Ratings & Experience
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* CARD 1 */}
    <div className="bg-white p-6 rounded-2xl shadow">

      <div className="text-yellow-400 text-xl">
        ★★★★★
      </div>

      <p className="mt-3 text-gray-700">
        "Very fast service! Booked plumber in 10 minutes."
      </p>

      <h4 className="mt-4 font-semibold">- Rahul Patil</h4>
    </div>

    {/* CARD 2 */}
    <div className="bg-white p-6 rounded-2xl shadow">

      <div className="text-yellow-400 text-xl">
        ★★★★☆
      </div>

      <p className="mt-3 text-gray-700">
        "Good experience, cleaning service was professional."
      </p>

      <h4 className="mt-4 font-semibold">- Sneha Joshi</h4>
    </div>

    {/* CARD 3 */}
    <div className="bg-white p-6 rounded-2xl shadow">

      <div className="text-yellow-400 text-xl">
        ★★★★★
      </div>

      <p className="mt-3 text-gray-700">
        "Affordable and trusted service providers."
      </p>

      <h4 className="mt-4 font-semibold">- Amit Deshmukh</h4>
    </div>

  </div>
</section>
      {/* UX SECTION */}
      <section className="bg-white text-black py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
          User Experience
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">

          <div className="p-6 md:p-8 bg-gray-100 rounded-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="p-6 md:p-8 bg-gray-100 rounded-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-green-600">4.8/5</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>

          <div className="p-6 md:p-8 bg-gray-100 rounded-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-purple-600">15K+</h3>
            <p className="text-gray-600">Completed Services</p>
          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}