import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../CartComponents/ProductCard";
import SearchFilter from "./SearchFilter";
import {
  useGetProductsQuery,
  useGetAllProductsQuery
} from "../../redux/services/addProductSlice";
import { useGetCategoriesQuery } from "../../redux/services/categoriesSlice";

const RentalPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  console.log("category", category);

  // Fetch categories to get the name
  const { data: categoriesData } = useGetCategoriesQuery();

  // Use getProducts query when category exists, skip otherwise
  const {
    data: categoryProducts,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetProductsQuery(category, { skip: !category });

  // Use getAllProducts query when no category exists, skip otherwise
  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    error: allProductsError,
  } = useGetAllProductsQuery(undefined, { skip: !!category });

  useEffect(() => {
    // If category exists and products are loaded, update filtered products
    if (category && categoryProducts) {
      console.log("Category products:", categoryProducts);
      setFilteredProducts(categoryProducts);
    } 
    // If no category and all products are loaded, update filtered products
    else if (!category && allProducts) {
      console.log("All products:", allProducts);
      setFilteredProducts(allProducts);
    }
  }, [category, categoryProducts, allProducts]);

  useEffect(() => {
    // Update category name when categories are loaded or category changes
    if (categoriesData?.categories && category) {
      const foundCategory = categoriesData.categories.find(cat => cat._id === category);
      setCategoryName(foundCategory ? foundCategory.name : "Unknown");
    } else {
      setCategoryName("");
    }
  }, [categoriesData, category]);

  const handleFilterChange = (filters) => {
    // Get the source data based on whether we have a category
    const sourceData = category ? categoryProducts : allProducts;
    
    // Apply filters to the products
    if (!sourceData) return;

    // Apply filters
    let filtered = [...sourceData];

    if (filters.price && filters.price.max) {
      filtered = filtered.filter(
        (product) => product.price <= parseInt(filters.price.max)
      );
    }

    if (filters.price && filters.price.min) {
      filtered = filtered.filter(
        (product) => product.price >= parseInt(filters.price.min)
      );
    }

    if (filters.brand) {
      filtered = filtered.filter(
        (product) =>
          product.brand_name &&
          product.brand_name.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // Apply model filtering if available
    if (filters.model) {
      filtered = filtered.filter(
        (product) =>
          product.model_name &&
          product.model_name.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Loading state
  const isLoading = category ? isCategoryLoading : isAllProductsLoading;
  
  // Error state
  const error = category ? categoryError : allProductsError;

  if (isLoading) {
    return (
      <div className="px-4 py-8 flex flex-col lg:flex-row mt-10">
        <div className="w-full text-center">
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700">Error Loading Products</h2>
            <p className="text-slate-500 text-center">
              We're having trouble loading the products. Please try again later or contact support if the problem persists.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 flex flex-col lg:flex-row mt-10">
      {/* Filters Section */}
      <div className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-4">
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Products Section */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-6">
          {category ? (categoryName ? `Products in ${categoryName}` : "Loading category...") : "All Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  brand: product.brand_name,
                  model: product.model_name,
                  description: product.description,
                  price: product.price,
                  category: product.category,
                  mainImage:
                    product.images && product.images.length > 0
                      ? product.images[0].url
                      : "",
                  isBestseller: product.is_best_seller,
                  images: product.images?.map(img => img.url) || [],
                  availability: product.total_quantity > 0,
                  insurance: product.insurance
                }}
              />
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
