import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl mx-auto pt-12">
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.5 }}
          className="flex-1 bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your message"
                required
                className="w-full px-3 py-2 bg-gray-600 text-white placeholder-gray-400 border border-gray-500 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#7BD3EA] text-black py-2 rounded font-semibold shadow transition duration-200"
            >
              Send Message 🚀
            </motion.button>
          </form>
        </motion.div>

        {/* How We Help Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
          className="flex-1 flex flex-col justify-center text-white"
        >
          <h2 className="text-3xl font-bold mb-3">
            How LeaseLink Elevates Your Experience
          </h2>
          <p className="mb-3 text-base">
            At <strong>LeaseLink</strong>, renting and lending transform into a
            seamless experience. Our innovative platform connects you to a world
            of opportunities with unmatched security and ease.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base">
            <li>
              <strong>Effortless Rentals:</strong> Browse and list items quickly.
            </li>
            <li>
              <strong>Secure Transactions:</strong> Experience safe, verified payments.
            </li>
            <li>
              <strong>24/7 Support:</strong> Get round-the-clock assistance.
            </li>
            <li>
              <strong>Trusted Community:</strong> Connect with verified users.
            </li>
          </ul>
          <p className="mt-4 text-base">
            Ready to experience the future of rentals? Reach out and join us today!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

