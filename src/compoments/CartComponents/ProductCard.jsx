import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useWishlist } from "../contexts/WishlistContext";

const ProductCard = ({ product }) => {
  console.log("Product:", product);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleImageClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 group cursor-pointer overflow-hidden bg-white"
      onClick={handleImageClick}
    >
      <div className="relative">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {inWishlist ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <FaRegHeart className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
          )}
        </button>

        {/* Promoted Badge */}
        {product.isPromoted && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
              <FaStar className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-yellow-700">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 mt-2">Brand: {product.brand}</p>
        <p className="text-gray-600">Model: {product.model}</p>
        <p className="text-gray-600">Processor: {product.processor}</p>
        {product.location && <p className="text-gray-500 text-sm mt-2">{product.location}</p>}

        <p className="text-green-600 font-bold mt-3">
          ₹{product.price}/-
          {product.priceUnit && <span className="text-gray-500 text-sm"> / {product.priceUnit}</span>}
        </p>

        <div className="mt-3 flex justify-between items-center">
          {product.availability !== undefined && (
            <span className={`text-sm ${product.availability ? "text-green-600" : "text-red-600"}`}>
              {product.availability ? "Available Now" : "Currently Unavailable"}
            </span>
          )}
        </div>

        {/* Quote Button - Full Width */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation when clicking the button
            navigate("/chat");
          }}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default ProductCard;