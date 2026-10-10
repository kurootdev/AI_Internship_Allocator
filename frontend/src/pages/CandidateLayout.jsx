import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaBriefcase,
  FaChartBar,
  FaRobot,
  FaQuestionCircle,
  FaBook,
  FaEnvelope,
} from "react-icons/fa";
import {useAuthStore} from "../store/authStore"

export default function CandidateLayout() {
  const {authUser}  = useAuthStore();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Profile", path: "profile", icon: <FaUser /> },
    { name: "Internships", path: "internships", icon: <FaBriefcase /> },
    { name: "Results", path: "results", icon: <FaChartBar /> },
    { name: "AI Support", path: "ai-support", icon: <FaRobot /> },
    { name: "Queries", path: "queries", icon: <FaQuestionCircle /> },
    { name: "FAQs", path: "faqs", icon: <FaBook /> },
    { name: "Contact", path: "contact", icon: <FaEnvelope /> },
  ];

  const user = { name: "Amit Sharma" };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-80 bg-white shadow-lg p-5 z-40 transition-transform transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header + Toggle button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black bg-gray-100 px-3 py-2 rounded-lg shadow-sm w-full text-center">
            Dashboard
          </h2>
          <button
            className="md:hidden ml-2 p-2 bg-blue-600 text-white rounded-lg z-[999]"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col justify-between h-[calc(100%-3rem)]">
          <div className="flex flex-col h-full justify-evenly">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-6 md:ml-80 ">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-center mb-3">
            Welcome, <span className="text-blue-600">{`${authUser?.firstName}`}</span>
          </h1>
          <Outlet /> {/* Nested routes render here */}
        </div>
      </div>
    </div>
  );
}