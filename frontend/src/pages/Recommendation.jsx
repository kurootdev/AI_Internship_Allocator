import {
  FaBriefcase,
  FaCalendarAlt,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { useInternshipStore } from "../store/internshipStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const navigate = useNavigate();
  const { getRecommendations } = useInternshipStore();
  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const { applyForInternship } = useInternshipStore();
  useEffect(() => {
    async function fetchData() {
      const data = await getRecommendations();
      setRecommendedInternships(data);
      //   console.log(data)
    }

    fetchData();
  }, []);

  const handleApply = async (internshipId) => {
    try {
      const res = await applyForInternship(internshipId);
      // console.log("applied suceesfully", res);
    } catch (error) {
      // console.log("error while applying for internship", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-700">Recommendations</h2>
      <div className="flex flex-col gap-4">
        {recommendedInternships?.map((job) => (
          <div
            key={job.internshipId}
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-700">
              {job.internshipId}
            </h3>
            <p className="text-gray-600 mb-3">{job.companyName}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <FaBriefcase /> {job.title}
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
      </div>
    </div>
  );
}
