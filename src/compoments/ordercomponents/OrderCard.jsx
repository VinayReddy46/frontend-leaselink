import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle, FaStar } from 'react-icons/fa';
import { useGetOrdersQuery } from '../../redux/services/billingSlice';
import { useSelector } from 'react-redux';

function OrderCard({ onVerifyDeliveryOtp, onVerifyReturnOtp, onRateExperience }) {
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo?.id || userInfo?.user?.id;
  const { data, isLoading, isError } = useGetOrdersQuery(userId);
  const orders = data?.data;

  const [remainingTimes, setRemainingTimes] = useState({});

  useEffect(() => {
    if (!orders) return;

    const intervals = orders.flatMap(order =>
      order.cartIds.map(cart => {
        if (cart?.end_time) {
          const endTime = new Date(cart.end_time);
          if (!isNaN(endTime.getTime())) {
            const interval = setInterval(() => {
              const now = new Date();
              const diff = Math.max(0, endTime - now);
              setRemainingTimes(prev => ({
                ...prev,
                [cart._id]: diff
              }));
              if (diff === 0) clearInterval(interval);
            }, 1000);

            return interval;
          }
        }
        return null;
      })
    ).filter(Boolean);

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [orders]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !orders?.length) return <p>No orders available</p>;

  return (
    <div className="space-y-6">
      {orders.map(order => (
        order.cartIds.map(cart => {
          const remainingTime = remainingTimes[cart._id];
          const isCompleted = remainingTime === 0 && cart?.status === 'completed';

          return (
            <div key={cart._id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Product Image */}
                  <div className="w-full md:w-1/3">
                    {cart?.productId?.images?.[0]?.url ? (
                      <img 
                        src={cart.productId.images[0].url} 
                        alt={cart.productId.name} 
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{cart?.productId?.name}</h3>
                    <p className="text-gray-600">{cart?.productId?.description}</p>
                    <p className="text-gray-800 font-semibold mt-2">
                      Price: ₹{cart?.total_price}
                    </p>
                    <p className="text-gray-500">
                      Start: {format(new Date(cart?.start_time), 'PPpp')}
                    </p>
                    <p className="text-gray-500">
                      End: {format(new Date(cart?.end_time), 'PPpp')}
                    </p>

                    {/* Remaining Time */}
                    {remainingTime > 0 ? (
                      <p className="text-gray-600 flex items-center mt-2">
                        <FaClock className="mr-2" />
                        Remaining: {formatTime(remainingTime)}
                      </p>
                    ) : (
                      <p className="text-gray-500 mt-2">
                        Ended
                      </p>
                    )}

                    {/* Status */}
                    <p className={`mt-2 font-semibold ${cart.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {cart.status === 'pending' ? (
                        <>
                          <FaClock className="mr-1 inline-block" /> Pending
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="mr-1 inline-block" /> Confirmed
                        </>
                      )}
                    </p>

                    {/* Rate Experience */}
                    {isCompleted && (
                      <button 
                        onClick={() => onRateExperience(cart._id)} 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
                      >
                        <FaStar className="mr-2" />
                        Rate your experience
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ))}
    </div>
  );
}

export default OrderCard;