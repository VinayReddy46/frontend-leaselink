import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdown, setDropdown] = useState("");

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="bg-blue-500 w-50 h-full flex items-center px-6 py-4 rounded-tr-xl">
          LEASE LINK
        </a>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-8">
          {[
            { label: "Home", links: ["Main Home", "Landing Page"] },
            { label: "Services", links: ["Car Rentals", "Luxury Cars"] },
            { label: "Pages", links: ["About Us", "FAQs", "Team"] },
            { label: "Blog", links: ["Latest Posts", "Popular Posts"] },
          ].map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setDropdown(item.label)}
              onMouseLeave={() => setDropdown("")}
            >
              <button className="text-black px-4 py-2 flex items-center gap-2 font-semibold text-lg hover:text-blue-600">
                {item.label}
                <IoIosArrowDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    dropdown === item.label ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {dropdown === item.label && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-10 transition-opacity duration-200 opacity-100">
                  {item.links.map((link) => (
                    <a key={link} href="#" className="block px-4 py-2 hover:bg-gray-100">
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="#" className="text-black px-4 py-2 font-semibold text-lg hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Right Section - Button & User Icon */}
        <div className="flex items-center space-x-6">
          <button className="bg-blue-500 text-white px-6 lg:px-8 py-2 rounded-md font-bold text-lg hover:bg-black">
            Explore
          </button>
          <FaUserCircle className="w-8 h-8 text-gray-700 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
