"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<"customer" | "provider" | "">("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select Customer or Provider");
      return;
    }

    try {
      setLoading(true);

      const isCustomer = selectedRole === "customer";

      const endpoint = isCustomer
        ? "http://localhost:8080/api/auth/signup"
        : "http://localhost:8080/auth/vendor/register";

      const payload = isCustomer
        ? {
            fullName,
            email: email.trim().toLowerCase(),
            password,
            mobileNumber,
            address,
          }
        : {
            name: fullName,
            email: email.trim().toLowerCase(),
            password,
            phone: mobileNumber,
            address,
          };

      const res = await axios.post(endpoint, payload);

      console.log("SIGNUP RESPONSE:", res.data);

      if (isCustomer) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Customer Signup Successful");
        router.push("/customer/dashboard");
      } else {
        alert("Provider Signup Successful. Wait for admin approval.");
        router.push("/signin");
      }

    } catch (err: any) {
      console.log(err);
      alert(err?.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-end items-center px-20 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background-img.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LEFT */}
      <div className="absolute left-20 text-white max-w-xl z-10">
        <h1 className="text-6xl font-bold">
          Join <span className="text-blue-500">ServiceSphere</span>
        </h1>
        <p className="mt-4 text-gray-300">
          Create account as Customer or Service Provider
        </p>
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 p-8 rounded-3xl">

        {/* ROLE BUTTONS */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => setSelectedRole("customer")}
            className={`flex-1 p-3 rounded-xl font-semibold transition
              ${selectedRole === "customer"
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white"
              }`}
          >
            Customer
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("provider")}
            className={`flex-1 p-3 rounded-xl font-semibold transition
              ${selectedRole === "provider"
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white"
              }`}
          >
            Provider
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-4">

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
          />

          <input
            placeholder="Mobile"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 p-3 rounded-xl text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

      </div>
    </div>
  );
}