import { format } from "date-fns";
import { useState, useEffect } from "react";
import {
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaKey,
  FaSpinner,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useCreatePaymentSessionMutation } from "../../redux/services/paymentSlice";
import { Modal } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import PaymentSuccessModal from "./PaymentSuccessPage";
import PaymentSuccessPage from "./PaymentSuccessPage";
import queryString from "query-string";

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
  const [loadingStates, setLoadingStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [createPaymentSession] = useCreatePaymentSessionMutation();
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    type: null,
    cartId: null,
    productId: null,
  });

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

  const openConfirmModal = (type, cartId, productId) => {
    setConfirmModal({
      show: true,
      type,
      cartId,
      productId,
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      type: null,
      cartId: null,
      productId: null,
    });
  };

  const handleConfirmAction = async () => {
    const { type, cartId, productId } = confirmModal;

    setLoadingStates((prev) => ({
      ...prev,
      [`${type}_${cartId}`]: true,
    }));

    try {
      if (type === "accept") {
        await onAccept(cartId, productId);
      } else if (type === "decline") {
        await onDecline(cartId, productId);
      }
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`${type}_${cartId}`]: false,
      }));
      closeConfirmModal();
    }
  };

  const handleVerifyOtpSubmit = async (cartId, productId, type) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`verify_${type}_${cartId}`]: true,
    }));

    try {
      if (type === "delivery") {
        await onVerifyDeliveryOtp(cartId, productId);
      } else if (type === "return") {
        await onVerifyReturnOtp(cartId, productId);
      }
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`verify_${type}_${cartId}`]: false,
      }));
      setOtpInput("");
    }
  };

  const handleGenerateOtpWithLoading = async (cartId, productId) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`generateOtp_${cartId}`]: true,
    }));

    try {
      await onGenerateOtp(cartId, productId);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`generateOtp_${cartId}`]: false,
      }));
    }
  };

  const handlePaymentWithLoading = async (cartId, productId) => {
    setLoading(true);
    setModalVisible(true);

    try {
      const response = await createPaymentSession({ cartId }).unwrap();
      window.location.href = response.url;

    } catch (error) {
      console.error("Error creating payment session", error);
      setLoading(false);
      // Optionally show an error message to the user here
    }
  };

  const handleMakePayment = (cartId, productId) => {
    console.log(cartId, productId)
    handlePaymentWithLoading(cartId, productId);
  };

  const handleRateWithLoading = async (cartId, productId) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`rate_${cartId}`]: true,
    }));

    try {
      await onRate(cartId, productId);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`rate_${cartId}`]: false,
      }));
    }
  };

  if (!order || !order.cartIds || order.cartIds.length === 0) {
    return <p>No order information available</p>;
  }


  return (
    <div className="space-y-6">
      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 md:w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              {confirmModal.type === "accept"
                ? "Accept Order"
                : "Decline Order"}
            </h3>
            <p className="text-gray-600 mb-6">
              {confirmModal.type === "accept"
                ? "Are you sure you want to accept this order?"
                : "Are you sure you want to decline this order?"}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded text-white flex items-center space-x-2 ${confirmModal.type === "accept"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
                  }`}
                disabled={
                  loadingStates[`${confirmModal.type}_${confirmModal.cartId}`]
                }
              >
                {loadingStates[
                  `${confirmModal.type}_${confirmModal.cartId}`
                ] ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Confirm</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {order.cartIds.map((cart) => {
        const remainingTime = remainingTimes[cart._id] || 0;
        const isCompleted = cart.status === "completed";
        const product = cart.productId;
        const productId = product?._id;
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${cart.status === "pending"
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
                              onClick={() =>
                                openConfirmModal("accept", cart._id, productId)
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                            >
                              <FaCheckCircle className="mr-2" />
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                openConfirmModal("decline", cart._id, productId)
                              }
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
                            >
                              <FaTimesCircle className="mr-2" />
                              Decline
                            </button>
                          </div>
                        )}

                        {/* {cart.status === "accepted" && !cart.deliveryOtp && (
                          <button
                            onClick={() =>
                              handleGenerateOtpWithLoading(cart._id, productId)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
                            disabled={loadingStates[`generateOtp_${cart._id}`]}
                          >
                            {loadingStates[`generateOtp_${cart._id}`] ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <FaKey className="mr-2" />
                                <span>Generate Delivery OTP</span>
                              </>
                            )}
                          </button>
                        )} */}

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
                                    handleVerifyOtpSubmit(
                                      cart._id,
                                      productId,
                                      "return"
                                    )
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                                  disabled={
                                    otpInput !== cart.returnOtp ||
                                    loadingStates[`verify_return_${cart._id}`]
                                  }
                                >
                                  {loadingStates[
                                    `verify_return_${cart._id}`
                                  ] ? (
                                    <>
                                      <FaSpinner className="animate-spin mr-2" />
                                      <span>Verifying...</span>
                                    </>
                                  ) : (
                                    <span>Verify</span>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                      </>
                    )}

                    {/* Renter Actions */}
                    {viewType === "renter" && (
                      <>
                        {
                          cart.status === "accepted" && (
                            <>
                              {cart.payment === 'pending' && (
                                <button
                                  onClick={() => handleMakePayment(cart._id)}
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                                  disabled={loadingStates[`payment_${cart._id}`]}
                                >
                                  {!loading ? "Make Payment" : "Processing..."}
                                </button>
                              )}

                              {cart.payment === 'completed' && (
                                <p>Payment Successful</p>
                              )}
                            </>
                          )
                        }

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
                                    handleVerifyOtpSubmit(
                                      cart._id,
                                      productId,
                                      "delivery"
                                    )
                                  }
                                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center"
                                  disabled={
                                    loadingStates[`verify_delivery_${cart._id}`]
                                  }
                                >
                                  {loadingStates[
                                    `verify_delivery_${cart._id}`
                                  ] ? (
                                    <>
                                      <FaSpinner className="animate-spin mr-2" />
                                      <span>Verifying...</span>
                                    </>
                                  ) : (
                                    <span>Verify</span>
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                        {cart.status === "completed" && (
                          <button
                            onClick={() =>
                              handleRateWithLoading(cart._id, productId)
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition flex items-center"
                            disabled={loadingStates[`rate_${cart._id}`]}
                          >
                            {loadingStates[`rate_${cart._id}`] ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                <span>Loading...</span>
                              </>
                            ) : (
                              <>
                                <FaStar className="mr-2" />
                                <span>Rate Experience</span>
                              </>
                            )}
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

    </div >
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
  onAccept: () => { },
  onDecline: () => { },
  onPayment: () => { },
  onGenerateOtp: () => { },
  onVerifyDeliveryOtp: () => { },
  onVerifyReturnOtp: () => { },
  onRate: () => { },
};

export default OrderCard;
