"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignInPage() {

  const router = useRouter();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // LOGIN
  const handleLogin = async () => {

    if (!selectedRole) {

      alert("Please select a role");

      return;

    }

    try {

      // ================= CUSTOMER LOGIN =================
      if (selectedRole === "customer") {

        const res = await axios.post(

          "http://localhost:8080/api/auth/signin",

          {
            email,
            password,
          }

        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );

        alert("Customer Login Successful");

        router.push(
          "/customer/dashboard"
        );

      }

      // ================= VENDOR LOGIN =================
      else if (selectedRole === "provider") {

        const res = await axios.post(

          "http://localhost:8080/auth/vendor/login",

          {
            email,
            password,
          }

        );

        if (res.data === "Login Successful") {

          localStorage.setItem(
            "vendorEmail",
            email
          );

          alert("Vendor Login Successful");

          router.push(
            "/vendor/dashboard"
          );

        } else {

          alert(res.data);

        }

      }

    } catch (err) {

      console.log(err);

      alert("Login failed");

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

          Sign in to continue booking trusted services anytime anywhere.

        </p>

      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-12 py-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold text-white">
            Sign In
          </h1>

          <p className="text-gray-300 mt-2">
            Login to continue
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => {

            e.preventDefault();

            handleLogin();

          }}
        >

          {/* ROLE */}
          <div className="flex gap-4 mb-6">

            {/* CUSTOMER */}
            <button
              type="button"
              onClick={() =>
                setSelectedRole("customer")
              }
              className={`flex-1 py-4 rounded-2xl font-semibold text-lg border transition-all duration-300
                ${
                  selectedRole === "customer"
                    ? "bg-blue-600 text-white border-blue-500 shadow-2xl"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
            >

              Customer

            </button>

            {/* PROVIDER */}
            <button
              type="button"
              onClick={() =>
                setSelectedRole("provider")
              }
              className={`flex-1 py-4 rounded-2xl font-semibold text-lg border transition-all duration-300
                ${
                  selectedRole === "provider"
                    ? "bg-blue-600 text-white border-blue-500 shadow-2xl"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
            >

              Service Provider

            </button>

          </div>

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter Email Address"
            required
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500 w-full mb-5"
          />

          {/* PASSWORD */}
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter Password"
            required
            className="bg-white/20 border border-white/10 text-white placeholder-gray-300 p-4 rounded-xl outline-none focus:border-blue-500 w-full"
          />

          {/* FORGOT */}
          <div className="flex justify-end mt-3">

            <button
              type="button"
              className="text-blue-400 hover:underline text-sm"
            >

              Forgot Password?

            </button>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition mt-7 p-4 rounded-xl text-white font-semibold text-lg shadow-lg"
          >

            Sign In

          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">

          <div className="flex-1 h-[1px] bg-white/20"></div>

          <span className="text-gray-300 text-sm">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-white/20"></div>

        </div>

        {/* GOOGLE */}
        <button className="w-full bg-white text-black hover:bg-gray-200 transition p-4 rounded-xl font-semibold">

          Continue with Google

        </button>

        {/* Bottom */}
        <p className="text-gray-300 text-center mt-6">

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