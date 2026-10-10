import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiUserPlus,
  FiClipboard,
  FiMenu,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function EmployerLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // helper fn for active route
  const isActive = (path) =>
    location.pathname === path ? "bg-blue-100 text-blue-600" : "text-gray-700";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed  left-0 h-full bg-white shadow-lg transition-transform duration-300 z-40 
        ${open ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        md:translate-x-0 md:w-64`}
      >
        {/* Toggle Button (Visible on Mobile) */}
        <button
          className="absolute -right-3 top-6 bg-blue-600 text-white p-2 rounded-full shadow-md md:hidden"
          onClick={() => setOpen(!open)}
        >
          <FiMenu />
        </button>

        <div className="flex flex-col items-start mt-8 space-y-3 px-4">
          <Link
            to="/employer/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full hover:bg-blue-100 hover:text-blue-600 transition-colors ${isActive(
              "/employer/dashboard"
            )}`}
          >
            <FiHome className="text-xl" strokeWidth={4} />
            <span className="text-lg font-extrabold">Dashboard</span>
          </Link>

          <Link
            to="/employer/post-internship"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full hover:bg-blue-100 hover:text-blue-600 transition-colors ${isActive(
              "/employer/post-internship"
            )}`}
          >
            <FiUserPlus className="text-xl" strokeWidth={4} />
            <span className="text-lg font-extrabold">Post Internship</span>
          </Link>

          <Link
            to="/employer/internship-posted"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full hover:bg-blue-100 hover:text-blue-600 transition-colors ${isActive(
              "/employer/internship-posted"
            )}`}
          >
            <FiClipboard className="text-xl" strokeWidth={4} />
            <span className="text-lg font-extrabold">Internships Posted</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 md:ml-64">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow ">
          {/* Hamburger for Mobile */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            <FiMenu />
          </button>
        </div>

        {/* Nested Route Content */}
        <div className="p-6 py-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}