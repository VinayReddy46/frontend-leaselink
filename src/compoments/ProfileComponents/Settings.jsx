import React from 'react';

const Settings = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Update Profile Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Update Profile Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="First Name" className="p-3 border rounded-lg w-full" />
          <input type="text" placeholder="Last Name" className="p-3 border rounded-lg w-full" />
          <input type="email" placeholder="Email" className="p-3 border rounded-lg w-full col-span-2" />
          <input type="text" placeholder="Phone" className="p-3 border rounded-lg w-full col-span-2" />
          <input type="text" placeholder="Address" className="p-3 border rounded-lg w-full col-span-2" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          Update Profile Info
          <span role="img" aria-label="user">👤</span>
        </button>
      </div>

      {/* Change Password */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="grid gap-4">
          <input type="password" placeholder="Old Password" className="p-3 border rounded-lg w-full" />
          <input type="password" placeholder="New Password" className="p-3 border rounded-lg w-full" />
          <input type="password" placeholder="Re-Type Password" className="p-3 border rounded-lg w-full" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          Change Password
          <span role="img" aria-label="key">🔑</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
