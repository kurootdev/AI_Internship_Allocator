import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInternshipStore } from "../store/internshipStore";
import {
  FaSearch,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaCalendarAlt,
  FaHourglassHalf,
  FaBriefcase,
} from "react-icons/fa";

export default function Internships() {
  const navigate = useNavigate();
  const { internships, applyForInternship } = useInternshipStore();

  const handleApply = async (internshipId) => {
    try {
      const res = await applyForInternship(internshipId);
      // console.log("applied suceesfully", res);
    } catch (error) {
      // console.log("error while applying for internship", error);
    }
  };

  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <div className="w-full flex flex-col gap-6 px-4">
      {/* Search + Recommend */}
      <div className="flex items-center gap-4">
        <div className="flex flex-1 items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent"
          />
          <FaSearch className="text-gray-500" />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer"
          onClick={() => navigate("/candidate/recommendations")}
        >
          Recommend
        </button>
      </div>

      {/* Recent Recommendations */}
      <h2 className="text-lg font-bold text-gray-700">Recent postings</h2>

      <div className="flex flex-col gap-4">
        {internships.slice(0, visibleCount).map((job) => (
          <div
            key={job.internshipId}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
            <p className="text-gray-600 mb-3">{job.companyName}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <FaBriefcase /> {job.internshipMode}
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt /> {job.locationDistrict}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> {job.duration}
              </span>
              <span className="flex items-center gap-2">
                <FaMoneyBill /> {job.stipend}
              </span>
              <span className="flex items-center gap-2 col-span-2 text-red-500">
                <FaHourglassHalf /> Apply by {job.applicationDeadline}
              </span>
            </div>

            <div className="flex justify-end mt-3 space-x-4">
              <button
                onClick={() =>
                  navigate("/candidate/internships/view-details", {
                    state: { internship: job },
                  })
                }
                className="px-4 py-2 bg-orange-500 text-white rounded-md transform hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => handleApply(job.internshipId)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md transform hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {visibleCount < internships.length && (
          <button
            onClick={() => setVisibleCount(internships.length)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 self-center cursor-pointer"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
