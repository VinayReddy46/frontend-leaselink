import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const initialProducts = [
  { id: 1, name: "Laptop & Desktop", description: "High-performance laptops and desktops for work and gaming." },
  { id: 2, name: "TV & Monitors", description: "Smart TVs and monitors for entertainment and professional use." },
  { id: 3, name: "Air Purifier / Cooler", description: "Stay cool and breathe fresh with air purifiers and coolers." },
  { id: 4, name: "Smartphones", description: "Latest smartphones with advanced features and high-speed performance." },
  { id: 5, name: "Headphones & Earbuds", description: "Noise-canceling headphones and high-quality earbuds for immersive sound." },
  { id: 6, name: "Gaming Consoles", description: "Experience next-gen gaming with the latest gaming consoles." },
  { id: 7, name: "Smart Home Devices", description: "Upgrade your home with smart lighting, security, and automation devices." },
  { id: 8, name: "Cameras & Accessories", description: "Capture stunning moments with professional cameras and accessories." },
  { id: 9, name: "Wearable Technology", description: "Smartwatches, fitness trackers, and wearable health monitoring devices." },
  { id: 10, name: "Kitchen Appliances", description: "Smart kitchen appliances for easy and efficient cooking." },
  { id: 11, name: "Printers & Scanners", description: "Reliable printers and scanners for home and office use." },
  { id: 12, name: "Car Accessories", description: "Essential car gadgets and accessories for a better driving experience." }
];

const CategoryList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setShowEditModal(true);
  };

  const handleSave = () => {
    if (editProduct) {
      setProducts(products.map((p) => (p.id === editProduct.id ? editProduct : p)));
      setShowEditModal(false);
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleAdd = () => {
    if (newProduct.name && newProduct.description) {
      const newEntry = {
        id: products.length + 1,
        name: newProduct.name,
        description: newProduct.description,
      };
      setProducts([...products, newEntry]);
      setNewProduct({ name: "", description: "" });
      setShowAddModal(false);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2 justify-center md:justify-start">
        <button
          onClick={() => handleEdit(rowData)}
          className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="pi pi-pencil mr-1"></i> Edit
        </button>
        <button
          onClick={() => handleDelete(rowData.id)}
          className="flex items-center bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <i className="pi pi-trash mr-1"></i> Delete
        </button>
      </div>
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          <i className="pi pi-th-large mr-2 text-xl"></i>
          Product Categories
        </h1>

        <div className="mb-6 flex gap-4">
          <span className="p-input-icon-left w-full">
            
            <InputText
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Product Name"
              className="w-full px-3 py-2 rounded-lg  bg-white border-2 bordergray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
            />
          </span>
           <button
            onClick={setShowAddModal}
            className="min-w-52 md:w-auto px-4 bg-blue-500 text-white rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <i className="pi pi-plus mr-2"></i> Add Category
          </button>
        </div>

        <div className="card rounded-lg bg-white border-2 border-gray-200 overflow-hidden">
          <DataTable
            value={filteredProducts}
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
            <Column field="description" header="Description" sortable></Column>
            <Column
              body={actionBodyTemplate}
              header="Actions"
              style={{ width: "20%" }}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 border border-white/50 backdrop-blur-md p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-pencil mr-2"></i> Edit Product
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
                <InputText
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <InputText
                  value={editProduct.description}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full p-3 border rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-check mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg w-full max-w-md transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-pencil mr-2"></i> Add  Category
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
                <InputText
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <InputText
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter Product Description"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-check mr-2"></i> Add
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

export default CategoryList;