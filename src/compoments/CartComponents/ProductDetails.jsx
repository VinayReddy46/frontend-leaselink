import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from './Product';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addToCart } from '../../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = location.state?.product;

  if (!product) {
    return <h2 className="text-center text-red-500 font-semibold text-xl py-12">⚠️ No Product Found</h2>;
  }

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rentalAmount, setRentalAmount] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Setup product images array - use multiple images if available or create an array with the single image
  const productImages = product.images || (product.image ? [product.image] : []);

  const RatingStars = ({ rating }) => {
    const maxStars = 5;
    return (
      <div className="flex text-yellow-500 text-xl">
        {[...Array(maxStars)].map((_, index) => {
          const fullStar = index + 1 <= rating;
          const halfStar = index + 0.5 === rating;
          return (
            <span key={index} className="mr-0.5">
              {fullStar ? <FaStar /> : halfStar ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
          );
        })}
      </div>
    );
  };

  const calculateTotalHours = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffInHours = Math.ceil((end - start) / (1000 * 60 * 60));
    return diffInHours > 0 ? diffInHours : 0;
  };

  useEffect(() => {
    if (!product) return;
    const hours = calculateTotalHours();
    const hourlyRate = product.price / 24; // Convert daily price to hourly
    const rentAmount = hours * hourlyRate;
    setRentalAmount(rentAmount);
  }, [startDate, endDate, product]);

  const calculateTotal = () => {
    return rentalAmount + (selectedInsurance ? selectedInsurance.price : 0);
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || calculateTotalHours() === 0) {
      alert("⚠️ Please select valid rental duration.");
      return;
    }
  
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image || product.images?.[0], // Include product image
      price: product.price, // Keep original price
      startDate,
      endDate,
      rentalAmount: parseFloat(rentalAmount.toFixed(2)), // Avoid floating-point errors
      insurance: selectedInsurance || null,
      subtotal: parseFloat(calculateTotal().toFixed(2)), // Ensure proper rounding
      quantity: 1 // Add this line
    };
  
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };
  
  // Enhanced carousel navigation functions with smooth transitions
  const goToNextSlide = () => {
    if (isTransitioning || productImages.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => 
      prevSlide === productImages.length - 1 ? 0 : prevSlide + 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  const goToPrevSlide = () => {
    if (isTransitioning || productImages.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? productImages.length - 1 : prevSlide - 1
    );
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  const goToSlide = (index) => {
    if (isTransitioning || currentSlide === index) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  };

  // Keyboard navigation for the carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning, currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance carousel (optional)
  useEffect(() => {
    if (productImages.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isTransitioning, currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8 max-w-7xl">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-slate-600 mb-8 hover:text-blue-600 transition-colors duration-200 group font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" /> 
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images & Details - 7 columns on large screens */}
          <div className="lg:col-span-7 space-y-8">
            {/* Enhanced Image Carousel */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="w-full aspect-square md:aspect-auto md:h-96 lg:h-[480px] relative">
                {productImages.length > 0 ? (
                  <>
                    {/* Carousel slides with improved transitions */}
                    <div className="w-full h-full relative">
                      {productImages.map((image, index) => (
                        <div 
                          key={index} 
                          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out ${
                            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                          }`}
                          aria-hidden={index !== currentSlide}
                        >
                          <img 
                            src={image} 
                            alt={`${product.name} - image ${index + 1}`} 
                            className="object-contain w-full h-full p-6"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation arrows - only show if multiple images */}
                    {productImages.length > 1 && (
                      <>
                        <button 
                          onClick={goToPrevSlide}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-slate-700 rounded-full p-3 shadow-lg z-20 hover:bg-blue-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                          aria-label="Previous image"
                          disabled={isTransitioning}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        
                        <button 
                          onClick={goToNextSlide}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 text-slate-700 rounded-full p-3 shadow-lg z-20 hover:bg-blue-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                          aria-label="Next image"
                          disabled={isTransitioning}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        
                        {/* Improved Indicators */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
                          {productImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToSlide(index)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                  ? 'bg-blue-600 w-8' 
                                  : 'bg-slate-300 hover:bg-blue-300 w-2'
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                              aria-current={index === currentSlide ? 'true' : 'false'}
                              disabled={isTransitioning}
                            />
                          ))}
                        </div>
                        
                        {/* Image counter */}
                        <div className="absolute top-4 right-4 bg-slate-900/70 text-white text-xs px-3 py-1.5 rounded-full z-20 font-medium">
                          {currentSlide + 1} / {productImages.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No image available
                  </div>
                )}
              </div>

              {/* Thumbnail navigation for larger screens */}
              {productImages.length > 1 && (
                <div className="hidden md:grid grid-cols-6 gap-3 p-4 border-t border-slate-100 bg-slate-50/50">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentSlide 
                          ? 'ring-2 ring-blue-500 shadow-md' 
                          : 'ring-1 ring-slate-200 opacity-70 hover:opacity-100 hover:ring-blue-200'
                      }`}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === currentSlide ? 'true' : 'false'}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product details below image */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                <p className="text-slate-500 text-lg">{product.processor !== "N/A" ? product.processor + " | " : ""}{product.brand}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-blue-600 font-bold text-2xl">₹{product.price}<span className="text-slate-500 text-lg font-normal">/day</span></p>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={product.rating} />
                  <span className="text-slate-600 font-medium">{product.rating}/5</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-800">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Brand</span> 
                    <span className="font-semibold text-slate-900">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Model</span> 
                    <span className="font-semibold text-slate-900">{product.model}</span>
                  </div>
                  {product.processor !== "N/A" && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-500">Processor</span> 
                      <span className="font-semibold text-slate-900">{product.processor}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Category</span> 
                    <span className="font-semibold text-slate-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Daily Rate</span> 
                    <span className="font-semibold text-blue-600">₹{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Details - 5 columns on large screens */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">Rental Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date & Time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="block w-full rounded-lg border-slate-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3.5 border bg-white text-slate-900"
                    minDate={new Date()} 
                    placeholderText="Select start date and time"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date & Time</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    className="block w-full rounded-lg border-slate-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3.5 border bg-white text-slate-900"
                    minDate={startDate}
                    placeholderText="Select end date and time"
                    disabled={!startDate}
                  />
                </div>
              </div>

              <div className="mt-8 mb-2">
                <h3 className="text-xl font-bold mb-4 text-slate-900">Insurance Plans</h3>
                <div className="space-y-3">
                  {product.insurancePlans && product.insurancePlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                        selectedInsurance?.id === plan.id 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                      }`} 
                      onClick={() => setSelectedInsurance(plan)}
                    >
                      <div className="flex items-start">
                        <Shield className={`h-6 w-6 mt-0.5 mr-3 flex-shrink-0 ${
                          selectedInsurance?.id === plan.id 
                            ? 'text-blue-600' 
                            : 'text-slate-400'
                        }`} />
                        <div>
                          <h4 className="font-semibold text-slate-900">{plan.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{plan.description}</p>
                          <p className="text-blue-600 font-semibold mt-2">₹{plan.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedInsurance && (
                <div className="mt-4 flex justify-between items-center border border-slate-200 p-3.5 rounded-lg text-sm bg-slate-50">
                  <span className="text-slate-700">Selected: <span className="font-medium">{selectedInsurance.name}</span> - ₹{selectedInsurance.price}</span>
                  <button 
                    onClick={() => setSelectedInsurance(null)} 
                    className="text-red-500 hover:text-red-600 flex items-center p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4 mr-1" /> Remove
                  </button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Rental Duration</span>
                    <span className="font-medium text-slate-900">{calculateTotalHours()} hours</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Rental Amount</span>
                    <span className="font-medium text-slate-900">₹{rentalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-slate-500 ml-4">
                    ₹{(product.price / 24).toFixed(2)}/hour × {calculateTotalHours()} hours
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Insurance</span>
                    <span className="font-medium text-slate-900">₹{selectedInsurance ? selectedInsurance.price : 0}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg mt-6 pt-4 border-t border-slate-200">
                  <span className="text-slate-900">Total Amount</span>
                  <span className="text-blue-600">₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={!startDate || !endDate || calculateTotalHours() === 0} 
                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md disabled:shadow-none flex items-center justify-center text-base"
              >
                {(!startDate || !endDate) ? 'Select Dates to Continue' : 'Add to Cart'}
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-3">
                Your rental will be processed immediately after adding to cart
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;