import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import logo from "../assets/logoForPages.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.success("Login Successful! Welcome back!");
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full   flex items-center justify-center bg-white">
      <div
        className="max-w-sm  w-full rounded-lg p-6  border border-gray-300"
        style={{ boxShadow: "gray 0px 0px 3px " }}
      >
        <div className="text-center flex align-center justify-center mb-3">
          <img src={logo} alt="logo-image" className="img-logo h-14" />
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300 ">
              <div className="flex items-center  mt-1">
                <span className="px-3 text-gray-700">
                  <FaUser />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounde-md px-3 py-2 focus:outline-none text-black"
                  placeholder="Email Address"
                />
              </div>
            </label>
          </div>
          <div className="mb-4 rounded-md bg-white border border-gray-300">
            <label className="block text-white">
              <div className="flex items-center  rounded-full mt-1 ">
                <span className="px-3 text-gray-700">
                  <FaLock />
                </span>
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 rounded-full focus:outline-none text-black"
                  placeholder="Password"
                />
                <div className="me-4">
                  {show ? (
                    <FaEye
                      className=" text-gray-600 cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-600 cursor-pointer"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </div>
              </div>
            </label>
          </div>
          <div className="mb-4 text-center">
            <Link
              to={"/forgot-password"}
              className="no-underline text-sky-500 "
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <div className="w-full mt-2 flex flex-col items-center">
          <div className="text-gray-500 mb-5">or</div>
          <Link to="/signup" className="text-black ">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;