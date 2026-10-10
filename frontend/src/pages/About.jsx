import React, { useState, useEffect } from "react";

const About = () => {
  const [counters, setCounters] = useState({ students: 0, companies: 0, success: 0 });

  useEffect(() => {
    const animateCounters = () => {
      const targets = { students: 5000, companies: 500, success: 85 };
      const duration = 2000, steps = 60;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters({
          students: Math.floor(targets.students * easeOut),
          companies: Math.floor(targets.companies * easeOut),
          success: Math.floor(targets.success * easeOut),
        });

        if (currentStep >= steps) {
          setCounters(targets);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const cardStyle = "bg-white rounded-xl shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300";
  const highlightCard = "bg-gray-50 rounded-xl border border-gray-200 p-6 hover:bg-gray-100 transition-colors duration-300";
  const lightCard = "bg-orange-50 rounded-xl border border-gray-200 p-6 hover:bg-gray-100 transition-colors duration-300";

  return (
    <div className="min-h-screen bg-gray-200 font-sans text-gray-800">
      {/* Hero Section */}
      <section className=" py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            About <span className="text-green-700">Intern Setu</span>
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Connecting India's brightest minds with meaningful opportunities through intelligent matching.
          </p>
          <div className="w-20 h-1 bg-green-700 mx-auto rounded-full"></div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Mission */}
        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-3 text-center">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-center">
            Intern Setu transforms how internships work in India, making opportunities fair, fast, and transparent for all students and companies.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Smart Matching", desc: "AI analyzes skills and potential to match students with opportunities." },
            { title: "Fair Opportunities", desc: "Accessible to students from all backgrounds." },
            { title: "Quick Process", desc: "Streamlined system connects you with internships faster." },
            { title: "Ongoing Support", desc: "Guidance from application to internship completion." },
          ].map((f, idx) => (
            <div key={idx} className={highlightCard}>
              <h3 className="text-lg font-semibold text-green-700 mb-2">{f.title}</h3>
              <p className="text-gray-700 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlighted Section */}
        <div className={cardStyle}>
          <h2 className="text-xl font-bold mb-3">Breaking Barriers</h2>
          <p className="text-gray-700 leading-relaxed">
            Traditional internship hunting depends on connections. Intern Setu ensures talent and potential matter most.
          </p>
        </div>

        {/* Stats */}
        <div id="stats-section" className="grid md:grid-cols-3 gap-6 text-center">
          {[
            { label: "Students Placed", value: counters.students },
            { label: "Partner Companies", value: counters.companies },
            { label: "Success Rate", value: counters.success + "%" },
          ].map((stat, idx) => (
            <div key={idx} className="transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-green-700 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Proposed Solution */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-center border-b-2 border-green-700 inline-block pb-1">Proposed Solution</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            AI-powered Smart Allocation Engine matches students with internships efficiently and transparently.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={lightCard}>
              <h3 className="text-lg font-semibold text-green-700 mb-3 ">Matching Criteria</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Skills, qualifications & academic background</li>
                <li>Location & sector preferences</li>
                <li>Industry capacity & availability</li>
              </ul>
            </div>
            <div className={lightCard}>
              <h3 className="text-lg font-semibold text-green-700 mb-3">Innovation Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>AI/ML personalized recommendations</li>
                <li>Real-time internship suggestions</li>
                <li>AI-powered chatbot guidance</li>
                <li>Multilingual support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* USPs */}
        <div className={lightCard}>
          <h2 className="text-2xl font-bold text-center mb-6">Unique Selling Propositions</h2>
          <div className="grid md:grid-cols-2 gap-6 text">
            {[
              { title: "Seamless Integration", desc: "Real-time data flow with government systems." },
              { title: "Scalable & Ready", desc: "Handles large-scale, national deployment." },
              { title: "Transparent AI", desc: "Explainable reasons for every match." },
              { title: "Decoupled Architecture", desc: "AI evolves independently without disrupting the website." },
            ].map((usp, idx) => (
              <div key={idx} className={highlightCard}>
                <h3 className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">{usp.title}</h3>
                <p className="text-gray-700 text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className={lightCard}>
          <h2 className="text-2xl font-bold text-center mb-4">Target Audience</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              "Ministry of Corporate Affairs",
              "Government Departments",
              "Industry Partners",
              "Educational Institutions",
              "Students/Applicants",
            ].map((audience, idx) => (
              <div key={idx} className={highlightCard}>
                <h3 className="text-xs md:text-sm font-medium text-gray-900 text-center">{audience}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "For Students", items: ["Personalized internships", "Skill-role alignment", "Transparency & inclusivity"] },
            { title: "For Government", items: ["Efficient management", "Less admin work", "Greater trust in schemes"] },
            { title: "For Industries", items: ["Faster hiring", "Pre-assessed talent", "Higher intern productivity"] },
            { title: "For Nation", items: ["Stronger workforce", "Aligned with Digital India", "Skill India & Atmanirbhar Bharat"] },
          ].map((benefit, idx) => (
            <div key={idx} className={lightCard}>
              <h3 className="text-lg font-semibold text-green-700 mb-3">{benefit.title}</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                {benefit.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default About;
