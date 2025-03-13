import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetCartItemsByUserIdQuery } from '../redux/services/cartApiSlice';
import Checkout from '../compoments/CartComponents/Checkout';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [progressStep, setProgressStep] = useState('checkout');
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');
  
  // Get user info from Redux store
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.id;
  
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
    
    // If cart data is available, set cart items and cart ID
    if (cartData) {
      setCartItems(cartData.cartItems || []);
      // The cart ID should be available in the response
      setCartId(cartData._id || '');
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
    } else {
      setProgressStep(step);
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
    <div className={`checkout-page ${progressStep === 'payment' ? 'payment-step' : 'address-step'}`}>
      <Checkout 
        cart={cartItems} 
        setProgressStep={handleProgressStep} 
        cartId={cartId}
      />
    </div>
  );
};

export default CheckoutPage;
