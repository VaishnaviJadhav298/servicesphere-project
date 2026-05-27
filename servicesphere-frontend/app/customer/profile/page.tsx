"use client";

import { useState, useEffect } from "react";

import axios from "axios";

import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function CustomerProfilePage() {

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
  });

  const [temp, setTemp] = useState(profile);

  // FETCH USER
  useEffect(() => {

    setMounted(true);

    const user =
      JSON.parse(
        localStorage.getItem("user") || "{}"
      );

    if (user?.id) {

      setProfile(user);

      setTemp(user);

    }

  }, []);

  if (!mounted) return null;

  const handleEdit = () => {

    setTemp(profile);

    setIsEditing(true);

  };

  // SAVE PROFILE
  const handleSave = async () => {

    try {

      const response =
        await axios.put(

          `http://localhost:8080/api/auth/update/${profile.id}`,

          temp

        );

      setProfile(response.data);

      setTemp(response.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      setIsEditing(false);

      alert("Profile Updated Successfully");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  const handleCancel = () => {

    setTemp(profile);

    setIsEditing(false);

  };

  return (

    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-black"
      }`}
    >

      {/* TOP HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition shadow-sm border ${
              darkMode
                ? "bg-[#1e293b] border-gray-700 hover:bg-[#334155]"
                : "bg-white border-gray-200 hover:bg-gray-100"
            }`}
          >
            <ArrowLeft size={22} />
          </button>

          <div>

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p
              className={`mt-1 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              Manage your personal information
            </p>

          </div>

        </div>

        {/* DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition hover:scale-105 ${
            darkMode
              ? "bg-yellow-400 text-black"
              : "bg-black text-white"
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CARD */}
        <div
          className={`rounded-3xl shadow-sm border p-6 ${
            darkMode
              ? "bg-[#1e293b] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          <div className="flex flex-col items-center">

            <div className="relative">

              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">

                {profile.fullName?.charAt(0)}

              </div>

              <button
                className={`absolute bottom-1 right-1 p-2 rounded-full shadow border transition ${
                  darkMode
                    ? "bg-[#0f172a] border-gray-700 hover:bg-[#334155]"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Camera size={18} />
              </button>

            </div>

            <h2 className="text-2xl font-bold mt-4">
              {profile.fullName}
            </h2>

            <p
              className={`${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Customer
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div
          className={`lg:col-span-2 rounded-3xl shadow-sm border p-8 ${
            darkMode
              ? "bg-[#1e293b] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          {/* TOP */}
          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-2xl font-bold">
                Personal Details
              </h2>

            </div>

            {!isEditing ? (

              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl shadow-md"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>

            ) : (

              <div className="flex gap-3">

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-2xl"
                >
                  <Save size={18} />
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className={`px-5 py-3 rounded-2xl transition ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>

              <label className="text-sm font-semibold">
                Full Name
              </label>

              <input
                disabled={!isEditing}
                value={temp.fullName}
                onChange={(e) =>
                  setTemp({
                    ...temp,
                    fullName: e.target.value,
                  })
                }
                className={`w-full mt-2 p-4 rounded-2xl border outline-none transition ${
                  darkMode
                    ? "bg-[#0f172a] border-gray-700 text-white"
                    : "bg-white text-black border-gray-200"
                }`}
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="text-sm font-semibold">
                Email Address
              </label>

              <div
                className={`flex items-center mt-2 rounded-2xl border p-4 ${
                  darkMode
                    ? "bg-[#0f172a] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >

                <Mail
                  className="mr-3"
                  size={18}
                />

                <input
                  disabled={!isEditing}
                  value={temp.email}
                  onChange={(e) =>
                    setTemp({
                      ...temp,
                      email: e.target.value,
                    })
                  }
                  className="w-full outline-none bg-transparent"
                />

              </div>

            </div>

            {/* PHONE */}
            <div>

              <label className="text-sm font-semibold">
                Phone Number
              </label>

              <div
                className={`flex items-center mt-2 rounded-2xl border p-4 ${
                  darkMode
                    ? "bg-[#0f172a] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >

                <Phone
                  className="mr-3"
                  size={18}
                />

                <input
                  disabled={!isEditing}
                  value={temp.mobileNumber}
                  onChange={(e) =>
                    setTemp({
                      ...temp,
                      mobileNumber: e.target.value,
                    })
                  }
                  className="w-full outline-none bg-transparent"
                />

              </div>

            </div>

            {/* ADDRESS */}
            <div>

              <label className="text-sm font-semibold">
                Address
              </label>

              <div
                className={`flex items-center mt-2 rounded-2xl border p-4 ${
                  darkMode
                    ? "bg-[#0f172a] border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >

                <MapPin
                  className="mr-3"
                  size={18}
                />

                <input
                  disabled={!isEditing}
                  value={temp.address}
                  onChange={(e) =>
                    setTemp({
                      ...temp,
                      address: e.target.value,
                    })
                  }
                  className="w-full outline-none bg-transparent"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}