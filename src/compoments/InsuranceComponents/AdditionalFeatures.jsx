const AdditionalFeatures = () => {
    const features = [
      {
        title: "Rental Insurance Options",
        description: "Additional security for high-value items.",
      },
      {
        title: "Damage Claim Workflow",
        description: "Easy claim submission and verification process.",
      },
      {
        title: "Dispute Settlement Module",
        description: "Admin intervention for unresolved conflicts.",
      },
    ];
  
    return (
      <div className="max-w-5xl mx-auto mt-10 p-8 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">🔹 Additional Protection Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white text-gray-900 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-indigo-600">{feature.title}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AdditionalFeatures;
  