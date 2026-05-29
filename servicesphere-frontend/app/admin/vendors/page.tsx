"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import { useRouter } from "next/navigation";

import axios from "axios";

export default function AdminVendorsPage() {

  const router = useRouter();

  const [darkMode, setDarkMode] =
    useState(true);

  const [vendors, setVendors] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [currentPage, setCurrentPage] =
    useState(1);

  const rowsPerPage = 7;

  // FETCH VENDORS
  const fetchVendors = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/auth/vendor/all"
      );

      setVendors(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchVendors();

  }, []);

  // APPROVE
  const approveVendor = async (
    id: number
  ) => {

    try {

      await axios.put(
        `http://localhost:8080/admin/approve-vendor/${id}`
      );

      alert("Vendor Approved");

      fetchVendors();

    } catch (err) {

      console.log(err);

    }
  };

  // REJECT
  const rejectVendor = async (
    id: number
  ) => {

    try {

      await axios.put(
        `http://localhost:8080/admin/reject-vendor/${id}`
      );

      alert("Vendor Rejected");

      fetchVendors();

    } catch (err) {

      console.log(err);

    }
  };

  // BLOCK
  const blockVendor = async (
    id: number
  ) => {

    try {

      await axios.put(
        `http://localhost:8080/admin/block-vendor/${id}`
      );

      alert("Vendor Blocked");

      fetchVendors();

    } catch (err) {

      console.log(err);

    }
  };

  // FILTER
  const filteredVendors =
    vendors.filter((vendor) => {

      const matchSearch =

        vendor.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        vendor.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchStatus =

        statusFilter === "ALL" ||

        (vendor.status || "PENDING") ===
          statusFilter;

      return (
        matchSearch && matchStatus
      );
    });

  // PAGINATION
  const totalPages = Math.ceil(
    filteredVendors.length /
      rowsPerPage
  );

  const currentData =
    filteredVendors.slice(

      (currentPage - 1) *
        rowsPerPage,

      currentPage * rowsPerPage
    );

  return (

    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-black"
      }`}
    >

      {/* TOP BAR */}
      <div className="sticky top-0 z-40 border-b px-6 py-4 bg-white dark:bg-[#111827]">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                router.back()
              }
              className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center"
            >

              <ArrowLeft size={20} />

            </button>

            <div>

              <h1 className="text-3xl font-bold">

                Vendor Management

              </h1>

              <p className="text-sm text-gray-500">

                Manage and monitor vendors

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <div className="flex items-center px-4 h-[45px] w-[280px] rounded-xl bg-gray-100 dark:bg-[#1e293b]">

              <Search
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search vendor..."
                value={search}
                onChange={(e) => {

                  setSearch(
                    e.target.value
                  );

                  setCurrentPage(1);

                }}
                className="bg-transparent outline-none ml-3 w-full text-sm"
              />

            </div>

            {/* DARK MODE */}
            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center"
            >

              {darkMode ? (

                <Sun size={18} />

              ) : (

                <Moon size={18} />

              )}

            </button>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="p-6">

        <div className="rounded-3xl overflow-hidden border bg-white dark:bg-[#111827]">

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              {/* HEADER */}
              <thead className="bg-gray-100 dark:bg-[#1e293b]">

                <tr>

                  <th className="p-4 border text-center">
                    ID
                  </th>

                  <th className="p-4 border text-center">
                    Name
                  </th>

                  <th className="p-4 border text-center">
                    Email
                  </th>

                  <th className="p-4 border text-center">
                    Phone
                  </th>

                  {/* STATUS */}
                  <th className="p-4 border">

                    <div className="flex items-center justify-between">

                      <span className="font-semibold">
                        Status
                      </span>

                      <select
                        value={
                          statusFilter
                        }
                        onChange={(e) => {

                          setStatusFilter(
                            e.target.value
                          );

                          setCurrentPage(1);

                        }}
                        className="w-[140px] h-[36px] px-2 rounded-md border text-sm bg-white dark:bg-[#1e293b]"
                      >

                        <option value="ALL">
                          All
                        </option>

                        <option value="PENDING">
                          Pending
                        </option>

                        <option value="APPROVED">
                          Approved
                        </option>

                        <option value="REJECTED">
                          Rejected
                        </option>

                        <option value="BLOCKED">
                          Blocked
                        </option>

                      </select>

                    </div>

                  </th>

                  <th className="p-4 border text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* BODY */}
              <tbody>

                {currentData.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="p-6 text-center"
                    >

                      No Vendors Found

                    </td>

                  </tr>

                ) : (

                  currentData.map(
                    (vendor) => (

                      <tr
                        key={vendor.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#1e293b]"
                      >

                        <td className="p-4 border text-center">
                          #{vendor.id}
                        </td>

                        <td className="p-4 border text-center">
                          {vendor.name}
                        </td>

                        <td className="p-4 border text-center">
                          {vendor.email}
                        </td>

                        <td className="p-4 border text-center">
                          {vendor.phone}
                        </td>

                        {/* STATUS */}
                        <td className="p-4 border text-center">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              vendor.status ===
                              "APPROVED"

                                ? "bg-green-100 text-green-700"

                                : vendor.status ===
                                  "REJECTED"

                                ? "bg-red-100 text-red-700"

                                : vendor.status ===
                                  "BLOCKED"

                                ? "bg-black text-white"

                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >

                            {vendor.status ||
                              "PENDING"}

                          </span>

                        </td>

                        {/* ACTIONS */}
                        <td className="p-4 border text-center">

                          <div className="flex justify-center gap-2">

                            {vendor.status ===
                              "PENDING" && (

                              <>

                                <button
                                  onClick={() =>
                                    approveVendor(
                                      vendor.id
                                    )
                                  }
                                  className="px-3 py-1 bg-green-600 text-white rounded"
                                >

                                  Approve

                                </button>

                                <button
                                  onClick={() =>
                                    rejectVendor(
                                      vendor.id
                                    )
                                  }
                                  className="px-3 py-1 bg-red-600 text-white rounded"
                                >

                                  Reject

                                </button>

                              </>

                            )}

                            {vendor.status ===
                              "APPROVED" && (

                              <button
                                onClick={() =>
                                  blockVendor(
                                    vendor.id
                                  )
                                }
                                className="px-3 py-1 bg-black text-white rounded"
                              >

                                Block

                              </button>

                            )}

                            {vendor.status ===
                              "BLOCKED" && (

                              <span className="text-red-600 font-semibold">

                                Vendor Blocked

                              </span>

                            )}

                            {vendor.status ===
                              "REJECTED" && (

                              <span className="text-gray-500 font-semibold">

                                Rejected

                              </span>

                            )}

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 p-4">

            <button
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >

              Prev

            </button>

            <span className="px-3 py-1">

              Page {currentPage} /{" "}
              {totalPages || 1}

            </span>

            <button
              disabled={
                currentPage ===
                  totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}