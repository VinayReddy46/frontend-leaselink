import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";

const data = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  {
    name: "Rent a Product",
    link: "/product",
    dropdown: [
      { name: "Laptops", link: "/product/laptops" },
      { name: "Printer & Scanner", link: "/product/printers" },
      { name: "TV & Monitors", link: "/product/monitors" },
      { name: "Kitchen Appliance", link: "/product/kitchen" },
      { name: "Projector", link: "/product/projectors" },
      { name: "Tablet", link: "/product/tablet" },
      { name: "Audio & Karaoke", link: "/product/audio" },
      { name: "Air Purifier", link: "/product/air" },
      { name: "Playstation", link: "/product/playstation" },
      { name: "Video Conferencing", link: "/product/video" },
    ],
  },
  { name: "Contact Us", link: "/contact" },
];

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-3 py-4">
      {/* Logo */}
      <a href="#" className="flex items-center">
        <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
      </a>

      {/* Mobile Menu Button and User Icon */}
      <div className="flex items-center space-x-4 md:hidden">
        {/* Toggle Button */}
        <button
          className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        {/* User Icon */}
        <button
          className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
          onClick={() => setUserDropdown(!userDropdown)}
        >
          <FaUserCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`md:flex md:items-center md:space-x-10 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto shadow-md md:shadow-none transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"
          } md:flex`}
      >
        {data.map((val, index) => (
          <li key={index} className="relative group px-6 md:px-0 py-2 md:py-0">
            {val.dropdown ? (
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="flex items-center text-gray-700 hover:text-blue-800 font-medium text-lg transition-colors duration-200">
                  {val.name}
                  <IoMdArrowDropdown className="ml-1 text-xl" />
                </div>

                {/* Dropdown Menu */}
                <ul
                  className={`absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${hovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {val.dropdown.map((item, subIndex) => (
                    <li key={subIndex} className="px-5 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200">
                      <a href={item.link} className="w-full block">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a
                href={val.link}
                className="text-gray-700 hover:text-blue-800 font-medium block md:inline text-lg transition-colors duration-200"
              >
                {val.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Icons Section (Hidden in Mobile View) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-4 py-2 outline-none border-none"
          />
          <button className="flex items-center justify-center px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-blue-800 hover:text-white">
            <CiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Notification and Shopping Cart Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
          >
            <IoMdNotificationsOutline className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
          >
            <HiShoppingCart className="w-6 h-6" />
          </a>
        </div>

        {/* User Profile Icon */}
        <div
          className="relative"
          onMouseEnter={() => setUserDropdown(true)}
          onMouseLeave={() => setUserDropdown(false)}
        >
          <button className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            <FaUserCircle className="w-7 h-7" />
          </button>

          {/* Dropdown Menu */}
          <ul
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${userDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
          >
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/profile">Profile</a>
            </li>
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/settings">Settings</a>
            </li>
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* User Dropdown for Mobile View */}
      {userDropdown && (
        <ul className="absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg md:hidden">
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/profile">Profile</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/settings">Settings</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/favourites">Favourites</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/logout">Logout</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;