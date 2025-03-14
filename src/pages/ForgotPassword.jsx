import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../redux/services/authSlice";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [forgot, {isLoading:forgotLoading}] =useForgotPasswordMutation()

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("email", email);
    await forgot({email});

    // Simulating API call
    setTimeout(() => {
      toast.success("Password reset link sent to your email!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mt-2">Forgot Password?</h2>
          <p className="text-gray-500 text-sm">Enter your email to receive reset instructions.</p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300">
              <div className="flex items-center mt-1 px-3">
                <FaEnvelope className="text-gray-700" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 focus:outline-none text-black"
                  placeholder="Email Address"
                />
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            disabled={forgotLoading}
          >
            {forgotLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sky-500 text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;