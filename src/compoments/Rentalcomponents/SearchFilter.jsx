import React from "react";
import PropTypes from 'prop-types';
import { FaFilter, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSearch } from "../../compoments/contexts/SearchContext";

import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/services/categoriesSlice";

const SearchFilters = ({ onFilterChange }) => {
  const { filters, setFilters } = useSearch();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  
  // Fetch categories from the API
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();

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

  const handleModelChange = (e) => {
    setFilters({
      ...filters,
      model: e.target.value,
    });
  };

  const handleBrandChange = (e) => {
    setFilters({
      ...filters,
      brand: e.target.value,
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
    const categoryId = e.target.value;
    setFilters({
      ...filters,
      category: categoryId === 'all' ? null : categoryId,
    });
    
    // Navigate to the selected category if it's not 'all'
    if (categoryId !== 'all') {
      navigate(`/rental/${categoryId}`);
    } else {
      navigate('/rental');
    }
    
    // Apply filters
    onFilterChange({
      ...filters,
      category: categoryId === 'all' ? null : categoryId,
    });
  };

  const resetFilters = () => {
    setFilters({
      price: { min: null, max: null },
      dates: { start: null, end: null },
      onlyAvailable: false,
      category: null,
      brand: '',
      model: '',
    });
    onFilterChange({});
    
    // Navigate to main rental page
    navigate('/rental');
  };

  // Apply current filters
  const applyFilters = () => {
    onFilterChange(filters);
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
                <label className="block text-sm text-gray-600 mb-1">Min (₹)</label>
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
                <label className="block text-sm text-gray-600 mb-1">Max (₹)</label>
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
            <h3 className="font-medium mb-2">Brand</h3>
            <input
              type="text"
              placeholder="Search by brand"
              value={filters.brand || ''}
              onChange={handleBrandChange}
              className="w-full p-2 border rounded mt-1"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Model</h3>
            <input
              type="text"
              placeholder="Search by model"
              value={filters.model || ''}
              onChange={handleModelChange}
              className="w-full p-2 border rounded mt-1"
            />
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
              {isLoading ? (
                <option disabled>Loading categories...</option>
              ) : error ? (
                <option disabled>Error loading categories</option>
              ) : categoriesData?.categories ? (
                categoriesData.categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
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

          <div className="flex justify-between pt-2">
            <button
              onClick={applyFilters}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Apply Filters
            </button>
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

// Add prop validation
SearchFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default SearchFilters;