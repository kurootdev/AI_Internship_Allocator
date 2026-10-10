  import React from "react";
  import { useEffect, useState } from "react";
  import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaStar,
    FaBriefcase,
    FaEye,
    FaComments,
  } from "react-icons/fa";
  import { useAuthStore } from "../store/authStore";

  const UserDisplay = () => {
    const { getAllUsers, users } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          setError(null);
          await getAllUsers();
        } catch (err) {
          setError("Failed to fetch users");
          console.error("Error fetching users:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, [getAllUsers]);

    useEffect(() => {
      if (users) {
        console.log("Users updated:", users);
      }
    }, [users]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading users...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      );
    }

    if (!users || users.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">No users found</div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
            <h2 className="text-xl font-bold">Users Directory</h2>
            <p className="text-blue-100 text-sm">Total Users: {users.length}</p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      Candidate
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      Contact
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="text-gray-400" />
                      Education
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      Location
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Skills
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-gray-400" />
                      Applications
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => {
                  const {
                    _id,
                    candidateId,
                    firstName,
                    lastName,
                    email,
                    contactNumber,
                    age,
                    gender,
                    degree,
                    major,
                    cgpa,
                    district,
                    skills = [],
                    appliedInternships = [],
                    socialCategory,
                    isRural,
                  } = user;

                  const fullName = `${firstName} ${lastName || ''}`.trim();

                  return (
                    <tr key={_id || candidateId} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      {/* Candidate Info */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{fullName}</div>
                          <div className="text-xs text-gray-500">ID: {candidateId}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {age} yrs, {gender}
                          </div>
                          <div className="flex gap-1 mt-1">
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs">
                              {socialCategory}
                            </span>
                            {isRural && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                Rural
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center gap-2 mb-1">
                            <FaEnvelope className="text-orange-500 text-xs" />
                            <span className="truncate max-w-[150px]" title={email}>{email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaPhone className="text-orange-500 text-xs" />
                            <span>{contactNumber}</span>
                          </div>
                        </div>
                      </td>

                      {/* Education */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">{degree}</div>
                          {major && <div className="text-xs text-gray-600">{major}</div>}
                          <div className="flex items-center gap-1 mt-1">
                            <FaStar className="text-orange-500 text-xs" />
                            <span className="text-xs">CGPA: {cgpa || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{district}</div>
                      </td>

                      {/* Skills */}
                      <td className="px-4 py-4">
                        <div className="max-w-[200px]">
                          {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {skills.slice(0, 2).map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                              {skills.length > 2 && (
                                <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded">
                                  +{skills.length - 2}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">No skills listed</span>
                          )}
                        </div>
                      </td>

                      {/* Applications */}
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {appliedInternships.length}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1">
                            <FaEye className="text-xs" />
                            View
                          </button>
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1">
                            <FaComments className="text-xs" />
                            Contact
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-700">
              <span>Showing all {users.length} users</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-100 rounded-full"></div>
                  Social Category
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-100 rounded-full"></div>
                  Rural Area
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UserDisplay;