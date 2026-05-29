"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // SEARCH
  const [search, setSearch] = useState("");

  // FILTER
  const [filter, setFilter] = useState("ALL");

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

  // FILTER + SEARCH
  const filteredCustomers = useMemo(() => {

    let data = [...customers];

    // SEARCH
    if (search.trim() !== "") {

      data = data.filter((c) =>
        (
          c.name ||
          c.fullName ||
          c.customerName ||
          ""
        )
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        (c.email || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // FILTERS
    if (filter === "ACTIVE") {

      data = data.filter(
        (c) => (c.bookingCount || 0) >= 3
      );

    } else if (filter === "NEW") {

      data = data.filter((c) => {

        if (!c.createdAt) return false;

        const createdDate =
          new Date(c.createdAt);

        const today = new Date();

        const diff =
          (today.getTime() -
            createdDate.getTime()) /
          (1000 * 60 * 60 * 24);

        return diff <= 7;
      });

    } else if (filter === "INACTIVE") {

      data = data.filter(
        (c) => (c.bookingCount || 0) === 0
      );
    }

    return data;

  }, [customers, search, filter]);

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Customers
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              px-4 py-2 rounded-xl
              border border-gray-300
              outline-none
              bg-white
              w-full sm:w-72
            "
          />

          {/* FILTER */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="
              px-4 py-2 rounded-xl
              border border-gray-300
              outline-none
              bg-white
            "
          >

            <option value="ALL">
              All Customers
            </option>

            <option value="ACTIVE">
              Highly Active Users
            </option>

            <option value="NEW">
              New Users
            </option>

            <option value="INACTIVE">
              Inactive Users
            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto border border-gray-300">

        <table className="w-full border-collapse">

          {/* HEAD */}
          <thead className="bg-gray-200 border-b border-gray-300">

            <tr>

              <th className="p-4 text-left border border-gray-300">
                ID
              </th>

              <th className="p-4 text-left border border-gray-300">
                Name
              </th>

              <th className="p-4 text-left border border-gray-300">
                Email
              </th>

              <th className="p-4 text-left border border-gray-300">
                Phone
              </th>

              <th className="p-4 text-left border border-gray-300">
                Activity
              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={5}
                  className="
                    p-6 text-center
                    border border-gray-300
                  "
                >
                  Loading customers...
                </td>

              </tr>

            ) : filteredCustomers.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="
                    p-6 text-center
                    text-gray-500
                    border border-gray-300
                  "
                >
                  No customers found
                </td>

              </tr>

            ) : (

              filteredCustomers.map(
                (c: any, index: number) => (

                  <tr
                    key={c.id || index}
                    className="
                      border-b border-gray-300
                      hover:bg-gray-50
                    "
                  >

                    {/* ID */}
                    <td className="p-4 border border-gray-300">
                      {c.id || "-"}
                    </td>

                    {/* NAME */}
                    <td className="p-4 border border-gray-300 font-medium">
                      {c.name ||
                        c.fullName ||
                        c.customerName ||
                        "N/A"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 border border-gray-300">
                      {c.email || "N/A"}
                    </td>

                    {/* PHONE */}
                    <td className="p-4 border border-gray-300">
                      {c.mobileNumber ||
                        c.phone ||
                        "N/A"}
                    </td>

                    {/* ACTIVITY */}
                    <td className="p-4 border border-gray-300">

                      {(c.bookingCount || 0) >= 3 ? (

                        <span
                          className="
                            bg-green-100
                            text-green-700
                            px-3 py-1
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                          Highly Active
                        </span>

                      ) : (c.bookingCount || 0) === 0 ? (

                        <span
                          className="
                            bg-red-100
                            text-red-700
                            px-3 py-1
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                          Inactive
                        </span>

                      ) : (

                        <span
                          className="
                            bg-blue-100
                            text-blue-700
                            px-3 py-1
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                          Normal
                        </span>

                      )}

                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}