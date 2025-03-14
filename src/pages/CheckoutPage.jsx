import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCartItemsByUserIdQuery } from '../redux/services/cartApiSlice';
import Checkout from '../compoments/CartComponents/Checkout';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // Get user info from Redux store
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.id || userInfo?.user?.id;
  
  // Fetch cart data using RTK Query
  const { data: cartData, isLoading, error } = useGetCartItemsByUserIdQuery(userId, {
    skip: !userId,
  });
  
  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!userId) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
      return;
    }
    
    // If cart data is available, set cart items
    if (cartData) {
      console.log("cartData", cartData);
      setCartItems(cartData.cartItems || []);
    }
    
    // Handle cart data from localStorage for cases where RTK Query hasn't loaded yet
    const localCartData = localStorage.getItem('cartData');
    if (localCartData && (!cartData || cartData.cartItems?.length === 0)) {
      try {
        const parsedData = JSON.parse(localCartData);
        if (parsedData.items && parsedData.items.length > 0) {
          setCartItems(parsedData.items);
        }
      } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
      }
    }
  }, [userId, cartData, navigate]);
  
  // Handle progress step changes
  const handleProgressStep = (step) => {
    if (step === 'cart') {
      navigate('/cart');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-600">Loading checkout...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading checkout</h2>
        <p className="text-gray-600 mb-6">{error.message || 'Failed to load cart data'}</p>
        <button
          onClick={() => navigate('/cart')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Return to Cart
        </button>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error?.data?.message || 'Failed to load cart data'}</span>
        </div>
      ) : (
        <Checkout 
          cart={cartItems} 
          setProgressStep={handleProgressStep} 
        />
      )}
    </div>
  );
};

export default CheckoutPage;
