import { useState } from 'react';
import { motion } from 'framer-motion';
import { orders } from './data/sampleData';
import OrderCard from './OrderCard';

function LenderDashboard() {
  const [localOrders, setLocalOrders] = useState(orders);
  const [filter, setFilter] = useState('all');

  const handleAcceptOrder = (orderId) => {
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? { ...order, orderStatus: 'accepted' }
        : order
    ));
  };

  const handleDeclineOrder = (orderId) => {
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? { ...order, orderStatus: 'declined' }
        : order
    ));
  };

  const handleGenerateOtp = (orderId) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? { ...order, deliveryOtp: otp }
        : order
    ));
  };

  const handleVerifyDeliveryOtp = (orderId) => {
    const now = new Date().toISOString();
    const returnOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? {
            ...order,
            deliveryStatus: 'delivered',
            rentStartTime: now,
            returnOtp
          }
        : order
    ));
  };

  const handleVerifyReturnOtp = (orderId) => {
    const now = new Date().toISOString();
    
    setLocalOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId 
        ? {
            ...order,
            returnStatus: 'returned',
            rentEndTime: now,
            deliveryStatus: 'returned',
            orderStatus: 'completed'
          }
        : order
    ));
  };

  const filteredOrders = localOrders.filter(order => {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lending Orders</h1>
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
              className="card"
            >
              <OrderCard
                order={order}
                viewType="lender"
                onAccept={handleAcceptOrder}
                onDecline={handleDeclineOrder}
                onGenerateOtp={handleGenerateOtp}
                onVerifyDeliveryOtp={handleVerifyDeliveryOtp}
                onVerifyReturnOtp={handleVerifyReturnOtp}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default LenderDashboard;