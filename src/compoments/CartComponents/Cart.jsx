import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/cartSlice";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems ,totalPrice} = useSelector((state) => state.cart);
  console.log(cartItems, totalPrice)
  
  const dispatch = useDispatch();

  // // Calculate total price dynamically
  const settotalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl min-h-[70vh] mx-auto px-6 mt-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-gray-100 p-3 font-semibold flex justify-between text-gray-800 text-sm md:text-base">
            <span className="w-2/5">Product</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Total</span>
          </div>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center p-4 gap-4 md:gap-0">
                <div className="w-full md:w-2/5 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>

                <span className="w-full md:w-1/5 text-center text-gray-700 text-sm md:text-base">
                  ₹{item.price.toLocaleString()}
                </span>

                <div className="w-full md:w-1/5 flex justify-center items-center gap-2">
                  {item.quantity > 1 ? (
                    <button
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <AiOutlineMinus className="text-lg" />
                    </button>
                  ) : (
                    <button
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <AiOutlineDelete className="text-lg" />
                    </button>
                  )}

                  <span className="text-gray-700 font-medium">{item.quantity}</span>

                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    <AiOutlinePlus className="text-lg" />
                  </button>
                </div>

                <span className="w-full md:w-1/5 text-center text-gray-700 text-sm md:text-base">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 flex justify-between font-semibold text-gray-800 text-lg">
            <span>Total Price:</span>
            <span>₹{settotalPrice.toLocaleString()}</span>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 text-center">
          <Link to="/checkout">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg shadow-md transition-all">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;