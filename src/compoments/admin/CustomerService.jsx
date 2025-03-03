import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";


const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    product: "Laptop",
    problem: "Screen not working",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    product: "Smartphone",
    problem: "Battery issue",
    status: "Solved",
  },
  {
    id: 3,
    name: "Alice Brown",
    product: "Headphones",
    problem: "No sound",
    status: "Pending",
  },
  {
    id: 4,
    name: "Bob Johnson",
    product: "Air Purifier",
    problem: "Not turning on",
    status: "Solved",
  },
  {
    id: 5,
    name: "Charlie White",
    product: "Tablet",
    problem: "Screen cracked",
    status: "Pending",
  },
  {
    id: 6,
    name: "David Green",
    product: "Smartwatch",
    problem: "Not syncing",
    status: "Solved",
  },
  {
    id: 7,
    name: "Eve Black",
    product: "Speaker",
    problem: "No sound",
    status: "Pending",
  },
  {
    id: 8,
    name: "Frank Yellow",
    product: "Monitor",
    problem: "Dead pixels",
    status: "Solved",
  },
  {
    id: 9,
    name: "Grace Pink",
    product: "Keyboard",
    problem: "Keys not working",
    status: "Pending",
  },
  {
    id: 10,
    name: "Hank Blue",
    product: "Mouse",
    problem: "Double-click issue",
    status: "Solved",
  },
  {
    id: 11,
    name: "Ivy Red",
    product: "Printer",
    problem: "Not printing",
    status: "Pending",
  },
  {
    id: 12,
    name: "Jack Purple",
    product: "Router",
    problem: "No internet",
    status: "Solved",
  },
  {
    id: 13,
    name: "Kelly Orange",
    product: "TV",
    problem: "No display",
    status: "Pending",
  },
  {
    id: 14,
    name: "Leo Green",
    product: "Fan",
    problem: "Not rotating",
    status: "Solved",
  },
  {
    id: 15,
    name: "Mona Brown",
    product: "AC",
    problem: "Not cooling",
    status: "Pending",
  },
  {
    id: 16,
    name: "Nick White",
    product: "Refrigerator",
    problem: "Not freezing",
    status: "Solved",
  },
  {
    id: 17,
    name: "Olivia Black",
    product: "Microwave",
    problem: "Not heating",
    status: "Pending",
  },
  {
    id: 18,
    name: "Peter Blue",
    product: "Washing Machine",
    problem: "Not spinning",
    status: "Solved",
  },
  {
    id: 19,
    name: "Quinn Red",
    product: "Vacuum Cleaner",
    problem: "No suction",
    status: "Pending",
  },
  {
    id: 20,
    name: "Rachel Pink",
    product: "Iron",
    problem: "Not heating",
    status: "Solved",
  },
];

