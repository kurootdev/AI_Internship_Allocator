import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserGraduate,
  FaBuilding,
  FaBriefcase,
  FaTasks,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  // State to track if the sidebar is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`h-[90vh] bg-gray-200 border-r border-gray-300 flex flex-col pt-4 space-y-8  transition-all duration-300 ${
        isExpanded ? "w-60 items-start pl-4" : "w-16 items-center"
      }`}
    >
      {/* Hamburger Menu Icon */}
      <button
        className="text-2xl text-gray-600 mb-4  cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6 text-black font-bold text-xl tracking-wide h-full">
        <Link
          to="/admin/candidates"
          className="group flex flex-row items-center space-x-2 hover:text-blue-600 cursor-pointer"
        >
          <FaUserGraduate className="text-xl group-hover:text-blue-600" />
          {isExpanded && (
            <span className="uppercase group-hover:text-blue-600">
              Student Management
            </span>
          )}
        </Link>

        <Link
          to="/admin/employees"
          className="group flex flex-row items-center space-x-2 hover:text-blue-600 cursor-pointer"
        >
          <FaBuilding className="text-xl group-hover:text-blue-600" />
          {isExpanded && (
            <span className="uppercase group-hover:text-blue-600">
              Industry Management
            </span>
          )}
        </Link>

        <Link
          to="/admin/internship-opportunaties"
          className="group flex flex-row items-center space-x-2 hover:text-blue-600 cursor-pointer"
        >
          <FaBriefcase className="text-xl group-hover:text-blue-600" />
          {isExpanded && (
            <span className="uppercase group-hover:text-blue-600">
              Internship Opportunaties
            </span>
          )}
        </Link>

        <Link
          to="/admin/view-allocation"
          className="group flex flex-row items-center space-x-2 hover:text-blue-600 cursor-pointer"
        >
          <FaTasks className="text-xl group-hover:text-blue-600" />
          {isExpanded && (
            <span className="uppercase group-hover:text-blue-600">
              View Allocation
            </span>
          )}
        </Link>

        <Link
          to="/admin/notifications"
          className="group flex flex-row items-center space-x-2 hover:text-blue-600 cursor-pointer"
        >
          <FaBell className="text-xl group-hover:text-blue-600" />
          {isExpanded && (
            <span className="uppercase group-hover:text-blue-600">
              Notifications & Announcement
            </span>
          )}
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;