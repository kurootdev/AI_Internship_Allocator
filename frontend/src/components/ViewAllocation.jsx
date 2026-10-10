import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ViewAllocation() {
  const location = useLocation();
  const data = location.state?.allocatedCandidates;
  const internship = location.state?.internship;

  // Dummy static data
 

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-center py-4 bg-blue-600 text-white">
          Allocated Candidates Details -{" "}
          {internship?.title || "Dummy Internship"}
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    <td className="px-4 py-2 border">{item.candidateId}</td>
                    <td className="px-4 py-2 border">{item.firstName}</td>
                    <td className="px-4 py-2 border">{item.email}</td>
                    <td className="px-4 py-2 border">{item.contactNumber}</td>
                    <td className="px-4 py-2 border">{item.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}