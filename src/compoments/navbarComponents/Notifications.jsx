import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=15");
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications");
        console.error(err);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative z-10">
      {/* Notification Bell Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="hover:bg-sky-50  p-2 rounded-full transition"
        aria-label="Notifications"
      >
        <IoNotifications className="w-6 h-6 text-gray-600 hover:text-blue-600 " />
      </button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto shadow-lg 
                       [&::-webkit-scrollbar]:hidden [&]:scrollbar-none"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-3 right-3 text-gray-600 hover:text-black" 
              aria-label="Close notifications"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-semibold mb-4 mt-2">Notifications</h2>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <ul>
              {notifications.map((item) => (
                <li key={item.id} className="flex items-center p-3 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                  <Link to={`/notification/${item.id}`} className="flex items-center w-full" onClick={() => setIsOpen(false)}>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Notifications;