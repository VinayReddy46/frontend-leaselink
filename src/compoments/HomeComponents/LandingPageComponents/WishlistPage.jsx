import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import ProductCard from '../../CartComponents/ProductCard';
import { useWishlist } from '../../contexts/WishlistContext';

function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      // Add a small delay to ensure context is fully loaded
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (err) {
      setErrorMessage(err.message || "An error occurred loading the wishlist");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-red-500">Error loading wishlist: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FaHeart className="text-red-500 mr-3" /> My Wishlist
        </h1>
        
        {wishlist && wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center text-red-600 hover:text-red-700"
          >
            <FaTrash className="mr-1" /> Clear All
          </button>
        )}
      </div>
      
      {!wishlist || wishlist.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Start adding items to your wishlist to save them for later.
          </p>
          <Link to="/search" className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition">
            Browse Rentals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;