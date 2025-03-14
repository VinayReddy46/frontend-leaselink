import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetWithdrawRequestsQuery } from "../../redux/services/adminSlice";
import { useNavigate } from "react-router-dom";

const WithdrawRequest = () => {
  const { data: requestsData, refetch, isLoading } = useGetWithdrawRequestsQuery();
  const requests = requestsData?.requests || [];
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Delete function
  const handleDelete = (id) => {
    // Implement delete functionality here
  };

  const handlePayment = (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="max-w-full mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Withdraw Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border border-gray-300">ID</th>
              <th className="p-3 border border-gray-300">User Name</th>
              <th className="p-3 border border-gray-300">Bank Name</th>
              <th className="p-3 border border-gray-300">Details</th>
              <th className="p-3 border border-gray-300">Amount</th>
              <th className="p-3 border border-gray-300">Pay</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <React.Fragment key={request._id}>
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-3 border border-gray-300">{request._id}</td>
                  <td className="p-3 border border-gray-300">
                    {request.userId.name}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {request.bankDetails.bankName}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => toggleDropdown(request._id)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      {openDropdown === request._id ? (
                        <MdKeyboardArrowUp size={18} />
                      ) : (
                        <MdKeyboardArrowDown size={18} />
                      )}
                      <span className="hidden sm:inline">View Details</span>
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300">
                    {request.amount}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handlePayment(request._id)}
                      className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
                    >
                      Click Here to Pay
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out text-sm sm:text-base"
                    >
                      <FaTrashAlt size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>

                {openDropdown === request._id && (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-4 border border-gray-300 bg-gray-50"
                    >
                      <p>
                        <strong>Account Number:</strong> {request.bankDetails.accountNumber}
                      </p>
                      <p>
                        <strong>Bank Address:</strong> {request.bankDetails.bankAddress}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequest;