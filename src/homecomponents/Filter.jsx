import React from "react";

const Filter = ({
  selectedProcessors,
  setSelectedProcessors,
  selectedModels,
  setSelectedModels,
  selectedSSDs,
  setSelectedSSDs,
  priceRange,
  setPriceRange,
}) => {

  const processors = ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9"];
  const models = ["Basic", "Expert", "Pro"];
  const ssds = ["128 GB", "256 GB", "512 GB", "1 TB"];

  const handleProcessorChange = (processor) => {
    if (selectedProcessors.includes(processor)) {
      setSelectedProcessors(selectedProcessors.filter((p) => p !== processor));
    } else {
      setSelectedProcessors([...selectedProcessors, processor]);
    }
  };

  const handleModelChange = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels(selectedModels.filter((m) => m !== model));
    } else {
      setSelectedModels([...selectedModels, model]);
    }
  };

  const handleSSDChange = (ssd) => {
    if (selectedSSDs.includes(ssd)) {
      setSelectedSSDs(selectedSSDs.filter((s) => s !== ssd));
    } else {
      setSelectedSSDs([...selectedSSDs, ssd]);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md w-64">
      <h2 className="font-bold mb-2">Filters</h2>
      
      {/* Processor Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Processor</h3>
        {processors.map((processor) => (
          <div key={processor} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedProcessors.includes(processor)}
              onChange={() => handleProcessorChange(processor)}
            />
            <label>{processor}</label>
          </div>
        ))}
      </div>

      {/* Model Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Model</h3>
        {models.map((model) => (
          <div key={model} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedModels.includes(model)}
              onChange={() => handleModelChange(model)}
            />
            <label>{model}</label>
          </div>
        ))}
      </div>

      {/* SSD Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">SSD</h3>
        {ssds.map((ssd) => (
          <div key={ssd} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedSSDs.includes(ssd)}
              onChange={() => handleSSDChange(ssd)}
            />
            <label>{ssd}</label>
          </div>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Price Range</h3>
        <div className="flex items-center">
          <label className="mr-2">0</label>
          <input
            type="range"
            min="0"
            max="150000"
            step="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="flex-1"
          />
          <label className="ml-2">{priceRange}</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
