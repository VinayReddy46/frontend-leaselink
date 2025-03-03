import React, { useState } from "react";

const SearchFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: "",
    processor: "",
    brand: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({ price: "", processor: "", brand: "" });
    onFilterChange({});
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold mb-4">Filter Products</h3>

      <div className="mb-4">
        <label className="block font-medium">Max Price:</label>
        <input
          type="number"
          name="price"
          value={filters.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter max price"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Processor:</label>
        <select
          name="processor"
          value={filters.processor}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select Processor</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Brand:</label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Select Brand</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Apple">Apple</option>
          <option value="Asus">Asus</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
