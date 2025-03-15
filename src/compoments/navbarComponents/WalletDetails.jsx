
import React, { useState } from "react";
import { useGetWalletByIdQuery, useUpdateWalletMutation } from "../../redux/services/walletSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const WalletPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, refetch, isLoading } = useGetWalletByIdQuery(userInfo?.id ||  userInfo?.user?.id, {
    skip: !userInfo?.id ||  !userInfo?.user?.id,
  });
  console.log(data)

  const balance = data?.balance || 0;
  const transactions = data?.transactions || [];

  const [updateWallet, { isLoading: withdrawLoading }] = useUpdateWalletMutation();
  
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (numAmount > balance) {
      toast.error("Insufficient funds");
      return;
    }

    const newTransaction = {
      type: "debit",
      amount: numAmount,
      description: "Withdrawn funds",
    };

    try {
      await updateWallet({
        id: userInfo?.id ||  userInfo?.user?.id,
        ...newTransaction,
      }).unwrap();

      toast.success(`Withdrawn $${numAmount.toFixed(2)} successfully`);
      setAmount("");
      refetch();
    } catch (error) {
      toast.error("Failed to withdraw funds");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-6 mt-6" >
      <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-200/50">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Wallet Balance: <span className="text-teal-600">${balance.toFixed(2)}</span>
        </h2>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-red-500/20 backdrop-blur-lg text-red-700 font-semibold py-3 px-6 rounded-full border border-red-500/30 shadow-md hover:bg-red-500/40 hover:text-red-800 hover:scale-105 transition-all duration-300 ease-in-out"
          disabled={withdrawLoading}
        >
          {withdrawLoading ? "Withdrawing..." : "Withdraw"}
        </button>

        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-6 mb-4">Transaction History</h3>
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {transactions.length > 0 ? (
            transactions.map((t, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                {t.type === "credit" ? (
                  <span className="text-green-600 font-medium">CREDIT</span>
                ) : (
                  <span className="text-red-600 font-medium">DEBIT</span>
                )}
                <span className="text-gray-700">${t.amount.toFixed(2)}</span>
                <span className="text-gray-500 text-sm sm:text-base">
                  {t?.timestamp ? new Date(t?.timestamp).toLocaleString() : "N/A"}
                </span>
              </div>
            ))
          ) : isLoading ? (
            <p className="text-gray-500 text-center py-4">Loading transactions...</p>
          ) : (
            <p className="text-gray-500 text-center py-4">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
