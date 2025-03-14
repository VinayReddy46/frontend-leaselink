import React, { useState } from 'react';
import { FaBell, FaRegSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const ProfileSettings = () => {
const {userInfo} = useSelector((state) => state.auth);
console.log(userInfo)
  const [formData, setFormData] = useState({
    enableNotifications: false,
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your settings have been updated successfully!');
    console.log('Form submitted:', formData);
  };



  return (
    <div className="min-h-screen transition-all duration-300 mt-24">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-5 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 transition-colors duration-300">
            Account Settings
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 transition-all duration-300">
            <form className="p-4 sm:p-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
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
                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-lg transition-transform duration-300 transform ${formData.enableNotifications ? 'translate-x-6' : ""}`}></div>
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
    </div>
  );
};

export default ProfileSettings;