import React, { useState } from 'react';
import { Home, FileText, MessageSquare } from 'lucide-react';
import DamageClaimForm from './DamageClaimForm';
import DisputeSettlement from './DisputeSettlement';

function DisputaAndFile() {
  const [currentView, setCurrentView] = useState('home');

  const handleClaimSubmit = (claim) => {
    // Trigger a storage event to update the dispute settlement view
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'home' ? (
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Damage Claim Management System
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() => setCurrentView('claim')}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
            >
              <FileText className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Submit Damage Claim</h2>
              <p className="text-gray-600">
                Report damage and submit supporting documentation through our easy-to-use form.
              </p>
            </div>

            <div
              onClick={() => setCurrentView('dispute')}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
            >
              <MessageSquare className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Dispute Settlement</h2>
              <p className="text-gray-600">
                Access the admin interface to manage and resolve submitted claims.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <button
            onClick={() => setCurrentView('home')}
            className="mb-6 flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          
          {currentView === 'claim' ? (
            <DamageClaimForm onClaimSubmit={handleClaimSubmit} />
          ) : (
            <DisputeSettlement />
          )}
        </div>
      )}
    </div>
  );
}

export default DisputaAndFile;