import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInternshipStore } from "../store/internshipStore";

export default function AllocatedCandidates() {
  const { viewAllocation } = useInternshipStore();
  const [allocatedCandidates, setAllocatedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const internshipId = location.state?.internshipId;

  useEffect(() => {
    const fetchAllocatedCandidates = async () => {
      try {
        setLoading(true);
        
        if (!internshipId) {
          setError("No internship ID provided");
          setLoading(false);
          return;
        }

        const candidates = await viewAllocation(internshipId);
        setAllocatedCandidates(candidates || []);
      } catch (err) {
        setError("Failed to fetch allocated candidates");
        console.error("Error fetching allocated candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllocatedCandidates();
  }, [internshipId, viewAllocation]);

  if (loading) {
    return (
      <div className="p-4 sm:p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading allocated candidates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center py-4 bg-blue-600 text-white">
          List of Allocated Candidates
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
              </tr>
            </thead>
            <tbody>
              {allocatedCandidates?.length > 0 ? (
                allocatedCandidates.map((item, index) => (
                  <tr
                    key={item.candidateId || index}
                    className="hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    <td className="px-4 py-2 border">{item.candidateId}</td>
                    <td className="px-4 py-2 border">{`${item.firstName} ${item.lastName}`}</td>
                    <td className="px-4 py-2 border">{item.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No Allocated Candidates Found
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