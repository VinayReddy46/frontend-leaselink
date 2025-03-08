import React, { useState } from "react";
import { FaUser,FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logoForPages.webp";
import { useRegisterMutation } from "../redux/services/authSlice";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const navigate = useNavigate();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

console.log(credentials)
    try {
      const response = await register(credentials);
      console.log(response.data)
      console.log(response.status)
      if(response?.data?.success){
        toast.success(response?.data?.message || "OTP sent to email");
        navigate(`/verification?email=${credentials.email}`);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm border border-gray-300">
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="h-14 mx-auto" />
        </div>
        <form onSubmit={handleSubmit}>
          {/** Name Input */}
          <div className="mb-4">
            <label className="flex items-center bg-white border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-700 mx-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={credentials.name}
                onChange={handleChange}
                className="w-full outline-none text-black bg-transparent"
                required
              />
            </label>
          </div>

          {/** Email Input */}
          <div className="mb-4">
            <label className="flex items-center bg-white border border-gray-300 rounded-md p-2">
              <FaEnvelope className="text-gray-700 mx-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full outline-none text-black bg-transparent"
                required
                autoComplete="true"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center bg-white border border-gray-300 rounded-md p-2">
              <FaPhoneAlt className="text-gray-700 mx-2" />
              <input
                type="number"
                name="phone_number"
                placeholder="Mobile Number"
                value={credentials.phone_number}
                onChange={handleChange}
                className="w-full outline-none text-black bg-transparent"
                required
                autoComplete="true"
              />
            </label>
          </div>


          {/** Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            disabled={isRegistering}
          >
            {isRegistering ? "Loading..." : "Signup"}
          </button>
        </form>

        {/** Login Link */}
        <div className="text-center mt-4">
          <span className="text-gray-500">Already have an account?</span>
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
