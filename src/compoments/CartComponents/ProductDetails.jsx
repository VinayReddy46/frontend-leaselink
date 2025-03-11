import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Shield, X, ChevronLeft, ChevronRight } from "lucide-react";
import productsData from "./Product";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/services/addProductSlice";
import { useAddToCartMutation } from "../../redux/services/cartApiSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("productId", id);

  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const [addToCartMutation, { isLoading: isAddingToCart }] = useAddToCartMutation();
const userInfo = useSelector((state) => state.auth.userInfo);
  console.log("isLoading", isLoading);
  console.log("productData", productData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentalAmount, setRentalAmount] = useState(0);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Prepare product and related data with safe defaults
  const product = productData?.product || {};
  const category = productData?.category || "";
  const averageRating = productData?.averageRating || 0;
  const insurancePlans = productData?.insurance || [];
  const ratings = productData?.ratings || [];

  // Setup product images array with safe fallback
  const productImages = product.images?.map((img) => img.url) || [];

  // Memoized calculation functions
  const calculateTotalHours = useCallback(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffInHours = Math.ceil((end - start) / (1000 * 60 * 60));
    return diffInHours > 0 ? diffInHours : 0;
  }, [startDate, endDate]);

  // Calculate rental amount when dates or product changes
  useEffect(() => {
    if (!productData?.product) return;
    const hours = calculateTotalHours();
    const hourlyRate = productData.product.price / 24; // Convert daily price to hourly
    const rentAmount = hours * hourlyRate;
    setRentalAmount(rentAmount);
  }, [productData, calculateTotalHours]);

  const calculateTotal = () => {
    return rentalAmount + (selectedInsurance ? selectedInsurance.price : 0);
  };

  // Memoized carousel navigation functions
  const goToNextSlide = useCallback(() => {
    if (isTransitioning || productImages.length <= 1) return;

    setIsTransitioning(true);
    setCurrentSlide((prevSlide) =>
      prevSlide === productImages.length - 1 ? 0 : prevSlide + 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  }, [isTransitioning, productImages.length]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning || productImages.length <= 1) return;

    setIsTransitioning(true);
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? productImages.length - 1 : prevSlide - 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the CSS transition duration
  }, [isTransitioning, productImages.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || currentSlide === index) return;

      setIsTransitioning(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with the CSS transition duration
    },
    [isTransitioning, currentSlide]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToPrevSlide, goToNextSlide]);

  // Auto-advance carousel
  useEffect(() => {
    if (productImages.length <= 1) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextSlide();
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning, goToNextSlide, productImages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    // Format dates to ISO string format
    const startTimeISO = new Date(startDate).toISOString();
    const endTimeISO = new Date(endDate).toISOString();

    // Get user ID from auth state
    const userId = userInfo?.id;
    
    if (!userId) {
      toast.error("You must be logged in to add items to cart");
      navigate("/login");
      return;
    }

    const cartItem = {
      user: userId,
      product: product._id,
      quantity: 1,
      insurance: selectedInsurance?._id || null,
      start_time: startTimeISO,
      end_time: endTimeISO,
      total_price: parseFloat(calculateTotal().toFixed(2))
    };
    
    console.log("cartItem", cartItem);

    try {
      await addToCartMutation(cartItem).unwrap();
      toast.success("Item added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  const RatingStars = ({ rating }) => {
    const maxStars = 5;
    return (
      <div className="flex text-yellow-500 text-xl">
        {[...Array(maxStars)].map((_, index) => {
          const fullStar = index + 1 <= rating;
          const halfStar = index + 0.5 === rating;
          return (
            <span key={index} className="mr-0.5">
              {fullStar ? (
                <FaStar />
              ) : halfStar ? (
                <FaStarHalfAlt />
              ) : (
                <FaRegStar />
              )}
            </span>
          );
        })}
      </div>
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-semibold text-slate-700">
              Loading product details...
            </h2>
            <p className="text-slate-500 text-center">
              Please wait while we fetch the latest information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <h2 className="text-center text-red-500 font-semibold text-xl py-12">
        ⚠️ Error loading product: {error.message}
      </h2>
    );
  }

  // Render no product state
  if (!productData || !productData.product) {
    return (
      <h2 className="text-center text-red-500 font-semibold text-xl py-12">
        ⚠️ No Product Found
      </h2>
    );
  }

  // Log for debugging
  console.log("Product data:", productData);

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
                            index === currentSlide
                              ? "opacity-100 z-10"
                              : "opacity-0 z-0"
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
                                  ? "bg-blue-600 w-8"
                                  : "bg-slate-300 hover:bg-blue-300 w-2"
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                              aria-current={
                                index === currentSlide ? "true" : "false"
                              }
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
                          ? "ring-2 ring-blue-500 shadow-md"
                          : "ring-1 ring-slate-200 opacity-70 hover:opacity-100 hover:ring-blue-200"
                      }`}
                      aria-label={`View image ${index + 1}`}
                      aria-current={index === currentSlide ? "true" : "false"}
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-slate-500 text-lg">
                  {product.model_name ? product.model_name + " | " : ""}
                  {product.brand_name}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-blue-600 font-bold text-2xl">
                  ₹{product.price}
                  <span className="text-slate-500 text-lg font-normal">
                    /day
                  </span>
                </p>
                <div className="flex items-center space-x-2">
                  <RatingStars rating={averageRating} />
                  <span className="text-slate-600 font-medium">
                    {averageRating.toFixed(1)}/5
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-800">
                  Product Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Brand</span>
                    <span className="font-semibold text-slate-900">
                      {product.brand_name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Model</span>
                    <span className="font-semibold text-slate-900">
                      {product.model_name}
                    </span>
                  </div>
                  {product.processor && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-500">
                        Processor
                      </span>
                      <span className="font-semibold text-slate-900">
                        {product.processor}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">Category</span>
                    <span className="font-semibold text-slate-900">
                      {category?.name || "Unknown"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">
                      Daily Rate
                    </span>
                    <span className="font-medium text-blue-600">
                      ₹{product.price}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="font-medium text-slate-500">
                      Availability
                    </span>
                    <span
                      className={`font-semibold ${
                        product.total_quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.total_quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Ratings and Reviews Section */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-800">Customer Reviews</h3>
                
                {/* Overall Rating Summary */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="text-4xl font-bold text-slate-800">{averageRating.toFixed(1)}</div>
                      <div className="mt-1">
                        <RatingStars rating={averageRating} />
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 ml-2">
                      Based on {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                      {ratings.length > 0 ? 'Verified Reviews' : 'No Reviews Yet'}
                    </div>
                  </div>
                </div>
                
                {/* Review List */}
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : ratings.length > 0 ? (
                  <div className="space-y-8">
                    {ratings.map((review) => (
                      <div key={review._id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <img 
                              src={review.avatar} 
                              alt={`${review.email.split('@')[0]}'s avatar`}
                              className="w-12 h-12 rounded-full object-cover shadow-sm"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="font-medium text-slate-800 text-base mb-1 sm:mb-0">
                                {review.email.split('@')[0]}
                              </h4>
                              <div className="flex items-center text-sm text-slate-500">
                                <span className="inline-block">
                                  {new Date(review.createdAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center my-2">
                              <div className="scale-90 origin-left">
                                <RatingStars rating={review.rating} />
                              </div>
                              <span className="ml-2 text-sm font-semibold text-slate-700">{review.rating.toFixed(1)}</span>
                            </div>
                            <textarea 
                              className="text-slate-600 mt-3 text-sm leading-relaxed bg-white p-3 rounded-lg border border-slate-100 w-full resize-none"
                              readOnly
                              value={review.description}
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                    </div>
                    <p className="text-slate-500 font-medium">No reviews yet for this product</p>
                    <p className="text-slate-400 text-sm mt-1">Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rental Calculation, Cart Section, and Rating Section - 5 columns on large screens */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-6">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Rental Details
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Date & Time
                  </label>
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Date & Time
                  </label>
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
                <h3 className="text-xl font-bold mb-4 text-slate-900">
                  Insurance Plans
                </h3>
                <div className="space-y-3">
                  {insurancePlans &&
                    insurancePlans.map((plan) => (
                      <div
                        key={plan._id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                          selectedInsurance?._id === plan._id
                            ? "border-blue-600 bg-blue-50 shadow-sm"
                            : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                        }`}
                        onClick={() => setSelectedInsurance(plan)}
                      >
                        <div className="flex items-start">
                          <Shield
                            className={`h-6 w-6 mt-0.5 mr-3 flex-shrink-0 ${
                              selectedInsurance?._id === plan._id
                                ? "text-blue-600"
                                : "text-slate-400"
                            }`}
                          />
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {plan.plan_name}
                            </h4>
                            <p className="text-sm text-slate-600 mt-1">
                              {plan.description}
                            </p>
                            <p className="text-blue-600 font-semibold mt-2">
                              ₹{plan.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {selectedInsurance && (
                <div className="mt-4 flex justify-between items-center border border-slate-200 p-3.5 rounded-lg text-sm bg-slate-50">
                  <span className="text-slate-700">
                    Selected:{" "}
                    <span className="font-medium">
                      {selectedInsurance.plan_name}
                    </span>{" "}
                    - ₹{selectedInsurance.price}
                  </span>
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
                    <span className="font-medium text-slate-900">
                      {calculateTotalHours()} hours
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Rental Amount</span>
                    <span className="font-medium text-slate-900">
                      ₹{rentalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 ml-4">
                    ₹{(product.price / 24).toFixed(2)}/hour ×{" "}
                    {calculateTotalHours()} hours
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Insurance</span>
                    <span className="font-medium text-slate-900">
                      ₹{selectedInsurance ? selectedInsurance.price : 0}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg mt-6 pt-4 border-t border-slate-200">
                  <span className="text-slate-900">Total Amount</span>
                  <span className="text-blue-600">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!startDate || !endDate || calculateTotalHours() === 0 || isAddingToCart}
                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md disabled:shadow-none flex items-center justify-center text-base"
              >
                {isAddingToCart ? "Adding to Cart..." : !startDate || !endDate
                  ? "Select Dates to Continue"
                  : "Add to Cart"}
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
