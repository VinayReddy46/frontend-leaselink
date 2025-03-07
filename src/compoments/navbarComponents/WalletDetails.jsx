import React, { useState, useEffect } from "react";

const WalletPage = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [amount, setAmount] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [autoPay, setAutoPay] = useState(false);

  useEffect(() => {
    if (autoPay) {
      const interval = setInterval(() => {
        handleTransaction("rent", 500); // Auto deduct rent every month
      }, 30000); // Simulated monthly interval (set to 30 sec for demo)
      return () => clearInterval(interval);
    }
  }, [autoPay]);

  const showNotification = (message, isError = false) => {
    setNotification({ message, type: isError ? "error" : "success" });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleTransaction = (type, customAmount) => {
    const numAmount = customAmount || parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showNotification("Enter a valid amount", true);
      return;
    }

    if (type !== "add" && numAmount > balance) {
      showNotification("Insufficient funds", true);
      return;
    }

    setBalance((prev) => (type === "add" ? prev + numAmount : prev - numAmount));
    setTransactions((prev) => [
      { type, amount: numAmount, date: new Date().toLocaleString() },
      ...prev,
    ]);
    showNotification(`${type === "add" ? "Added" : "Paid"} $${numAmount} successfully`);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 mt-16">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Balance & Auto Pay */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Wallet Balance: ${balance.toFixed(2)}</h2>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoPay}
              onChange={() => setAutoPay(!autoPay)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-sm">Auto Rent Payment</span>
          </label>
        </div>

        {/* Transaction Controls */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button onClick={() => handleTransaction("add")} className="bg-blue-500 text-white py-2 rounded">Add Funds</button>
          <button onClick={() => handleTransaction("rent")} className="bg-red-500 text-white py-2 rounded">Pay Rent</button>
        </div>

        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Notification */}
        {notification && (
          <div className={`p-3 mb-4 rounded ${notification.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {notification.message}
          </div>
        )}

        {/* Transaction History */}
        <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
        <div className="max-h-48 overflow-auto">
          {transactions.length > 0 ? (
            transactions.map((t, index) => (
              <div key={index} className="flex justify-between p-2 border-b">
                <span className={t.type === "add" ? "text-green-600" : "text-red-600"}>{t.type.toUpperCase()}</span>
                <span>${t.amount.toFixed(2)}</span>
                <span className="text-gray-500 text-sm">{t.date}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;