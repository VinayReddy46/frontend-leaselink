import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import { useNavigate,Link } from "react-router-dom";

const role = 'user';

const data = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  {
    name: "Rent a Product",
    link: `/rental/${name}`,
    dropdown: [
      { name: "laptops", link:"/product/laptops"},
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
  (role === 'useqr' ? { name: "Add Product", link: "/addproduct" } : { name: "Dashboard", link: "/AdminDashboard"})
];

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <a href="#" className="flex items-center">
        <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
      </a>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu className="w-7 h-7" />
      </button>

      {/* Navigation Links */}
      <ul
        className={`md:flex md:items-center md:space-x-10 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        {data.map((val, index) => (
          <li key={index} className="relative group px-6 md:px-0">
            {val.dropdown ? (
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="flex items-center text-gray-700 hover:text-blue-800 font-medium text-lg">
                  {val.name}
                  <IoMdArrowDropdown className="ml-1 text-xl" />
                </div>

                {/* Dropdown Menu */}
                <ul
                  className={`absolute left-0 mt-3 w-60 bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    hovered ? "opacity-100 visible" : "opacity-0 invisible"
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
                    <li key={subIndex} className="px-5 py-3 text-gray-700 hover:bg-blue-100 transition-all duration-200">
                      <a href={item.link} className="w-full block">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a href={val.link} className="text-gray-700 hover:text-blue-800 font-medium block md:inline text-lg">
                {val.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center border border-gray-200 shadow-md rounded-md w-64 overflow-hidden">
          <input type="text" placeholder="Search here..." className="w-full px-4 py-2 outline-none border-none" />
          <button className="px-4 py-2 text-black hover:bg-black hover:text-white transition">
            <CiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Icon */}
        <a href="#" className="text-blue-600 hover:bg-black hover:text-white p-3 rounded-full transition">
          <IoMdNotificationsOutline className="w-6 h-6" />
        </a>

        {/* Shopping Cart Icon */}
        <a href="#" className="text-blue-600 hover:bg-black hover:text-white p-3 rounded-full transition">
          <HiShoppingCart className="w-6 h-6" />
        </a>

        {/* User Profile Icon */}
        <a href="#" className="hover:text-blue-800">
          <FaUserCircle className="w-7 h-7" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
