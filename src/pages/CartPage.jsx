import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cart from '../compoments/CartComponents/Cart';

const CartPage = () => {
  const location = useLocation();
  const [forceRefetch, setForceRefetch] = useState(false);
  
  // Check if we're coming from a successful order placement
  useEffect(() => {
    if (location.state?.orderSuccess) {
      console.log('Order was successful, forcing cart refetch');
      setForceRefetch(true);
      
      // Reset the flag after a short delay
      const timer = setTimeout(() => {
        setForceRefetch(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  return <Cart forceRefetch={forceRefetch} />;
};

export default CartPage;
