// import React, { useState } from "react";

// const SearchFilter = ({ onFilterChange }) => {
//   const [price, setPrice] = useState("");
//   const [processor, setProcessor] = useState("");
//   const [brand, setBrand] = useState("");

//   const handleFilterChange = () => {
//     onFilterChange({ price, processor, brand });
//   };

//   return (
// <div className="p-14 bg-white shadow-md rounded-lg w-72 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
//   <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Products</h2>

//   <label className="block text-sm font-medium text-gray-700">Price</label>
//   <input
//     type="number"
//     placeholder="Max Price"
//     className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//   />

//   <label className="block text-sm font-medium text-gray-700">Processor</label>
//   <select className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all">
//     <option value="">All</option>
//     <option value="Intel Core i7">Intel Core i7</option>
//     <option value="Intel Core i9">Intel Core i9</option>
//     <option value="AMD Ryzen 7">AMD Ryzen 7</option>
//   </select>

//   <label className="block text-sm font-medium text-gray-700">Brand</label>
//   <select className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all">
//     <option value="mac">laptop</option>
//     <option value="Dell">Dell</option>
//     <option value="HP">HP</option>
//     <option value="Asus">Asus</option>
//   </select>

//   <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
 
//   >
//     Apply Filters
//   </button>
// </div>
//     );
//     }


// export default SearchFilter;


import React, { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [price, setPrice] = useState("");
  const [processor, setProcessor] = useState("");
  const [brand, setBrand] = useState("");

  // Function to handle dynamic filtering
  const handleFilterChange = () => {
    onFilterChange({
      price: price ? parseInt(price) : null,
      processor,
      brand,
    });
  };

  // Function to reset filters
  const resetFilters = () => {
    setPrice("");
    setProcessor("");
    setBrand("");
    onFilterChange({ price: null, processor: "", brand: "" });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-72 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Products</h2>

      {/* Price Filter */}
      <label className="block text-sm font-medium text-gray-700">Max Price</label>
      <input
        type="number"
        placeholder="Enter max price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
      />

      {/* Processor Filter */}
      <label className="block text-sm font-medium text-gray-700">Processor</label>
      <select
        value={processor}
        onChange={(e) => setProcessor(e.target.value)}
        className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
      >
        <option value="">All</option>
        <option value="Intel Core i7">Intel Core i7</option>
        <option value="Intel Core i9">Intel Core i9</option>
        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
      </select>

      {/* Brand Filter */}
      <label className="block text-sm font-medium text-gray-700">Brand</label>
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
  );
};

export default SearchFilter;