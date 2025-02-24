import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductDetails = () => {
    navigate(`/product/${product.id}`); 
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.97 }}
      className="relative bg-white shadow-md border border-gray-200 rounded-xl p-5 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleProductDetails} 
    >
     
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-50 object-cover rounded-lg"
        />
      </motion.div>

      
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.specs}</p>
        <p className="text-blue-600 font-bold text-lg mt-2">{product.price}</p>
      </div>

     
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation(); 
          handleProductDetails();
        }}
        className="mt-4 bg-blue-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300 w-full"
      >
        Rent Now
      </motion.button>

      <motion.div
        className="absolute top-0 left-0 w-full h-full rounded-xl border-2 border-transparent transition-all duration-500"
        whileHover={{
          borderColor: "rgba(59, 130, 246, 0.8)",
          boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.5)",
        }}
      />
    </motion.div>
  );
};

export default ProductCard;
