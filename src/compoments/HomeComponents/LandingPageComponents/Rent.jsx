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
      But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee
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