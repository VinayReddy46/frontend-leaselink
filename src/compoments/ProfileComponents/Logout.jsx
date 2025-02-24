import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Profile Info</h3>
      <hr className="mb-4" />
      <p className="text-gray-700 text-lg">
        <span className="font-bold">Full Name:</span> Antoni Janson
      </p>
      <button
        onClick={() => navigate("/login")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go to Profile
      </button>
    </div>
  );
};

export default Logout;
