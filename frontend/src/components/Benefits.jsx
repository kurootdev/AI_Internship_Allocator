export default function Benefits() {
  const benefits = {
    students: {
      title: "For Students",
      iconClass: "w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      ),
      items: [
        "Fair chance at internships without bias.",
        "Matches that suit skills and career interests.",
        "Simple application process with instant updates.",
        "Help available in local languages.",
      ],
    },
    companies: {
      title: "For Companies",
      iconClass: "w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd"/>
        </svg>
      ),
      items: [
        "Access to a wide pool of trained candidates.",
        "Faster hiring with less paperwork.",
        "Reliable data to support decisions.",
        "Transparent and accountable process.",
      ],
    },
    government: {
      title: "For Government",
      iconClass: "w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0",
      iconSvg: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm7-11a1 1 0 000 2h5a1 1 0 100-2h-5zm0 4a1 1 0 100 2h5a1 1 0 100-2h-5zm0 4a1 1 0 100 2h5a1 1 0 100-2h-5z" clipRule="evenodd"/>
        </svg>
      ),
      items: [
        "Faster and smoother implementation of the internship scheme.",
        "Real-time tracking of participation and performance.",
        "Scales easily to serve lakhs of applicants.",
        "Reduced manual work and lower costs.",
        "Accurate reports for planning and policy decisions.",
      ],
    },
  };

  return (
    <section className="bg-gray-200 p-6 rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
        Benefits of <span className="text-orange-400 font-medium">Intern Setu</span>
      </h2>

      <div className="flex flex-col gap-6">
        {Object.values(benefits).map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100 
                transition-transform duration-1000 hover:shadow-2xl hover:-translate-y-0.5 hover:scale-102"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className={section.iconClass}>
                {section.iconSvg}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 flex-1">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-gray-500 mr-2 text-lg">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}