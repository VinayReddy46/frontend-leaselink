import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => { 
  const navigate = useNavigate();

  const handleChatClick =()=>{
    navigate('/chat')
  }
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.processor}</p>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-blue-500 font-bold">₹{product.price}</p>

      

<Link
  to={`/product/${product.id}`}
  state={{ product }} // ✅ Pass product as state
>
  <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
    View Details
  </button>
  
</Link>
          <button
            onClick={handleChatClick}
            className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Chat Now
          </button>
    </div>
  );
};

export default ProductCard;
