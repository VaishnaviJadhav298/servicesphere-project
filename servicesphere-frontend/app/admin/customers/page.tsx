"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8080/admin/customers"
      );

      console.log("API RESPONSE:", res.data);

      // ✅ SAFE HANDLING (array / wrapped object dono ke liye)
      const data =
        Array.isArray(res.data)
          ? res.data
          : res.data?.data || res.data?.customers || [];

      setCustomers(data);

    } catch (err) {
      console.log("Error fetching customers:", err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center">
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c: any, index: number) => (
                <tr
                  key={c.id || index}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">{c.id || "-"}</td>

                  <td className="p-4">
                    {c.name || c.fullName || c.customerName || "N/A"}
                  </td>

                  <td className="p-4">
                    {c.email || "N/A"}
                  </td>

                  <td className="p-4">
                    {c.mobileNumber || c.phone || "N/A"}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}