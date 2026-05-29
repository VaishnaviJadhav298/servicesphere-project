"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookingsPage() {

  const [bookings, setBookings] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);

  const [selectedVendor, setSelectedVendor] = useState<{
    [key: number]: number;
  }>({});

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchBookings();
    fetchVendors();
  }, []);

  const fetchBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/admin/bookings"
      );

      setBookings(res.data);

    } catch (err) {

      console.log("Booking fetch error:", err);

    }
  };

  const fetchVendors = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/auth/vendor/all"
      );

      setVendors(res.data);

    } catch (err) {

      console.log("Vendor fetch error:", err);

    }
  };

  const assignVendor = async (
    bookingId: number
  ) => {

    const vendorId =
      selectedVendor[bookingId];

    if (!vendorId) {

      alert("Please select vendor first");
      return;

    }

    try {

      await axios.put(
        `http://localhost:8080/admin/assign-vendor/${bookingId}/${vendorId}`
      );

      alert("Vendor Assigned Successfully!");

      fetchBookings();

    } catch (err) {

      console.log(err);

      alert("Failed to assign vendor");

    }
  };

  const getStatusStyle = (
    status: string
  ) => {

    switch (status) {

      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";

      case "PENDING":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const filteredBookings = bookings.filter(
    (b) => {

      if (statusFilter === "ALL")
        return true;

      return b.status === statusFilter;
    }
  );

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentBookings =
    filteredBookings.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages = Math.ceil(
    filteredBookings.length /
      itemsPerPage
  );

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADING */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Manage Bookings
        </h1>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">

        <table className="w-full border-collapse border border-gray-300">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-4 text-left border border-gray-300">
                Booking ID
              </th>

              <th className="p-4 text-center border border-gray-300">
                Service ID
              </th>

              <th className="p-4 text-center border border-gray-300">
                Customer ID
              </th>

              <th className="p-4 text-left border border-gray-300">
                Amount
              </th>

              <th className="p-4 text-left border border-gray-300">
                Address
              </th>

              {/* STATUS + FILTER SAME BLOCK */}
              <th className="p-4 border border-gray-300">

                <div className="flex items-center justify-between gap-3">

                  <span className="font-semibold">
                    Status
                  </span>

                  <select
                    className="border p-2 rounded-lg bg-white text-sm"
                    value={statusFilter}
                    onChange={(e) => {

                      setStatusFilter(
                        e.target.value
                      );

                      setCurrentPage(1);

                    }}
                  >

                    <option value="ALL">
                      All
                    </option>

                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="ACCEPTED">
                      Accepted
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>

                    <option value="ASSIGNED">
                      Assigned
                    </option>

                  </select>

                </div>

              </th>

              <th className="p-4 text-left border border-gray-300">
                Assign Vendor
              </th>

            </tr>

          </thead>

          <tbody>

            {currentBookings.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-6 text-gray-500 border border-gray-300"
                >
                  No bookings found
                </td>

              </tr>

            ) : (

              currentBookings.map((b) => (

                <tr
                  key={b.id}
                  className="hover:bg-gray-50"
                >

                  <td className="p-4 border border-gray-300">
                    #{b.id}
                  </td>

                  <td className="p-4 border border-gray-300 text-center">
                    {b.serviceId}
                  </td>

                  <td className="p-4 border border-gray-300 text-center">
                    {b.customerId}
                  </td>

                  <td className="p-4 border border-gray-300">
                    ₹{b.amount}
                  </td>

                  <td className="p-4 border border-gray-300">
                    {b.address}
                  </td>

                  {/* STATUS */}
                  <td className="p-4 border border-gray-300">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>

                  </td>

                  {/* ASSIGN VENDOR */}
                  <td className="p-4 border border-gray-300">

                    {b.status === "PENDING" ? (

                      <div className="flex gap-2">

                        <select
                          className="border p-2 rounded-lg"
                          value={
                            selectedVendor[
                              b.id
                            ] || ""
                          }
                          onChange={(e) =>
                            setSelectedVendor({
                              ...selectedVendor,
                              [b.id]:
                                Number(
                                  e.target.value
                                ),
                            })
                          }
                        >

                          <option value="">
                            Select Vendor
                          </option>

                          {vendors.map((v) => (

                            <option
                              key={v.id}
                              value={v.id}
                            >
                              {v.name}
                            </option>

                          ))}

                        </select>

                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          onClick={() =>
                            assignVendor(b.id)
                          }
                        >
                          Assign
                        </button>

                      </div>

                    ) : b.vendorId ? (

                      <span className="text-green-700 font-semibold">

                        Vendor ID: {b.vendorId}

                      </span>

                    ) : (

                      <span className="text-gray-500">
                        Not Assigned
                      </span>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">

        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Prev
        </button>

        <span className="px-4 py-2">

          Page {currentPage} of {totalPages}

        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
}