

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import SearchFilter from "./SearchFilter";
// import productsData from "./Product";

// const RentalPage = () => {
//   const { category, products } = useParams();
//   const [filteredProducts, setFilteredProducts] = useState(
//     category ? productsData.filter((product) => product.category === category) : productsData
//   );

//   // Handle filtering logic
//   const handleFilterChange = (filters) => {
//     let filtered = category
//       ? productsData.filter((product) => product.category === category)
//       : productsData;

//     if (filters.price) {
//       filtered = filtered.filter((product) => product.price <= parseInt(filters.price));
//     }
//     if (filters.processor) {
//       filtered = filtered.filter((product) => product.processor === filters.processor);
//     }
//     if (filters.brand) {
//       filtered = filtered.filter((product) => product.brand === filters.brand);
//     }

//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 flex">
//       {/* Sidebar for Filters */}
//       <div className="w-1/4">
//         <SearchFilter onFilterChange={handleFilterChange} />
//       </div>

//       {/* Product Grid */}
//       <div className="w-3/4">
//         <h2 className="text-2xl font-bold mb-6">
//           {category ? `Products in ${category}` : "All Products"}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               // <ProductCard key={product.id} {...product} />
//               <ProductCard key={product.id} product={product} />
//             ))
//           ) : (
//             <p className="text-gray-500 text-center col-span-full">
//               No products found matching the filters.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RentalPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SearchFilter from "./SearchFilter";
import productsData from "./Product";  // ✅ Ensure correct import path

const RentalPage = () => {
  const { category } = useParams(); // ✅ Get category from URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Filter products when the category changes
  useEffect(() => {
    let updatedProducts = category
      ? productsData.filter((product) => product.category === category)
      : productsData;
    setFilteredProducts(updatedProducts);
  }, [category]);

  // ✅ Handle filtering logic
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
    <div className="container mx-auto px-4 py-8 flex">
      {/* Sidebar for Filters */}
      <div className="w-1/4">
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Product Grid */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold mb-6">
          {category ? `Products in ${category}` : "All Products"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />  // ✅ Pass `product` correctly
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
