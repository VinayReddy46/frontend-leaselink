import React, { useState, useEffect } from 'react'; // Added useEffect
import { FaExchangeAlt } from 'react-icons/fa'; // Importing icons from Font Awesome
import { HiCash } from 'react-icons/hi'; // Importing icons from Heroicons
import { toast } from 'react-toastify'; // Import toastify

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TX001',
      from: { name: 'John Doe', type: 'Lender' },
      to: { name: 'Sarah Smith', type: 'Borrower' },
      amount: 1200,
      date: '03/07/2025',
    },
    {
      id: 'TX002',
      from: { name: 'Michael Johnson', type: 'Lender' },
      to: { name: 'Emily Davis', type: 'Borrower' },
      amount: 500,
      date: '03/06/2025',
    },
    {
      id: 'TX003',
      from: { name: 'Alex Wilson', type: 'Borrower' },
      to: { name: 'Robert Taylor', type: 'Lender' },
      amount: 2000,
      date: '03/05/2025',
    },
    {
      id: 'TX004',
      from: { name: 'Jennifer Brown', type: 'Lender' },
      to: { name: 'Daniel Miller', type: 'Borrower' },
      amount: 800,
      date: '03/03/2025',
    },
    {
      id: 'TX005',
      from: { name: 'Chris Evans', type: 'Lender' },
      to: { name: 'Olivia Martinez', type: 'Borrower' },
      amount: 1500,
      date: '03/02/2025',
    },
    {
      id: 'TX006',
      from: { name: 'Sophia Thompson', type: 'Borrower' },
      to: { name: 'James Anderson', type: 'Lender' },
      amount: 2500,
      date: '03/01/2025',
    },
    {
      id: 'TX007',
      from: { name: 'David Wilson', type: 'Lender' },
      to: { name: 'Charlotte White', type: 'Borrower' },
      amount: 700,
      date: '02/28/2025',
    },
    {
      id: 'TX008',
      from: { name: 'Daniel Clark', type: 'Borrower' },
      to: { name: 'Isabella Lewis', type: 'Lender' },
      amount: 3200,
      date: '02/26/2025',
    },
    {
      id: 'TX009',
      from: { name: 'Liam Scott', type: 'Lender' },
      to: { name: 'Mia Robinson', type: 'Borrower' },
      amount: 1800,
      date: '02/25/2025',
    },
    {
      id: 'TX010',
      from: { name: 'Emma Carter', type: 'Borrower' },
      to: { name: 'Benjamin Harris', type: 'Lender' },
      amount: 2200,
      date: '02/24/2025',
    },
  ]);
  const [walletBalance, setWalletBalance] = useState(1000); // Initial wallet balance
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate the total amount of all transactions
  const calculateTotalTransactionsAmount = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Update wallet balance to include the total transactions amount
  useEffect(() => {
    const totalTransactionsAmount = calculateTotalTransactionsAmount();
    setWalletBalance((prevBalance) => prevBalance + totalTransactionsAmount);
  }, [transactions]); // Re-run when transactions change

  const calculateFee = (amount) => {
    return amount * 0.05; // 5% fee
  };

  const calculateRemainingAmount = (amount) => {
    return amount - calculateFee(amount); // Remaining amount after fee
  };

  const handleSendMoney = (amount) => {
    const remainingAmount = calculateRemainingAmount(amount); // Calculate remaining amount
    if (walletBalance >= remainingAmount) {
      setWalletBalance((prevBalance) => prevBalance - remainingAmount); // Subtract remaining amount
      toast.success(`Sent $${remainingAmount.toFixed(2)} successfully!`);
    } else {
      toast.error('Insufficient funds in wallet!');
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(searchLower) ||
      transaction.from.name.toLowerCase().includes(searchLower) ||
      transaction.to.name.toLowerCase().includes(searchLower) ||
      transaction.amount.toString().includes(searchLower) ||
      transaction.date.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-700 flex items-center">
            <FaExchangeAlt className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-indigo-600" />
            Transactions
          </h1>
          <div className="flex items-center mt-2 sm:mt-0">
            <HiCash className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-green-600" />
            <span className="text-base sm:text-lg font-semibold text-gray-700">
              Wallet Balance: ${walletBalance.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search by Transaction Details"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee (5%)
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining Amount
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-md inline-flex text-sm ${
                        transaction.from.type === 'Lender'
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {transaction.from.name} ({transaction.from.type})
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-md inline-flex text-sm ${
                        transaction.to.type === 'Lender'
                          ? 'bg-cyan-50 text-cyan-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {transaction.to.name} ({transaction.to.type})
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm font-medium text-red-500">
                    -${calculateFee(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    ${calculateRemainingAmount(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleSendMoney(transaction.amount)}
                      className="bg-indigo-600 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md flex items-center justify-center hover:bg-indigo-700 text-xs sm:text-sm"
                    >
                      Send money
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
