"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  IndianRupee,
  CalendarDays,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({
  open,
  setOpen,
}: SidebarProps) {

  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Requests",
      path: "/vendor/requests",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Active Services",
      path: "/vendor/active",
      icon: <Wrench size={20} />,
    },
    {
      name: "Earnings",
      path: "/vendor/earnings",
      icon: <IndianRupee size={20} />,
    },
    {
      name: "Schedule",
      path: "/vendor/schedule",
      icon: <CalendarDays size={20} />,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72 bg-[#111827] text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">

          <div>

            <h1 className="text-2xl font-bold">
              Vendor Panel
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Vendor Dashboard
            </p>

          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        {/* Navigation */}
        <nav className="p-4 flex flex-col gap-2">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              href={menu.path}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-300

                ${
                  pathname === menu.path
                    ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg"
                    : "hover:bg-gray-800 text-gray-300"
                }
              `}
            >

              {menu.icon}

              <span className="font-medium">
                {menu.name}
              </span>

            </Link>

          ))}

        </nav>

      </div>
    </>
  );
}