import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import defaultImg from "../../assets/car.jpg";

const Sidebar = () => {
  const [profileImage, setProfileImage] = useState(defaultImg);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <aside className="w-full max-w-xs bg-white shadow-lg rounded-lg p-6 mx-auto">
      {/* Profile Section */}
      <div className="text-center relative">
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
          />
          <label
            htmlFor="fileInput"
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <FaCamera size={16} />
          </label>
          <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>
        <h5 className="mt-3 text-lg font-semibold">Antoni Jonson</h5>
        <p className="text-gray-500 text-sm">jonson@example.com</p>
        <hr className="my-4" />
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-2">
        <li>
          <NavLink to="" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>👤</span> <span>My Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="mycar" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>🚗</span> <span>My Car Listing</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="favorites" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>❤️</span> <span>Favorites</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="transactions" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>🔄</span> <span>Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="billinginfo" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>📑</span> <span>Billing Info</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="settings" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200">
            <span>⚙️</span> <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="logout" className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-200 text-red-600">
            <span>🚪</span> <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;



