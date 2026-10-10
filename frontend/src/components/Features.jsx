export default function Features() {
  const features = [
    {
      title: "Smart Matching of Internships",
      desc: "Connects students with opportunities that fit their skills and study background.",
      iconClass: "w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      ),
    },
    {
      title: "Fair and Transparent Allocation",
      desc: "Ensures equal access for all candidates, following government guidelines.",
      iconClass: "w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Improving with Use",
      desc: "The system learns from past allocations to make future matches better.",
      iconClass: "w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Support in Indian Languages",
      desc: "Provides chatbot and guidance in multiple regional languages for wider reach.",
      iconClass: "w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Quick Updates",
      desc: "Sends timely notifications about applications, matches, and status changes.",
      iconClass: "w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
      ),
    },
    {
      title: "Scalable Platform",
      desc: "Built to handle large numbers of students and organizations across the country.",
      iconClass: "w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Clear Dashboards",
      desc: "Shows easy-to-understand reports and progress to students, companies, and administrators.",
      iconClass: "w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
        </svg>
      ),
    },
    {
      title: "Complete Process Coverage",
      desc: "Manages the full journey—from applying to final selection and offer letter.",
      iconClass: "w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gray-200 rounded-2xl p-6 ">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
        Features of <span className="text-orange-400 font-medium">Intern Setu</span>
      </h2>
      
      <div className="grid sm:grid-cols-2 gap-4 p-8 ">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-transform duration-1000 hover:shadow-2xl hover:-translate-y-0.5 hover:scale-102 hover:z-10"
          >
            <div className="flex items-start space-x-4">
              <div className={item.iconClass}>
                {item.iconSvg}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}