import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiUpload, FiAlertCircle } from "react-icons/fi";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import {
  useGetCategoriesQuery,
} from "../redux/services/categoriesSlice";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../redux/services/addProductSlice";
import {
  useCreateInsuranceMutation,
  useGetInsurancesQuery,
  useGetInsuranceByIdQuery,
  useUpdateInsuranceMutation,
  useDeleteInsuranceMutation,
} from "../redux/services/insuranceSlice";

// Reusable Input Component
const Input = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  name,
  min,
  step,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      className={`w-full px-3 py-2 border ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      } rounded-md focus:outline-none focus:ring-2 transition-colors`}
    />
    {error && (
      <p className="mt-1 text-xs text-red-600 flex items-center">
        <FiAlertCircle className="mr-1" /> {error}
      </p>
    )}
  </div>
);

// Insurance Plan Table Component
const InsurancePlanTable = ({ plans, onEdit, onDelete }) => (
  <div className="mt-4 overflow-x-auto border border-gray-200 rounded-lg">
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {plans.map((plan, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm">{plan.name}</td>
            <td className="px-4 py-3 text-sm">{plan.description}</td>
            <td className="px-4 py-3 text-sm">
              ${Number(plan.price).toFixed(2)}
            </td>
            <td className="px-4 py-3 text-sm">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(index)}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 transition-colors transform hover:scale-105 hover:shadow-md active:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <MdEdit className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-colors transform hover:scale-105 hover:shadow-md active:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300"
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

// Main AddProduct Component
const AddProduct = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.id;
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    isBestseller: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [insuranceForm, setInsuranceForm] = useState({
    plan_name: "",
    description: "",
    price: "",
    features: [],
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [predefinedInsurancePlans, setPredefinedInsurancePlans] = useState([
    { name: "Basic", description: "Basic Protection", price: "10" },
    { name: "Gold", description: "Gold Coverage", price: "20" },
    { name: "Full", description: "Full Coverage", price: "30" },
  ]);
  const [selectedInsurances, setSelectedInsurances] = useState([]);

  //insurance
  const { data: insuranceData, refetch } = useGetInsurancesQuery(userId, {
    skip: !userId
  });
  console.log()
  const [createInsurance, { isLoading: isCreateLoading }] =
    useCreateInsuranceMutation();
  const [updateInsurance] = useUpdateInsuranceMutation();
  const [deleteInsurance] = useDeleteInsuranceMutation();

  //features
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();


  useEffect(() => {
    // Update predefined insurance plans with API data when available
    if (
      insuranceData?.insurancePlans &&
      insuranceData.insurancePlans.length > 0
    ) {
      const apiPlans = insuranceData.insurancePlans.map((plan) => ({
        id: plan.plan_id,
        plan_id: plan.plan_id, // Store both id and plan_id for consistency
        name: plan.plan_name,
        plan_name: plan.plan_name, // Store both name and plan_name for consistency
        description: plan.description,
        price: plan.price,
        features: plan.features || [],
      }));

      setPredefinedInsurancePlans(apiPlans);
    }
  }, [insuranceData]);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleDeleteFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories;
  console.log(categories);

  const handleImageUpload = (index, e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImages = [...images];
      newImages[index] = { file, preview: URL.createObjectURL(file) };
      setImages(newImages);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    if (newImages[index]?.preview)
      URL.revokeObjectURL(newImages[index].preview);
    newImages[index] = null;
    setImages(newImages);
  };

  const handleAddPredefinedPlan = () => {
    if (!selectedPlan) {
      toast.warning("Please select an insurance plan");
      return;
    }

    // Find the selected plan from the predefined plans
    const planToAdd = predefinedInsurancePlans.find(
      (plan) => (plan.id === selectedPlan || plan.plan_id === selectedPlan)
    );

    if (!planToAdd) {
      toast.error("Selected plan not found");
      return;
    }

    // Check if this plan is already in the insurancePlans list
    if (
      insurancePlans.some((plan) => 
        (plan.id === planToAdd.id || plan.plan_id === planToAdd.plan_id || plan.name === planToAdd.name)
      )
    ) {
      toast.warning("This insurance plan is already added");
      return;
    }

    // Add to insurancePlans
    setInsurancePlans([...insurancePlans, planToAdd]);

    // Also add this plan's ID to the selectedInsurances array
    const planId = planToAdd.id || planToAdd.plan_id;
    setSelectedInsurances((prev) => [...prev, planId]);

    // Clear selection
    setSelectedPlan("");
    toast.success("Insurance plan added");
  };

  const handleEditInsurancePlan = (index) => {
    const planToEdit = insurancePlans[index];
    // Set the features array based on the plan being edited
    setFeatures(planToEdit.features || []);
    // Set the form values
    setInsuranceForm({
      plan_name: planToEdit.name,
      description: planToEdit.description,
      price: planToEdit.price.toString(),
    });
    setEditIndex(index);
    setShowInsuranceForm(true);
  };

  const handleAddInsurancePlan = async () => {
    // Validate the form
    const errors = validateInsuranceForm();

    if (Object.keys(errors).length > 0) {
      // Display errors for each field
      Object.entries(errors).forEach(([field, message]) => {
        toast.error(message);
      });
      return;
    }
    
    try {
      // Create the payload with the required structure
      const payload = {
        plan_name: insuranceForm.plan_name,
        description: insuranceForm.description,
        price: Number(insuranceForm.price), // Convert to number
        features: features.length > 0 ? features : undefined,
        userId,
      };

      if (editIndex !== null) {
        // Update existing plan
        const planBeingEdited = insurancePlans[editIndex];

        // If the plan has an id (came from the API), update it through the API
        if (planBeingEdited.id) {
          console.log("updateInsurance", payload);
          try {
            const res = await updateInsurance({
              id: planBeingEdited.id,
              ...payload,
              userId,
            });

            if (res.data?.success) {
              toast.success("Insurance plan updated successfully");
              // Refresh the insurance plans list
              refetch();
            } else {
              toast.error(
                res.error?.data?.message || "Failed to update insurance plan"
              );
            }
          } catch (error) {
            console.error("Error updating insurance plan:", error);
            toast.error("Failed to update insurance plan");
          }
        }

        // Update the local state regardless of API success
        const updatedPlans = [...insurancePlans];
        updatedPlans[editIndex] = {
          ...planBeingEdited, // Keep the id if it exists
          name: payload.plan_name,
          description: payload.description,
          price: payload.price,
          features: payload.features,
          userId,
        };
        setInsurancePlans(updatedPlans);
      } else {
        // Add new plan
        const newPlan = {
          name: payload.plan_name,
          description: payload.description,
          price: payload.price,
          features: payload.features,
          userId,
        };

        if (!insurancePlans.some((plan) => plan.name === newPlan.name)) {
          setInsurancePlans([...insurancePlans, newPlan]);

          // Send to API
          const res = await createInsurance(payload);

          if (res.data?.success) {
            toast.success("Insurance plan added successfully");
            // Add the id from the response to the new plan
            if (res.data?.insurancePlan?.plan_id) {
              const updatedPlans = [...insurancePlans];
              updatedPlans[updatedPlans.length - 1] = {
                ...newPlan,
                id: res.data.insurancePlan.plan_id,
                userId,
              };
              setInsurancePlans(updatedPlans);
            }
            // Refresh the list of insurance plans
            refetch();
          } else {
            toast.error(
              res.error?.data?.message || "Failed to add insurance plan"
            );
          }
        } else {
          toast.warning("An insurance plan with this name already exists");
        }
      }

      // Reset form
      setShowInsuranceForm(false);
      setInsuranceForm({
        plan_name: "",
        description: "",
        price: "",
        features: [],
      });
      setFeatures([]);
      setEditIndex(null);
    } catch (error) {
      console.error("Error submitting insurance plan:", error);
      toast.error(error.data?.message || "Failed to submit insurance plan");
    }
  };

  const validateInsuranceForm = () => {
    const errors = {};

    if (!insuranceForm.plan_name.trim()) {
      errors.plan_name = "Plan name is required";
    }

    if (!insuranceForm.description.trim()) {
      errors.description = "Description is required";
    }

    if (!insuranceForm.price) {
      errors.price = "Price is required";
    } else if (
      isNaN(Number(insuranceForm.price)) ||
      Number(insuranceForm.price) < 0
    ) {
      errors.price = "Price must be a positive number";
    }

    return errors;
  };

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Basic validation - required fields
    const errors = {};
    if (!product.name.trim()) errors.name = "Product name is required";
    if (!product.brand.trim()) errors.brand = "Brand name is required";
    if (!product.model.trim()) errors.model = "Model name is required";
    if (!product.description.trim())
      errors.description = "Description is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0)
      errors.price = "Valid price is required";
    if (
      !product.quantity ||
      isNaN(product.quantity) ||
      Number(product.quantity) < 0
    )
      errors.quantity = "Valid quantity is required";

    // Check if at least one image is uploaded
    const hasImages = images.some((img) => img !== null);
    if (!hasImages) {
      errors.images = "At least one product image is required";
      toast.error("Please upload at least one product image");
    }

    // If insurance plans exist but none selected, show error
    if (insurancePlans.length > 0 && selectedInsurances.length === 0) {
      errors.selectedInsurances = "Please select at least one insurance plan";
    }

    if (Object.keys(errors).length > 0) {
      // Display errors and stop submission
      setFormErrors(errors);
      return;
    }

    try {
      // Format data for API according to backend requirements
      const formData = new FormData();

      // Add product details exactly as expected by the backend
      formData.append("name", product.name);
      formData.append("brand_name", product.brand);
      formData.append("model_name", product.model);
      formData.append("description", product.description);
      formData.append("category", product.category); // This should already be the category ID from the select
      formData.append("is_best_seller", product.isBestseller);
      formData.append("price", parseFloat(product.price));
      formData.append("total_quantity", parseInt(product.quantity));

      // Handle insurance - match the backend's expected fields
      const hasInsurance = insurancePlans.length > 0;
      formData.append("insurance", hasInsurance);

      // Add selected insurance IDs if available
      if (hasInsurance && selectedInsurances.length > 0) {
        // Since FormData doesn't naturally handle arrays, we need to either:
        // 1. Use append multiple times with the same key
        console.log("selectedInsurances", selectedInsurances);
        selectedInsurances.forEach((insuranceId) => {
          formData.append("selected_insurance", insuranceId);
        });

        // 2. Or convert to JSON string if the backend expects it that way
        // formData.append("selected_insurance", JSON.stringify(selectedInsurances));
      }

      // Add images that are not null - the backend expects them in req.files
      // which will be automatically populated since we're using FormData with files
      images.forEach((image) => {
        if (image && image.file) {
          console.log(image.file, "inside image");
          // The backend expects multiple files with no specific field name
          // The multer middleware will collect them into req.files
          formData.append("images", image.file);
        }
      });

      // Get user information from redux state
      if (userInfo && userInfo.id) {
        formData.append("userId", userInfo.id);
        console.log("Added userId to form data:", userInfo.id);
      }

      // Send product data to API
      await createProduct(formData);

      toast.success("Product added successfully!");

      // Reset form
      setProduct({
        name: "",
        brand: "",
        model: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        isBestseller: false,
      });
      setImages(Array(4).fill(null));
      setInsurancePlans([]);
      setSelectedInsurances([]);
      setSubmitAttempted(false);
      setFormErrors({});
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(
        error.data?.message || "Failed to add product. Please try again."
      );
    }
  };

  const handleInsuranceSelection = (planId) => {
    setSelectedInsurances((prev) => {
      if (prev.includes(planId)) {
        // If already selected, remove it
        return prev.filter((id) => id !== planId);
      } else {
        // If not selected, add it
        return [...prev, planId];
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-4 sm:mt-28">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div
                  className={`border-2 border-dashed ${
                    formErrors.images && !images.some((img) => img !== null)
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg p-4 h-32 flex items-center justify-center`}
                >
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image.preview}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110 hover:shadow-md active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                      >
                        <MdOutlineDelete className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center hover:bg-gray-50 transition-colors rounded-lg transform hover:scale-105">
                      <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 text-center">
                        Upload
                      </span>
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
          {formErrors.images && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" /> {formErrors.images}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Product Name"
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Type product name here"
              required
              error={formErrors.name}
            />
            <Input
              label="Brand Name"
              type="text"
              name="brand"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              placeholder="Type Brand name here"
              required
              error={formErrors.brand}
            />
            <Input
              label="Model Name"
              type="text"
              name="model"
              value={product.model}
              onChange={(e) =>
                setProduct({ ...product, model: e.target.value })
              }
              placeholder="Type Model name here"
              required
              error={formErrors.model}
            />
          </div>
          <Input
            label="Product Description"
            type="text"
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Write product description here"
            error={formErrors.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Input
              label="Product Price ($)"
              type="number"
              name="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              placeholder="25"
              min="0.01"
              step="0.01"
              error={formErrors.price}
            />
            <Input
              label="Quantity"
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              placeholder="25"
              min="1"
              error={formErrors.quantity}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className={`w-full px-3 py-2 border ${
                  submitAttempted && formErrors.category
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } rounded-md focus:outline-none focus:ring-2 transition-colors`}
              >
                <option value="">Select a Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" /> {formErrors.category}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Insurance Plans
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">-- Select a Plan --</option>
              {predefinedInsurancePlans?.map((plan) => (
                <option
                  key={plan.id || plan.plan_id}
                  value={plan.id || plan.plan_id}
                >
                  {plan.name || plan.plan_name} - ${plan.price}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddPredefinedPlan}
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors transform hover:scale-105 hover:shadow-md active:bg-green-700 disabled:bg-gray-400 disabled:hover:scale-100 disabled:hover:shadow-none"
              disabled={!selectedPlan}
            >
              Add Plan
            </button>
            <button
              type="button"
              onClick={() => setShowInsuranceForm(true)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors transform hover:scale-105 hover:shadow-md active:bg-blue-700"
            >
              Add Custom Insurance
            </button>
          </div>

          {insurancePlans.length > 0 && (
            <InsurancePlanTable
              plans={insurancePlans}
              onEdit={handleEditInsurancePlan}
              onDelete={(index) => {
                const planToDelete = insurancePlans[index];
                // If the plan has an id (came from API), delete it through API
                if (planToDelete.plan_id) {
                  deleteInsurance(planToDelete.plan_id)
                    .then((res) => {
                      if (res.data?.success) {
                        toast.success("Insurance plan deleted successfully");
                        // Remove from local state
                        setInsurancePlans(
                          insurancePlans.filter((_, i) => i !== index)
                        );
                        // Refresh the list
                        refetch();
                      } else {
                        toast.error(
                          res.error?.data?.message ||
                            "Failed to delete insurance plan"
                        );
                      }
                    })
                    .catch((error) => {
                      console.error("Error deleting insurance plan:", error);
                      toast.error("Failed to delete insurance plan");
                    });
                } else {
                  // Just remove from local state if it's not from API
                  setInsurancePlans(
                    insurancePlans.filter((_, i) => i !== index)
                  );
                }
              }}
            />
          )}

          {insurancePlans.length > 0 && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Insurance Plans for Product
              </label>

              <div className="space-y-2">
                {insurancePlans.map((plan) => {
                  // Use consistent ID approach - check both possible ID fields
                  const planId = plan.id || plan.plan_id;
                  
                  return (
                    <div key={planId} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`insurance-${planId}`}
                        checked={selectedInsurances.includes(planId)}
                        onChange={() => handleInsuranceSelection(planId)}
                        className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`insurance-${planId}`}
                        className="text-sm"
                      >
                        {plan.name || plan.plan_name} - ${plan.price}
                      </label>
                    </div>
                  );
                })}
              </div>

              {formErrors.selectedInsurances && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />{" "}
                  {formErrors.selectedInsurances}
                </p>
              )}
            </div>
          )}

          {showInsuranceForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
              <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                  {editIndex !== null
                    ? "Edit Insurance Plan"
                    : "Add Custom Insurance Plan"}
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Plan Name"
                    type="text"
                    name="name"
                    value={insuranceForm.plan_name}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        plan_name: e.target.value,
                      })
                    }
                    placeholder="Insurance Name"
                  />
                  <Input
                    label="Description"
                    type="text"
                    name="description"
                    value={insuranceForm.description}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Insurance Description"
                  />
                  <Input
                    label="Price ($)"
                    type="number"
                    name="price"
                    value={insuranceForm.price}
                    onChange={(e) =>
                      setInsuranceForm({
                        ...insuranceForm,
                        price: e.target.value,
                      })
                    }
                    placeholder="Insurance Price"
                    min="0.01"
                    step="0.01"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Features
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add a feature"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors transform hover:scale-105 hover:shadow-md active:bg-green-700"
                      >
                        Add
                      </button>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteFeature(index)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInsuranceForm(false);
                      setInsuranceForm({
                        plan_name: "",
                        description: "",
                        price: "",
                        features: [],
                      });
                      setEditIndex(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors transform hover:scale-105 hover:shadow-md active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddInsurancePlan}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors transform hover:scale-105 hover:shadow-md active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    {editIndex !== null ? "Update Plan" : "Add Plan"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="bestseller"
            checked={product.isBestseller}
            onChange={(e) =>
              setProduct({ ...product, isBestseller: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="bestseller" className="ml-2 text-sm text-gray-700">
            Add to bestseller
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transform hover:scale-105 hover:shadow-lg active:bg-gray-900 active:scale-100 flex items-center justify-center"
            disabled={isCreatingProduct}
          >
            {isCreatingProduct ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> ADDING PRODUCT...
              </>
            ) : (
              "ADD PRODUCT"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
