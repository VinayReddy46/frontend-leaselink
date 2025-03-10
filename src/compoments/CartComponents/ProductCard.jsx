import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <div className="cursor-pointer"
        onClick={handleImageClick} >
      <img
        src={product.images}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md cursor-pointer"
        onClick={handleImageClick}
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">Brand: {product.brand}</p>
      <p className="text-gray-600">Model: {product.model}</p>
      <p className="text-gray-600">Processor: {product.processor}</p>
      <p className="text-green-500 font-bold">₹{product.price}/-</p>
      </div>
      <button
        onClick={() => navigate("/chat")}
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Quote
      </button>
    </div>
  );
};

export default ProductCard;
