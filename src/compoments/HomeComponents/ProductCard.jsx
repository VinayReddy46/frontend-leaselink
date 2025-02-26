
import React from "react";

const ProductCard = ({ name, processor, brand, price, imageUrl }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-600">{processor}</p>
      <p className="text-gray-600">{brand}</p>
      <p className="text-blue-500 font-bold">₹{price}</p>
    </div>
  );
};

export default ProductCard;
