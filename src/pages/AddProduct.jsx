import React, { useState, useEffect } from "react";
import { FiUpload, FiAlertCircle } from "react-icons/fi";
import { MdOutlineDelete, MdEdit, MdCheckCircle } from "react-icons/md";

// Reusable Input Component
const Input = ({ label, type, value, onChange, error, placeholder, name, min, step }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
      } rounded-md focus:outline-none focus:ring-2 transition-colors`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-600 flex items-center">
        <FiAlertCircle className="mr-1" /> {error}
      </p>
    )}
  </div>
);

// Reusable Insurance Plan Table Component
const InsurancePlanTable = ({ plans, onEdit, onDelete }) => (
  <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {plans.map((plan, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm">{plan.name}</td>
            <td className="px-4 py-3 text-sm">{plan.description}</td>
            <td className="px-4 py-3 text-sm">${Number(plan.price).toFixed(2)}</td>
            <td className="px-4 py-3 text-sm">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(index)}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                >
                  <MdEdit className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors"
                >
                  <MdOutlineDelete className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AddProduct = () => {
  // State for product details
  const [images, setImages] = useState(Array(4).fill(null));
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    isBestseller: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // State for insurance plans
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [insuranceForm, setInsuranceForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [insuranceFormErrors, setInsuranceFormErrors] = useState({});

  // Predefined insurance plans
  const predefinedInsurancePlans = [
    { name: "Basic", description: "Basic Protection", price: "10" },
    { name: "Gold", description: "Gold Coverage", price: "20" },
    { name: "Full", description: "Full Coverage", price: "30" },
  ];

  // Handle image upload
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = { file, preview: URL.createObjectURL(file) };
      setImages(newImages);
    }
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    if (newImages[index]?.preview) URL.revokeObjectURL(newImages[index].preview);
    newImages[index] = null;
    setImages(newImages);
  };

  // Handle adding/editing insurance plans
  const handleAddInsurancePlan = () => {
    const errors = {};
    if (!insuranceForm.name.trim()) errors.name = "Name is required";
    if (!insuranceForm.description.trim()) errors.description = "Description is required";
    if (!insuranceForm.price || Number(insuranceForm.price) <= 0) errors.price = "Valid price is required";

    if (Object.keys(errors).length > 0) {
      setInsuranceFormErrors(errors);
      return;
    }

    const newPlan = { ...insuranceForm };
    if (editIndex !== null) {
      const updatedPlans = [...insurancePlans];
      updatedPlans[editIndex] = newPlan;
      setInsurancePlans(updatedPlans);
    } else {
      setInsurancePlans([...insurancePlans, newPlan]);
    }

    setShowInsuranceForm(false);
    setInsuranceForm({ name: "", description: "", price: "" });
    setEditIndex(null);
    setInsuranceFormErrors({});
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const errors = {};
    if (!product.name.trim()) errors.name = "Product name is required";
    if (!product.description.trim()) errors.description = "Description is required";
    if (!product.price || Number(product.price) <= 0) errors.price = "Valid price is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.quantity || Number(product.quantity) <= 0) errors.quantity = "Valid quantity is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log({ ...product, images: images.filter((img) => img !== null), insurancePlans });
    setSubmitSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-16 sm:mt-28">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Add New Product</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <MdCheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-700">Product added successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-4 h-24 sm:h-32 flex items-center justify-center">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image.preview}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <MdOutlineDelete className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center hover:bg-gray-50 transition-colors rounded-lg">
                      <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">Upload</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                      />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <Input
          label="Product Name"
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          error={submitAttempted && formErrors.name}
          placeholder="Type product name here"
        />
        <Input
          label="Product Description"
          type="text"
          name="description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          error={submitAttempted && formErrors.description}
          placeholder="Write product description here"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Input
            label="Product Price ($)"
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            error={submitAttempted && formErrors.price}
            placeholder="25"
            min="0.01"
            step="0.01"
          />
          <Input
            label="Quantity"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
            error={submitAttempted && formErrors.quantity}
            placeholder="25"
            min="1"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className={`w-full px-3 py-2 border ${
                submitAttempted && formErrors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              } rounded-md focus:outline-none focus:ring-2 transition-colors`}
            >
              <option value="">-- Select a Category --</option>
              {["Electronics", "Clothing", "Footwear", "Groceries"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {submitAttempted && formErrors.category && (
              <p className="mt-1 text-xs text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" /> {formErrors.category}
              </p>
            )}
          </div>
        </div>

        {/* Insurance Plans */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Insurance Plans</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="w-full sm:w-auto flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              onChange={(e) => {
                const selectedPlan = predefinedInsurancePlans.find((plan) => plan.name === e.target.value);
                if (selectedPlan) setInsurancePlans([...insurancePlans, selectedPlan]);
              }}
            >
              <option value="">-- Select a Plan --</option>
              {predefinedInsurancePlans.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name} - ${plan.price}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowInsuranceForm(true)}
              className="w-full sm:w-auto px-4 py-2 flex items-center justify-center bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
            >
              Add Custom Insurance
            </button>
          </div>

          {insurancePlans.length > 0 && (
            <InsurancePlanTable
              plans={insurancePlans}
              onEdit={(index) => {
                setInsuranceForm(insurancePlans[index]);
                setEditIndex(index);
                setShowInsuranceForm(true);
              }}
              onDelete={(index) => {
                const updatedPlans = insurancePlans.filter((_, i) => i !== index);
                setInsurancePlans(updatedPlans);
              }}
            />
          )}

          {showInsuranceForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
              <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                  {editIndex !== null ? "Edit Insurance Plan" : "Add Custom Insurance Plan"}
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Plan Name"
                    type="text"
                    name="name"
                    value={insuranceForm.name}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, name: e.target.value })}
                    error={insuranceFormErrors.name}
                    placeholder="Insurance Name"
                  />
                  <Input
                    label="Description"
                    type="text"
                    name="description"
                    value={insuranceForm.description}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, description: e.target.value })}
                    error={insuranceFormErrors.description}
                    placeholder="Insurance Description"
                  />
                  <Input
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={insuranceForm.price}
                    onChange={(e) => setInsuranceForm({ ...insuranceForm, price: e.target.value })}
                    error={insuranceFormErrors.price}
                    placeholder="Insurance Price"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInsuranceForm(false);
                      setInsuranceForm({ name: "", description: "", price: "" });
                      setEditIndex(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddInsurancePlan}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    {editIndex !== null ? "Update Plan" : "Add Plan"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="bestseller"
            checked={product.isBestseller}
            onChange={(e) => setProduct({ ...product, isBestseller: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="bestseller" className="ml-2 text-sm text-gray-700">
            Add to bestseller collection
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;