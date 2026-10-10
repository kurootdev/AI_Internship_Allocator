import React from "react";
import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaPlay,
  FaCalendarAlt,
  FaMoneyBill,
  FaHourglassHalf,
  FaUsers,
  FaUserCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInternshipStore } from "../store/internshipStore";

const InternshipCard = ({ internship }) => {
const { viewAllocation } = useInternshipStore();
  const {
    internshipId,
    title,
    companyName,
    locationDistrict,
    internshipMode,
    startDate="immediately",
    duration,
    stipend,
    applicationDeadline,
    capacity,
    appliedCandidates
  } = internship;

  const {allocateInternship} = useInternshipStore()
  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault();
    const res = await allocateInternship(internshipId)
    // 
    // console.log("Navigating...", internship);
    // 👆 sends both the id and internship data to the next page
  };
  const handleViewAllocation = async(e)=>{
    e.preventDefault();
    const allocatedCandidates = await viewAllocation(internship.internshipId);
    // console.log(allocatedCandidates)
    navigate("/employer/internship-posted/view-allocation", {
      state: { allocatedCandidates,internship },
    });
  }

  return (
    <div className="bg-blue-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300  w-full mb-4">
      {/* Title & Company */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-lg text-gray-600 mb-4">{companyName}</p>

      {/* Top Info */}
      <div className="flex flex-wrap items-center gap-6 text-orange-500 mb-6">
        <div className="flex items-center gap-2">
       <span className="text-gray-700">{internshipMode || "On-Site"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt /> <span className="text-gray-700">{locationDistrict}</span>
        </div>
      </div>

      {/* Application Stats - Added unused fields */}
      <div className="flex items-center gap-6 mb-6 text-sm bg-blue-100 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <FaUsers className="text-blue-500" />
          <div>
            <p className="font-semibold text-gray-600">Applied</p>
            <p className="text-gray-800">{appliedCandidates.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaUserCheck className="text-green-500" />
          <div>
            <p className="font-semibold text-gray-600">Capacity</p>
            <p className="text-gray-800">{capacity}</p>
          </div>
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
      <div className="flex justify-end gap-5">
        <button
          onClick={handleClick}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          Allocate
        </button>
        <button
          onClick={handleViewAllocation}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          View Allocate
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;