import React, { useState } from 'react';
import { Camera, CheckCircle, ChevronLeft, ChevronRight, Upload } from 'lucide-react';

const DamageClaimForm = ({ onClaimSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    date: '',
    photos: []
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Upload Photos' },
    { number: 3, title: 'Complete' }
  ];

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.date) newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {

      
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    const claim = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    const existingClaims = JSON.parse(localStorage.getItem('claims') || '[]');
    localStorage.setItem('claims', JSON.stringify([...existingClaims, claim]));
    
    onClaimSubmit(claim);
    setStep(3);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.map(file => URL.createObjectURL(file))]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Modern Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 w-full -z-10" />
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {/* Steps */}
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= s.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {step > s.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  s.number
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                step >= s.number ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the damage in detail..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter the location of damage"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Incident
              </label>
              <input
                type="date"
                className={`w-full p-3 border rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next Step
              <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Photo Upload */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Upload Photos
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors hover:border-blue-500 hover:bg-blue-50">
            <Camera className="mx-auto w-12 h-12 text-blue-500 mb-4" />
            <div className="space-y-2">
              <label className="block cursor-pointer">
                <span className="sr-only">Choose photos</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />
              </label>
              <p className="text-sm text-gray-500">Drag and drop your photos here or click to browse</p>
            </div>
          </div>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const newPhotos = formData.photos.filter((_, i) => i !== index);
                      setFormData({ ...formData, photos: newPhotos });
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Claim
              <Upload className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Claim Submitted Successfully!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your claim has been received and will be reviewed by our team. You'll receive updates on the progress through the dispute settlement system.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Another Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default DamageClaimForm;