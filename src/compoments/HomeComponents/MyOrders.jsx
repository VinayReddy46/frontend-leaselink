import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBox, FaCheck, FaTruck, FaSpinner } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(Array.isArray(storedOrders) ? storedOrders : []);
    } catch (error) {
      console.error('Error loading orders from localStorage:', error);
      setOrders([]);
    }
  }, []);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <FaSpinner className="text-yellow-500" />;
      case 'Shipped':
        return <FaTruck className="text-blue-500" />;
      case 'Delivered':
        return <FaCheck className="text-green-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold ml-auto">My Orders</h1>
      </div>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBox className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="bg-indigo-600 text-white py-2 px-4 rounded-lg">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6 ">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium mb-4">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                      </div>
                      <p className="font-medium">₹{(item.total || 0).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery</span>
                    <span>₹{order.deliveryCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-4">Shipping Address</h3>
                  <p>{order.billingDetails.fullName}</p>
                  <p>{order.billingDetails.address}</p>
                  <p>{order.billingDetails.city}, {order.billingDetails.state} {order.billingDetails.zipCode}</p>
                  <p>{order.billingDetails.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;'

'