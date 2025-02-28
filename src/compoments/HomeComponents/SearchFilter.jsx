import React, { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [price, setPrice] = useState("");
  const [processor, setProcessor] = useState("");
  const [brand, setBrand] = useState("");

  // Controls filter panel visibility on tablet/mobile
  const [isOpen, setIsOpen] = useState(false);

  // Handle dynamic filtering
  const handleFilterChange = () => {
    onFilterChange({
      price: price ? parseInt(price) : null,
      processor,
      brand,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setPrice("");
    setProcessor("");
    setBrand("");
    onFilterChange({ price: null, processor: "", brand: "" });
  };

  return (
    <>
      {/* 
        FILTER BUTTON (tablet/mobile only):
        Visible when panel is closed, hidden on large screens.
      */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-24 left-2 z-50 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition lg:hidden mt-4"
        >
          {/* Filter Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.41 5.41A2 2 0 0014 13.828v4.172a2 2 0 01-.586 1.414l-1 1A1 1 0 0111 20V13.828a2 2 0 00-.586-1.414L5 7.707A1 1 0 014.707 7H4V4z"
            />
          </svg>
        </button>
      )}

      {/* 
        FILTER PANEL:
        - Slides in/out on tablet/mobile.
        - Always visible on large screens.
      */}
      <div
        className={`
          fixed top-0 left-0 z-[9999] mt-6
          w-64 p-6 bg-white shadow-md rounded-r-lg
          transition-transform duration-300 overflow-auto max-h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:w-72 lg:rounded-none lg:shadow-none lg:max-h-none
        `}
      >
        {/* Header with Title + Close (only on tablet/mobile) */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Products
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-gray-800 transition lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* Price Filter */}
        <label className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          placeholder="Enter max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        />

        {/* Processor Filter */}
        <label className="block text-sm font-medium text-gray-700">
          Processor
        </label>
        <select
          value={processor}
          onChange={(e) => setProcessor(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        >
          <option value="">All</option>
          <option value="Intel Core i7">Intel Core i7</option>
          <option value="Intel Core i9">Intel Core i9</option>
          <option value="AMD Ryzen 7">AMD Ryzen 7</option>
          <option value="HEPA Filter">HEPA Filter</option>
          <option value="AMD Ryzen Custom">AMD Ryzen Custom</option>
          <option value="Wireless">Wireless</option>
          <option value="HD Webcam">HD Webcam</option>
          <option value="Multi-purpose">Multi-Purpose</option>
        </select>

        {/* Brand Filter */}
        <label className="block text-sm font-medium text-gray-700">
          Brand
        </label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
        >
          <option value="">All</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Asus">Asus</option>
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={handleFilterChange}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Apply Filters
        </button>

        {/* Reset Filters Button */}
        <button
          onClick={resetFilters}
          className="w-full bg-gray-400 text-white py-2 rounded-md mt-3 hover:bg-gray-500 transition-all"
        >
          Reset Filters
        </button>
      </div>
    </>
  );
};

export default SearchFilter;