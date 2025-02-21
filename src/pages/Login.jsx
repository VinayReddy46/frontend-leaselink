import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            toast.success("Login Successful! Welcome back!");
            navigate("/");
        } catch (err) {
            // console.log(err)
            toast.error(" err message");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full   flex items-center justify-center bg-gray-600">
            <div className="max-w-md w-full rounded-lg p-6  bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20  ">
                <h1 className=" text-3xl font-semibold text-white text-center mb-6">
                    LogIn
                </h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-white rounded-full ">
                            <div className="flex items-center  rounded-full mt-1">
                                <span className="px-3">
                                    <FaUser />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-full px-3 py-2 focus:outline-none text-black"
                                    placeholder="Email Address"
                                />
                            </div>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">
                            <div className="flex items-center  rounded-full mt-1 ">
                                <span className="px-3">
                                    <FaLock />
                                </span>
                                <input
                                    type={show ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    // minLength={8}
                                    className="w-full px-3 py-2 rounded-full focus:outline-none text-black"
                                    placeholder="Password"
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
                    <div className="mb-4 text-center">

                    
                    <Link
                        to={"/forgot-password"}
                        className="no-underline text-blue-700 font-semibold"
                    >
                        Forgot password?
                    </Link>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <button
                            type="submit"
                            className="bg-blue-600 w-full text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 w-full text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                            onClick={() => {
                                setEmail("");
                                setPassword("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="w-full mt-2 text-end">
                    <span className="text-white">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-700 font-semibold"
                        >
                            Register
                        </Link>{" "}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
