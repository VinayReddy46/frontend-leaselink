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
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-6 md:py-4">
      <a  style={{ cursor: "pointer" }}  className="flex items-center">
        <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
      </a>
      <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu className="w-6 h-6" />
      </button>
      <ul className={`md:flex md:items-center md:space-x-10 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto md:flex-row flex-col space-y-4 md:space-y-0 px-6 md:px-0 shadow-md md:shadow-none transition-transform duration-300 ease-in-out ${menuOpen ? "block" : "hidden"}`}>
        {data.map((val, index) => (
          <li key={index} className="relative">
            {val.dropdown ? (
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="flex items-center text-gray-700 hover:text-blue-800 font-medium">
                <Link to='/addproduct' >{val.name}</Link>
                  <IoMdArrowDropdown className="ml-1 text-lg" />
                </div>
                {dropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    {val.dropdown.map((item, subIndex) => (
                      <li key={subIndex} className="px-4 py-2 hover:bg-gray-100">
                        <a href={item.link} className="text-gray-700">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <a href={val.link} className="text-gray-700 hover:text-blue-800 font-medium block md:inline">
                {val.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex items-center border border-gray-200 shadow-md rounded-md w-60 overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full px-4 outline-none border-none"
          />
          <button className="px-4 py-2 text-black hover:bg-black hover:text-white transition">
            <CiSearch className="w-4 h-4" />
          </button>
        </div>
        <a className="text-blue-600 hover:bg-black hover:text-white p-2 rounded-full">
          <IoMdNotificationsOutline className="w-6 h-6" />
        </a>
        <a href="#" className="text-blue-600 hover:bg-black hover:text-white p-2 rounded-full">
          <HiShoppingCart className="w-6 h-6" />
        </a>
        <a href="#" className="hover:text-blue-800">
          <FaUserCircle className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
