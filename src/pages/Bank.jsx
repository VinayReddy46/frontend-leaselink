
import React, { useState, useEffect } from "react";
import { Building2, CreditCard, User, MapPin, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api/bank-details";

// UK Banks List for Dropdown
const UK_BANKS = [
  { name: "Barclays Bank", address: "1 Churchill Place, London E14 5HP" },
  { name: "HSBC UK", address: "8 Canada Square, London E14 5HQ" },
  { name: "Lloyds Bank", address: "25 Gresham Street, London EC2V 7HN" },
  { name: "NatWest", address: "250 Bishopsgate, London EC2M 4AA" },
  { name: "Santander UK", address: "2 Triton Square, London NW1 3AN" },
  { name: "Royal Bank of Scotland", address: "36 St Andrew Square, Edinburgh EH2 2YB" },
];


function Bank() {
  const [bankDetails, setBankDetails] = useState([]);
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    sortCode: "",
    bankName: "",
    bankAddress: "",
  });
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-bank-details`);
      setBankDetails(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch bank details");
      console.error("Fetch Error:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.bankName || !formData.bankAddress) {
        toast.error("Please select a bank name and ensure bank address is filled.");
        return;
      }

      if (editingId) {
        await axios.put(`${API_URL}/update-bank-details/${editingId}`, formData);
        toast.success("Bank details updated successfully");
      } else {
        await axios.post(`${API_URL}/add-bank-details`, formData);
        toast.success("Bank details added successfully");
      }

      setFormData({ accountHolderName: "", accountNumber: "", sortCode: "", bankName: "", bankAddress: "" });
      setEditingId(null);
      fetchBankDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Submit Error:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete-bank-details/${id}`);
      toast.success("Bank details deleted successfully");
      fetchBankDetails();
    } catch (error) {
      toast.error("Failed to delete bank details");
      console.error(" Delete Error:", error.response?.data || error.message);
    }
  };

  const handleEdit = (details) => {
    setFormData(details);
    setEditingId(details._id);
    toast.success("Edit mode activated");
  };

  const handleBankSelect = (bank) => {
    if (bank) {
      setFormData((prev) => ({
        ...prev,
        bankName: bank.name,
        bankAddress: bank.address,
      }));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">UK Bank Details Management</h1>
          </div>

          {/* ✅ Form to Add/Update Bank Details */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 flex items-center"><User className="mr-2" /> Account Holder Name</span>
                  <input
                    type="text"
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 flex items-center"><CreditCard className="mr-2" /> Account Number</span>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    pattern="\d{8}"
                    title="Account number must be 8 digits"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </label>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 flex items-center"><Building2 className="mr-2" /> Sort Code</span>
                  <input
                    type="text"
                    value={formData.sortCode}
                    onChange={(e) => setFormData({ ...formData, sortCode: e.target.value })}
                    pattern="\d{2}-\d{2}-\d{2}"
                    title="Sort code must be in format XX-XX-XX"
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 flex items-center"><Building2 className="mr-2" /> Bank Name</span>
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleBankSelect(UK_BANKS.find((bank) => bank.name === e.target.value))}
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a bank</option>
                    {UK_BANKS.map((bank) => (
                      <option key={bank.name} value={bank.name}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-gray-700 flex items-center"><MapPin className="mr-2" /> Bank Address</span>
                  <input
                    type="text"
                    value={formData.bankAddress}
                    onChange={(e) => setFormData({ ...formData, bankAddress: e.target.value })}
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md">
              {editingId ? "Update Bank Details" : "Add Bank Details"}
            </button>
          </form>

          {/* ✅ Table with Edit & Delete Buttons */}
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Account Holder</th>
                <th className="border p-3">Account Details</th>
                <th className="border p-3">Bank Info</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bankDetails.map((bank) => (
                <tr key={bank._id} className="border">
                  <td className="p-3">{bank.accountHolderName}</td>
                  <td className="p-3">{bank.accountNumber} - {bank.sortCode}</td>
                  <td className="p-3">{bank.bankName} ({bank.bankAddress})</td>
                  <td className="p-3 flex space-x-2">
                    <button onClick={() => handleEdit(bank)} className="text-yellow-500 flex items-center"><Pencil className="mr-1" /> Edit</button>
                    <button onClick={() => handleDelete(bank._id)} className="text-red-500 flex items-center"><Trash2 className="mr-1" /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default Bank;

            