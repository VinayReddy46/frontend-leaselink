// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";
// import PaymentForm from "./PaymentForm";



// const CartPage = () => {
//      useEffect(() => {
//             window.scrollTo(0, 0);
//           }, []);

//           const handlePaymentSuccess = (values) => {
//             console.log("PaymentSuccessful",values)
//           }

//   const location = useLocation();
//   const newProduct = location.state?.product;

// const [showPaymentForm , setShowPaymentForm] = useState(false);
// //  const 
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     if (newProduct) {
//       setCartItems((prevItems) => {
//         const existingProduct = prevItems.find(
//           (item) => item.id === newProduct.id
//         );
//         let updatedCart;
//         if (existingProduct) {
//           updatedCart = prevItems.map((item) =>
//             item.id === newProduct.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           );
//         } else {
//           updatedCart = [...prevItems, { ...newProduct, quantity: 1 }];
//         }
//         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//         return updatedCart;
//       });
//     }
//   }, [newProduct]);

//   const updateQuantity = (productId, amount) => {
//     setCartItems((prevItems) => {
//       const updatedCart = prevItems.map((item) =>
//         item.id === productId
//           ? { ...item, quantity: Math.max(1, item.quantity + amount) }
//           : item
//       );
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeProduct = (productId) => {
//     setCartItems((prevItems) => {
//       const updatedCart = prevItems.filter((item) => item.id !== productId);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const calculateSubtotal = () =>
//     cartItems.reduce(
//       (total, product) => total + product.price * product.quantity,
//       0
//     );

//   if (cartItems.length === 0) {
//     return <h2 className="text-center text-red-500">⚠ Your Cart is Empty</h2>;
//   }
  
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//         {cartItems.map((product) => (
//           <div key={product.id} className="flex items-center border-b pb-4 mb-4">
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="w-32 h-32 object-cover rounded-lg"
//             />
//             <div className="ml-6 flex-1">
//               <h2 className="text-xl font-semibold">{product.name}</h2>
//               <p className="text-green-600 text-sm">
//                 Processor: {product.processor}
//               </p>
//               <p className="text-sm mt-2">Brand: {product.brand}</p>
//               <p className="text-blue-500 font-bold text-lg">
//                 Price: ₹{product.price}
//               </p>

//               <div className="flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   id={`gift-${product.id}`}
//                   className="mr-2"
//                 />
//                 <label htmlFor={`gift-${product.id}`}>
//                   This will be a gift
//                 </label>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-xl font-bold">
//                 ₹{product.price * product.quantity}
//               </p>
//               <div className="flex items-center mt-2">
//                 <button
//                   onClick={() => updateQuantity(product.id, -1)}
//                   className="px-3 py-1 bg-gray-200 rounded-full text-lg"
//                   aria-label="Decrease quantity"
//                 >
//                   -
//                 </button>
//                 <span className="mx-2 text-lg">{product.quantity}</span>
//                 <button
//                   onClick={() => updateQuantity(product.id, 1)}
//                   className="px-3 py-1 bg-gray-200 rounded-full text-lg"
//                   aria-label="Increase quantity"
//                 >
//                   +
//                 </button>
//               </div>
//               <button
//                 onClick={() => removeProduct(product.id)}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}

//         <div className="text-right">
//           <p className="text-lg font-semibold">
//             Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
//             item{cartItems.length > 1 ? "s" : ""}):{" "}
//             <span className="text-xl font-bold">
//               ₹{calculateSubtotal().toLocaleString("en-IN")}
//             </span>
//           </p>
//           <motion.div
//          initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//          transition={{ duration: 0.5, type: "spring" }}
//          > 

//         {!showPaymentForm ? (
//           <motion.button whileHover={{scale:1.02}}
//           whileTap={{scale:0.98}}
//           type="button" className="w-full py-3 mt-4 bg-yellow-500 text-white text-lg font-bold rounded-lg" 
//           onClick ={() => setShowPaymentForm (true)}

//           >
//             Proceed to Buy
            
//           </motion.button>
//         ):(<PaymentForm orderTotal={calculateSubtotal ()}
//         onSuccess={handlePaymentSuccess()}/>)

//        }
         
//      </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

//cart.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Button } from "primereact/button";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  console.log(cartItems,totalPrice)
  const dispatch = useDispatch();
  

  return (
    <div className="max-w-5xl mx-auto p-6 mt-32">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-100 p-3 font-semibold flex justify-between text-gray-800">
            <span className="w-2/5">Product</span>
            <span className="w-1/5 text-center">Price</span>
            <span className="w-1/5 text-center">Quantity</span>
            <span className="w-1/5 text-center">Total</span>
          </div>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-4">
                {/* Product Info */}
                <div className="w-2/5 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-gray-800 font-medium">
                    {item.title}
                  </span>
                </div>

                {/* Price */}
                <span className="w-1/5 text-center text-gray-700">
                  ₹{item.subTotal}
                </span>

                {/* Quantity Controls */}
                <div className="w-1/5 flex justify-center items-center gap-2">
                  <Button
                    icon={<AiOutlineMinus className="text-lg" />}
                    className="p-button-text p-2"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity === 1}
                  />
                  <span className="text-gray-700 font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    icon={<AiOutlinePlus className="text-lg" />}
                    className="p-button-text p-2"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  />
                </div>

                {/* Total Price */}
                <span className="w-1/5 text-center text-gray-700">
                  ₹{item.totalPrice}
                </span>

                {/* Remove Button */}
                <Button
                  icon={<AiOutlineDelete className="text-lg text-red-600" />}
                  className="p-button-text p-2"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            ))}
          </div>
          {/* Cart Footer */}
          <div className="bg-gray-100 p-4 flex justify-between font-semibold text-gray-800">
            <span>Total Price:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
      <div className="mt-4 text-center">
        <Link to="/checkout">
          <button className="p-2 bg-blue-500 text-white rounded-lg">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;