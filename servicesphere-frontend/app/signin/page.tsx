"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import API from "@/services/api";

export default function SignInPage() {

  const router = useRouter();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // HANDLE LOGIN
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!selectedRole) {

      alert("Please select a role");

      return;
    }

    try {

      setLoading(true);

      const response =
        await API.post(
          "/auth/signin",
          {
            email,
            password,
          }
        );

      console.log(response.data);

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

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
          "/vendor/dashboard"
        );
      }

    } catch (error) {

      console.error(error);

      alert("Invalid Credentials");
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

          Welcome Back to <br />

          <span className="text-blue-500">
            ServiceSphere
          </span>

        </h1>

        <p className="mt-6 text-2xl text-gray-300 leading-relaxed">

          Sign in to continue booking trusted
          services anytime anywhere.

        </p>

      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-6">

          <h1 className="text-4xl font-bold text-white">

            Sign In

          </h1>

          <p className="text-gray-300 mt-1 text-sm">

            Login to continue

          </p>

        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* Role Selection */}
          <div className="flex gap-3 mb-5">

            {/* Customer */}
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

            {/* Provider */}
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

              Service Provider

            </button>

          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email Address"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:border-blue-500"
            />

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mt-2">

            <button
              type="button"
              className="text-blue-400 hover:underline text-sm"
            >

              Forgot Password?

            </button>

          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition mt-5 p-3 rounded-xl text-white font-semibold text-base shadow-lg"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-5">

          <div className="flex-1 h-[1px] bg-white/20"></div>

          <span className="text-gray-300 text-sm">

            OR

          </span>

          <div className="flex-1 h-[1px] bg-white/20"></div>

        </div>

        {/* Google Login */}
        <button className="w-full bg-white text-black hover:bg-gray-200 transition p-3 rounded-xl font-semibold text-sm">

          Continue with Google

        </button>

        {/* Bottom Text */}
        <p className="text-gray-300 text-center mt-5 text-sm">

          Don&apos;t have an account?

          <span
            onClick={() =>
              router.push("/signup")
            }
            className="text-blue-400 cursor-pointer ml-2 hover:underline"
          >

            Sign Up

          </span>

        </p>

      </div>

    </div>

  );

}