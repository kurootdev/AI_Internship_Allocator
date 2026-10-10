// src/components/Dashboard.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const INDIA_TOPO_JSON =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const Dashboard = () => {
  const stats = {
    opportunities: "118K+",
    sectors: 25,
    states: 36,
    districts: 734,
    qualifications: 5,
  };

  return (
    <section className="p-10">
      <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* India Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1000 }}
          className="w-full h-[500px]"
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {(geos) =>
              geos.geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#60a5fa"
                  stroke="#fff"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#2563eb", outline: "none" },
                    pressed: { fill: "#1e3a8a", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div
            className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-purple-100 to-pink-100 
                          transition transform hover:opacity-90 hover:scale-105 cursor-pointer"
          >
            <p className="text-3xl font-bold">{stats.opportunities}</p>
            <p className="text-gray-600">Internship Opportunities</p>
          </div>

          <div
            className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-green-100 to-blue-100 
                          transition transform hover:opacity-90 hover:scale-105 cursor-pointer"
          >
            <p className="text-3xl font-bold">{stats.sectors}</p>
            <p className="text-gray-600">Sectors</p>
          </div>

          <div
            className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-blue-100 to-indigo-100 
                          transition transform hover:opacity-90 hover:scale-105 cursor-pointer"
          >
            <p className="text-3xl font-bold">{stats.states}</p>
            <p className="text-gray-600">States/UTs</p>
          </div>

          <div
            className="p-6 rounded-2xl shadow-md bg-gradient-to-r from-orange-100 to-yellow-100 
                          transition transform hover:opacity-90 hover:scale-105 cursor-pointer"
          >
            <p className="text-3xl font-bold">{stats.districts}</p>
            <p className="text-gray-600">Districts</p>
          </div>

          <div
            className="col-span-2 p-6 rounded-2xl shadow-md bg-gradient-to-r from-pink-100 to-purple-100 
                          transition transform hover:opacity-90 hover:scale-105 cursor-pointer"
          >
            <p className="text-3xl font-bold">{stats.qualifications}</p>
            <p className="text-gray-600">Qualifications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
