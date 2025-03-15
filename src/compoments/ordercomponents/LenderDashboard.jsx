import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  useGetMyRentedProductsQuery,
  useUpdateStatusMutation,
} from "../../redux/services/billingSlice";
import OrderCard from "./OrderCard";

function LenderDashboard() {
  const [filter, setFilter] = useState("all");
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.id || userInfo?.user?.id;
  console.log("logged in user id", userId);
  const {
    data: rentedProductsData,
    isLoading,
    isError,
    refetch,
  } = useGetMyRentedProductsQuery(userId);


  const [updateStatus] = useUpdateStatusMutation();

  const handleAcceptOrder = async (cartId, productId) => {
    try {
      await updateStatus({
        id: productId,
        body: {
          status: "accepted",
          userId: userId,
          cartId: cartId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };

  const handleDeclineOrder = async (cartId, productId) => {
    try {
      await updateStatus({
        id: productId,
        body: {
          status: "declined",
          userId: userId,
          cartId: cartId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to decline order:", error);
    }
  };

  const handleGenerateOtp = async (cartId, productId) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await updateStatus({
        id: productId,
        body: {
          status: "accepted",
          deliveryOtp: otp,
          userId: userId,
          cartId: cartId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to generate OTP:", error);
    }
  };

  const handleVerifyDeliveryOtp = async (cartId, productId) => {
    try {
      const returnOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await updateStatus({
        id: productId,
        body: {
          status: "inProgress",
          deliveryStatus: "delivered",
          rentStartTime: new Date().toISOString(),
          returnOtp: returnOtp,
          userId: userId,
          cartId: cartId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to verify delivery OTP:", error);
    }
  };

  const handleVerifyReturnOtp = async (cartId, productId) => {
    try {
      await updateStatus({
        id: productId,
        body: {
          status: "completed",
          returnStatus: "returned",
          rentEndTime: new Date().toISOString(),
          deliveryStatus: "returned",
          userId: userId,
          cartId: cartId,
        },
      });
      refetch();
    } catch (error) {
      console.error("Failed to verify return OTP:", error);
    }
  };

  // Process the data from the API to fit our component needs
  const orders = rentedProductsData?.data || [];

  const filteredOrders = orders.filter((order) => {
    if (!order.cartIds || order.cartIds.length === 0) return false;

    if (filter === "all") return true;
    if (filter === "pending") {
      return order.cartIds.some((cart) => cart.status === "pending");
    }
    if (filter === "active") {
      return order.cartIds.some(
        (cart) => cart.status === "accepted" && !cart.rentEndTime
      );
    }
    if (filter === "completed") {
      return order.cartIds.some((cart) => cart.status === "completed");
    }
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isLoading)
    return <div className="text-center py-10">Loading your orders...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  if (!orders.length)
    return <div className="text-center py-10">No orders found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lending Orders</h1>
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm">
          {["all", "pending", "active", "completed"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${filter === filterType
                  ? "bg-blue-500 text-white shadow-md"
                  : "hover:bg-gray-100 text-gray-600"
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
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
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
