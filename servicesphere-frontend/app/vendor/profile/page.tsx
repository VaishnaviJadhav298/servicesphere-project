"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
} from "lucide-react";

export default function ProfilePage() {

  const [open, setOpen] = useState(false);

  const [editing, setEditing] =
    useState(false);

  const [vendorId, setVendorId] =
    useState<string | null>(null);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [image, setImage] =
    useState<string | null>(null);

  const fileRef =
    useRef<HTMLInputElement>(null);

  // LOAD VENDOR ID
  useEffect(() => {

    const id =
      localStorage.getItem("vendorId");

    setVendorId(id);

  }, []);

  // FETCH PROFILE
  useEffect(() => {

    if (vendorId) {

      fetchVendor(vendorId);

    }

  }, [vendorId]);

  // IMAGE URL
  const getImageUrl = (img?: string) => {

    if (!img) return null;

    if (img.startsWith("http")) {

      return img;

    }

    return `http://localhost:8080/uploads/${img}`;

  };

  // FETCH VENDOR
  const fetchVendor = async (
    id: string
  ) => {

    try {

      const res = await axios.get(
        `http://localhost:8080/auth/vendor/${id}`
      );

      const v = res.data;

      console.log("VENDOR DATA:", v);

      setName(v.name || "");

      setEmail(v.email || "");

      setPhone(v.phone || "");

      setLocation(v.address || "");

      setExperience(
        v.availableTime || ""
      );

      setImage(
        getImageUrl(v.profileImage)
      );

    } catch (err) {

      console.log(
        "FETCH ERROR:",
        err
      );
    }
  };

  // UPDATE PROFILE
  const handleSave = async () => {

    try {

      if (!vendorId) {

        alert("Vendor not found");
        return;
      }

      const payload = {

        name,

        email,

        phone,

        address: location,

        availableTime: experience,
      };

      await axios.put(
        `http://localhost:8080/auth/vendor/update/${vendorId}`,
        payload
      );

      alert(
        "Profile Updated Successfully!"
      );

      setEditing(false);

      fetchVendor(vendorId);

    } catch (err) {

      console.log(err);

      alert("Update Failed!");
    }
  };

  // IMAGE UPLOAD
  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file || !vendorId) return;

    // PREVIEW
    setImage(
      URL.createObjectURL(file)
    );

    try {

      const formData =
        new FormData();

      formData.append("file", file);

      await axios.post(
        `http://localhost:8080/auth/vendor/upload-image/${vendorId}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      fetchVendor(vendorId);

      alert("Image Uploaded!");

    } catch (err) {

      console.log(err);

      alert("Upload Failed!");
    }
  };

  // CANCEL
  const handleCancel = () => {

    setEditing(false);

    if (vendorId) {

      fetchVendor(vendorId);

    }
  };

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a]">

      {/* SIDEBAR */}
      <VendorSidebar
        open={open}
        setOpen={setOpen}
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <VendorNavbar
          setOpen={setOpen}
        />

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">

          <h1 className="text-3xl font-bold dark:text-white">

            Vendor Profile

          </h1>

          {/* CARD */}
          <div className="bg-white dark:bg-[#1e293b] p-8 mt-6 rounded-2xl shadow">

            {/* TOP */}
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">

              {/* IMAGE */}
              <div className="relative w-28 h-28">

                <div className="w-28 h-28 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl overflow-hidden">

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

                {/* CAMERA */}
                <button
                  onClick={() =>
                    fileRef.current?.click()
                  }
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
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="border p-2 rounded w-full dark:bg-[#0f172a] dark:text-white"
                  />

                ) : (

                  <h2 className="text-2xl font-bold dark:text-white">

                    {name}

                  </h2>

                )}

                <p className="text-indigo-500 mt-1">

                  Vendor

                </p>

              </div>

            </div>

            {/* DETAILS */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">

              {/* EMAIL */}
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">

                <Mail className="mb-2 dark:text-white" />

                <p className="dark:text-white">

                  {email}

                </p>

              </div>

              {/* PHONE */}
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">

                <Phone className="mb-2 dark:text-white" />

                {editing ? (

                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />

                ) : (

                  <p className="dark:text-white">

                    {phone}

                  </p>

                )}

              </div>

              {/* ADDRESS */}
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">

                <MapPin className="mb-2 dark:text-white" />

                {editing ? (

                  <input
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />

                ) : (

                  <p className="dark:text-white">

                    {location}

                  </p>

                )}

              </div>

              {/* AVAILABLE TIME */}
              <div className="p-4 bg-gray-50 dark:bg-[#0f172a] rounded-xl">

                <Briefcase className="mb-2 dark:text-white" />

                {editing ? (

                  <input
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        e.target.value
                      )
                    }
                    placeholder="Available Time"
                    className="border p-2 w-full rounded dark:bg-[#1e293b] dark:text-white"
                  />

                ) : (

                  <p className="dark:text-white">

                    {experience}

                  </p>

                )}

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-8">

              <button
                onClick={() =>
                  editing
                    ? handleCancel()
                    : setEditing(true)
                }
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
              >

                {editing
                  ? "Cancel"
                  : "Edit"}

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