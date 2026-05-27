"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import VendorSidebar from "@/components/VendorSidebar";
import VendorNavbar from "@/components/VendorNavbar";

export default function RequestsPage() {

  const [open, setOpen] = useState(false);

  const [requests, setRequests] = useState<any[]>([]);

  // ✅ GET VENDOR ID FROM LOCAL STORAGE
  const vendorId =
    typeof window !== "undefined"
      ? localStorage.getItem("vendorId")
      : null;

  // FETCH REQUESTS
  useEffect(() => {

    if (vendorId) {

      fetchRequests();

    }

  }, [vendorId]);

  // FETCH FUNCTION
  const fetchRequests = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8080/auth/vendor/requests/${vendorId}`
      );

      setRequests(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  // ACCEPT
  const acceptRequest = async (id: number) => {

    try {

      await axios.put(
        `http://localhost:8080/vendor/accept/${id}`
      );

      fetchRequests();

    } catch (err) {

      console.log(err);

    }
  };

  // REJECT
  const rejectRequest = async (id: number) => {

    try {

      await axios.put(
        `http://localhost:8080/vendor/reject/${id}`
      );

      fetchRequests();

    } catch (err) {

      console.log(err);

    }
  };

  // STATUS COLORS
  const getStatusColor = (status: string) => {

    switch (status) {

      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";

      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-[#0f172a]">

      {/* SIDEBAR */}
      <VendorSidebar open={open} setOpen={setOpen} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <VendorNavbar setOpen={setOpen} />

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">

          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">

            Service Requests

          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {requests.length === 0 ? (

              <p className="text-gray-500 dark:text-gray-300">

                No requests found

              </p>

            ) : (

              requests.map((req: any) => (

                <div
                  key={req.id}
                  className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow"
                >

                  {/* TITLE */}
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">

                    🛠 Service Request

                  </h2>

                  {/* ADDRESS */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">

                    {req.address}

                  </p>

                  {/* AMOUNT */}
                  <p className="text-indigo-600 font-bold mt-2">

                    ₹{req.amount}

                  </p>

                  {/* STATUS */}
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(req.status)}`}
                  >

                    {req.status}

                  </span>

                  {/* ACTIONS */}
                  {req.status === "ASSIGNED" && (

                    <div className="flex gap-3 mt-4">

                      {/* ACCEPT */}
                      <button
                        onClick={() =>
                          acceptRequest(req.id)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                      >

                        Accept

                      </button>

                      {/* REJECT */}
                      <button
                        onClick={() =>
                          rejectRequest(req.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                      >

                        Reject

                      </button>

                    </div>
                  )}

                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}