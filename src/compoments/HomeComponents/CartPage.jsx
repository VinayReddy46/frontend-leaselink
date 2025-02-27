import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const CartPage = () => {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
  const location = useLocation();
  const newProduct = location.state?.product;

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (newProduct) {
      setCartItems((prevItems) => {
        const existingProduct = prevItems.find(
          (item) => item.id === newProduct.id
        );
        let updatedCart;
        if (existingProduct) {
          updatedCart = prevItems.map((item) =>
            item.id === newProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prevItems, { ...newProduct, quantity: 1 }];
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  }, [newProduct]);

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeProduct = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculateSubtotal = () =>
    cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  if (cartItems.length === 0) {
    return <h2 className="text-center text-red-500">⚠ Your Cart is Empty</h2>;
  }
  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.map((product) => (
          <div key={product.id} className="flex items-center border-b pb-4 mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="ml-6 flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-green-600 text-sm">
                Processor: {product.processor}
              </p>
              <p className="text-sm mt-2">Brand: {product.brand}</p>
              <p className="text-blue-500 font-bold text-lg">
                Price: ₹{product.price}
              </p>

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`gift-${product.id}`}
                  className="mr-2"
                />
                <label htmlFor={`gift-${product.id}`}>
                  This will be a gift
                </label>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">
                ₹{product.price * product.quantity}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="px-3 py-1 bg-gray-200 rounded-full text-lg"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="mx-2 text-lg">{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="px-3 py-1 bg-gray-200 rounded-full text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right">
          <p className="text-lg font-semibold">
            Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            item{cartItems.length > 1 ? "s" : ""}):{" "}
            <span className="text-xl font-bold">
              ₹{calculateSubtotal().toLocaleString("en-IN")}
            </span>
          </p>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <button className="w-full py-3 mt-4 bg-yellow-500 text-white text-lg font-bold rounded-lg">
              Proceed to Buy
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
