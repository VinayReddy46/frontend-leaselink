import React from "react";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => navigate("/wallet")}
        className="p-2 hover:bg-blue-100 rounded-full"
        aria-label="Wallet"
      >
        <FaWallet className="w-5 h-5 text-gray-600 hover:text-blue-600" />
      </button>
    </div>
  );
}

export default Wallet;
