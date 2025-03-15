import { useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { useGetCartItemsByUserIdQuery, useRemoveFromCartMutation, useUpdateCartItemQuantityMutation } from "../../redux/services/cartApiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import PropTypes from 'prop-types';

const Cart = ({ forceRefetch = false }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.id;
  const { data, isLoading: isCartLoading, refetch } = useGetCartItemsByUserIdQuery(userId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });
  const cartItemsData = data?.cartItems || [];
  const totalCartPrice = data?.totalCartPrice || 0;
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  console.log("cartItemsData", cartItemsData);
  // Format date to a readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate rental duration in days
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? diffInDays : 0;
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!totalCartPrice) return 0;
    return totalCartPrice;
  };

  // Handle remove item
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId).unwrap();
      toast.success("Item removed from cart");
      refetch();
    } catch (error) {
      toast.error("Failed to remove item");
      console.error("Failed to remove item:", error);
    }
  };

  // Handle quantity increase
  const handleIncreaseQuantity = async (itemId, currentQuantity) => {
    try {
      await updateCartItemQuantity({
        itemId: itemId,
        quantity: currentQuantity + 1
      }).unwrap();
      refetch();
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Failed to update quantity:", error);
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = async (itemId, currentQuantity) => {
    if (currentQuantity <= 1) return;
    try {
      await updateCartItemQuantity({
        itemId: itemId,
        quantity: currentQuantity - 1
      }).unwrap();
      refetch();
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Failed to update quantity:", error);
    }
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    // Save cart data to localStorage before navigating
    localStorage.setItem('cartData', JSON.stringify({
      items: cartItemsData.map(item => ({
        ...item,
        _id: item._id // Ensure each item has its _id
      })),
      total: calculateTotal()
    }));
    
    navigate('/checkout');
  };

  // Effect to refetch cart data when forceRefetch prop changes
  useEffect(() => {
    if (forceRefetch) {
      console.log("Force refetching cart data");
      refetch();
    }
  }, [forceRefetch, refetch]);

  // Refetch cart data when component mounts
  useEffect(() => {
    console.log("Cart component mounted, refetching data");
    refetch();
  }, [refetch]);

  // Display loading state
  if (isCartLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-4 text-lg text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {!cartItemsData || cartItemsData.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
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
                <h2 className="text-lg font-medium text-gray-900">Cart Items ({cartItemsData.length})</h2>
              </div>

              <ul className="divide-y divide-gray-200">
                {cartItemsData.map((item) => (
                  <li key={item._id} className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={item.productDetails?.images?.[0]?.url || item.product?.images?.[0]?.url || "https://via.placeholder.com/150"}
                          alt={item.productDetails?.name || item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{item.productDetails?.name || item.product?.name || `Product ID: ${item.productId}`}</h3>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <AiOutlineDelete className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Rental Period */}
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-2" />
                          <span>
                            {formatDate(item.start_time)} - {formatDate(item.end_time)} 
                            ({calculateDays(item.start_time, item.end_time)} days)
                          </span>
                        </div>

                        {/* Insurance Details */}
                        {item.insuranceId && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <FaShieldAlt className="mr-2" />
                            <span>Insurance Applied</span>
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="mt-2 text-sm text-gray-500">
                          <p>{item.productDetails?.description || item.product?.description || "No description available"}</p>
                          {(item.productDetails?.model_name || item.product?.model_name) && (
                            <p className="mt-1">Model: {item.productDetails?.model_name || item.product?.model_name}</p>
                          )}
                        </div>

                        {/* Price Details */}
                        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Price: ₹{item.productDetails?.price || item.product?.price || 0} per day
                            </p>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              Total: ₹{item.total_price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                              className="p-2 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <AiOutlineMinus className="h-5 w-5" />
                            </button>
                            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
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
                  {cartItemsData.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.product?.name || `Product #${item.productId.slice(-4)}`} (x{item.quantity})</span>
                      <span className="text-gray-900">
                        ₹{item.total_price.toFixed(2)}
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

Cart.propTypes = {
  forceRefetch: PropTypes.bool
};

export default Cart;
