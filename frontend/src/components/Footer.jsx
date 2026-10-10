import React from 'react';
// Import icons
import { FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Correct import for X icon
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

// Import local assets (ensure paths are correct)




const Footer = () => {
  return (
    <>
      <footer className="bg-[#002347] text-white font-sans p-8 md:p-12">
        <div className="container mx-auto">
          {/* Main content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 mb-8">
            
            {/* Column 1: Logos & Social Media */}
            <div>
              <h3 className="text-lg font-bold mb-4">Social Media</h3>
              <div className="flex gap-4">
                <a href="#" aria-label="YouTube" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-xl hover:opacity-80 transition-opacity">
                  <FaYoutube />
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-xl hover:opacity-80 transition-opacity">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-xl hover:opacity-80 transition-opacity">
                  <FaLinkedinIn />
                </a>
                <a href="#" aria-label="X" className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-xl hover:opacity-80 transition-opacity">
                  <FaXTwitter />
                </a>
              </div>
            </div>

            {/* Column 2: Get to Know & App Download */}
            <div className='text-center'>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p>Intern Setu is an AI-powered platform for the Prime Minister's Internship Scheme. Our mission is to transform internship allocation, replacing manual processes with a smart, equitable system. We are building a foundation for a skilled, diverse, and future-ready workforce for India.</p>
            </div>

            {/* Column 3: Contact Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-white text-xl mt-1 flex-shrink-0" />
                  <span>LNCT Campus, Kalchuri Nagar, (P.O. Kolua), Raisen Road, Bhopal-462022 (M.P.). </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-white text-lg" />
                  <p className="hover:text-white transition-colors">intern-setu@gmail.com</p>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-white text-lg" />
                  <a href="tel:1800116090" className="hover:text-white transition-colors">1800 11 6090</a>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Build Info & Visitors */}
            <div className="flex flex-col">
              <p className="text-sm text-gray-300 mb-4">Build Version: 1756988512377</p>
              <div className="bg-[#ff6900] rounded-2xl p-1 text-center w-1/2 max-w-xs">
                <span className="text-3xl font-bold tracking-wider block">4,14</span>
                <span className="text-xl font-bold ">Total Visitors</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-center text-sm text-gray-400 gap-4">
            <p>© 2025 INTERN-SETU. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;