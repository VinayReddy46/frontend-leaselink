import React, { useState, useEffect } from "react";
import { Building2, CreditCard, User, MapPin, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useGetBanksQuery, useCreateBankMutation, useUpdateBankMutation, useDeleteBankMutation } from "../redux/services/bankSlice";
import { useSelector } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-toastify/dist/ReactToastify.css';

const UK_BANKS = [
  { name: "Barclays Bank", address: "1 Churchill Place, London E14 5HP" },
  { name: "HSBC UK", address: "8 Canada Square, London E14 5HQ" },
  { name: "Lloyds Bank", address: "25 Gresham Street, London EC2V 7HN" },
  { name: "NatWest", address: "250 Bishopsgate, London EC2M 4AA" },
  { name: "Santander UK", address: "2 Triton Square, London NW1 3AN" },
  { name: "Royal Bank of Scotland", address: "36 St Andrew Square, Edinburgh EH2 2YB" },
];

function Bank() {
  const { userInfo } = useSelector(store => store.auth);

  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    sortCode: "",
    bankName: "",
    bankAddress: "",
  });
  const [editingId, setEditingId] = useState(null);

  const { data: bankDetails = [], refetch } = useGetBanksQuery(userInfo.id);
  const [createBank] = useCreateBankMutation();
  const [updateBank] = useUpdateBankMutation();
  const [deleteBank] = useDeleteBankMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.bankName || !formData.bankAddress) {
        toast.error("Please select a bank name and ensure bank address is filled.");
        return;
      }

      if (editingId) {
        await updateBank({ id: editingId, ...formData }).unwrap();
        toast.success("Bank details updated successfully");
      } else {
        await createBank({ userId: userInfo.id, ...formData }).unwrap();
        toast.success("Bank details added successfully");
      }

      setFormData({ accountHolderName: "", accountNumber: "", sortCode: "", bankName: "", bankAddress: "" });
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "An error occurred");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      try {
        await deleteBank(id).unwrap();
        toast.success("Bank details deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete bank details");
      }
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex space-x-2">
        <button onClick={() => handleEdit(rowData)} className="bg-yellow-500 text-white p-2 rounded-lg flex items-center"><Pencil className="mr-1" size={18} /> Edit</button>
        <button onClick={() => handleDelete(rowData._id)} className="bg-red-500 text-white p-2 rounded-lg flex items-center"><Trash2 className="mr-1" size={18}/> Delete</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">UK Bank Details Management</h1>
        </div>

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

        <DataTable value={bankDetails} className="p-datatable-sm">
          <Column field="accountHolderName" header="Account Holder" />
          <Column field="accountNumber" header="Account Details" body={(rowData) => `${rowData.accountNumber} - ${rowData.sortCode}`} />
          <Column field="bankName" header="Bank Info" body={(rowData) => `${rowData.bankName} (${rowData.bankAddress})`} />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}

export default Bank;