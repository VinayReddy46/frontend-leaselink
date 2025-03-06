import React, { useState } from "react";
import { FaFilter, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSearch } from "../../compoments/contexts/SearchContext";

const SearchFilters = ({ onFilterChange }) => {
  const { filters, setFilters } = useSearch();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      price: {
        ...filters.price,
        [type]: value === '' ? null : Number(value),
      },
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({
      ...filters,
      dates: { start, end },
    });
  };

  const handleAvailabilityChange = (e) => {
    setFilters({
      ...filters,
      onlyAvailable: e.target.checked,
    });
  };

  const handleCategoryChange = (e) => {
    setFilters({
      ...filters,
      category: e.target.value === 'all' ? null : e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      price: { min: null, max: null },
      dates: { start: null, end: null },
      onlyAvailable: false,
      category: null,
    });
    onFilterChange({});
  };

  return (
    <div className="p-3 border rounded-lg shadow-md bg-white mt-[50px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <FaFilter className="mr-2" /> Filters
        </h2>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min ($)</label>
                <input
                  type="number"
                  min="0"
                  value={filters.price?.min || ''}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max ($)</label>
                <input
                  type="number"
                  min="0"
                  value={filters.price?.max || ''}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" /> Availability
            </h3>
            <DatePicker
              selectsRange={true}
              startDate={filters.dates?.start}
              endDate={filters.dates?.end}
              onChange={handleDateChange}
              className="w-full p-2 border rounded mt-1"
              placeholderText="Select date range"
              isClearable
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <select
              name="category"
              value={filters.category || 'all'}
              onChange={handleCategoryChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="all">All Categories</option>
              <option value="tools">Tools</option>
              <option value="electronics">Electronics</option>
              <option value="vehicles">Vehicles</option>
              <option value="properties">Properties</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="onlyAvailable"
              checked={filters.onlyAvailable}
              onChange={handleAvailabilityChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="onlyAvailable" className="ml-2 block text-sm text-gray-700">
              Show only available items
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={resetFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;