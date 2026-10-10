
// src/components/Partners.jsx
import React from "react";
import logo1 from "../assets/logos/logo1.png";
import logo2 from "../assets/logos/logo2.png";
import logo3 from "../assets/logos/logo3.jpg";
import logo4 from "../assets/logos/logo4.png";
import logo5 from "../assets/logos/logo5.jpg";
import logo6 from "../assets/logos/logo6.jpg";
import logo7 from "../assets/logos/logo7.jpg";


const Partners = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];


  return (
    <section className="py-10">
      {/* Title with orange lines */}
      <div className="flex items-center justify-center mb-8">
        <span className="w-16 h-[2px] bg-orange-500"></span>
        <h2 className="mx-4 text-lg font-bold text-gray-800">Partners</h2>
        <span className="w-16 h-[2px] bg-orange-500"></span>
      </div>


      {/* Logos row */}
      <div className="flex flex-wrap justify-center gap-10">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="p-4 transition transform hover:scale-105 hover:opacity-90"
          >
            <img
              src={logo}
              alt={`Partner ${index + 1}`}
              className="h-16 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};


export default Partners;



