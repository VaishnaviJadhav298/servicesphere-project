"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {

  const router = useRouter();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // SIGNUP
  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!selectedRole) {
      alert("Please select role");
      return;
    }

    try {

      setLoading(true);

      // ENDPOINTS
      const endpoint =
        selectedRole === "customer"
          ? "http://localhost:8080/api/auth/signup"
          : "http://localhost:8080/auth/vendor/register";

      // ✅ FIXED PAYLOAD (IMPORTANT CHANGE)
      const payload =
        selectedRole === "customer"
          ? {
              fullName: fullName,
              email: email,
              password: password,
              mobileNumber: mobileNumber,
              address: address,
              role: "customer",
            }
          : {
              fullName: fullName,
              email: email,
              password: password,
              mobileNumber: mobileNumber,
              address: address,
            };

      // API CALL
      const response = await axios.post(
        endpoint,
        payload
      );

      console.log("SIGNUP RESPONSE:", response.data);

      alert("Signup Successful");

      localStorage.setItem("userEmail", email);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      if (
        selectedRole === "provider" &&
        response.data?.id
      ) {
        localStorage.setItem(
          "vendorId",
          response.data.id.toString()
        );
      }

      if (selectedRole === "customer") {
        router.push("/customer/dashboard");
      } else {
        router.push("/vendor/dashboard");
      }

    } catch (error: any) {

      console.log(
        "FULL ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center relative flex justify-end items-center px-20"
      style={{
        backgroundImage: "url('/background-img.png')",
      }}
    >

      <div className="absolute inset-0 bg-black/60"></div>

      {/* LEFT SECTION */}
      <div className="absolute left-20 max-w-2xl text-white z-10">

        <h1 className="text-7xl font-extrabold leading-tight">

          Join <br />
          <span className="text-blue-500">
            ServiceSphere
          </span>

        </h1>

        <p className="mt-6 text-xl text-gray-300">

          Discover trusted service providers
          for home services, repairs,
          cleaning, car wash and more.

        </p>

      </div>

      {/* SIGNUP CARD */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-2xl">

        <div className="text-center mb-6">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

        </div>

        {/* ROLE */}
        <div className="flex gap-3 mb-5">

          <button
            type="button"
            onClick={() => setSelectedRole("customer")}
            className={`flex-1 py-3 rounded-xl font-semibold border transition ${
              selectedRole === "customer"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("provider")}
            className={`flex-1 py-3 rounded-xl font-semibold border transition ${
              selectedRole === "provider"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white/10 text-white border-white/20"
            }`}
          >
            Provider
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="grid grid-cols-2 gap-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="tel"
            placeholder="Mobile"
            required
            value={mobileNumber}
            onChange={(e) =>
              setMobileNumber(e.target.value)
            }
            className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <textarea
            placeholder="Address"
            rows={3}
            required
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="col-span-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl text-white font-bold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

      </div>

    </div>
  );
}