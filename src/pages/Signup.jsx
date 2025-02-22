import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope,FaEye,FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
                <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                    Register
                </h2>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4">
                        <label className="block text-white rounded-full ">
                            <div className="flex items-center rounded-full mt-1">
                                <span className="px-3">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-full px-3 py-2 focus:outline-none text-black"
                                    required
                                />
                            </div>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white rounded-full ">
                            <div className="flex items-center  rounded-full mt-1">
                                <span className="px-3">
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
                        <label className="block text-white rounded">
                        <div className="flex items-center  rounded-full mt-1 ">
                        <span className="px-3">
                                    <FaEnvelope />
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
                        <label className="block text-white rounded-full ">
                            <div className="flex items-center  rounded-full mt-1">
                                <span className="px-3">
                                    <FaLock />
                                </span>
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full rounded-full px-3 py-2 focus:outline-none text-black"
                                    required
                                />
                                {show ? (
                                <FaEye
                                    className="absolute right-12 text-gray-600 cursor-pointer"
                                    onClick={() => setShow(!show)}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="absolute right-12 text-gray-600 cursor-pointer"
                                    onClick={() => setShow(!show)}
                                />
                            )}
                            </div>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white rounded-full ">
                            <div className="flex items-center rounded-full mt-1">
                                <span className="px-3">
                                    <FaLock />
                                </span>
                                <input
                                    type={show1 ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="w-full rounded-full px-3 py-2 focus:outline-none text-black "
                                    required
                                />
                                {show1 ? (
                                <FaEye
                                    className="absolute right-12 text-gray-600 cursor-pointer"
                                    onClick={() => setShow1(!show1)}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="absolute right-12 text-gray-600 cursor-pointer"
                                    onClick={() => setShow1(!show1)}
                                />
                            )}

                            </div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white  py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Signup"}
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 w-full text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                            onClick={() => {
                                setEmail("");
                                setPassword("");
                                setName("")
                                setConfirmPassword('')
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="w-full mt-2 text-end">
                    <span className="text-white">
                    Already have an account?{" "}
                        <Link to="/login" className="text-blue-700 font-semibold">
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
