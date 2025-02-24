import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext"; 
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      
      {/* Product Image */}
      <div className="relative w-full h-40 flex justify-center items-center overflow-hidden rounded-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-600">{product.processor}</p>
        <p className="text-xs text-gray-600">{product.model}</p>
        <p className="text-xs text-gray-600">{product.ssd}</p>
        <p className="text-green-600 font-bold mt-1 text-sm">₹ {product.price}</p>
      </div>

      {/* Star Rating System */}
      <div className="flex gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-7 w-7 ${
                (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118L10 13.011l-3.37 2.447c-.785.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.692 9.392c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.965z" />
            </svg>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col gap-2">
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded transition-all duration-300">
          Rent
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded transition-all duration-300">
          Chat Now
        </button>
        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="bg-red-600 hover:bg--700 text-white text-sm font-medium py-2 rounded flex justify-center items-center transition-all duration-300"
        >
          <FaShoppingCart className="mr-1" /> Add to Cart
        </button>
      </div>
      
    </div>
  );
};

export default ProductCard;
