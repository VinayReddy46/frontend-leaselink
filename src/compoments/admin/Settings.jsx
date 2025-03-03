import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaSave, FaCheckCircle, FaExclamationCircle, FaBell, FaRegUser, FaRegSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { CiLock } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';

const Settings = () => {
  const [formData, setFormData] = useState({
    profileName: 'Raju',
    email: 'raju@samplegmail.com',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    enableNotifications: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setIsSuccess(false);

    if (!formData.profileName.trim()) {
      setError('Profile name is required');
      toast.error('Profile name is required');
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSuccess(true);
    toast.success('Your settings have been updated successfully!');
    console.log('Form submitted:', formData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.success('Password updated successfully!');
    setIsPasswordModalOpen(false);
    console.log('Password updated:', formData);
  };

  return (
    <div className="min-h-screen transition-all duration-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-5 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 transition-colors duration-300">
            Account Settings
          </h1>
          <p className="mt-2 text-indigo-600 text-sm sm:text-base transition-colors duration-300">
            Manage your profile information and security preferences
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 transition-all duration-300">
            <div className=" px-6 pt-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Personal Information</h2>
            </div>

            <form className="p-4 sm:p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-900 transition-colors duration-300">
                      <FaRegUser className="h-5 w-5" />
                    </div>
                    <input
                      id="profileName"
                      name="profileName"
                      type="text"
                      value={formData.profileName}
                      onChange={handleChange}
                      className="w-full p-3 ps-10 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:border-indigo-300"
                      placeholder="Profile Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-900 transition-colors duration-300">
                      <MdOutlineEmail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 ps-10 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:border-indigo-300"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="relative">
                    <div className="relative flex items-center">
                      <div className="flex items-center">
                        <label htmlFor="enableNotifications" className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              id="enableNotifications"
                              name="enableNotifications"
                              type="checkbox"
                              checked={formData.enableNotifications}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`w-12 h-6 bg-gray-200  rounded-full transition-colors duration-300 ${formData.enableNotifications ? 'bg-indigo-500 ' : ''}`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-lg transition-transform duration-300 transform ${formData.enableNotifications ? 'translate-x-6' : ''}`}></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaBell className={`h-5 w-5 text-yellow-500 transition-colors duration-300`} />
                            <span className="text-base text-indigo-700  transition-colors duration-300 group-hover:text-indigo-800 ">
                              Enable Notifications
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className=" flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <MdOutlineLock className="mr-2 h-5 w-5" />
                  Update Password
                </button>

                <button
                  type="submit"
                  className=" flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <FaRegSave className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-sm text-center sm:text-left text-indigo-600  transition-colors duration-300">
            <p>Your information is securely stored and encrypted. We will never share your data with third parties.</p>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-white-900/50 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 p-4">
          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 w-full max-w-md transition-all duration-300">
            <div className=" px-6 pt-5  transition-colors duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Update Password</h2>
            </div>
            <form className="p-6 sm:p-8" onSubmit={handlePasswordChange}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-indigo-700 transition-colors duration-300">
                    Current Password
                  </label>
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-700 transition-colors duration-300">
                      <MdOutlineLock className="h-5 w-5" />
                    </div>
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      className="pl-10 py-3 block w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500  focus:outline-none text-base transition-all duration-300 hover:border-indigo-300"
                      placeholder="Enter your current password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-indigo-700  transition-colors duration-300">
                    New Password
                  </label>
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-700 transition-colors duration-300">
                      <MdOutlineLock className="h-5 w-5" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 py-3 block w-full rounded-lg border-gray-200 focus:ring-2  focus:ring-indigo-500 focus:outline-none text-base transition-all duration-300 hover:border-indigo-300"
                      placeholder="Enter your new password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-indigo-700 transition-colors duration-300">
                    Confirm New Password
                  </label>
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-600  transition-colors duration-300">
                      <MdOutlineLock className="h-5 w-5" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 py-3 block w-full rounded-lg border-gray-200 focus:ring-2  focus:ring-indigo-500 focus:outline-none text-base transition-all duration-300 hover:border-indigo-300"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  <IoMdClose className="mr-2 h-4 w-4"/>
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" flex items-center justify-center px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                >
                  <FaRegSave className="mr-2 h-4 w-4" />
                  Save 
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;