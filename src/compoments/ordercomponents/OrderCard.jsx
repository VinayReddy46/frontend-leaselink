import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaKey,
} from "react-icons/fa";
import PropTypes from "prop-types";

function OrderCard({
  order,
  viewType,
  onAccept,
  onDecline,
  onPayment,
  onGenerateOtp,
  onVerifyDeliveryOtp,
  onVerifyReturnOtp,
  onRate,
}) {
  const [remainingTimes, setRemainingTimes] = useState({});
  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    if (!order?.cartIds) return;

    const intervals = order.cartIds
      .map((cart) => {
        if (cart?.end_time) {
          const endTime = new Date(cart.end_time);
          if (!isNaN(endTime.getTime())) {
            const interval = setInterval(() => {
              const now = new Date();
              const diff = Math.max(0, endTime - now);
              setRemainingTimes((prev) => ({
                ...prev,
                [cart._id]: diff,
              }));
              if (diff === 0) clearInterval(interval);
            }, 1000);

            return interval;
          }
        }
        return null;
      })
      .filter(Boolean);

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [order]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "PPpp");
    } catch {
      return "Invalid date";
    }
  };

  const handleVerifyOtpSubmit = (cartId, type) => {
    if (type === "delivery") {
      onVerifyDeliveryOtp(cartId);
    } else if (type === "return") {
      onVerifyReturnOtp(cartId);
    }
    setOtpInput("");
  };

  if (!order || !order.cartIds || order.cartIds.length === 0) {
    return <p>No order information available</p>;
  }

  return (
    <div className="space-y-6">
      {order.cartIds.map((cart) => {
        const remainingTime = remainingTimes[cart._id] || 0;
        const isCompleted = cart.status === "completed";
        const product = cart.productId;
        const userInfo = viewType === "lender" ? order.user : product?.user;

        return (
          <div
            key={cart._id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/3">
                  {product?.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
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
                  <h3 className="text-xl font-semibold">
                    {product?.name || "Product Name Not Available"}
                  </h3>
                  <p className="text-gray-600">
                    {product?.description || "No description available"}
                  </p>

                  <div className="mt-2 space-y-1">
                    <p className="text-gray-800 font-semibold">
                      Price: ₹{cart?.total_price || "N/A"}
                    </p>
                    <p className="text-gray-500">
                      Start: {formatDate(cart?.start_time)}
                    </p>
                    <p className="text-gray-500">
                      End: {formatDate(cart?.end_time)}
                    </p>

                    {/* User Info */}
                    {userInfo && (
                      <p className="text-gray-700">
                        {viewType === "lender" ? "Renter" : "Lender"}:{" "}
                        {userInfo.name} ({userInfo.email})
                      </p>
                    )}

                    {/* Remaining Time */}
                    {remainingTime > 0 ? (
                      <p className="text-gray-600 flex items-center mt-2">
                        <FaClock className="mr-2" />
                        Remaining: {formatTime(remainingTime)}
                      </p>
                    ) : (
                      <p className="text-gray-500 mt-2">
                        {isCompleted ? "Completed" : "Rental period ended"}
                      </p>
                    )}

                    {/* Status Pill */}
                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          cart.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : cart.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : cart.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : cart.status === "declined"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cart.status === "pending" && (
                          <>
                            <FaClock className="inline-block mr-1" />
                            Pending
                          </>
                        )}
                        {cart.status === "accepted" && (
                          <>
                            <FaCheckCircle className="inline-block mr-1" />
                            Accepted
                          </>
                        )}
                        {cart.status === "completed" && (
                          <>
                            <FaCheckCircle className="inline-block mr-1" />
                            Completed
                          </>
                        )}
                        {cart.status === "declined" && (
                          <>
                            <FaTimesCircle className="inline-block mr-1" />
                            Declined
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons based on role and status */}
                  <div className="mt-4 space-y-2">
                    {/* Lender Actions */}
                    {viewType === "lender" && (
                      <>
                        {cart.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => onAccept(cart._id)}
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                            >
                              <FaCheckCircle className="mr-2" />
                              Accept
                            </button>
                            <button
                              onClick={() => onDecline(cart._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
                            >
                              <FaTimesCircle className="mr-2" />
                              Decline
                            </button>
                          </div>
                        )}

                        {cart.status === "accepted" && !cart.deliveryOtp && (
                          <button
                            onClick={() => onGenerateOtp(cart._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
                          >
                            <FaKey className="mr-2" />
                            Generate Delivery OTP
                          </button>
                        )}

                        {cart.status === "accepted" &&
                          cart.deliveryOtp &&
                          !cart.deliveryStatus && (
                            <div className="bg-blue-50 p-3 rounded border border-blue-200">
                              <p className="font-semibold text-blue-800 mb-2">
                                Delivery OTP: {cart.deliveryOtp}
                              </p>
                              <p className="text-sm text-blue-600">
                                Share this with the renter when delivering the
                                item
                              </p>
                            </div>
                          )}

                        {cart.status === "accepted" &&
                          cart.deliveryStatus === "delivered" &&
                          cart.returnOtp &&
                          !cart.returnStatus && (
                            <div className="bg-purple-50 p-3 rounded border border-purple-200">
                              <p className="font-semibold text-purple-800 mb-2">
                                Return OTP: {cart.returnOtp}
                              </p>
                              <p className="text-sm text-purple-600">
                                The renter will provide this OTP when returning
                                the item
                              </p>

                              <div className="mt-3 flex space-x-2">
                                <input
                                  type="text"
                                  value={otpInput}
                                  onChange={(e) => setOtpInput(e.target.value)}
                                  placeholder="Enter return OTP"
                                  className="px-3 py-2 border rounded flex-1"
                                />
                                <button
                                  onClick={() =>
                                    handleVerifyOtpSubmit(cart._id, "return")
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                  disabled={otpInput !== cart.returnOtp}
                                >
                                  Verify
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    )}

                    {/* Renter Actions */}
                    {viewType === "renter" && (
                      <>
                        {cart.status === "pending" && !cart.paymentStatus && (
                          <button
                            onClick={() => onPayment(cart._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                          >
                            <FaMoneyBillWave className="mr-2" />
                            Make Payment
                          </button>
                        )}

                        {cart.status === "accepted" &&
                          cart.deliveryOtp &&
                          !cart.deliveryStatus && (
                            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                              <p className="font-semibold text-yellow-800 mb-2">
                                Enter delivery OTP:
                              </p>
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={otpInput}
                                  onChange={(e) => setOtpInput(e.target.value)}
                                  placeholder="Enter delivery OTP"
                                  className="px-3 py-2 border rounded flex-1"
                                />
                                <button
                                  onClick={() =>
                                    handleVerifyOtpSubmit(cart._id, "delivery")
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                  Verify
                                </button>
                              </div>
                            </div>
                          )}

                        {cart.status === "completed" && (
                          <button
                            onClick={() => onRate(cart._id)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center"
                          >
                            <FaStar className="mr-2" />
                            Rate Experience
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.object,
    cartIds: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        productId: PropTypes.object,
        status: PropTypes.string,
        start_time: PropTypes.string,
        end_time: PropTypes.string,
        total_price: PropTypes.number,
        deliveryOtp: PropTypes.string,
        returnOtp: PropTypes.string,
        deliveryStatus: PropTypes.string,
        returnStatus: PropTypes.string,
      })
    ),
  }),
  viewType: PropTypes.oneOf(["lender", "renter"]).isRequired,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func,
  onPayment: PropTypes.func,
  onGenerateOtp: PropTypes.func,
  onVerifyDeliveryOtp: PropTypes.func,
  onVerifyReturnOtp: PropTypes.func,
  onRate: PropTypes.func,
};

OrderCard.defaultProps = {
  onAccept: () => {},
  onDecline: () => {},
  onPayment: () => {},
  onGenerateOtp: () => {},
  onVerifyDeliveryOtp: () => {},
  onVerifyReturnOtp: () => {},
  onRate: () => {},
};

export default OrderCard;
