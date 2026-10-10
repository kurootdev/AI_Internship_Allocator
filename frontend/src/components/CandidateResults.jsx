import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useInternshipStore } from "../store/internshipStore";

export default function CandidateResults() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { getUserAppliedInternship } = useInternshipStore();

  useEffect(() => {
    const fetchAppliedInternships = async () => {
      try {
        setLoading(true);
        const data = await getUserAppliedInternship();
        setInternships(data || []);
      } catch (err) {
        setError("Failed to fetch applied internships");
        console.error("Error fetching internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedInternships();
  }, [getUserAppliedInternship]);

  if (loading) {
    return (
      <div className="p-4 sm:p-8 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading applied internships...</div>
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
          List of Applied Internships
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2 border">Internship_ID</th>
                <th className="px-4 py-2 border">Internship_Name</th>
                <th className="px-4 py-2 border">Allocated_Candidates</th>
              </tr>
            </thead>
            <tbody>
              {internships?.length > 0 ? (
                internships.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    <td className="px-4 py-2 border">{item.internshipId}</td>
                    <td className="px-4 py-2 border">{item.title}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        to="/candidate/results/allocations"
                        className="underline text-blue-600"
                        state={{ internshipId: item.internshipId ||item._id }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No Applied Internships Found
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