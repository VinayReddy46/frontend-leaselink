import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../../redux/features/cartSlice";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaShieldAlt } from "react-icons/fa";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Format date to a readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate total price including rental amounts and insurance
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = (item.rentalAmount + (item.insurance?.price || 0)) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    // Save cart data to localStorage before navigating
    localStorage.setItem('cartData', JSON.stringify({
      items: cartItems,
      total: calculateTotal()
    }));
    
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-medium text-gray-900">Cart Items ({cartItems.length})</h2>
              </div>

              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <AiOutlineDelete className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Rental Period */}
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2" />
                          <span>
                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                          </span>
                        </div>

                        {/* Insurance Details */}
                        {item.insurance && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <FaShieldAlt className="mr-2" />
                            <span>{item.insurance.name} - ₹{item.insurance.price}</span>
                          </div>
                        )}

                        {/* Price Details */}
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Rental Amount: ₹{item.rentalAmount}</p>
                            {item.insurance && (
                              <p className="text-sm text-gray-500">Insurance: ₹{item.insurance.price}</p>
                            )}
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              Total: ₹{((item.rentalAmount + (item.insurance?.price || 0)) * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item.id))}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <AiOutlineMinus className="h-5 w-5" />
                            </button>
                            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(increaseQuantity(item.id))}
                              className="p-2 hover:bg-gray-100"
                            >
                              <AiOutlinePlus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.name} (x{item.quantity})</span>
                      <span className="text-gray-900">
                        ₹{((item.rentalAmount + (item.insurance?.price || 0)) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total Amount</span>
                    <span className="text-base font-medium text-gray-900">
                      ₹{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;