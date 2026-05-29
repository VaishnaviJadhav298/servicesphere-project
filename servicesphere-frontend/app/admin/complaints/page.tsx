"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminComplaintsPage() {

  const [complaints, setComplaints] =
    useState<any[]>([]);

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/complaints"
      );

      setComplaints(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    fetchComplaints();

  }, []);

  const resolveComplaint = async (
    id: number
  ) => {

    try {

      await axios.put(
        `http://localhost:8080/complaints/resolve/${id}`
      );

      alert("Complaint Resolved");

      fetchComplaints();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Complaints
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 border">
                ID
              </th>

              <th className="p-4 border">
                Customer
              </th>

              <th className="p-4 border">
                Subject
              </th>

              <th className="p-4 border">
                Message
              </th>

              <th className="p-4 border">
                Status
              </th>

              <th className="p-4 border">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {complaints.map((c) => (

              <tr key={c.id}>

                <td className="p-4 border">
                  #{c.id}
                </td>

                <td className="p-4 border">
                  {c.customerId}
                </td>

                <td className="p-4 border">
                  {c.subject}
                </td>

                <td className="p-4 border">
                  {c.message}
                </td>

                <td className="p-4 border">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.status === "RESOLVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>

                </td>

                <td className="p-4 border">

                  {c.status !== "RESOLVED" && (

                    <button
                      onClick={() =>
                        resolveComplaint(c.id)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Resolve
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}