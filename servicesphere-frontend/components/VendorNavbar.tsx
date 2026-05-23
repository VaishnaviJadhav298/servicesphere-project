"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import {
  Menu,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "next-themes";

interface NavbarProps {
  setOpen: (value: boolean) => void;
}

export default function VendorNavbar({ setOpen }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // OUTSIDE CLICK CLOSE
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("vendorEmail");
    setProfileOpen(false);
    router.push("/signin"); 
  };

  return (
    <div className="h-16 bg-white dark:bg-[#111827] border-b dark:border-gray-800 flex items-center justify-between px-4 md:px-6 relative">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your services
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* THEME TOGGLE */}
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* NOTIFICATIONS */}
        <div ref={notifRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {notificationOpen &&
            typeof window !== "undefined" &&
            createPortal(
              <div className="fixed right-4 top-16 w-[92vw] sm:w-80 bg-white dark:bg-[#1f2937] border dark:border-gray-700 rounded-2xl shadow-xl z-[9999]">

                <div className="p-3 border-b font-semibold">
                  Notifications
                </div>

                <div>
                  <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    New Order Received
                  </div>
                  <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Payment Successful
                  </div>
                  <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Order Shipped
                  </div>
                </div>

              </div>,
              document.body
            )}
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl"
          >
            <div className="w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center">
              U
            </div>
            <ChevronDown size={16} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1f2937] rounded-2xl shadow-xl border p-2 z-50">

              <button
                onClick={() => {
                  setProfileOpen(false);
                  router.push("/vendor/profile");
                }}
                className="w-full flex gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
              >
                <User size={18} /> Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl"
              >
                <LogOut size={18} /> Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}