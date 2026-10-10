import React, { useState } from "react";

const Faq = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const FAQItem = ({ question, answer }) => {
    const isActive = activeQuestion === question;

    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div
          className={`p-5 cursor-pointer flex justify-between items-center font-medium text-gray-800 transition-all duration-300 border-l-4 ${
            isActive
              ? "bg-gray-50 border-l-green-600"
              : "border-l-transparent hover:bg-gray-50 hover:border-l-green-400"
          }`}
          onClick={() => toggleQuestion(question)}
        >
          <span className="text-sm md:text-base flex-1 pr-4">{question}</span>
          <span
            className={`text-lg text-green-600 transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 bg-gray-50 text-gray-700 text-sm leading-relaxed border-t border-gray-200">
            {answer}
          </div>
        </div>
      </div>
    );
  };

  const candidateFAQs = [
    {
      question: "Who is eligible to apply for the PM Internship Scheme?",
      answer:
        "The scheme is for students who have completed their graduation or are in their final year. Specific eligibility may vary per internship posting.",
    },
    {
      question: "How does the AI allocation engine work?",
      answer:
        "Our AI model matches your profile (skills, education, location) with suitable internships. It also considers affirmative action policies to ensure fair and equitable allocation.",
    },
    {
      question: "What if I don't have enough skills on my profile?",
      answer:
        "The AI will do its best with what you provide. We recommend adding all relevant skills, even from personal projects, to increase your chances.",
    },
    {
      question: "Can I apply to an internship in a different city?",
      answer:
        "Yes, you can specify your location preferences. The AI will consider this, but some internships may require you to be physically present.",
    },
    {
      question: "What happens after I apply?",
      answer:
        "The AI will evaluate your profile. If you are a strong match, your profile will be shared with the employer. You can track this on your dashboard.",
    },
    {
      question: "Will I get a stipend?",
      answer:
        "The stipend amount, if any, is mentioned in each internship posting. Please check the details carefully.",
    },
    {
      question: "Is my personal data safe?",
      answer:
        "Yes, we use advanced security protocols and data encryption to protect your information. Your data is used only for internship allocation.",
    },
  ];

  const industryFAQs = [
    {
      question: "How do we post an internship?",
      answer:
        'After verifying your company profile, you can easily post a new internship using our user-friendly "Post Internship" form on the dashboard.',
    },
    {
      question: "How does the AI help us find candidates?",
      answer:
        "The AI engine shortlists and ranks applicants based on your requirements, which saves time and effort in finding the right candidates.",
    },
    {
      question:
        "Is our company obligated to hire the candidates suggested by the AI?",
      answer:
        "No. The AI provides a list of suitable candidates, but the final decision to interview and hire rests entirely with your company.",
    },
    {
      question: "What if we need to fill a position urgently?",
      answer:
        'You can mark an internship as "Urgent." The AI will prioritize matching candidates for your posting and send notifications to highly relevant applicants.',
    },
    {
      question: "Can we track our company's diversity hiring goals?",
      answer:
        "Yes, your dashboard provides real-time analytics and reports on the diversity of candidates you have hired, including representation from aspirational districts and different social categories.",
    },
  ];

  const chatbotFAQs = [
    {
      question: "What is the chatbot for?",
      answer:
        "The chatbot is an AI assistant that provides instant answers to your questions, helps you navigate the site, and assists with common queries.",
    },
    {
      question: "What kind of questions can I ask?",
      answer:
        "You can ask about your application status, how to fill out your profile, what documents you need to upload, or for information about a specific internship.",
    },
    {
      question: "Is the chatbot available 24/7?",
      answer: "Yes, the chatbot is available to assist you at any time.",
    },
    {
      question: "Can the chatbot help me with my profile?",
      answer:
        "Yes, you can ask the chatbot for tips on how to improve your profile, what skills to add, or how to write a good internship application.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            <span className="text-green-600">PM Internship Scheme</span>
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Frequently Asked Questions
          </p>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full transition-all duration-300 hover:bg-green-500"></div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Candidate FAQs */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            FAQs for <span className="text-green-600">Candidates</span>
          </h2>
          {candidateFAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </section>

        {/* Industry FAQs */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            FAQs for <span className="text-green-600">Industry Partners</span>
          </h2>
          {industryFAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </section>

        {/* Chatbot FAQs */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            FAQs about the <span className="text-green-600">AI Chatbot</span>
          </h2>
          {chatbotFAQs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </section>

        {/* Help Section */}
        <div className="bg-white rounded-xl p-8 text-center shadow hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-lg mb-6 text-gray-700">
            Can't find what you're looking for? Our AI chatbot is here 24/7 to
            assist you.
          </p>
          <button
            onClick={() => (window.location.href = "/candidate/ai-support")}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Chat with AI Assistant
          </button>
        </div>
      </main>
    </div>
  );
};

export default Faq;
