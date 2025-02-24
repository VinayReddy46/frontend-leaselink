import React from "react";
import { useCart } from "../components/CartContext";

import { motion } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <p className="text-sm font-semibold">{item.name}</p>
              <p>₹ {item.price}</p>
              <p>Qty: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </motion.div>
          ))}

          <h3 className="mt-4 font-semibold">Total: ₹ {totalCost}</h3>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
