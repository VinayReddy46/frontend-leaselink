import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-toastify";
import { useSearchParams,useNavigate } from 'react-router-dom';
import { useOtpVerifyMutation,useReSendOtpMutation } from "../redux/services/authSlice";

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

  const [verify, { isLoading: isVerifingIn }] = useOtpVerifyMutation();
  const [resend] = useReSendOtpMutation();

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    try {
      const res=await verify({email,otp:otpCode})
      console.log(res)
      if(res?.data?.success){
        toast.success( res?.data?.message ||"User registered successfully.");
        navigate("/login");
      }
       
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "OTP Verifing Failed")
    }
  
    
  };

  // Resend OTP
  const handleResendOTP = async () => {

    setResendDisabled(true);
    console.log(email)
    try {
      const res = await resend({email})
      console.log(res)
      if(res.data.success){
        toast.success(res?.data?.message|| "OTP resent successfully!");
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message ||"Resend OTP Failed...")
    }
      
    setTimeout(() => setResendDisabled(false), 6000); // Disable resend for 60s
  };

  return (
    <div className="min-h-screen w-full   flex items-center justify-center bg-white">
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border border-grat-300"
    style={{ boxShadow: "gray 0px 0px 3px " }}>
      <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
      <p className="text-md text-gray-500 text-center mb-4 font-semibold">Enter the 6-digit OTP sent to <strong>{email}</strong></p>

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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {isVerifingIn ? "Verifying..." : "Verify OTP"}
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