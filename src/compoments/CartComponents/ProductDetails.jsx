import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from './Product';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addToCart } from '../../redux/cartSlice';
import { useSelector ,useDispatch } from 'react-redux';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const product = location.state?.product;

  if (!product) {
    return <h2 className="text-center text-red-500">⚠️ No Product Found</h2>;
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
            <span key={index}>
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
    <div className="mx-auto my-4 py-8 px-4 md:px-12">
      <button onClick={() => navigate(-1)} className="text-gray-600 flex items-center mb-6 hover:text-gray-800">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg bg-[#2973B2]">
        <div>
          {/* Enhanced Image Carousel */}
          <div className="w-full h-80 relative mb-6 bg-gray-100 rounded-lg overflow-hidden">
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
                        className="object-fit w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation arrows - only show if multiple images */}
                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={goToPrevSlide}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md z-20 hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Previous image"
                      disabled={isTransitioning}
                    >
                      <ChevronLeft className="h-6 w-6 text-gray-700" />
                    </button>
                    
                    <button 
                      onClick={goToNextSlide}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md z-20 hover:bg-opacity-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Next image"
                      disabled={isTransitioning}
                    >
                      <ChevronRight className="h-6 w-6 text-gray-700" />
                    </button>
                    
                    {/* Improved Indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                              ? 'bg-blue-500 w-6' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                          aria-current={index === currentSlide ? 'true' : 'false'}
                          disabled={isTransitioning}
                        />
                      ))}
                    </div>
                    
                    {/* Image counter */}
                    <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md z-20">
                      {currentSlide + 1} / {productImages.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center bg-[#C4D7FF] justify-center h-full text-gray-400">No image available</div>
            )}
          </div>

          {/* Thumbnail navigation for larger screens */}
          {productImages.length > 1 && (
            <div className="hidden md:flex space-x-2 mb-6 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                    index === currentSlide ? 'border-blue-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
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

          {/* Product details below image */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.processor !== "N/A" ? product.processor + " | " : ""}{product.brand}</p>
            <p className="text-blue-500 font-bold text-xl">₹{product.price}/day</p>
            <RatingStars rating={product.rating} />
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Product Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-medium">Brand:</span> {product.brand}</li>
                <li><span className="font-medium">Model:</span> {product.model}</li>
                {product.processor !== "N/A" && (
                  <li><span className="font-medium">Processor:</span> {product.processor}</li>
                )}
                <li><span className="font-medium">Category:</span> {product.category}</li>
                <li><span className="font-medium">Daily Rate:</span> ₹{product.price}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#142850] text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Rental Details</h3>
          <div className="space-y-4">
            <label className="block text-sm font-medium">Start Date & Time</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 p-2 border"
              minDate={new Date()} 
            />

            <label className="block text-sm font-medium">End Date & Time</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 p-2 border"
              minDate={startDate} 
            />
          </div>

          <h3 className="text-lg font-semibold mt-6">Insurance Plans</h3>
          <div className="mt-3 space-y-3">
            {product.insurancePlans && product.insurancePlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`border rounded-lg p-4 cursor-pointer ${selectedInsurance?.id === plan.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`} 
                onClick={() => setSelectedInsurance(plan)}
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-[#FF7F3E] mr-2" />
                  <div>
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-sm text-gray-600 text-[#80C4E9]">{plan.description}</p>
                    <p className="tex font-medium mt-1">₹{plan.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedInsurance && (
            <div className="mt-4 flex justify-between items-center border p-3 rounded-lg text-sm text-gray-600">
              <span>Selected Insurance: {selectedInsurance.name} - ₹{selectedInsurance.price}</span>
              <button onClick={() => setSelectedInsurance(null)} className="text-red-500 flex items-center">
                <X className="h-4 w-4 mr-1" /> Remove
              </button>
            </div>
          )}

          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Rental Duration:</span>
              <span>{calculateTotalHours()} hours</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Rental Amount (₹{(product.price / 24).toFixed(2)}/hour × {calculateTotalHours()} hours)</span>
              <span>₹{rentalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Insurance Amount</span>
              <span>₹{selectedInsurance ? selectedInsurance.price : 0}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total Amount</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={!startDate || !endDate || calculateTotalHours() === 0} 
            className="w-full mt-6 text-white py-3 rounded-lg font-medium disabled:bg-[#FF6500] hover:bg-indigo-700  transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;