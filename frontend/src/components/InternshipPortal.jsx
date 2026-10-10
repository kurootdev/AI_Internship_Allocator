import React from "react";
import InternshipCard from "./IntershipCard";
// import internships from "../assets/dummyIntershipData/internship";
import {useEmployeeStore} from "../store/EmployeeAuthStrore"


const InternshipPortal = () => {
  const {postedInternship} = useEmployeeStore();
  return (
    <div className="flex h-[58vh]">
      <main className="flex-1">
        <div className="flex">
          <div className="w-full px-6 py-4 bg-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl transition text-center mb-4">
            <h1 className="text-3xl font-bold tracking-wide">
              Posted Internships
            </h1>
          </div>
        </div>

        {/* Internships list */}
        <div className="w-full h-auto flex flex-col gap-6">
          {postedInternship.map((internship) => (
            <InternshipCard
              key={internship.internshipId}
              internship={internship}
            />
          ))}
        </div>

        {/* Nested route (ViewAllocation) render yaha hoga */}
        <div className="mt-6"></div>
      </main>
    </div>
  );
};

export default InternshipPortal;