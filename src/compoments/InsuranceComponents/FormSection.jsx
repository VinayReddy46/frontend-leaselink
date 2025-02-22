import { useState } from "react";
import { useNavigate } from "react-router-dom";


const brands = ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi"];

const FormSection = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelId, setModelId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBrand || !modelId || !purchaseDate || !amount) {
      alert("Please fill in all fields!");
      return;
    }
    navigate("/plans");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">Find plans for your device</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        
        {/* Device Brand Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Device Brand</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select a Brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Model ID */}
        <div>
          <label className="block mb-1 font-medium">Model ID</label>
          <input
            type="text"
            placeholder="Enter Model ID"
            className="w-full p-2 border rounded"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
          />
        </div>

        {/* Purchase Date */}
        <div>
          <label className="block mb-1 font-medium">Purchase Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Purchase Amount</label>
          <input
            type="number"
            placeholder="Enter the amount"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Find Plans
        </button>
      </form>
    </div>
  );
};

export default FormSection;
