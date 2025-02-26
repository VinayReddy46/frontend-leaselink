import React, { useState } from "react";
import { Link, useNavigate, Route, Routes, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi2";
import Home from "../pages/Home";





 
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div>
      <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-10 py-4">
        <Link to="/" className="flex items-center">
          <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
        </Link>
        
        <div className="flex space-x-6 text-gray-800 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center hover:text-blue-600">
              Rent a Product <IoMdArrowDropdown className="ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white shadow-md mt-2 rounded-md w-40">
                <Link to="/category/laptops" className="block px-4 py-2 hover:bg-gray-100">Laptops</Link>
                <Link to="/category/projectors" className="block px-4 py-2 hover:bg-gray-100">Projectors</Link>
                <Link to="/category/tv-monitors" className="block px-4 py-2 hover:bg-gray-100">TVs & Monitors</Link>
                <Link to="/category/gaming" className="block px-4 py-2 hover:bg-gray-100">Gaming</Link>
                <Link to="/category/bike" className="block px-4 py-2 hover:bg-gray-100">Bike</Link>
                <Link to="/category/kitchenappliances" className="block px-4 py-2 hover:bg-gray-100">Kitchen Appliances</Link>

              </div>
            )}
          </div>
          <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-300 shadow-md rounded-md w-60 overflow-hidden">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 outline-none border-none"
          />
          <button type="submit" className="px-4 py-2 text-gray-600 hover:text-white hover:bg-blue-600 transition">
            <CiSearch className="w-4 h-4" />
          </button>
        </form>
        
        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="text-blue-600 hover:text-black">
            <IoMdNotificationsOutline className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="text-blue-600 hover:text-black">
            <HiShoppingCart className="w-6 h-6" />
          </Link>
          <Link to="/profile" className="hover:text-blue-800">
            <FaUserCircle className="w-6 h-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
}




export default Navbar;


