"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

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

  // HANDLE SIGNUP
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

      const response =
        await API.post(
          "/auth/signup",
          {
            fullName,
            email,
            password,
            mobileNumber,
            address,
          }
        );

      console.log(response.data);

      alert("Signup Successful");

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      // CUSTOMER
      if (
        selectedRole === "customer"
      ) {

        router.push(
          "/customer/dashboard"
        );
      }

      // PROVIDER
      else if (
        selectedRole === "provider"
      ) {

        router.push(
          "/vendor/complete-profile"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Signup Failed");
    }

    finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center relative flex justify-end items-center px-20"
      style={{
        backgroundImage:
          "url('/background-img.png')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Left Content */}
      <div className="absolute left-20 max-w-2xl text-white z-10">

        <h1 className="text-7xl font-extrabold leading-tight">

          Join <br />

          <span className="text-blue-500">
            ServiceSphere
          </span>

        </h1>

        <p className="mt-6 text-xl text-gray-300 leading-relaxed">

          Discover trusted service providers
          for home services, repairs,
          cleaning, car wash and more.

        </p>

      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-6">

          <h1 className="text-4xl font-bold text-white">

            Create Account

          </h1>

          <p className="text-gray-300 mt-1 text-sm">

            Create your account to continue

          </p>

        </div>

        {/* ROLE SELECTION */}
        <div className="flex gap-3 mb-5">

          {/* CUSTOMER */}
          <button
            type="button"
            onClick={() =>
              setSelectedRole(
                "customer"
              )
            }
            className={`flex-1 py-3 rounded-xl font-semibold text-base border transition-all duration-300
              ${
                selectedRole ===
                "customer"
                  ? "bg-blue-600 text-white border-blue-500 shadow-xl"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }
            `}
          >

            Customer

          </button>

          {/* PROVIDER */}
          <button
            type="button"
            onClick={() =>
              setSelectedRole(
                "provider"
              )
            }
            className={`flex-1 py-3 rounded-xl font-semibold text-base border transition-all duration-300
              ${
                selectedRole ===
                "provider"
                  ? "bg-blue-600 text-white border-blue-500 shadow-xl"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }
            `}
          >

            Provider

          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="grid grid-cols-2 gap-4"
        >

          {/* FULL NAME */}
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Gmail Address"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* MOBILE */}
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={mobileNumber}
            onChange={(e) =>
              setMobileNumber(
                e.target.value
              )
            }
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
          />

          {/* ADDRESS */}
          <textarea
            placeholder="Address"
            rows={3}
            required
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="col-span-2 bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500 resize-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 transition mt-1 p-3 rounded-xl text-white font-semibold text-base shadow-lg"
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

        </form>

      </div>

    </div>

  );

}