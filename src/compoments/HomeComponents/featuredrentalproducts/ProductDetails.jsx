import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/Products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen"
      >
        <h2 className="text-3xl font-bold text-red-500">Product Not Found</h2>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="container mx-auto px-6 py-12"
    >
     
      <motion.div
        className="relative border-4 border-gray-200 rounded-lg shadow-lg p-8 max-w-3xl mx-auto bg-white"
        whileHover={{
          boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 0.8)",
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg border-4 border-transparent"
          animate={{
            borderColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 0)"],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-80 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500"
          />
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mt-6"
        >
          <h2 className="text-4xl font-bold text-blue-600">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-4 px-4 md:px-16">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa.
            <span className="font-semibold"> {product.description}</span>
          </p>
          <p className="text-lg text-gray-700 mt-2">{product.specs}</p>
          <p className="text-2xl font-bold text-blue-500 mt-4">{product.price}</p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-4 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all border-2 border-blue-500"
          >
            Back to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all border-2 border-green-500"
          >
            Rent Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
