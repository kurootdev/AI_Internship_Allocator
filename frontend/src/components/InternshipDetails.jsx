import React from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaPlay,
  FaCalendarAlt,
  FaCoins,
  FaHourglassEnd,
  FaBriefcase,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const InternshipDetails = () => {
  const location = useLocation();
  const { internship } = location.state || {};

  // ✅ Destructure internship fields
  const {
    title,
    companyName,
    internshipMode,
    locationDistrict,
    duration,
    stipend,
    applicationDeadline,
    openings,
    appliedCandidates
  } = internship;
  console.log(internship);
  return (
    <div className="w-full mx-auto bg-gray-200 rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 font-bold">{companyName}</p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 text-gray-700 text-center">
        <div className="flex flex-col items-center space-y-1">
          <FaBriefcase className="text-orange-500 text-xl" />
          <span>{internshipMode || "hybrid"}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaMapMarkerAlt className="text-orange-500 text-xl" />
          <span>{locationDistrict || "required: location"}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaPlay className="text-orange-500 text-xl" />
          <span>Start date: {"immediately"}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaCalendarAlt className="text-orange-500 text-xl" />
          <span>Duration: {duration || "required: duration"}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaCoins className="text-orange-500 text-xl" />
          <span>Stipend: {stipend || "required: stipend"}</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaCoins className="text-orange-500 text-xl" />
          <span>No of Credits: required</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <FaHourglassEnd className="text-orange-500 text-xl" />
          <span>Apply by: {applicationDeadline}</span>
        </div>
      </div>

      
    </div>
  );
};

export default InternshipDetails;