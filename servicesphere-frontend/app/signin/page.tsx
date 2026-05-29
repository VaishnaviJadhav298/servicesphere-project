"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignInPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      // ================= CUSTOMER LOGIN =================
      if (selectedRole === "customer") {
        const res = await axios.post(
          "http://localhost:8080/api/auth/signin",
          {
            email: email.trim().toLowerCase(),
            password: password.trim(),
          }
        );

        localStorage.setItem("user", JSON.stringify(res.data));

        alert("Customer Login Successful");

        router.push("/customer/dashboard");
      }

      // ================= VENDOR LOGIN =================
      else if (selectedRole === "provider") {
        const res = await axios.post(
          "http://localhost:8080/auth/vendor/login",
          {
            email: email.trim().toLowerCase(),
            password: password.trim(),
          }
        );

        if (res.data === "Login Successful") {
          localStorage.setItem("vendorEmail", email);

          const vendorRes = await axios.get(
            `http://localhost:8080/auth/vendor/email/${email}`
          );

          localStorage.setItem("vendorId", vendorRes.data.id);
          localStorage.setItem(
            "vendor",
            JSON.stringify(vendorRes.data)
          );

          alert("Vendor Login Successful");

          router.push("/vendor/dashboard");
        } else {
          alert(res.data);
        }
      }
    } catch (err: any) {
      console.log(err);
      alert(err?.response?.data || "Login failed");
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

      {/* LEFT TEXT */}
      <div className="absolute left-20 max-w-2xl text-white z-10">
        <h1 className="text-7xl font-extrabold leading-tight">
          Welcome Back to <br />
          <span className="text-blue-500">ServiceSphere</span>
        </h1>

        <p className="mt-6 text-2xl text-gray-300">
          Sign in to continue booking trusted services anytime anywhere.
        </p>
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-12 py-8 shadow-2xl">

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white">Sign In</h1>
          <p className="text-gray-300 mt-2">Login to continue</p>
        </div>

        {/* ROLE SELECT */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole("customer")}
            className={`flex-1 py-4 rounded-2xl font-semibold text-lg border transition
              ${
                selectedRole === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white"
              }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("provider")}
            className={`flex-1 py-4 rounded-2xl font-semibold text-lg border transition
              ${
                selectedRole === "provider"
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white"
              }`}
          >
            Service Provider
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full p-4 rounded-xl bg-white/20 text-white outline-none"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full p-4 rounded-xl bg-white/20 text-white outline-none"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl text-white font-semibold"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <p className="text-center text-gray-300">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-blue-400 cursor-pointer"
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}