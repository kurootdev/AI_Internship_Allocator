import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLaptopCode,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";
import SideBar from "./SideBar";

const UserCard = ({
  fullName,
  email,
  phone,
  appliedInternship,
  skills,
  applicationStatus,
  previousInternship,
  onViewProfile,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
  
   
      
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
          {/* Candidate Info */}
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-500" /> {fullName}
          </h2>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <FaEnvelope className="text-orange-500" /> {email}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaPhone className="text-green-500" /> {phone}
          </p>

          {/* Internship Info */}
          <div className="mt-4">
            <p className="font-semibold text-gray-700 flex items-center gap-2">
              <FaLaptopCode className="text-purple-500" /> Applied Internship:{" "}
              <span className="font-normal text-gray-800">
                {appliedInternship}
              </span>
            </p>
            <p className="font-semibold text-gray-700 mt-2">Skills:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="font-semibold text-gray-700 mt-3 flex items-center gap-2">
              <FaCheckCircle className="text-teal-500" /> Status:{" "}
              <span
                className={`font-normal px-2 py-1 rounded-md ${
                  applicationStatus === "Selected"
                    ? "bg-green-100 text-green-700"
                    : applicationStatus === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : applicationStatus === "Interview Scheduled"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {applicationStatus}
              </span>
            </p>
            <p className="font-semibold text-gray-700 mt-2 flex items-center gap-2">
              <FaBriefcase className="text-pink-500" /> Previous Internship:{" "}
              <span className="font-normal text-gray-800">
                {previousInternship || "None"}
              </span>
            </p>
          </div>

          {/* Action */}
          <button
            onClick={onViewProfile}
            className="mt-6 bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
