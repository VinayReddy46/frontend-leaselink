import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../CartComponents/ProductCard";
import SearchFilter from "./SearchFilter";
import productsData from "../CartComponents/Product";

const RentalPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let updatedProducts = category
      ? productsData.filter((product) => product.category === category)
      : productsData;
    setFilteredProducts(updatedProducts);
  }, [category]);

  const handleFilterChange = (filters) => {
    let filtered = category
      ? productsData.filter((product) => product.category === category)
      : productsData;

    if (filters.price) {
      filtered = filtered.filter((product) => product.price <= parseInt(filters.price));
    }
    if (filters.processor) {
      filtered = filtered.filter((product) => product.processor === filters.processor);
    }
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="px-4 py-8 flex flex-col lg:flex-row mt-10">
      {/* Filters Section */}
      <div className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-4">
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Products Section */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-6">
          {category ? `Products in ${category}` : "All Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found matching the filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalPage;