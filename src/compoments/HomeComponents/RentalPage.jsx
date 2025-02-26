// import React from "react";
// import { useParams } from "react-router-dom";
// import productsData from "./Product"; 

// const RentalPage = () => {
//   const { category } = useParams();


//   const filteredProducts = category
//     ? productsData.filter((product) => product.category === category)
//     : productsData; 

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-6">
//         {category ? `Products in ${category}` : "All Products"}
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
//             <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
//             <h3 className="text-lg font-semibold">{product.name}</h3>
//             <p className="text-sm text-gray-600">{product.processor}</p>
//             <p className="text-blue-500 font-bold">₹{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RentalPage;


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import SearchFilter from "./SearchFilter";
import productsData from "./Product";

const RentalPage = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(
    category ? productsData.filter((product) => product.category === category) : productsData
  );

  // Handle filtering logic
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
              <ProductCard key={product.id} {...product} />
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
