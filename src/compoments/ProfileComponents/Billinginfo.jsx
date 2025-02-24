import React from 'react';

const BillingInfo = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Billing Info</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input type="text" placeholder="First Name" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input type="text" placeholder="Last Name" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="text" placeholder="Phone" className="w-full p-2 border rounded-md" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Address</label>
          <input type="text" placeholder="Address" className="w-full p-2 border rounded-md" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Address 2</label>
          <input type="text" placeholder="Address 2" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input type="text" placeholder="City" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input type="text" placeholder="State" className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium">Zip</label>
          <input type="text" placeholder="Zip" className="w-full p-2 border rounded-md" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
            Save Billing Info
            <span className="material-icons">save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingInfo;