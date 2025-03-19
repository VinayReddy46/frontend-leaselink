import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../redux/services/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { token } = useParams();
  console.log(token)
  const navigate = useNavigate();
  const [reset, { isLoading: resetLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Password and Confirm Password do not match");
      return;
    }
    try {
      await reset({token,credentials: { newPassword:password } });
        toast.success("Password Reset Successful!");
        navigate("/login");
    } catch (err) {
      toast.error(err||"Invalid Data");
    } 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full rounded-lg p-6 border-2 border-gray-200">
        <h1 className="text-3xl font-semibold  text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">
              <div className="flex items-center rounded-lg border-2 border-gray-200 mt-1 relative">
                <span className="px-3">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2  focus:outline-none text-black"
                  placeholder="New Password"
                />
                {showPassword ? (
                  <FaEye
                    className="absolute right-6  cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-6 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <div className="flex items-center rounded-lg border-2 border-gray-200 mt-1 relative">
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
                    className="absolute right-6  cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    className="absolute right-6  cursor-pointer"
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
              disabled={resetLoading}
            >
              {resetLoading ? "Updating..." : "Update Password"}
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
