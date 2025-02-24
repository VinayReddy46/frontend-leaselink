import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaUsb } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logoForPages.webp";
import { HiUsers } from "react-icons/hi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Lender");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(name, email, password);
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    toast.success("OTP send to email");
    navigate(`/verification?email=${email}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg  max-w-sm  border border-gray-300" style={{ boxShadow: "gray 0px 0px 3px " }}>
        <div className="text-center flex align-center justify-center mb-3">
          <img src={logo} alt="logo-image" className="img-logo h-14" />
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300  ">
              <div className="flex items-center  mt-1">
                <span className="px-3 text-gray-700">
                  <FaUser />
                </span>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md px-3 py-2 focus:outline-none text-black"
                  required
                />
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300 ">
              <div className="flex items-center  rounded-full mt-1">
                <span className="px-3 text-gray-700">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full px-3 py-2 focus:outline-none text-black"
                  required
                />
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300">
              <div className="flex items-center mt-1 ">
                <span className="px-3 text-gray-700">
                  <HiUsers />
                </span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-full px-2   py-2 focus:outline-none text-gray-400"
                  required
                >
                  <option value="Lender">Lender</option>
                  <option value="Renter">Renter</option>
                </select>
              </div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300 ">
              <div className="flex items-center  rounded-full mt-1">
                <span className="px-3 text-gray-700">
                  <FaLock />
                </span>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full px-3 py-2 focus:outline-none text-black"
                  required
                  minLength={8}
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
          <div className="mb-4">
            <label className="block rounded-md bg-white border border-gray-300 ">
              <div className="flex items-center rounded-full mt-1">
                <span className="px-3 text-gray-700">
                  <FaLock />
                </span>
                <input
                  type={show1 ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-full px-3 py-2 focus:outline-none text-black "
                  required
                  minLength={8}
                />
               <div className="me-4">
                  {show1 ? (
                    <FaEye
                      className=" text-gray-600 cursor-pointer"
                      onClick={() => setShow1(!show1)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="text-gray-600 cursor-pointer"
                      onClick={() => setShow1(!show1)}
                    />
                  )}
                </div>
              </div>
            </label>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white  py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Signup"}
            </button>
          </div>
        </form>
        <div className="w-full mt-2 flex flex-col items-center">
          <div className="text-gray-500 mb-5">or</div>
          <Link to="/login" className=" text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;