import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/productsData";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Products = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // For filters
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSSDs, setSelectedSSDs] = useState([]);
  const [priceRange, setPriceRange] = useState(150000);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Show 6 products per page

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Filter logic
  useEffect(() => {
    let temp = [...productsData];

    // Search filter
    if (searchQuery) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Processor filter
    if (selectedProcessors.length > 0) {
      temp = temp.filter((p) => selectedProcessors.includes(p.processor));
    }

    // Model filter
    if (selectedModels.length > 0) {
      temp = temp.filter((p) => selectedModels.includes(p.model));
    }

    // SSD filter
    if (selectedSSDs.length > 0) {
      temp = temp.filter((p) => selectedSSDs.includes(p.ssd));
    }

    // Price filter
    temp = temp.filter((p) => p.price <= priceRange);

    setFilteredProducts(temp);
    setCurrentPage(1); // Reset to first page on filter change
  }, [
    searchQuery,
    selectedProcessors,
    selectedModels,
    selectedSSDs,
    priceRange,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex p-4">
      {/* Filters on the left */}
      <div className="mr-4">
        <Filter
          selectedProcessors={selectedProcessors}
          setSelectedProcessors={setSelectedProcessors}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          selectedSSDs={selectedSSDs}
          setSelectedSSDs={setSelectedSSDs}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>

      {/* Products on the right */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentProducts.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>


        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
