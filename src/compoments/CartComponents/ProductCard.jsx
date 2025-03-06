import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useWishlist } from "../contexts/WishlistContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div 
      className="border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 group cursor-pointer"
      onClick={handleImageClick}
    >
      <div className="relative">
        <img
          src={Array.isArray(product.images) ? product.images[0] : product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          {inWishlist ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <FaRegHeart className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {/* Promoted Badge */}
        {product.isPromoted && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center">
              <FaStar className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-600">Model: {product.model}</p>
        <p className="text-gray-600">Processor: {product.processor}</p>
        {product.location && <p className="text-gray-500 text-sm">{product.location}</p>}

        <p className="text-green-500 font-bold mt-2">
          ₹{product.price}/-
          {product.priceUnit && <span className="text-gray-500 text-sm"> / {product.priceUnit}</span>}
        </p>

        <div className="mt-3 flex justify-between items-center">
          {product.availability !== undefined && (
            <span className="text-sm text-gray-500">
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
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Quote
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
