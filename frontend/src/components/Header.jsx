import React, { useState } from "react";
import logo1 from "../assets/logos/logo01.png";
import logo2 from "../assets/logos/logo2.png";
import GoogleTranslateWidget from "./Translate";
import { useAuthStore } from "../store/authStore";
import { useEmployeeStore } from "../store/EmployeeAuthStrore";
import partners from "../assets/docs/partners.pdf";
import guidelines from "../assets/docs/guidelines.pdf";
import faqs from "../assets/docs/faqs.pdf";
import manual from "../assets/docs/manual.pdf";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Volume2,
  Home,
  Info,
  FileText,
  HelpCircle,
  Image,
  Headphones,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { authUser, logout } = useAuthStore();
  const { authEmployee, logoutEmp } = useEmployeeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState("A");

  const scrollingMessages = [
    "Internship applications are now open for the 2024-25 cycle. Apply now!",
    "Our AI-driven allocation model ensures fair and transparent selection.",
    "New internship postings from top industry partners are now live.",
    "Complete your profile with all your skills for better AI-powered matches.",
    "Our Fairness Engine is active and ensures diversity and quota compliance.",
    "Use our Gemini chatbot for instant answers to all your questions about the scheme.",
    "Stay updated with the latest announcements from the Ministry of Corporate Affairs.",
    "Verify your Aadhaar-seeded bank account for timely stipend disbursement.",
  ];

  const handleFontSize = (size) => {
    setFontSize(size);
    document.documentElement.style.fontSize =
      size === "A-" ? "14px" : size === "A+" ? "18px" : "16px";
  };

  const closeAllDropdowns = () => {
    setIsGuidelinesOpen(false);
    setIsSupportOpen(false);
    setIsLoginDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    closeAllDropdowns();
  };

  return (
    <header className="w-full font-inter fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}

      {/* First Div - Registration & Login */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-4 h-14 sm:h-16">
          {/* Logo area */}
          <div className="flex w-40 mt-7 items-center gap-2 sm:gap-3">
            <Link to="/">
              <img
                src={logo1}
                alt="Logo1"
                className="h-35 sm:h-62 w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-3 ">
            <div className="flex items-center gap-1 border p-1 ">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 " />
              <GoogleTranslateWidget />
            </div>

            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  closeAllDropdowns();
                  setIsLoginDropdownOpen(!isLoginDropdownOpen);
                }}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
              >
                <User className="w-4 h-4" />
                {authUser || authEmployee ? "Profile" : "Login"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isLoginDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {!authUser && !authEmployee && isLoginDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <ul className="py-2 text-sm font-medium text-gray-700">
                    <li>
                      <Link
                        to="/login"
                        onClick={closeAllDropdowns}
                        className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        Candidate Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login-employer"
                        onClick={closeAllDropdowns}
                        className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600 transition"
                      >
                        Employer Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Logout Button - Added Next to Login Dropdown */}
            {authUser && (
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
                style={{ marginLeft: "8px" }}
              >
                <User className="w-4 h-4" />
                Logout
              </button>
            )}

            {authEmployee && (
              <button
                onClick={logoutEmp}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
                style={{ marginLeft: "8px" }}
              >
                <User className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition z-50 relative"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-gray-800" />
            ) : (
              <Menu className="w-5 h-5 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Second Div - Main Menu (Desktop) */}
      <div className="hidden md:block bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 py-3 text-sm font-medium relative z-40">
          {[
            { name: "HOME", icon: <Home className="w-4 h-4" />, link: "/" },
            {
              name: "ABOUT",
              icon: <Info className="w-4 h-4" />,
              link: "/about",
            },
            {
              name: "FAQS",
              icon: <HelpCircle className="w-4 h-4" />,
              link: "/faqs",
            },
            {
              name: "GALLERY",
              icon: <Image className="w-4 h-4" />,
              link: "/gallery",
            },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.link}
              onClick={closeAllDropdowns}
              className="relative flex items-center gap-2 text-white px-2 transition hover:text-orange-400"
            >
              {item.icon} {item.name}
              <span className="absolute top-full left-0 w-full h-0.5 bg-orange-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}

          {/* Guidelines Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setIsGuidelinesOpen(!isGuidelinesOpen);
              }}
              className="relative flex items-center gap-2 text-white px-2 transition hover:text-orange-400"
            >
              <FileText className="w-4 h-4" /> GUIDELINES
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isGuidelinesOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute top-full left-0 w-full h-0.5 bg-orange-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            {isGuidelinesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg text-gray-700 text-sm z-50">
                {[
                  { name: "Partner Companies", link: partners },
                  { name: "Guidelines", link: guidelines },
                  { name: "FAQs", link: faqs },
                  { name: "Manual", link: manual },
                ].map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                  >
                    {doc.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Support Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns();
                setIsSupportOpen(!isSupportOpen);
              }}
              className="relative flex items-center gap-2 text-white px-2 transition hover:text-orange-400"
            >
              <Headphones className="w-4 h-4" /> Go TO DASHBOARD
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isSupportOpen ? "rotate-180" : ""
                }`}
              />
              <span className="absolute top-full left-0 w-full h-0.5 bg-orange-500 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
            {isSupportOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white font-bold border rounded-lg shadow-lg text-gray-700 text-sm z-50">
                {["Candidate", "Employer"].map((s) => (
                  <Link
                    key={s}
                    to="/"
                    onClick={closeAllDropdowns}
                    className="block px-4 py-2 hover:bg-orange-50 hover:text-orange-600"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex w-30 items-center gap-2">
              <img
                src={logo1}
                alt="Logo1"
                className="h-8 w-auto object-contain"
              />
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Actions */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition">
                <User className="w-4 h-4" />
                Candidate Registration
              </button>

              {!authUser && !authEmployee ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                  >
                    <User className="w-4 h-4" />
                    Candidate Login
                  </Link>
                  <Link
                    to="/login-employer"
                    onClick={closeMenu}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                  >
                    <User className="w-4 h-4" />
                    Employer Login
                  </Link>
                </div>
              ) : (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              )}

              {/* Mobile Google Translate Widget */}
              <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Globe className="w-4 h-4 text-gray-600" />
                <GoogleTranslateWidget />
              </div>
            </div>

            {authUser ? (
              <button
                onClick={() => {
                  useAuthStore.getState().logout(); // Call logout from store
                  closeMenu();
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                <User className="w-4 h-4" />
                Logout
              </button>
            ) : (
              ""
            )}

            {authEmployee ? (
              <button
                onClick={() => {
                  useEmployeeStore.getState().logoutEmp(); // Call logout from store
                  closeMenu();
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition"
              >
                <User className="w-4 h-4" />
                Logout
              </button>
            ) : (
              ""
            )}

            {/* Navigation Links */}
            <div className="py-4">
              {[
                { name: "HOME", icon: <Home className="w-5 h-5" />, link: "/" },
                {
                  name: "ABOUT",
                  icon: <Info className="w-5 h-5" />,
                  link: "/about",
                },
                {
                  name: "FAQS",
                  icon: <HelpCircle className="w-5 h-5" />,
                  link: "/faqs",
                },
                {
                  name: "GALLERY",
                  icon: <Image className="w-5 h-5" />,
                  link: "/gallery",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* Guidelines Section */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <button
                  onClick={() => setIsGuidelinesOpen(!isGuidelinesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    GUIDELINES
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isGuidelinesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isGuidelinesOpen && (
                  <div className="bg-gray-50">
                    {[
                      { name: "Partner Companies", link: "/docs/partners.pdf" },
                      { name: "Guidelines", link: "/docs/guidelines.pdf" },
                      { name: "FAQs", link: "/docs/faqs.pdf" },
                      { name: "Manual", link: "/docs/manual.pdf" },
                    ].map((doc) => (
                      <a
                        key={doc.name}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block px-8 py-2 text-sm text-gray-600 hover:text-orange-600 transition"
                      >
                        {doc.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Support Section */}
              <div>
                <button
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Headphones className="w-5 h-5" />
                    SUPPORT
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isSupportOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isSupportOpen && (
                  <div className="bg-gray-50">
                    {[
                      "Help Center",
                      "Contact Us",
                      "Technical Support",
                      "Feedback",
                    ].map((s) => (
                      <Link
                        key={s}
                        to="/"
                        onClick={closeMenu}
                        className="block px-8 py-2 text-sm text-gray-600 hover:text-orange-600 transition"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Announcements */}
      <div className="bg-yellow-50 border-b border-orange-50 overflow-hidden relative z-10">
        <div className="py-2">
          <div className="animate-scroll whitespace-nowrap">
            <span className="text-black font-medium px-4 text-xs sm:text-sm">
              {scrollingMessages.join(" • ")}
            </span>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </header>
  );
}
