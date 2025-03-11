import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  PencilSquareIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  IdentificationIcon,
  PhotoIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  GlobeAsiaAustraliaIcon
} from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ukIdType: '',
    ukIdNumber: '',
    ukIdPhoto: null
  });
  
  const [errors, setErrors] = useState({});
  const [billingEditable, setBillingEditable] = useState(true);
  const [progressStep, setProgressStep] = useState("cart");


  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors({...errors, ukIdPhoto: 'File size should be less than 5MB'});
        return;
      }
      setBillingDetails({...billingDetails, ukIdPhoto: file});
      setErrors({...errors, ukIdPhoto: null});
    }
  };

  useEffect(() => {
    try {
      const cartData = JSON.parse(localStorage.getItem('cartData')) || { items: [], total: 0 };
      setCart(cartData.items || []);
      
      const savedBillingDetails = JSON.parse(localStorage.getItem('billingDetails'));
      if (savedBillingDetails) {
        setBillingDetails(savedBillingDetails);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('billingDetails', JSON.stringify(billingDetails));
  }, [billingDetails]);
  
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      return total + ((item.rentalAmount + (item.insurance?.price || 0)) * (item.quantity || 1));
    }, 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.10;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
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

    if (!billingDetails.ukIdType) {
      newErrors.ukIdType = 'Please select an ID type';
    }
    
    if (!billingDetails.ukIdNumber) {
      newErrors.ukIdNumber = 'ID number is required';
    }
    
    if (!billingDetails.ukIdPhoto) {
      newErrors.ukIdPhoto = 'Please upload a photo of your ID';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const saveBillingDetails = () => {
    if (validateBillingDetails()) {
      setBillingEditable(false);
      setProgressStep("placeOrder");
    }
  };
  
  const editBillingDetails = () => {
    setBillingEditable(true);
    setProgressStep("cart");
  };
  
  const placeOrder = async () => {
    if (validateBillingDetails()) {
      setIsProcessing(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items: cart,
        billingDetails,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status: 'Pending Approval'
      };
      
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('cart', JSON.stringify([]));
      
      setIsProcessing(false);

      // Scroll to top before showing the order confirmation animation
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Show order placed animation
      setOrderPlaced(true);
    }
  };
  
  const renderProgressBar = () => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 backdrop-blur-sm bg-white/30 p-6 rounded-xl shadow-lg border border-white/20"
      >
        <div className="flex items-center justify-between">
          {/* Cart Step */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
              progressStep === "cart" ? "bg-indigo-600 text-white" : "bg-gray-300"
            } shadow-lg`}>
              <ShoppingCartIcon className="w-6 h-6" />
            </div>
            <Link to="/cart" className="mt-2 text-sm font-medium hover:text-indigo-600 transition-colors">
              Cart
            </Link>
          </motion.div>
  
          <div className="flex-1 h-1 mx-4 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
  
          {/* Place Order Step */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
              progressStep === "placeOrder" ? "bg-indigo-600 text-white" : "bg-gray-300"
            } shadow-lg`}>
              <DocumentCheckIcon className="w-6 h-6" />
            </div>
            <span className="mt-2 text-sm font-medium">Place Order</span>
          </motion.div>
        </div>
      </motion.div>
    );
  };
  
  
  const renderBillingDetailsForm = () => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg p-8 mb-6 border border-white/20"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Billing Details
          </h2>
          {!billingEditable ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={editBillingDetails}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <PencilSquareIcon className="w-5 h-5 mr-1" /> Edit
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveBillingDetails}
              className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <DocumentCheckIcon className="w-5 h-5 mr-2" /> Save
            </motion.button>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <UserCircleIcon className="w-5 h-5 mr-2 text-gray-500" />
              Full Name
            </label>
            <input
              type="text"
              value={billingDetails.fullName}
              onChange={(e) => setBillingDetails({...billingDetails, fullName: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              value={billingDetails.email}
              onChange={(e) => setBillingDetails({...billingDetails, email: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <PhoneIcon className="w-5 h-5 mr-2 text-gray-500" />
              Phone Number
            </label>
            <input
              type="tel"
              value={billingDetails.phone}
              onChange={(e) => setBillingDetails({...billingDetails, phone: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <HomeIcon className="w-5 h-5 mr-2 text-gray-500" />
              Address
            </label>
            <input
              type="text"
              value={billingDetails.address}
              onChange={(e) => setBillingDetails({...billingDetails, address: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <BuildingOfficeIcon className="w-5 h-5 mr-2 text-gray-500" />
              City
            </label>
            <input
              type="text"
              value={billingDetails.city}
              onChange={(e) => setBillingDetails({...billingDetails, city: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2 text-gray-500" />
              State
            </label>
            <input
              type="text"
              value={billingDetails.state}
              onChange={(e) => setBillingDetails({...billingDetails, state: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
              ZIP Code
            </label>
            <input
              type="text"
              value={billingDetails.zipCode}
              onChange={(e) => setBillingDetails({...billingDetails, zipCode: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="w-5 h-5 mr-2 text-gray-500" />
              UK ID Type
            </label>
            <select
              value={billingDetails.ukIdType}
              onChange={(e) => setBillingDetails({...billingDetails, ukIdType: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.ukIdType ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            >
              <option value="">Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driving License</option>
              <option value="national_id">National ID</option>
            </select>
            {errors.ukIdType && <p className="text-red-500 text-xs mt-1">{errors.ukIdType}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <IdentificationIcon className="w-5 h-5 mr-2 text-gray-500" />
              UK ID Number
            </label>
            <input
              type="text"
              value={billingDetails.ukIdNumber}
              onChange={(e) => setBillingDetails({...billingDetails, ukIdNumber: e.target.value})}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.ukIdNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.ukIdNumber && <p className="text-red-500 text-xs mt-1">{errors.ukIdNumber}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-1">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <PhotoIcon className="w-5 h-5 mr-2 text-gray-500" />
              Upload ID Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              disabled={!billingEditable}
              className={`w-full p-3 border rounded-lg ${errors.ukIdPhoto ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
            />
            {errors.ukIdPhoto && <p className="text-red-500 text-xs mt-1">{errors.ukIdPhoto}</p>}
            {billingDetails.ukIdPhoto && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm mt-1 flex items-center"
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                File selected: {billingDetails.ukIdPhoto.name}
              </motion.p>
            )}
            <p className="text-gray-500 text-xs mt-1 flex items-center">
              <PhotoIcon className="w-4 h-4 mr-1" />
              Maximum file size: 5MB
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };
  
  const renderOrderSummary = () => {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg p-8 sticky top-6 border border-white/20"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
        >
          Order Summary
        </motion.h2>
        
        <AnimatePresence>
          <motion.div className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-b border-gray-200/50 pb-4 hover:bg-white/50 transition-colors rounded-lg p-3"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <span className="font-medium">x {item.quantity || 1}</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2 flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  <span>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rental Amount</span>
                    <span>₹{item.rentalAmount}</span>
                  </div>
                  
                  {item.insurance && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <ShieldCheckIcon className="w-5 h-5 mr-1" />
                        Insurance ({item.insurance.name})
                      </span>
                      <span>₹{item.insurance.price}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-medium pt-2 text-indigo-600">
                    <span>Item Total</span>
                    <span>₹{((item.rentalAmount + (item.insurance?.price || 0)) * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div variants={itemVariants} className="border-t pt-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Security Deposit (10%)</span>
            <span className="font-medium">₹{calculateTax().toFixed(2)}</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex justify-between text-xl font-bold pt-4 border-t mt-4"
        >
          <span>Total</span>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ₹{calculateTotal().toFixed(2)}
          </span>
        </motion.div>
        
        {!billingEditable && !orderPlaced && (
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg mt-6 flex items-center justify-center font-medium transition-all duration-300 relative overflow-hidden"
            onClick={placeOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </motion.div>
            ) : (
              <>
                <CreditCardIcon className="w-6 h-6 mr-2" />
                Place Order
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  };
  
  const renderOrderConfirmation = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto border border-white/20"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2 
          }}
          className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircleIcon className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4"
        >
          Order Placed Successfully!
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          Thank you for your order. We'll review your request shortly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 text-left"
        >
          <p className="text-blue-800 font-semibold text-lg mb-3 flex items-center">
            <DocumentCheckIcon className="w-6 h-6 mr-2" />
            Important Note:
          </p>
          <ul className="space-y-3">
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start text-blue-700"
            >
              <CheckCircleIcon className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" />
              If the lender accepts your order, payment options will be shown in My Orders
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start text-blue-700"
            >
              <CheckCircleIcon className="w-6 h-6 mr-2 flex-shrink-0 mt-0.5" />
              You can check your order status in the My Orders page
            </motion.li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <Link 
            to="/myorders"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg flex items-center hover:shadow-lg transition-all duration-300"
          >
            <DocumentCheckIcon className="w-5 h-5 mr-2" />
            View My  Rental Orders
          </Link>
          <Link 
            to="/"
            className="border-2 border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg flex items-center hover:bg-indigo-50 transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8"
      >
        <Link 
          to="/cart" 
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr- 2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-auto">
          Checkout
        </h1>
      </motion.div>
      
      {orderPlaced ? (
        renderOrderConfirmation()
      ) : (
        <>
          {renderProgressBar()}
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              {renderBillingDetailsForm()}
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