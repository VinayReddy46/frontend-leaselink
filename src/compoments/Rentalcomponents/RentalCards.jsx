import { FaHandsHelping, FaGlobe, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <motion.div className="flex justify-center" whileHover={{ scaleX: -1 }} transition={{ duration: 0.3 }}><FaHandsHelping className="text-blue-500 text-5xl mb-4" /></motion.div>, 
    title: "Quality Service",
    description: "There are many variations of passages available but the majority have suffered alteration in some form."
  },
  {
    icon: <motion.div className="flex justify-center" whileHover={{ scaleX: -1 }} transition={{ duration: 0.3}}><FaGlobe className="text-blue-500 text-5xl mb-4" /></motion.div>, 
    title: "Online Booking",
    description: "There are many variations of passages available but the majority have suffered alteration in some form."
  },
  {
    icon: <motion.div className="flex justify-center" whileHover={{ scaleX: -1 }} transition={{ duration: 0.5 }}><FaMoneyBillWave className="text-blue-500 text-5xl mb-4" /></motion.div>, 
    title: "Affordable Pricing",
    description: "There are many variations of passages available but the majority have suffered alteration in some form."
  }
];

export default function RentalCards() {
  return (
    <div className="px-6 py-12 flex justify-center items-center min-h-screen flex-col">
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        
      >
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-lg shadow-gray-400 text-center w-64 sm:w-72 md:w-80 mx-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {service.icon}
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}