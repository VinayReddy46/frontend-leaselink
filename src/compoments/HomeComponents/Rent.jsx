import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Rent = () => {
  const { id } = useParams();

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Rent Now
      </h1>
      <p className="text-gray-600 text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean 
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus 
        et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, 
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, 
        rhoncus ut, imperdiet a, venenatis vitae, justo.
      </p>

      <motion.div
        className="flex justify-between items-center mt-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-2xl font-extrabold text-blue-600">$10,000 / month</span>
        <motion.button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Rent
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Rent;