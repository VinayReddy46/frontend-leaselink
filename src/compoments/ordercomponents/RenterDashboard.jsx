import { useState } from 'react';
import { motion } from 'framer-motion';
import { orders } from './data/sampleData';
import OrderCard from './OrderCard';
import OrderRating from './Orderraing';

function RenterDashboard() {
  const [localOrders, setLocalOrders] = useState(orders);
  const [filter, setFilter] = useState('all');
  const [selectedOrderForRating, setSelectedOrderForRating] = useState(null);
  const currentRenterId = 'R001'; // Normally this would come from auth

  const handlePayment = (orderId) => {
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? { ...order, paymentStatus: 'success' }
        : order
    ));
  };

  const handleOpenRating = (order) => {
    setSelectedOrderForRating(order);
  };

  const handleCloseRating = () => {
    setSelectedOrderForRating(null);
  };

  const handleSubmitRating = (rating, review) => {
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === selectedOrderForRating.orderId
        ? { ...order, rating, review }
        : order
    ));
    setSelectedOrderForRating(null);
  };

  const filteredOrders = localOrders
    .filter(order => order.renterId === currentRenterId)
    .filter(order => {
      if (filter === 'all') return true;
      if (filter === 'pending') return order.orderStatus === 'pending';
      if (filter === 'active') return order.orderStatus === 'accepted' && !order.rentEndTime;
      if (filter === 'completed') return order.rentEndTime;
      return true;
    });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto mt-200px">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          {['all', 'pending', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                filter === filterType
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Rental Guidelines</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Please check the item thoroughly before accepting delivery
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Keep your OTP codes safe and don't share them
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Return items in the same condition as received
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredOrders.map(order => (
            <motion.div
              key={order.orderId}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <OrderCard
                order={order}
                viewType="renter"
                onPayment={handlePayment}
                onRate={() => handleOpenRating(order)}
              />
              {order.orderStatus === 'completed' && !order.rating && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-b-xl border-t border-yellow-100">
                  <button
                    onClick={() => handleOpenRating(order)}
                    className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Rate Your Experience
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedOrderForRating && (
        <OrderRating
          order={selectedOrderForRating}
          onClose={handleCloseRating}
          onSubmit={handleSubmitRating}
        />
      )}
    </div>
  );
}

export default RenterDashboard;