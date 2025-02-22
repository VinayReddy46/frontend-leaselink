const insurancePlans = [
    {
      name: "Basic Plan",
      price: "₹99/month",
      coverage: "Covers accidental damage and liquid spills.",
    },
    {
      name: "Standard Plan",
      price: "₹199/month",
      coverage: "Includes accidental, liquid, and theft protection.",
    },
    {
      name: "Premium Plan",
      price: "₹299/month",
      coverage: "Covers damage, theft, and extends warranty up to 2 years.",
    },
  ];
  
  const SubscriptionPlans = () => {
    return (
      <div className="max-w-2xl mx-auto mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center">Available Insurance Plans</h3>
        <div className="grid gap-4">
          {insurancePlans.map((plan, index) => (
            <div key={index} className="p-4 border rounded-lg shadow bg-white">
              <h4 className="text-lg font-semibold text-blue-600">{plan.name}</h4>
              <p className="text-gray-700">{plan.coverage}</p>
              <p className="text-lg font-bold mt-2">{plan.price}</p>
              <button className="w-full bg-green-500 text-white mt-3 py-2 rounded" >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SubscriptionPlans;
  