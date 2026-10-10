import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi"; // ✅ Added
import { FaUsers, FaChartPie } from "react-icons/fa"; // ✅ Added
import img1 from "../assets/logos/profileImg.png";
import img2 from "../assets/empDashboardImg/diversity.png";
import img3 from "../assets/empDashboardImg/topskills.jpg";


const statsData = [
  {
    key: "candidates",
    title: "Total Internship Posting",
    value: 12,
    subtitle: "Active listings available",
    details:
      "Currently, 12 internships are live across IT, Marketing, and Design. The number of postings has grown consistently, giving students more choices to explore.",
  },
  {
    key: "employers",
    title: "Currently Active",
    value: 10,
    subtitle: "Employers recruiting this week",
    details:
      "10 employers are actively hiring right now, including Infosys, TCS, and Deloitte. The IT sector is driving the highest demand with 40% of the openings.",
  },
  {
    key: "internships",
    title: "Total Applicants",
    value: 450,
    subtitle: "Applications recieved overall",
    details:
       "So far, 450 candidates have applied for various internships. Majority of applications are targeting software development and data analytics roles.",
  },
  {
    key: "applications",
    title: "New Applicants This Week",
    value: 75,
    subtitle: "Fresh applications submitted",
    details:
      "This week alone, 75 new candidates applied for internships. Around 60% are final-year students preparing for placements, while 40% are recent graduates seeking experience.",
  },
  {
    key: "selected",
    title: "Offer Accepted This Month",
    value: 18,
    subtitle: "Successful hires confirmed",
    details:
      "18 candidates have accepted offers this month, reflecting a positive hiring trend. The acceptance rate is up by 10% compared to last month.",
  },
  {
    key: "completed",
    title: "Hiring Progress",
    value: 25,
    subtitle: "Positions filled so far",
    details:
      "25 internship positions have already been filled successfully. Employers have reported a smoother and faster onboarding experience this cycle.",
  },
];


export default function Employer() {
  const { company } = useParams();

  // ✅ Added state for expandable cards
  const [expandedCard, setExpandedCard] = useState(null);

  // ✅ Toggle function
  const toggleCard = (key) => {
    setExpandedCard(expandedCard === key ? null : key);
  };

  return (
    <div className="mt-0">
      <div className="bg-gradient-to-r bg-blue-300 text-white rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Text */}
        <div>
          <h2 className="text-6xl font-extrabold">
            Welcome to <span className="text-orange-400">Intern</span>
            <span className="text-orange-400">Setu</span>
          </h2>
          <p className="text-2xl mt-3 tracking-wide uppercase font-bold text-black">
            {company ? company : "Tata Consultancy Services"} India
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="mt-6 md:mt-0">
          <img src={img1} alt="Company Illustration" className="w-40 md:w-56" />
        </div>
      </div>

      {/* Recent Analytics Heading */}
      <div className="flex justify-center mt-5">
        <div className="px-6 py-4 bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transition text-center">
          <h1 className="text-3xl font-bold tracking-wide">Recent Analytics</h1>
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
            Applicant Pool Analysis
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
              Top Technical & Analytical Skills
            </h2>
          </div>

          <img
            src={img3}
            alt="Diversity Chart"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Box 2 */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaChartPie className="text-indigo-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-800">
              Applicants’ Demographic Diversity
            </h2>
          </div>
          <img
            src={img2}
            alt="Inclusion Report"
            className="w-full h-80 object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
