import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  DocumentCheckIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
  CheckIcon,
  PhotoIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAsiaAustraliaIcon,
  MapPinIcon,
  IdentificationIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import {
  useGetUserAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "../../redux/services/addressSlice";
import { usePlaceOrderMutation } from "../../redux/services/billingSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const Checkout = ({ cart = [], setProgressStep, onOrderSuccess }) => {
  // State for billing details
  const [billingEditable, setBillingEditable] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [countdown, setCountdown] = useState(3);

  // Address management state updated
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(true);
  const [isLoadingSaveAddress, setIsLoadingSaveAddress] = useState(false);


  const userId = useSelector((state) => state.auth.userInfo?.id || state.auth.userInfo?.user?.id);
  const {
    data: userAddresses,
    isLoading: isLoadingAddresses,
    refetch: refetchAddresses,
  } = useGetUserAddressesQuery(userId, {
    skip: !userId,
  });
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [placeOrder] = usePlaceOrderMutation();

  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    proof_type: "",
    proof_id: "",
    proof_document: null,
  });

  const [errors, setErrors] = useState({});

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the billing details with the new file
      setBillingDetails({ ...billingDetails, proof_document: file });

      // Validate the file size
      if (file.size > 5000000) {
        setErrors({
          ...errors,
          proof_document: "File size should be less than 5MB",
        });
      } else {
        // Clear any previous errors for this field
        setErrors({ ...errors, proof_document: null });
      }
    }
  };

  // Populate the billing details form with an address
  const populateAddressForm = useCallback((address) => {
    setBillingDetails({
      name: address.name || "",
      email: address.email || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      zipcode: address.zipcode || "",
      proof_type: address.proof_type || "",
      proof_id: address.proof_id || "",
      proof_document: address.proof_document || null,
    });
  }, []);

  // Separate useEffect for address selection to prevent re-render loops
  useEffect(() => {
    // If we have addresses and no address is selected, select the default one
    if (userAddresses && userAddresses.length > 0 && !selectedAddressId) {
      const defaultAddress = userAddresses[0]; // Just select the first address as default
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
        populateAddressForm(defaultAddress);
        // Hide the form when we have addresses
        setShowAddressForm(false);
      }
    }
  }, [userAddresses, selectedAddressId, populateAddressForm]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => total + (item.total_price || 0), 0);
  };

  // Validation handlers for real-time feedback
  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 3) {
          error = "Name must be at least 3 characters";
        } else if (value.trim().length > 50) {
          error = "Name cannot exceed 50 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          error = "Phone number must be 10 digits";
        } else if (!/^[0-9()\-\s+]+$/.test(value)) {
          error =
            "Phone number can only contain digits, spaces, and symbols: ()+-";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        } else if (value.trim().length < 5) {
          error = "Address must be at least 5 characters";
        } else if (value.trim().length > 100) {
          error = "Address cannot exceed 100 characters";
        }
        break;

      case "city":
        if (!value.trim()) {
          error = "City is required";
        } else if (value.trim().length < 2) {
          error = "City must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "City can only contain letters and spaces";
        }
        break;

      case "state":
        if (!value.trim()) {
          error = "State is required";
        } else if (value.trim().length < 2) {
          error = "State must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = "State can only contain letters and spaces";
        }
        break;

      case "zipcode":
        if (!value.trim()) {
          error = "ZIP code is required";
        } else if (!/^\d{6}$/.test(value.replace(/\D/g, ""))) {
          error = "ZIP code must be 6 digits";
        }
        break;

      case "proof_type":
        if (!value) {
          error = "Please select a proof type";
        }
        break;

      case "proof_id":
        if (!value.trim()) {
          error = "Proof ID is required";
        } else if (value.trim().length < 4) {
          error = "Proof ID must be at least 4 characters";
        } else if (value.trim().length > 20) {
          error = "Proof ID cannot exceed 20 characters";
        }
        break;

      case "proof_document":
        if (!value) {
          error = "Please upload a proof document";
        } else if (value instanceof File && value.size > 5000000) {
          error = "File size should be less than 5MB";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  // Validate all billing details at once
  const validateBillingDetails = () => {
    const newErrors = {};

    // Validate each field using the validateField function
    Object.keys(billingDetails).forEach((field) => {
      // Skip proof fields validation if an address is selected
      if (
        (field === "proof_type" ||
          field === "proof_id" ||
          field === "proof_document") &&
        selectedAddressId
      ) {
        return;
      }

      const error = validateField(field, billingDetails[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Select an address
  const selectAddress = (address) => {
    setSelectedAddressId(address._id);
    setIsNewAddress(false);
    setShowAddressForm(false);

    // Populate the billing details with the selected address
    populateAddressForm(address);
  };

  // Add a new address
  const addNewAddress = () => {
    resetAddressForm();
    setIsNewAddress(true);
    setShowAddressForm(true);
    setBillingEditable(true);
  };

  // Save address (create new)
  const saveAddress = async () => {
    if (!validateBillingDetails()) {
      toast.error("Please complete all required fields");
      return;
    }

    setIsLoadingSaveAddress(true);

    try {
      // Prepare address data
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("name", billingDetails.name);
      formData.append("email", billingDetails.email);
      formData.append("phone", billingDetails.phone);
      formData.append("address", billingDetails.address);
      formData.append("city", billingDetails.city);
      formData.append("state", billingDetails.state);
      formData.append("zipcode", billingDetails.zipcode);
      formData.append("proof_type", billingDetails.proof_type);
      formData.append("proof_id", billingDetails.proof_id);

      // Only append the file if it's a File object (not a string URL from existing record)
      if (
        billingDetails.proof_document &&
        billingDetails.proof_document instanceof File
      ) {
        formData.append("proof_document", billingDetails.proof_document);
      }

      // Create new address
      const toastId = "createAddress";
      toast.loading("Creating address...", { id: toastId });
      const result = await createAddress(formData).unwrap();
      toast.dismiss(toastId);
      toast.success("Address added successfully");

      // Set as selected address
      if (result && result._id) {
        setSelectedAddressId(result._id);
      }

      // Refresh addresses list to show the updated list
      await refetchAddresses();

      // Hide form after saving
      setShowAddressForm(false);
      setBillingEditable(false);
    } catch (error) {
      toast.dismiss();
      console.error("Error saving address:", error);

      // Provide more specific error messages based on the error response
      if (error.status === 400) {
        toast.error(
          "Invalid address information. Please check your details and try again."
        );
      } else if (error.status === 401) {
        toast.error("You must be logged in to save addresses.");
      } else if (error.status === 413) {
        toast.error(
          "The uploaded file is too large. Please use a smaller image file."
        );
      } else {
        toast.error(
          error.data?.message || "Failed to save address. Please try again."
        );
      }
    } finally {
      setIsLoadingSaveAddress(false);
    }
  };

  // Save billing details
  const saveBillingDetails = () => {
    if (validateBillingDetails()) {
      setBillingEditable(false);
      toast.success("Billing details saved");
    } else {
      toast.error("Please complete all required fields");
    }
  };

  // Render saved addresses section
  const renderSavedAddresses = () => {
    if (!userId) {
      return null;
    }

    if (isLoadingAddresses) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="ml-2 text-gray-600">Loading your addresses...</p>
        </div>
      );
    }

    if (!userAddresses || userAddresses.length === 0) {
      return (
        <div className="mb-6 text-center py-8 bg-indigo-50 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <HomeIcon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Saved Addresses
            </h3>
            <p className="text-gray-600 mb-4">
              You don&apos;t have any saved addresses yet. Please create a new
              address to continue with checkout.
            </p>
            <button
              type="button"
              onClick={addNewAddress}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Create New Address
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Your Addresses</h3>
          <button
            type="button"
            onClick={addNewAddress}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" />
            Add New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userAddresses.map((address) => (
            <div
              key={address._id}
              onClick={() => selectAddress(address)}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAddressId === address._id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start mb-2">
                {selectedAddressId === address._id && (
                  <CheckIcon className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">{address.name}</p>
                  <p className="text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.zipcode}
                  </p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Reset address form for new address
  const resetAddressForm = () => {
    setBillingDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      proof_type: "",
      proof_id: "",
      proof_document: null,
    });
  };

  const renderBillingDetailsForm = () => {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg p-8 mb-6 border border-white/20"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Address Details
          </h2>
          {!showAddressForm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setBillingEditable(true);
                setProgressStep("cart");
              }}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" /> Back to Cart
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveAddress}
              className={`flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 ${
                isLoadingSaveAddress ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isLoadingSaveAddress}
            >
              {isLoadingSaveAddress ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <DocumentCheckIcon className="w-5 h-5 mr-2" />
              )}
              {isLoadingSaveAddress ? "Saving..." : "Save Address"}
            </motion.button>
          )}
        </motion.div>

        {/* Saved Addresses Section (only show if user is logged in and has addresses) */}
        {userId &&
          userAddresses &&
          userAddresses.length > 0 &&
          !showAddressForm &&
          renderSavedAddresses()}

        {/* No Addresses Message (if user is logged in but has no addresses) */}
        {userId &&
          (!userAddresses || userAddresses.length === 0) &&
          !showAddressForm && (
            <motion.div
              variants={itemVariants}
              className="mb-6 text-center py-8 bg-indigo-50 rounded-lg p-6"
            >
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-3 rounded-full mb-4">
                  <HomeIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Saved Addresses
                </h3>
                <p className="text-gray-600 mb-4">
                  You don&apos;t have any saved addresses yet. Please create a
                  new address to continue with checkout.
                </p>
                <button
                  type="button"
                  onClick={addNewAddress}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Create New Address
                </button>
              </div>
            </motion.div>
          )}

        {/* Address Form (shown only when explicitly adding a new address) */}
        {showAddressForm && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <CheckIcon className="w-5 h-5 mr-2 text-gray-500" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <EnvelopeIcon className="w-5 h-5 mr-2 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <PhoneIcon className="w-5 h-5 mr-2 text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={billingDetails.phone}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <HomeIcon className="w-5 h-5 mr-2 text-gray-500" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={billingDetails.address}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.address ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <BuildingOfficeIcon className="w-5 h-5 mr-2 text-gray-500" />
                City
              </label>
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2 text-gray-500" />
                State
              </label>
              <input
                type="text"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <MapPinIcon className="w-5 h-5 mr-2 text-gray-500" />
                ZIP Code
              </label>
              <input
                type="text"
                name="zipcode"
                value={billingDetails.zipcode}
                onChange={handleInputChange}
                disabled={!billingEditable}
                className={`w-full p-3 border rounded-lg ${
                  errors.zipcode ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
              />
              {errors.zipcode && (
                <p className="text-red-500 text-xs mt-1">{errors.zipcode}</p>
              )}
            </motion.div>

            {/* Proof fields - only show when adding a new address */}
            {(isNewAddress || !selectedAddressId) && (
              <>
                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <IdentificationIcon className="w-5 h-5 mr-2 text-gray-500" />
                    Proof Type
                  </label>
                  <select
                    name="proof_type"
                    value={billingDetails.proof_type}
                    onChange={handleInputChange}
                    disabled={!billingEditable}
                    className={`w-full p-3 border rounded-lg ${
                      errors.proof_type ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
                  >
                    <option value="">Select Proof Type</option>
                    <option value="passport">Passport</option>
                    <option value="driving_license">Driving License</option>
                    <option value="national_id">National ID</option>
                  </select>
                  {errors.proof_type && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.proof_type}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <IdentificationIcon className="w-5 h-5 mr-2 text-gray-500" />
                    Proof ID
                  </label>
                  <input
                    type="text"
                    name="proof_id"
                    value={billingDetails.proof_id}
                    onChange={handleInputChange}
                    disabled={!billingEditable}
                    className={`w-full p-3 border rounded-lg ${
                      errors.proof_id ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
                  />
                  {errors.proof_id && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.proof_id}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 space-y-1"
                >
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <PhotoIcon className="w-5 h-5 mr-2 text-gray-500" />
                    Upload Proof Document
                  </label>
                  <input
                    type="file"
                    name="proof_document"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={!billingEditable}
                    className={`w-full p-3 border rounded-lg ${
                      errors.proof_document
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all backdrop-blur-sm bg-white/50`}
                  />
                  {errors.proof_document && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.proof_document}
                    </p>
                  )}
                  {billingDetails.proof_document &&
                    typeof billingDetails.proof_document === "string" && (
                      <div className="mt-2">
                        <p className="text-sm text-green-600">
                          Proof Document already uploaded
                        </p>
                      </div>
                    )}
                </motion.div>
              </>
            )}

            {/* Cancel button when adding/editing */}
            {showAddressForm && (
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAddressForm(false);
                    if (selectedAddressId) {
                      // Revert to the selected address
                      const address = userAddresses.find(
                        (addr) => addr._id === selectedAddressId
                      );
                      if (address) populateAddressForm(address);
                    }
                  }}
                  className="text-gray-600 hover:text-gray-800 mr-4"
                >
                  Cancel
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  // Place order function
  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error("You must be logged in to place an order");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Please select or add an address");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Collect all cartIds from the cart items
      const cartItemIds = cart.map((item) => item._id);

      const orderData = {
        user: userId,
        addressId: selectedAddressId,
        cartIds: cartItemIds, // Send array of cart item IDs
      };

      console.log("Placing order with data:", orderData);

      toast.loading("Processing your order...", { id: "placeOrder" });

      const response = await placeOrder(orderData).unwrap();

      toast.dismiss("placeOrder");
      toast.success("Order placed successfully!");

      // Set order ID and show success modal
      if (response && response._id) {
        setOrderId(response._id);
      }
      setShowSuccessModal(true);

      // Notify parent component that order was successful
      if (onOrderSuccess) {
        onOrderSuccess(true);
      }

      // Auto-navigate after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/myorders", { state: { orderSuccess: true } });
      }, 3000);
    } catch (error) {
      toast.dismiss("placeOrder");
      console.error("Error placing order:", error);

      let message = "Failed to place order. Please try again.";
      if (error.status === 400) {
        message = "Invalid order information. Please check your details.";
      } else if (error.status === 401) {
        message = "You must be logged in to place an order.";
      } else if (error.data?.message) {
        message = error.data.message;
      }

      setErrorMessage(message);
      setShowErrorModal(true);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderOrderSummary = () => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="backdrop-blur-sm bg-white/90 rounded-xl shadow-lg p-8 border border-white/20"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
        >
          Order Summary
        </motion.h2>

        <motion.div variants={itemVariants} className="space-y-4 mb-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-3 border-b border-gray-100"
            >
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.product?.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <PhotoIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.start_time).toLocaleDateString()} -{" "}
                    {new Date(item.end_time).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  £{item.total_price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="flex justify-between font-bold text-lg">
            <span className="text-gray-900">Total</span>
            <span className="text-indigo-600">
              £{calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlaceOrder}
            disabled={isProcessing || !selectedAddressId || cart.length === 0}
            className={`w-full mt-6 py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
              isProcessing || !selectedAddressId || cart.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
            }`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <CreditCardIcon className="w-5 h-5 mr-2" />
                Place Order
              </>
            )}
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-4">
            By placing your order, you agree to our Terms and Conditions.
          </p>
        </motion.div>
      </motion.div>
    );
  };

  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showSuccessModal]);

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center"
      >
        <button
          onClick={() => setProgressStep("cart")}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">{renderBillingDetailsForm()}</div>

        <div className="w-full lg:w-1/3">{renderOrderSummary()}</div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Placed Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We have received your order and will
                process it shortly.
                {orderId && (
                  <span className="block mt-2">
                    Order ID: <span className="font-medium">{orderId}</span>
                  </span>
                )}
                <span className="block mt-2 text-blue-600 font-medium">
                  Redirecting to My Orders in {countdown} seconds...
                </span>
              </p>

              {/* Order Summary in Success Modal */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">
                      £{calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/myorders", { state: { orderSuccess: true } });
                  }}
                  className={`w-full sm:w-auto px-6 py-3 ${
                    countdown > 0
                      ? "bg-blue-400 cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={countdown > 0}
                >
                  View Orders
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/cart", { state: { orderSuccess: true } });
                  }}
                  className={`w-full sm:w-auto px-6 py-3 ${
                    countdown > 0
                      ? "bg-gray-100 cursor-wait"
                      : "bg-gray-200 hover:bg-gray-300"
                  } text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  disabled={countdown > 0}
                >
                  Return to Cart
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/");
                  }}
                  className={`w-full sm:w-auto px-6 py-3 ${
                    countdown > 0
                      ? "bg-gray-100 cursor-wait"
                      : "bg-gray-200 hover:bg-gray-300"
                  } text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500`}
                  disabled={countdown > 0}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
          >
            <button
              onClick={() => setShowErrorModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Order Failed
              </h3>
              <p className="text-gray-600 mb-6">
                {errorMessage ||
                  "There was an error processing your order. Please try again."}
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.array,
  setProgressStep: PropTypes.func.isRequired,
  onOrderSuccess: PropTypes.func,
};

export default Checkout;
