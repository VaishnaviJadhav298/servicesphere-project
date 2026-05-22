"use client";

import Link from "next/link";
import React from "react";

interface NavbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setOpen }: NavbarProps) {

  return (

    <nav className="flex items-center justify-between px-10 py-6">

      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-white cursor-pointer">

        Service<span className="text-blue-500">Sphere</span>

      </h1>

      {/* Nav Links */}
      <div className="hidden md:flex gap-12 text-lg text-white font-medium">

        <Link
          href="/"
          className="hover:text-blue-400 transition duration-300"
        >
          Home
        </Link>

        <Link
          href="/"
          className="hover:text-blue-400 transition duration-300"
        >
          Providers
        </Link>

        <Link
          href="/"
          className="hover:text-blue-400 transition duration-300"
        >
          Contact
        </Link>

      </div>

      {/* Buttons */}
      <div className="flex gap-5">

        <button
          onClick={() => setOpen(true)}
          className="border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-medium transition duration-300"
        >
          Open
        </button>

        {/* Sign In */}
        <Link href="/signin">

          <button className="border border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black px-8 py-3 rounded-xl text-lg font-medium transition duration-300">

            Sign In

          </button>

        </Link>

        {/* Sign Up */}
        <Link href="/signup">

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg font-medium transition duration-300 shadow-lg hover:scale-105">

            Sign Up

          </button>

        </Link>

      </div>

    </nav>

  );

}
