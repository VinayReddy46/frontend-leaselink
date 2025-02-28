import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const UserManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1,  name: "John Doe",addedProducts:23, joined: "2023-10-01",  status: "Active" },
    { id: 2, name: "Jane Smith",addedProducts:3,joined: "2023-09-15",  status: "Active" },
    { id: 3, name:  "Alice Johnson",addedProducts:17,joined: "2023-11-01",  status: "Blocked" },
    { id: 4, name: "Bob Brown",addedProducts:28,joined: "2023-12-01",  status: "Active" },
    { id: 5, name:  "Charlie Davis",addedProducts:103,joined: "2023-11-15",  status: "Blocked" },
    { id: 6, name: "Eve White",addedProducts:85,joined: "2023-10-15",  status: "Active" },
    { id: 7, name: "Frank Green",addedProducts:14,joined: "2023-09-01",  status: "Blocked" },
    { id: 8, name: "Grace Hall",addedProducts:39,joined: "2023-08-15",  status: "Active" },
    { id: 9, name: "Hank Hill",addedProducts:53,joined: "2023-07-01",  status: "Blocked" },
    { id: 10, name: "Ivy Lane",addedProducts:8,joined: "2023-06-15",  status: "Active" },
    { id: 11, name:  "Jack King",addedProducts:113,joined: "2023-05-01",  status: "Blocked" },
    { id: 12, name:  "Karen Lee",addedProducts:72,joined: "2023-04-15",  status: "Active" },
    { id: 13, name: "Leo Martinez",addedProducts:33,joined: "2023-03-01",  status: "Blocked" },
    { id: 14, name:  "Mona Patel",addedProducts:59,joined: "2023-02-15",  status: "Active" },
    { id: 15, name: "Nina Rao",addedProducts:42,joined: "2023-01-01",  status: "Blocked" },
  ]);

  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  const handleView = (rowData) => {
    setSelectedCustomer(rowData);
    setIsViewing(true);
  };

  const handleEdit = (rowData) => {
    setSelectedCustomer(rowData);
    setIsEditing(true);
  };

  const handleSave = (updatedCustomer) => {
    setCustomers(customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setIsEditing(false);
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsViewing(false);
    setSelectedCustomer(null);
  };

  const handleStatusChange = (rowData, newStatus) => {
    setCustomers(customers.map((customer) =>
      customer.id === rowData.id ? { ...customer, status: newStatus } : customer
    ));
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex  items-center gap-2">
        <button
          onClick={() => handleView(rowData)}
          className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <i className="pi pi-eye mr-1"></i> View
        </button>
        <button
          onClick={() => handleEdit(rowData)}
          className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded-lg transform hover:scale-105 transition-all duration-300"
        >
          <i className="pi pi-pencil mr-1"></i> Edit
        </button>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-center md:justify-start">
        <button
          onClick={() => handleStatusChange(rowData, "Active")}
          className={`px-3 py-1 rounded-lg flex items-center justify-center transition-all duration-300 ${
            rowData.status === "Active"
              ? "bg-green-500 text-white "
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <i className={`pi ${rowData.status === "Active" ? "pi-check-circle" : "pi-circle"} mr-1`}></i> Active
        </button>
        <button
          onClick={() => handleStatusChange(rowData, "Blocked")}
          className={`px-3 py-1 rounded-lg flex items-center justify-center transition-all duration-300 ${
            rowData.status === "Blocked"
              ? "bg-red-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <i className={`pi ${rowData.status === "Blocked" ? "pi-ban" : "pi-circle"} mr-1`}></i> Block
        </button>
      </div>
    );
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase()) 
  );

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto ">
       
        <h1 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center ">
        <i className="pi pi-users mr-2 text-xl"></i>
          User Management
        </h1>
        
        <div className="mb-6 relative">
          <span className="p-input-icon-left w-full">
            <InputText
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by Product Name or Buyer"
              className="w-full p-3 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
            />
          </span>
        </div>
        
        <div className="card rounded-lg backdrop-blur-sm bg-white/60 border-2 border-gray-300 shadow-xl overflow-hidden">
          <DataTable
            value={filteredCustomers}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 15, 20]}
            tableStyle={{ minWidth: "100%" }}
            responsiveLayout="stack"
            breakpoint="960px"
            rowHover
            className="custom-datatable"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="addedProducts" header="Added Products" sortable></Column>
            <Column field="joined" header="Joined At" sortable></Column>
  
            <Column
              body={statusBodyTemplate}
              header="Status"
              style={{ width: "20%" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              header="Actions"
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* View Modal */}
      {isViewing && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 border border-white/50 backdrop-blur-md p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-info-circle mr-2"></i> Customer Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                <p className="p-3 border rounded-lg bg-indigo-50/50 border-indigo-100">{selectedCustomer.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Joined at</label>
                <p className="p-3 border rounded-lg bg-indigo-50/50 border-indigo-100">{selectedCustomer.joined}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                <p className={`p-3 border rounded-lg flex items-center ${
                  selectedCustomer.status === "Active" 
                    ? "bg-green-50 border-green-100 text-green-700" 
                    : "bg-red-50 border-red-100 text-red-700"
                }`}>
                  <i className={`pi ${selectedCustomer.status === "Active" ? "pi-check-circle" : "pi-ban"} mr-2`}></i>
                  {selectedCustomer.status}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center transform hover:scale-105 transition-all duration-300"
              >
                <i className="pi pi-times mr-2"></i> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 border border-white/50 backdrop-blur-md p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-pencil mr-2"></i> Edit Customer
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(selectedCustomer);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                <InputText
                  value={selectedCustomer.name}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Added Products</label>
                <InputText
                  value={selectedCustomer.addedProducts}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      addedProducts: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Joined at</label>
                <InputText
                  value={selectedCustomer.joined}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                    joined: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-check mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add custom styles for glass effect and animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .custom-datatable .p-datatable-header,
        .custom-datatable .p-datatable-thead > tr > th {
          background: rgba(255, 255, 255, 0.6) !important;
          backdrop-filter: blur(8px) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .custom-datatable .p-datatable-tbody > tr {
          background: rgba(255, 255, 255, 0.4) !important;
          transition: all 0.2s ease-in-out !important;
        }
        .custom-datatable .p-datatable-tbody > tr:hover {
          background: rgba(245, 245, 255, 0.7) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05) !important;
        }
        .custom-datatable .p-paginator {
          background: rgba(255, 255, 255, 0.4) !important;
          backdrop-filter: blur(8px) !important;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;