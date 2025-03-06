import React, { useState } from "react";

const Myrentedproducts = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // const [rentalOrders, setrentalOrders] = useState([]);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/rentalOrders") // Replace with your API URL
  //     .then((response) => {
  //       setrentalOrders(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);
  // if (loading) {
  //   return <p>Loading products...</p>;
  // }

  const rentalOrders = [
    {
      id: "RENT001",
      productName: "DSLR Camera Kit",
      image: "https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70",
      rentalPrice: "₹2,500",
      rentalPeriod: "3 days",
      status: "Active",
      startDate: "Mar 01, 2025",
      endDate: "Mar 04, 2025",
      deposit: "₹10,000",
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
      },
    },
    {
      id: "RENT002",
      productName: "Projector with Screen",
      image: "https://rukminim2.flixcart.com/image/612/612/xif0q/projector/h/o/g/smart-led-4k-mini-projector-1080p-full-hd-wifi-bluetooth-5-0-180-original-imah7wuz9z9egphx.jpeg?q=70",
      rentalPrice: "₹4,000",
      rentalPeriod: "2 days",
      status: "Returned",
      startDate: "Feb 20, 2025",
      endDate: "Feb 22, 2025",
      deposit: "₹15,000",
      user: {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(987) 654-3210",
      },
    },
    {
      id: "RENT003",
      productName: "Professional Audio Mixer",
      image: "https://via.placeholder.com/250", // Replace with a valid URL
      rentalPrice: "₹3,500",
      rentalPeriod: "5 days",
      status: "Pending",
      startDate: "Mar 06, 2025",
      endDate: "Mar 11, 2025",
      deposit: "₹20,000",
      user: {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "(555) 234-5678",
      },
    },
  ];

  const statusStyles = {
    Active: "bg-green-100 text-green-600",
    Returned: "bg-blue-100 text-blue-600",
    Pending: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto mt-24 min-h-screen ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center text-gray-800">
        My Rented Products
      </h2>

      <div className="flex flex-col gap-6">
        {rentalOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 
              flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 
              hover:shadow-lg transition-all duration-300 w-full"
          >
            <img
              src={order.image}
              alt={order.productName}
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg flex-shrink-0"
              loading="lazy"
            />

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {order.productName}
                  </h3>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p className="text-gray-700">
                      <span className="font-medium">Rental Price:</span> {order.rentalPrice}/day
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Deposit:</span> {order.deposit}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Period:</span> {order.rentalPeriod}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs sm:text-sm ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm sm:text-base font-medium"
                  >
                    {selectedOrder === order.id ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>

              {selectedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Start Date:</span> {order.startDate}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">End Date:</span> {order.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Rented by:</span> {order.user.name}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Email:</span> {order.user.email}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Phone:</span> {order.user.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {rentalOrders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No rented products found.
        </div>
      )}
    </div>
  );
};

export default Myrentedproducts;