import React, { useState } from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { FaUsers, FaChartPie } from "react-icons/fa"; // ✅ New icons for Diversity section
import img1 from "../assets/adminCharts/bargraph.png";
import img2 from "../assets/adminCharts/piChart.png";

const statsData = [
  {
    key: "candidates",
    title: "Registered Candidates",
    value: 3459,
    subtitle: "New registrations this week",
    details:
      "Currently, 3459 candidates have registered this week, showing a growth of 15% compared to last week. Majority are from engineering and management backgrounds.",
  },
  {
    key: "employers",
    title: "Active Employers",
    value: 128,
    subtitle: "Employers posting this week",
    details:
      "128 employers are actively hiring this week. Top recruiters include Infosys, TCS, and Deloitte. IT sector leads with 40% postings.",
  },
  {
    key: "internships",
    title: "Internships Posted",
    value: 76,
    subtitle: "Posted this month",
    details:
      "A total of 76 internships were posted this month across IT, Marketing, and Design. Average stipend offered is ₹10,000/month.",
  },
  {
    key: "applications",
    title: "Applications Received",
    value: 5420,
    subtitle: "New this week",
    details:
      "5420 applications have been submitted this week. Tech internships received the highest number of applicants.",
  },
  {
    key: "selected",
    title: "Selected Candidates",
    value: 245,
    subtitle: "Selected this month",
    details:
      "245 candidates successfully secured internships this month. Selection rate is 12%, showing a competitive application pool.",
  },
  {
    key: "completed",
    title: "Completed Internships",
    value: 89,
    subtitle: "Closed successfully",
    details:
      "89 candidates have completed their internships successfully. Employers report 70% satisfaction with candidate performance.",
  },
];

const Admin = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (key) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar (fixed) */}
      <div className="fixed left-0 h-screen w-60 bg-gray-200 border-r border-gray-300 z-40">
        <SideBar />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-8 ml-60">
        <Outlet/>
        {/* Welcome Banner */}
        <section className="bg-indigo-700 rounded-2xl shadow-lg flex justify-between items-center px-10 py-8 mt-4">
          <div className="h-50">
            <h1 className="text-4xl font-bold text-white mb-8">
              Welcome To{" "}
              <span className="text-yellow-400">PM Internship Portal</span>
            </h1>

            <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          </div>
          <img
            src="#"
            alt="Govt Emblem"
            className="w-28 h-28 object-contain bg-white rounded-full p-2 shadow-md"
          />
        </section>

        {/* Recent Analytics Heading */}
        <div className="flex justify-center mt-5">
          <div className="px-6 py-4 bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <h1 className="text-3xl font-bold tracking-wide">
              Recent Analytics
            </h1>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {statsData.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-gray-800 text-lg font-semibold">
                {item.title}
              </h2>

              <div className="flex items-center mt-4">
                <span className="text-4xl font-bold">{item.value}</span>
                <FiArrowUpRight className="text-green-500 text-xl ml-2" />
              </div>

              <p className="text-gray-500 mt-2">{item.subtitle}</p>

              <button
                onClick={() => toggleCard(item.key)}
                className="text-yellow-700 font-medium mt-4 inline-block hover:underline"
              >
                {expandedCard === item.key
                  ? "Hide details ↑"
                  : "View full list →"}
              </button>

              {/* Expandable Details */}
              {expandedCard === item.key && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                  {item.details}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Diversity Reports Heading */}
        <div className="flex justify-center mt-5">
          <div className="px-6 py-4 bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transition text-center">
            <h1 className="text-3xl font-bold tracking-wide">
              Diversity & Inclusion Reports
            </h1>
          </div>
        </div>

        {/* Two-Box Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 mb-10">
          {/* Box 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FaUsers className="text-indigo-600 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">
                Workforce Diversity
              </h2>
            </div>

            <img
              src={img2}
              alt="Diversity Chart"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FaChartPie className="text-indigo-600 text-2xl" />
              <h2 className="text-xl font-semibold text-gray-800">
                Inclusion Statistics
              </h2>
            </div>
            <img
              src={img1}
              alt="Inclusion Report"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;