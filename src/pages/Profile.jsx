import React, { useState, useEffect, use } from 'react';
import { FaRegUser, FaRegSave, FaPhoneAlt, FaCalendar, FaRegCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { IoMdClose, IoMdPhonePortrait } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdatePassordMutation, useUpdateProfileMutation } from '../redux/services/userSlice';
import { setCredentials } from '../redux/features/authSlice';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePassordMutation();

  const [formData, setFormData] = useState({
    name: userInfo.name ||  userInfo?.user?.name || "",
    phone_number: userInfo.phone_number ||  userInfo?.user?.phone_number || "",
    avatar: userInfo.avatar ||  userInfo?.user?.avatar || "",
    dateOfBirth: userInfo.dateOfBirth ||  userInfo?.user?.dateOfBirth || "",
    password: '',
    confirmPassword: '',
    oldPassword: '',
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(userInfo.avatar ||  userInfo?.user?.avatar || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      dispatch(setCredentials(res.data));
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await updatePassword({ oldPassword: formData.oldPassword, password: formData.password }).unwrap();
      setIsPasswordModalOpen(false);
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="min-h-screen transition-all duration-300 mt-24">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-5 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 transition-colors duration-300">
            Profile
          </h1>
          <p className="mt-2 text-indigo-600 text-sm sm:text-base transition-colors duration-300">
            Manage your profile information and security preferences
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 transition-all duration-300">
            <div className="px-6 pt-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">Personal Information</h2>
            </div>

            <form className="p-4 sm:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  id="avatarInput"
                />
                <label
                  htmlFor="avatarInput"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                >
                  Change Avatar
                </label>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-900 transition-colors duration-300">
                      <FaRegUser className="h-5 w-5" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 ps-10 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:border-indigo-300"
                      placeholder="Profile Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-900 transition-colors duration-300">
                      <IoMdPhonePortrait className="h-5 w-5" />
                    </div>
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="text"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full p-3 ps-10 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:border-indigo-300"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative rounded-lg border-2 border-gray-200">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-indigo-900 transition-colors duration-300">
                      <FaRegCalendarAlt className="h-5 w-5" />
                    </div>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full p-3 ps-10 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:border-indigo-300"
                      placeholder="Date of Birth"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex-column md:flex justify-center space-y-4 sm:space-y-0 sm:space-x-4 ">
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
                  className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <FaRegSave className="mr-2 h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
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

export default Profile;