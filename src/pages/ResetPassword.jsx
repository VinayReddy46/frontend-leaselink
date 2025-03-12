import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Password and Confirm Password do not match");
      return;
    }
    try {
      setIsLoading(true);
     
        toast.success("Password Reset Successful!");
     
    } catch (err) {
      toast.error(err||"Invalid Data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-500 via-white-500 to-yellow-300">
      <div className="max-w-md w-full rounded-lg p-6 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">
              <div className="flex items-center rounded-full mt-1 relative">
                <span className="px-3">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 rounded-full focus:outline-none text-black"
                  placeholder="New Password"
                />
                {showPassword ? (
                  <FaEye
                    className="absolute right-12 text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-12 text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white">
              <div className="flex items-center rounded-full mt-1 relative">
                <span className="px-3">
                  <FaLock />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 rounded-full focus:outline-none text-black"
                  placeholder="Confirm Password"
                />
                {showConfirmPassword ? (
                  <FaEye
                    className="absolute right-12 text-gray-600 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-12 text-gray-600 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className="bg-blue-600 w-full text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              className="bg-red-500 w-full text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
              onClick={() => {
                setPassword("");
                setConfirmPassword("");
                navigate("/signin")
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;