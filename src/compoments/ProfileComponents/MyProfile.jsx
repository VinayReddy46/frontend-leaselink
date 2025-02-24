import React from "react";
const MyProfile = () => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h3 className="text-xl font-semibold mb-3">Profile Info</h3>
      <hr className="mb-4" />

      <div className="grid gap-4">
        <div className="flex justify-between">
          <strong className="text-gray-600">Full Name</strong>
          <span>Antoni Jonson</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Email</strong>
          <span>jonson@example.com</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Phone</strong>
          <span>+2 134 562 458</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Address</strong>
          <span>New York, USA</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Join Date</strong>
          <span>17 March, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
