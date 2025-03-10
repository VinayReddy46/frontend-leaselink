import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const AddProduct = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    if (newImages[index]) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages[index] = null;
    setImages(newImages);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image?.preview) URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  const products = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Groceries",
    "Home Appliances",
    "Furniture",
    "Toys",
    "Beauty & Personal Care",
    "Books",
    "Sports Equipment",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productDescription || !productPrice || !selectedProduct) {
      alert("Please fill all required fields.");
      return;
    }
    console.log({ productName, productDescription, productPrice, selectedProduct, images });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-28">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex items-center justify-center">
                  {image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={image.preview}
                        alt={Upload`${index+1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        aria-label="Remove Image"
                      >
                        <MdOutlineDelete className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                      <FiUpload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-2">Upload</span>
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

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type here"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write content here"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select a Product --</option>
              {products.map((product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Price ($)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              min="1"
              required
            />
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="bestseller"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="bestseller" className="ml-2 text-sm text-gray-700">
            Add to bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;