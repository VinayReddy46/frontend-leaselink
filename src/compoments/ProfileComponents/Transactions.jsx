import React, { useState } from "react";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const transactions = [
  { id: "#12345", pickup: "New York, USA", drop: "New York, USA", duration: "1 Month", price: "$600", status: "Completed" },
  { id: "#12346", pickup: "Los Angeles, USA", drop: "Los Angeles, USA", duration: "1 Month", price: "$750", status: "Completed" },
  { id: "#12347", pickup: "Chicago, USA", drop: "Chicago, USA", duration: "1 Month", price: "$680", status: "Completed" },
  { id: "#12348", pickup: "Houston, USA", drop: "Houston, USA", duration: "1 Month", price: "$620", status: "Completed" },
  { id: "#12349", pickup: "Miami, USA", drop: "Miami, USA", duration: "1 Month", price: "$700", status: "Completed" },
  { id: "#12350", pickup: "Dallas, USA", drop: "Dallas, USA", duration: "1 Month", price: "$650", status: "Completed" },
];

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 4;

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const currentTransactions = transactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h3 className="text-2xl font-semibold mb-4">Transaction</h3>
      <hr className="mb-4" />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="p-3 border">Order Id</th>
              <th className="p-3 border">Pick Up</th>
              <th className="p-3 border">Drop Up</th>
              <th className="p-3 border">Duration</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((tx, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3">{tx.id}</td>
                <td className="p-3">{tx.pickup}</td>
                <td className="p-3">{tx.drop}</td>
                <td className="p-3">{tx.duration}</td>
                <td className="p-3 font-semibold">{tx.price}</td>
                <td className="p-3">
                  <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                    {tx.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <FaEye />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={prevPage}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Transactions;
