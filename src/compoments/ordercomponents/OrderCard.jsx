import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaClock, 
  FaMoneyBillWave, 
  FaShieldAlt, 
  FaBarcode, 
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
  FaKey,
  FaHeadset
} from 'react-icons/fa';

function OrderCard({ 
  order, 
  viewType, 
  onAccept, 
  onDecline, 
  onGenerateOtp, 
  onPayment,
  onVerifyDeliveryOtp,
  onVerifyReturnOtp 
}) {
  const [deliveryOtpInput, setDeliveryOtpInput] = useState('');
  const [returnOtpInput, setReturnOtpInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    orderId,
    product,
    orderStatus,
    paymentStatus,
    deliveryOtp,
    returnOtp,
    deliveryStatus,
    renter,
    rental,
    rentStartTime,
    rentEndTime
  } = order;

  const handleDeliveryOtpSubmit = () => {
    if (deliveryOtpInput === deliveryOtp) {
      onVerifyDeliveryOtp(orderId);
      setError('');
    } else {
      setError('Invalid OTP');
    }
  };

  const handleReturnOtpSubmit = () => {
    if (returnOtpInput === returnOtp) {
      onVerifyReturnOtp(orderId);
      setError('');
    } else {
      setError('Invalid OTP');
    }
  };

  const calculateRefund = () => {
    if (orderStatus === 'completed' && rentEndTime) {
      const actualEndTime = new Date(rentEndTime);
      const plannedEndTime = new Date(rental.endDate);
      const hoursLate = Math.max(0, (actualEndTime - plannedEndTime) / (1000 * 60 * 60));
      const lateFeeAmount = hoursLate * rental.lateFee;
      const refundAmount = Math.max(0, rental.deposit - lateFeeAmount);
      return { lateFeeAmount, refundAmount };
    }
    return null;
  };

  const calculateEarnings = () => {
    if (orderStatus === 'completed') {
      const baseAmount = rental.duration * rental.hourlyRate;
      const siteCommission = baseAmount * 0.1; // 10% commission
      return baseAmount - siteCommission;
    }
    return rental.duration * rental.hourlyRate;
  };

  const handleSupportClick = () => {
    navigate(`/helpdesk`);
  };

  const renderTimer = () => {
    if (rentStartTime && !rentEndTime) {
      return (
        <div className="bg-blue-50 p-4 rounded-md mt-4">
          <h6 className="font-medium flex items-center">
            <FaClock className="mr-2" /> Rental Timer
          </h6>
          <p className="text-sm mt-2">
            Started: {formatDistanceToNow(new Date(rentStartTime))} ago
          </p>
        </div>
      );
    }
    return null;
  };

  const renderLenderActions = () => {
    if (orderStatus === 'pending') {
      return (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onAccept(orderId)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <FaCheckCircle className="mr-2" /> Accept
          </button>
          <button
            onClick={() => onDecline(orderId)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
          >
            <FaTimesCircle className="mr-2" /> Decline
          </button>
        </div>
      );
    }

    if (orderStatus === 'accepted' && paymentStatus === 'success' && !deliveryOtp) {
      return (
        <button
          onClick={() => onGenerateOtp(orderId)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 flex items-center"
        >
          <FaKey className="mr-2" /> Generate Delivery OTP
        </button>
      );
    }

    if (deliveryOtp && deliveryStatus === 'pending') {
      return (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={deliveryOtpInput}
            onChange={(e) => setDeliveryOtpInput(e.target.value)}
            placeholder="Enter Delivery OTP"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleDeliveryOtpSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Confirm Delivery
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    }

    if (deliveryStatus === 'delivered' && !rentEndTime && returnOtp) {
      return (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={returnOtpInput}
            onChange={(e) => setReturnOtpInput(e.target.value)}
            placeholder="Enter Return OTP"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleReturnOtpSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Confirm Return
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      );
    }

    return null;
  };

  const renderRenterActions = () => {
    if (orderStatus === 'accepted' && paymentStatus === 'pending') {
      return (
        <button
          onClick={() => onPayment(orderId)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 flex items-center"
        >
          <FaMoneyBillWave className="mr-2" /> Make Payment
        </button>
      );
    }

    if (deliveryOtp && deliveryStatus === 'pending') {
      return (
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <h6 className="font-medium flex items-center">
            <FaKey className="mr-2" /> Delivery OTP
          </h6>
          <p className="text-green-700 mt-2">{deliveryOtp}</p>
        </div>
      );
    }

    if (deliveryStatus === 'delivered' && !rentEndTime) {
      return (
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <h6 className="font-medium flex items-center">
            <FaKey className="mr-2" /> Return OTP
          </h6>
          <p className="text-green-700 mt-2">{returnOtp}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="w-full md:w-1/3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Order Details */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-900">Order #{orderId}</h3>
              <div className="flex items-center space-x-2">
                {/* Support Button - Now positioned to the left of status */}
                <button
                  onClick={handleSupportClick}
                  className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors"
                >
                  <FaHeadset className="w-5 h-5" />
                </button>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  orderStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                  orderStatus === 'declined' ? 'bg-red-100 text-red-800' :
                  orderStatus === 'completed' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h4 className="text-lg font-semibold flex items-center">
                <FaBarcode className="mr-2" />
                {product.brand} {product.name}
              </h4>
              <p className="text-gray-600 mt-1">{product.description}</p>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Specifications:</p>
                  <p>{product.specifications}</p>
                </div>
                <div>
                  <p className="text-gray-500">Condition:</p>
                  <p>{product.condition}</p>
                </div>
                <div>
                  <p className="text-gray-500">Serial Number:</p>
                  <p>{product.serialNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Additional Info:</p>
                  <p>{product.additionalInfo}</p>
                </div>
              </div>
            </div>

            {/* Renter Details */}
            {viewType === 'lender' && (
              <div className="border-t pt-4">
                <h5 className="font-medium mb-3 flex items-center">
                  <FaIdCard className="mr-2" /> Renter Details
                </h5>
                <div className="flex items-start space-x-4">
                  <img
                    src={renter.photo}
                    alt={renter.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{renter.name}</p>
                    <p className="text-sm text-gray-500">ID: {renter.document}</p>
                    <p className="text-sm text-gray-500">{renter.idProofType}: {renter.idProofNumber}</p>
                  </div>
                  <img
                    src={renter.idProofPhoto}
                    alt="ID Proof"
                    className="h-20 w-32 object-cover rounded"
                  />
                </div>
              </div>
            )}

            {/* Rental Details */}
            <div className="border-t pt-4">
              <h5 className="font-medium mb-3 flex items-center">
                <FaClock className="mr-2" /> Rental Details
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Duration:</p>
                  <p>{rental.duration} hours</p>
                </div>
                <div>
                  <p className="text-gray-500">Start Date:</p>
                  <p>{format(new Date(rental.startDate), 'PPp')}</p>
                </div>
                <div>
                  <p className="text-gray-500">End Date:</p>
                  <p>{format(new Date(rental.endDate), 'PPp')}</p>
                </div>
                <div>
                  <p className="text-gray-500">Rate:</p>
                  <p>${rental.hourlyRate}/hour</p>
                </div>
                {viewType === 'renter' && (
                  <>
                    <div>
                      <p className="text-gray-500">Late Fee:</p>
                      <p>${rental.lateFee}/hour</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Deposit:</p>
                      <p>${rental.deposit}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Details Section */}
            {viewType === 'renter' && orderStatus === 'completed' && (
              <div className="mt-4 border-t pt-4">
                <h5 className="font-medium mb-3">Payment Summary</h5>
                {calculateRefund() && (
                  <div className="space-y-2">
                    <p className="text-red-600">
                      Late Fee: ${calculateRefund().lateFeeAmount.toFixed(2)}
                    </p>
                    <p className="text-green-600">
                      Deposit Refund: ${calculateRefund().refundAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {viewType === 'lender' && (
              <div className="mt-4 border-t pt-4">
                <h5 className="font-medium mb-3">Earnings</h5>
                {orderStatus === 'accepted' && (
                  <p>Minimum Earnings: ${(rental.hourlyRate * rental.duration * 0.9).toFixed(2)}</p>
                )}
                {orderStatus === 'completed' && (
                  <p>Total Earnings: ${calculateEarnings().toFixed(2)} (after 10% platform fee)</p>
                )}
              </div>
            )}

            {/* Insurance Status */}
            {order.insurance && (
              <div className="flex items-center text-green-600 mt-2">
                <FaShieldAlt className="mr-2" />
                <span>Insurance Included</span>
              </div>
            )}

            {/* Timer */}
            {renderTimer()}

            {/* Actions */}
            {viewType === 'lender' ? renderLenderActions() : renderRenterActions()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;