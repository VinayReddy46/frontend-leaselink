import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCheck, 
  FaCreditCard, 
  FaMoneyBill, 
  FaShoppingCart, 
  FaTruck, 
  FaWallet, 
  FaStore, 
  FaEdit, 
  FaSave 
} from 'react-icons/fa';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form data states
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  const [billingEditable, setBillingEditable] = useState(true);
  
  // Load cart data from localStorage
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(Array.isArray(storedCart) ? storedCart : []);
      
      // Load saved form data if available
      const savedBillingDetails = JSON.parse(localStorage.getItem('billingDetails'));
      if (savedBillingDetails) {
        setBillingDetails(savedBillingDetails);
      }
      
      const savedDeliveryOption = localStorage.getItem('deliveryOption');
      if (savedDeliveryOption) {
        setDeliveryOption(savedDeliveryOption);
      }
      
      const savedPaymentMethod = localStorage.getItem('paymentMethod');
      if (savedPaymentMethod) {
        setPaymentMethod(savedPaymentMethod);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);
  
  // Save form data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
    localStorage.setItem('deliveryOption', deliveryOption);
    localStorage.setItem('paymentMethod', paymentMethod);
  }, [billingDetails, deliveryOption, paymentMethod]);
  
  // Calculate costs
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.total || 0), 0);
  };
  
  const getDeliveryCost = () => {
    switch (deliveryOption) {
      case 'express':
        return 150;
      case 'standard':
        return 50;
      case 'pickup':
        return 0;
      default:
        return 50;
    }
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.10; // 10% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + getDeliveryCost() + calculateTax();
  };
  
  // Validation functions
  const validateBillingDetails = () => {
    const newErrors = {};
    
    if (!billingDetails.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!billingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(billingDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!billingDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(billingDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!billingDetails.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!billingDetails.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!billingDetails.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!billingDetails.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(billingDetails.zipCode.replace(/\D/g, ''))) {
      newErrors.zipCode = 'ZIP code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateCardDetails = () => {
    if (paymentMethod !== 'card') return true;
    
    const newErrors = {};
    
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\D/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Name on card is required';
    }
    
    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    }
    
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form navigation
  const nextStep = () => {
    if (step === 1) {
      if (!billingEditable && validateBillingDetails()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const saveBillingDetails = () => {
    if (validateBillingDetails()) {
      setBillingEditable(false);
    }
  };
  
  const editBillingDetails = () => {
    setBillingEditable(true);
  };
  
  // Handle form submission
  const placeOrder = () => {
    if (validateCardDetails()) {
      // Create order object
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        billingDetails,
        deliveryOption,
        paymentMethod,
        subtotal: calculateSubtotal(),
        deliveryCost: getDeliveryCost(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: 'Processing'
      };
      
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]));
      
      setOrderPlaced(true);
      
      // Redirect to my orders page after a delay
      setTimeout(() => {
        navigate('/my-orders');
      }, 2000);
    }
  };
  
  // Render progress bar
  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              <FaShoppingCart />
            </div>
            <Link to="/cart" className="mt-2 text-sm font-medium">Cart</Link>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              <FaTruck />
            </div>
            <span className="mt-2 text-sm font-medium">Delivery</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}>
              <FaCreditCard />
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Render billing details form
  const renderBillingDetailsForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Billing Details</h2>
          {!billingEditable ? (
            <button 
              onClick={editBillingDetails}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          ) : (
            <button 
              onClick={saveBillingDetails}
              className="flex items-center bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              <FaSave className="mr-1" /> Save
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={billingDetails.fullName}
              onChange={(e) => setBillingDetails({...billingDetails, fullName: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={billingDetails.email}
              onChange={(e) => setBillingDetails({...billingDetails, email: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={billingDetails.phone}
              onChange={(e) => setBillingDetails({...billingDetails, phone: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={billingDetails.address}
              onChange={(e) => setBillingDetails({...billingDetails, address: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              value={billingDetails.city}
              onChange={(e) => setBillingDetails({...billingDetails, city: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              value={billingDetails.state}
              onChange={(e) => setBillingDetails({...billingDetails, state: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
            <input
              type="text"
              value={billingDetails.zipCode}
              onChange={(e) => setBillingDetails({...billingDetails, zipCode: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-2 border rounded ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
        </div>
      </div>
    );
  };
  
  // Render delivery options
  const renderDeliveryOptions = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
        
        <div className="space-y-4">
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${deliveryOption === 'standard' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="deliveryOption"
              value="standard"
              checked={deliveryOption === 'standard'}
              onChange={() => setDeliveryOption('standard')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${deliveryOption === 'standard' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {deliveryOption === 'standard' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <FaTruck className="text-indigo-600 mr-2" />
                <span className="font-medium">Standard Delivery</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Delivery within 3-5 business days</p>
            </div>
            <div className="text-right">
              <span className="font-medium">₹50</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${deliveryOption === 'express' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="deliveryOption"
              value="express"
              checked={deliveryOption === 'express'}
              onChange={() => setDeliveryOption('express')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${deliveryOption === 'express' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {deliveryOption === 'express' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <FaTruck className="text-indigo-600 mr-2" />
                <span className="font-medium">Express Delivery</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Delivery within 1-2 business days</p>
            </div>
            <div className="text-right">
              <span className="font-medium">₹150</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${deliveryOption === 'pickup' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="deliveryOption"
              value="pickup"
              checked={deliveryOption === 'pickup'}
              onChange={() => setDeliveryOption('pickup')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${deliveryOption === 'pickup' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {deliveryOption === 'pickup' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <FaStore className="text-indigo-600 mr-2" />
                <span className="font-medium">Self Pickup</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Pickup from our store</p>
            </div>
            <div className="text-right">
              <span className="font-medium">Free</span>
            </div>
          </label>
        </div>
      </div>
    );
  };
  
  // Render payment methods
  const renderPaymentMethods = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        
        <div className="space-y-4 mb-6">
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'card' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex items-center">
              <FaCreditCard className="text-indigo-600 mr-2" />
              <span className="font-medium">Credit/Debit Card</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'upi' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex items-center">
              <FaWallet className="text-indigo-600 mr-2" />
              <span className="font-medium">UPI</span>
            </div>
          </label>
          
          <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="hidden"
            />
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'cod' ? 'border-indigo-600' : 'border-gray-400'}`}>
              {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
            </div>
            <div className="flex items-center">
              <FaMoneyBill className="text-indigo-600 mr-2" />
              <span className="font-medium">Cash on Delivery</span>
            </div>
          </label>
        </div>
        
        {paymentMethod === 'card' && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-medium mb-4">Card Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  value={cardDetails.cardName}
                  onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                  className={`w-full p-2 border rounded ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                  placeholder="123"
                  className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Render order summary
  const renderOrderSummary = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} x {item.quantity || 1}
              </span>
              <span className="font-medium">₹{(item.total || 0).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium">₹{getDeliveryCost().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">₹{calculateTax().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-lg font-bold pt-4 border-t mt-4">
          <span>Total</span>
          <span>₹{calculateTotal().toFixed(2)}</span>
        </div>
        
        {step === 3 && (
          <button
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg mt-6 flex items-center justify-center"
            onClick={placeOrder}
          >
            Place Order
          </button>
        )}
      </div>
    );
  };
  
  // Render order confirmation
  const renderOrderConfirmation = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-green-600 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order. We'll send you a confirmation email shortly.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/my-orders" className="bg-indigo-600 text-white py-2 px-4 rounded-lg">
            View My Orders
          </Link>
          <Link to="/" className="border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  };
  
  // Main render
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-2xl font-bold ml-auto">Checkout</h1>
      </div>
      
      {orderPlaced ? (
        renderOrderConfirmation()
      ) : (
        <>
          {renderProgressBar()}
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              {step === 1 && renderBillingDetailsForm()}
              {step === 2 && renderDeliveryOptions()}
              {step === 3 && renderPaymentMethods()}
              
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <FaArrowLeft className="mr-2" /> Previous
                  </button>
                )}
                
                {step < 3 && (
                  <button
                    onClick={nextStep}
                    className={`ml-auto bg-indigo-600 text-white py-2 px-4 rounded-lg ${step === 1 && (billingEditable || Object.keys(errors).length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={step === 1 && (billingEditable || Object.keys(errors).length > 0)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              {renderOrderSummary()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;