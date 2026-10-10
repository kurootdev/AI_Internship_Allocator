import React from "react";
import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaPlay,
  FaCalendarAlt,
  FaMoneyBill,
  FaHourglassHalf,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InternshipPosted = ({ internship }) => {
  const {
    title,
    companyName,
    type,
    datePosted,
    locationDistrict,
    startDate="immediately",
    duration,
    stipend,
    applicationDeadline,
    capacity,
  } = internship;


  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(/internship/details, { state: { internship } });
    // 👆 sends both the id and internship data to the next page
  };

  return (
    <div className="bg-blue-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300  w-full">
      {/* Title & Company */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{companyName}</p>

      {/* Top Info */}
      <div className="flex flex-wrap items-center gap-6 text-orange-500 mb-6">
        <div className="flex items-center gap-2">
          <FaHome /> <span className="text-gray-700">{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock /> <span className="text-gray-700">{datePosted}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt /> <span className="text-gray-700">{locationDistrict}</span>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-sm">
        <div className="flex items-start gap-2">
          <FaPlay className="text-orange-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-600">Start date</p>
            <p className="text-gray-800">{startDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaCalendarAlt className="text-orange-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-600">Duration</p>
            <p className="text-gray-800">{duration}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaMoneyBill className="text-orange-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-600">Stipend</p>
            <p className="text-gray-800">₹ {stipend} /month</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FaHourglassHalf className="text-orange-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-600">Apply by</p>
            <p className="text-gray-800">{applicationDeadline}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={handleClick}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default InternshipPosted;