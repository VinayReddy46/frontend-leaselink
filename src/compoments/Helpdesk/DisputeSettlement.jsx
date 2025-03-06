import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, ChevronRight } from 'lucide-react';

const DisputeSettlement = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const loadClaims = () => {
      const storedClaims = JSON.parse(localStorage.getItem('claims') || '[]');
      setClaims(storedClaims);
    };

    loadClaims();
    window.addEventListener('storage', loadClaims);
    return () => window.removeEventListener('storage', loadClaims);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const updateClaimStatus = (claimId, newStatus) => {
    const updatedClaims = claims.map(claim =>
      claim.id === claimId ? { ...claim, status: newStatus } : claim
    );
    localStorage.setItem('claims', JSON.stringify(updatedClaims));
    setClaims(updatedClaims);
    if (selectedClaim?.id === claimId) {
      setSelectedClaim({ ...selectedClaim, status: newStatus });
    }
  };

  const submitResponse = () => {
    if (!response.trim()) return;
    
    const updatedClaims = claims.map(claim =>
      claim.id === selectedClaim.id
        ? {
            ...claim,
            responses: [...(claim.responses || []), {
              text: response,
              timestamp: new Date().toISOString(),
              isAdmin: true
            }]
          }
        : claim
    );
    
    localStorage.setItem('claims', JSON.stringify(updatedClaims));
    setClaims(updatedClaims);
    setSelectedClaim({
      ...selectedClaim,
      responses: [...(selectedClaim.responses || []), {
        text: response,
        timestamp: new Date().toISOString(),
        isAdmin: true
      }]
    });
    setResponse('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold">Dispute Settlement Dashboard</h1>
        <p className="text-blue-100">Manage and resolve damage claims</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-b-xl shadow-lg">
        {/* Claims List */}
        <div className="md:col-span-1 border-r border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Active Claims</h2>
          <div className="space-y-2">
            {claims.map(claim => (
              <div
                key={claim.id}
                onClick={() => setSelectedClaim(claim)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedClaim?.id === claim.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'
                } border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(claim.status)}
                    <div>
                      <p className="font-medium text-gray-800">
                        {claim.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(claim.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Details */}
        <div className="md:col-span-2 p-6">
          {selectedClaim ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Claim Details
                  </h2>
                  <p className="text-gray-500">
                    Submitted on {new Date(selectedClaim.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateClaimStatus(selectedClaim.id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateClaimStatus(selectedClaim.id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{selectedClaim.description}</p>
              </div>

              {selectedClaim.photos?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Photos</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedClaim.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Claim photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold">Communication</h3>
                <div className="space-y-4">
                  {selectedClaim.responses?.map((response, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        response.isAdmin
                          ? 'bg-blue-50 ml-8'
                          : 'bg-gray-50 mr-8'
                      }`}
                    >
                      <p className="text-sm text-gray-500 mb-1">
                        {response.isAdmin ? 'Admin' : 'User'} •{' '}
                        {new Date(response.timestamp).toLocaleString()}
                      </p>
                      <p className="text-gray-700">{response.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 p-3 border rounded-lg resize-none"
                    rows="3"
                  />
                  <button
                    onClick={submitResponse}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-end"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a claim to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisputeSettlement;