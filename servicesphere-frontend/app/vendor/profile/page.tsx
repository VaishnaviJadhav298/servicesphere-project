"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

import { Mail, Phone, MapPin, Briefcase, Camera } from "lucide-react";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [loggedEmail, setLoggedEmail] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // Load email
  useEffect(() => {
    const email = localStorage.getItem("vendorEmail");
    setLoggedEmail(email);
  }, []);

  // Fetch profile
  useEffect(() => {
    if (!loggedEmail) return;
    fetchVendor(loggedEmail);
  }, [loggedEmail]);

  // 🔥 IMAGE NORMALIZER (MAIN FIX)
  const getImageUrl = (img?: string) => {
    if (!img) return null;

    if (img.startsWith("http")) return img;

    const clean = img.replace("/uploads/", "");

    return `http://localhost:8080/uploads/${clean}`;
  };

  // FETCH PROFILE
  const fetchVendor = async (email: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/vendor/email/${email}`
      );

      const v = res.data;

      setName(v.name || "");
      setEmail(v.email || "");
      setPhone(v.phone || "");
      setLocation(v.address || "");
      setExperience(v.availableTime || "");

      // 🔥 SAFE IMAGE SET
      setImage(getImageUrl(v.profileImage));
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // UPDATE PROFILE
  const handleSave = async () => {
    try {
      const payload = {
        name,
        phone,
        address: location,
        availableTime: experience,
      };

      await axios.put(
        `http://localhost:8080/auth/vendor/update/${loggedEmail}`,
        payload
      );

      setEditing(false);
      if (loggedEmail) fetchVendor(loggedEmail);

      alert("Profile Updated Successfully!");
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  // IMAGE UPLOAD
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !loggedEmail) return;

    // instant preview
    setImage(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `http://localhost:8080/auth/vendor/upload-image/${loggedEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (loggedEmail) fetchVendor(loggedEmail);

      alert("Image Uploaded!");
    } catch (err) {
      console.log(err);
      alert("Upload Failed!");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (loggedEmail) fetchVendor(loggedEmail);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a]">
      <VendorSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <VendorNavbar setOpen={setOpen} />

        <div className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold dark:text-white">
            Vendor Profile
          </h1>

          <div className="bg-white dark:bg-[#1e293b] p-8 mt-6 rounded-2xl">
            {/* IMAGE */}
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              <div className="relative w-28 h-28">
                <div className="w-28 h-28 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    name?.charAt(0) || "V"
                  )}
                </div>

                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow"
                >
                  <Camera size={16} />
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={handleImage}
                />
              </div>

              {/* NAME */}
              <div className="flex-1">
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full dark:bg-[#0f172a] dark:text-white"
                  />
                ) : (
                  <h2 className="text-2xl font-bold dark:text-white">
                    {name}
                  </h2>
                )}

                <p className="text-indigo-500 mt-1">Vendor</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">
                <Mail className="mb-2 dark:text-white" />
                <p className="dark:text-white">{email}</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">
                <Phone className="mb-2 dark:text-white" />
                {editing ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />
                ) : (
                  <p className="dark:text-white">{phone}</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">
                <MapPin className="mb-2 dark:text-white" />
                {editing ? (
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />
                ) : (
                  <p className="dark:text-white">{location}</p>
                )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">
                <Briefcase className="mb-2 dark:text-white" />
                {editing ? (
                  <input
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />
                ) : (
                  <p className="dark:text-white">{experience}</p>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => (editing ? handleCancel() : setEditing(true))}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
              >
                {editing ? "Cancel" : "Edit"}
              </button>

              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}