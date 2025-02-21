import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-toastify";
import { useSearchParams,useNavigate } from 'react-router-dom';


const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  // console.log(email)

  const navigate =useNavigate()

  // Handle OTP input changes
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpCode = otp.join("");

    try {
  
  setLoading(false)
    toast.success( "User registered successfully.");
    navigate("/signin");     
    } catch (error) {
      toast.error("OTP verification failed");
    } 
  };

  // Resend OTP
  const handleResendOTP = async () => {

    setResendDisabled(true);
    // console.log(email)
    try {
      
        toast.success( "OTP resent successfully!");
      
    } catch (error) {
      toast.error( "Failed to resend OTP");
    }
    setTimeout(() => setResendDisabled(false), 60000); // Disable resend for 60s
  };

  return (
    <div className="min-h-screen w-full   flex items-center justify-center bg-gradient-to-br from-red-500 via-orange-500 to-yellow-300">
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
      <h2 className="text-2xl text-white font-bold text-center mb-4">Verify OTP</h2>
      <p className="text-md text-gray-100 text-center mb-4 font-semibold">Enter the 6-digit OTP sent to <strong>{email}</strong></p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
          <FaRegPaperPlane />
        </button>
      </form>

      <div className="text-center mt-4">
        <button
          onClick={handleResendOTP}
          disabled={resendDisabled}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-700 disabled:text-gray-400"
        >
          Resend OTP <IoMdRefresh />
        </button>
      </div>
    </div>
    </div>
  );
};

export default OtpVerification;
