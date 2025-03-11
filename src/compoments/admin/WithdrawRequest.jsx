import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const WithdrawRequest = () => {
  const [bankData, setBankData] = useState([
    { id: 1, bankName: "HDFC Bank", accountHolder: "Rajesh Kumar", accountNumber: "123456789012", bankAddress: "MG Road, Bengaluru",amount:"500" },
    { id: 2, bankName: "ICICI Bank", accountHolder: "Priya Sharma", accountNumber: "234567890123", bankAddress: "Connaught Place, Delhi",amount:"1500" },
    { id: 3, bankName: "SBI Bank", accountHolder: "Amit Verma", accountNumber: "345678901234", bankAddress: "Park Street, Kolkata" ,amount:"2200"},
    { id: 4, bankName: "Axis Bank", accountHolder: "Sneha Patel", accountNumber: "456789012345", bankAddress: "Bandra, Mumbai" ,amount:"2000"},
    { id: 5, bankName: "Kotak Mahindra", accountHolder: "Manish Singh", accountNumber: "567890123456", bankAddress: "JP Nagar, Bengaluru",amount:"3000" },
    { id: 6, bankName: "PNB Bank", accountHolder: "Rakesh Gupta", accountNumber: "678901234567", bankAddress: "Civil Lines, Jaipur",amount:"4000" },
    { id: 7, bankName: "Canara Bank", accountHolder: "Anjali Nair", accountNumber: "789012345678", bankAddress: "Anna Salai, Chennai",amount:"3200" },
    { id: 8, bankName: "Bank of Baroda", accountHolder: "Surya Teja", accountNumber: "890123456789", bankAddress: "Abids, Hyderabad" ,amount:"4600"},
    { id: 9, bankName: "Indian Bank", accountHolder: "Kavita Mehta", accountNumber: "901234567890", bankAddress: "Koregaon Park, Pune" ,amount:"6000"},
    { id: 10, bankName: "UCO Bank", accountHolder: "Tarun Malhotra", accountNumber: "012345678901", bankAddress: "Hazratganj, Lucknow",amount:"7000" },
  ]);
  

  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Delete function
  const handleDelete = (id) => {
    setBankData(bankData.filter((bank) => bank.id !== id));
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
            {bankData.map((bank) => (
              <React.Fragment key={bank.id}>
                <tr className="hover:bg-gray-50 transition">
                  <td className="p-3 border border-gray-300">{bank.id}</td>
                  <td className="p-3 border border-gray-300">
                    {bank.accountHolder}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {bank.bankName}
                  </td>
                  
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => toggleDropdown(bank.id)}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                    >
                      {openDropdown === bank.id ? (
                        <MdKeyboardArrowUp size={18} />
                      ) : (
                        <MdKeyboardArrowDown size={18} />
                      )}
                      <span className="hidden sm:inline">View Details</span>
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300">
                    {bank.amount}
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handlePayment(bank.id)}
                      className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
                    >
                      Click Here to Pay
                    </button>
                  </td>
                  <td className="p-3 border border-gray-300">
                    <button
                      onClick={() => handleDelete(bank.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out text-sm sm:text-base"
                    >
                      <FaTrashAlt size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </tr>

                {openDropdown === bank.id && (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-4 border border-gray-300 bg-gray-50"
                    >
                      <p>
                        <strong>Account Number:</strong> {bank.accountNumber}
                      </p>
                      <p>
                        <strong>Bank Address:</strong> {bank.bankAddress}
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