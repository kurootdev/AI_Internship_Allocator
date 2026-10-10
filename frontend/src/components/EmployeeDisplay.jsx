import React, { useEffect } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaIndustry,
  FaUser,
  FaIdBadge,
  FaBriefcase,
} from "react-icons/fa";
import { useEmployeeStore } from "../store/EmployeeAuthStrore";
const EmployeesDisplay = () => {
    const employees = []
    const {getAllEmployees} = useEmployeeStore();

    useEffect(() => {
    console.log("hello")
      getAllEmployees()
    }, [])
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {employees.map((employee) => {
        const {
          _id,
          companyId,
          name,
          middleName,
          lastName,
          email,
          contactNumber,
          organizationName,
          employerType,
          sector,
          postedInternships = [],
        } = employee;

        const fullName = `${name} ${middleName || ''} ${lastName || ''}`.trim();

        return (
          <div key={_id || companyId} className="bg-blue-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{fullName}</h2>
                <p className="text-sm text-gray-600">ID: {companyId}</p>
              </div>
              <div className="text-right">
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {employerType}
                </span>
              </div>
            </div>

            {/* Organization Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <FaBuilding className="text-orange-500 text-xs" />
                <span className="text-gray-800 font-semibold truncate">{organizationName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaIndustry className="text-orange-500 text-xs" />
                <span className="text-gray-700">{sector}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <FaEnvelope className="text-orange-500 text-xs" />
                <span className="text-gray-700 truncate">{email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaPhone className="text-orange-500 text-xs" />
                <span className="text-gray-700">{contactNumber}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <FaBriefcase className="text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-600">Posted</p>
                  <p className="text-gray-800">{postedInternships.length} internships</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaIdBadge className="text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-600">Type</p>
                  <p className="text-gray-800">{employerType}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-500 text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors cursor-pointer text-xs">
                View
              </button>
              <button className="flex-1 bg-orange-500 text-white font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors cursor-pointer text-xs">
                Contact
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeesDisplay;