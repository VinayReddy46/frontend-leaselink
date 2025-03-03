import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X } from 'lucide-react';
import { addToCart } from '../../redux/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
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
      price: product.price,
      image:product.image,
      startDate,
      endDate,
      rentalAmount,
      insurance: selectedInsurance || null,
      subTotal: calculateTotal(),
    };

    dispatch(addToCart(cartItem))
    navigate("/cart"); // Use lowercase if the route is "/cart"
  };
  

  return (
    <div className="container mx-auto py-8 px-4 md:px-12">
      <button onClick={() => navigate(-1)} className="text-gray-600 flex items-center mb-6 hover:text-gray-800">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        <div>
          {/* Fixed size image container */}
          <div className="w-full h-80 flex items-center justify-center overflow-hidden mb-6 bg-gray-100 rounded-lg">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>

          {/* Product details below image */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600">{product.processor !== "N/A" ? product.processor + " | " : ""}{product.brand}</p>
            <p className="text-blue-500 font-bold text-xl">₹{product.price}/day</p>
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

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Rental Details</h3>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 p-2 border" />

            <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 p-2 border" />
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
                  <Shield className="h-5 w-5 text-indigo-600 mr-2" />
                  <div>
                    <h4 className="font-medium">{plan.name}</h4>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                    <p className="text-indigo-600 font-medium mt-1">₹{plan.price}</p>
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
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;