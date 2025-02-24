import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to /products page with search query as a URL parameter
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center justify-between">
      {/* Left side (logo/title) */}
      <div className="text-xl font-bold">
        MyStore
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="px-2 py-1 text-white rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
