// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaTrash, FaChevronRight } from "react-icons/fa";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../../redux/cartSlice";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [promoCode, setPromoCode] = useState("");
//   const [promoApplied, setPromoApplied] = useState(false);
//   const [discount, setDiscount] = useState(0);

//   // useEffect(() => {
//   //   try {
//   //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//   //     setCart(Array.isArray(storedCart) ? storedCart : []);
//   //   } catch (error) {
//   //     console.error("Error loading cart from localStorage:", error);
//   //     setCart([]);
//   //   }
//   // }, []);

//   // const removeItem = (id) => {
//   //   const updatedCart = cart.filter((_, i) => i !== id);
//   //   setCart(updatedCart);
//   //   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   // };

//   // const updateQuantity = (id, newQuantity) => {
//   //   if (newQuantity < 1) return;
    
//   //   const updatedCart = cart.map((item, i) => {
//   //     if (i === id) {
//   //       return {
//   //         ...item,
//   //         quantity: newQuantity,
//   //         total: (item.rentalRate * newQuantity + (item.coverage ? 250 : 0)) || 0
//   //       };
//   //     }
//   //     return item;
//   //   });
    
//   //   setCart(updatedCart);
//   //   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   // };

//   // const calculateSubtotal = () => {
//   //   return cart.reduce((total, item) => total + (item.total || 0), 0);
//   // };

//   // const calculateTotal = () => {
//   //   return (cart.reduce((total, item) => total + (item.total || 0), 0) || 0).toFixed(2);
//   // };

//   const { cartItems, totalPrice } = useSelector((state) => state.cart);
//     console.log(cartItems,totalPrice)
//     const dispatch = useDispatch();

//   // const applyPromoCode = () => {
//   //   if (promoCode.toUpperCase() === "DISCOUNT10") {
//   //     const subtotal = calculateSubtotal();
//   //     setDiscount(subtotal * 0.1);
//   //     setPromoApplied(true);
//   //   } else {
//   //     setDiscount(0);
//   //     setPromoApplied(false);
//   //   }
//   // };

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6">
//       <div className="flex items-center mb-6">
//         <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Continue Shopping
//         </Link>
//         <h1 className="text-2xl font-bold ml-auto">Your Cart</h1>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="w-full lg:w-2/3">
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.length})</h2>
//             {cartItems.length === 0 ? (
//               <p className="text-gray-600">Your cart is empty.</p>
//             ) : (
//               <div className="space-y-6">
//                 {cartItems.map((item, index) => (
//                   <div key={index} className="border-b pb-6">
//                     <div className="flex flex-col md:flex-row">
//                       <div className="flex-grow md:ml-6">
//                         <div className="flex justify-between">
//                           <h3 className="text-lg font-semibold">{item.name}</h3>
//                           <button 
//                             onClick={() => removeItem(index)}
//                             className="text-gray-400 hover:text-red-500"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                         <div className="flex justify-between items-center mt-4">
//                           <div className="text-right">
//                             <div className="text-sm text-gray-600">₹{item.rentalRate} rental</div>
//                             <div className="text-lg font-semibold">₹{(item.subTotal || 0).toFixed(2)}</div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="w-full lg:w-1/3">
//           <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//             <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-medium">₹{totalPrice}</span>
//             </div>
//             {promoApplied && (
//               <div className="flex justify-between text-green-600">
//                 <span>Discount (10%)</span>
//                 <span>-₹{discount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="flex justify-between text-lg font-bold pt-4 border-t">
//               <span>Total</span>
//               <span>₹{totalPrice}</span>
//             </div>
//             <button
//               className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg"
//               onClick={() => navigate("/checkout")}
//             >
//               Proceed to Checkout <FaChevronRight className="ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

//cart.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  console.log(cartItems,totalPrice)
  const dispatch = useDispatch();

  return (
    <div className="max-w-5xl min-h-[70vh] mx-auto px-6 mt-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          {/* Table Header */}
          <div className="bg-gray-100 p-3 font-semibold flex justify-between text-gray-800 text-sm md:text-base">
            <span className="w-2/5">Product</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Total</span>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center p-4 gap-4 md:gap-0">
                {/* Product Info */}
                <div className="w-full md:w-2/5 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>

                {/* Price */}
                <span className="w-full md:w-1/5 text-center text-gray-700 text-sm md:text-base">
                  ₹{item.subTotal.toLocaleString()}
                </span>

                {/* Quantity Controls */}
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

                {/* Total Price */}
                <span className="w-full md:w-1/5 text-center text-gray-700 text-sm md:text-base">
                  ₹{item.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="bg-gray-100 p-4 flex justify-between font-semibold text-gray-800 text-lg">
            <span>Total Price:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Checkout Button */}
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