const CustomerService = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const statusOptions = ["Pending", "Solved"];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.problem &&
        customer.problem.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsViewing(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const handleStatusChange = (rowData, newStatus) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === rowData.id ? { ...customer, status: newStatus } : customer
      )
    );

    if (selectedCustomer && selectedCustomer.id === rowData.id) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus });
    }

    toast.success(`Status changed to ${newStatus}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleSave = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === selectedCustomer.id ? selectedCustomer : customer
      )
    );

    toast.success("Customer details updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setIsEditing(false);
    setSelectedCustomer(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsViewing(false);
    setSelectedCustomer(null);
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2 justify-center md:justify-start">
      <button
        onClick={() => handleView(rowData)}
        className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <i className="pi pi-eye mr-1"></i> View
      </button>
      <button
        onClick={() => handleEdit(rowData)}
        className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <i className="pi pi-pencil mr-1"></i> Edit
      </button>
    </div>
  );

  const statusBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center md:justify-start">
        {rowData.status === "Pending" ? (
          <button className="px-3 py-1 rounded-lg flex items-center justify-center bg-gray-500 text-white shadow-lg">
            <i className="pi pi-clock mr-1"></i> Pending
          </button>
        ) : (
          <button className="px-3 py-1 rounded-lg flex items-center justify-center bg-green-600 text-white shadow-lg">
            <i className="pi pi-check-circle mr-1"></i> Solved
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800 flex items-center">
          <i className="pi pi-comments mr-2 text-2xl"></i>
          Customer Service
        </h1>

        <div className="mb-3">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search px-2" />
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Product or Problem"
              className="w-full px-8 py-3 rounded-lg bg-white border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
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
            <Column field="id" header="ID" sortable style={{ width: "5%" }}></Column>
            <Column field="name" header="Name" sortable style={{ width: "20%" }}></Column>
            <Column field="product" header="Product" sortable style={{ width: "20%" }}></Column>
            <Column field="problem" header="Problem" style={{ width: "25%" }}></Column>
            <Column body={statusBodyTemplate} header="Status" style={{ width: "15%" }}></Column>
            <Column body={actionBodyTemplate} header="Actions" style={{ width: "15%" }}></Column>
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Product</label>
                <p className="p-3 border rounded-lg bg-indigo-50/50 border-indigo-100">{selectedCustomer.product}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Problem</label>
                <p className="p-3 border rounded-lg bg-indigo-50/50 border-indigo-100">{selectedCustomer.problem || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                <p className={`p-3 border rounded-lg flex items-center ${
                  selectedCustomer.status === "Solved" 
                    ? "bg-green-50 border-green-100 text-green-700" 
                    : "bg-yellow-50 border-yellow-100 text-yellow-700"
                }`}>
                  <i className={`pi ${selectedCustomer.status === "Solved" ? "pi-check-circle" : "pi-clock"} mr-2`}></i>
                  {selectedCustomer.status}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
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
                handleSave();
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Product</label>
                <InputText
                  value={selectedCustomer.product}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      product: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Problem</label>
                <InputText
                  value={selectedCustomer.problem}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      problem: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Status</label>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedCustomer, "Pending")}
                    className={`px-4 py-2 rounded-lg flex items-center justify-center flex-1 transition-all duration-300 ${
                      selectedCustomer.status === "Pending"
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <i className={`pi ${selectedCustomer.status === "Pending" ? "pi-clock" : "pi-circle"} mr-1`}></i> Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedCustomer, "Solved")}
                    className={`px-4 py-2 rounded-lg flex items-center justify-center flex-1 transition-all duration-300 ${
                      selectedCustomer.status === "Solved"
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    <i className={`pi ${selectedCustomer.status === "Solved" ? "pi-check-circle" : "pi-circle"} mr-1`}></i> Solved
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-check mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom styles for glass effect and animations */}
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
        
        /* Fix for pagination active page color */
        .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
          background: linear-gradient(to right, #6366f1, #a855f7) !important;
          color: white !important;
          border-color: transparent !important;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4) !important;
        }
        
        /* Enhanced hover states for paginator elements */
        .p-paginator .p-paginator-pages .p-paginator-page:not(.p-highlight):hover {
          background: rgba(99, 102, 241, 0.1) !important;
          color: #4f46e5 !important;
          transform: translateY(-1px);
          transition: all 0.2s;
        }
        
        /* Paginator navigation buttons styling */
        .p-paginator .p-paginator-first,
        .p-paginator .p-paginator-prev,
        .p-paginator .p-paginator-next,
        .p-paginator .p-paginator-last {
          color: #6366f1 !important;
        }
        
        .p-paginator .p-paginator-first:hover,
        .p-paginator .p-paginator-prev:hover,
        .p-paginator .p-paginator-next:hover,
        .p-paginator .p-paginator-last:hover {
          background: rgba(99, 102, 241, 0.1) !important;
          transform: translateY(-1px);
          transition: all 0.2s;
        }
        
        /* Disabled navigation buttons */
        .p-paginator .p-paginator-first.p-disabled,
        .p-paginator .p-paginator-prev.p-disabled,
        .p-paginator .p-paginator-next.p-disabled,
        .p-paginator .p-paginator-last.p-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  );
};

export default CustomerService;