import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaChevronRight } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(storedCart) ? storedCart : []);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cart.filter((_, i) => i !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map((item, i) => {
      if (i === id) {
        return {
          ...item,
          quantity: newQuantity,
          total: (item.rentalRate * newQuantity + (item.coverage ? 250 : 0)) || 0
        };
      }
      return item;
    });
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.total || 0), 0);
  };

  const calculateTotal = () => {
    return (cart.reduce((total, item) => total + (item.total || 0), 0) || 0).toFixed(2);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "DISCOUNT10") {
      const subtotal = calculateSubtotal();
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Continue Shopping
        </Link>
        <h1 className="text-2xl font-bold ml-auto">Your Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.length})</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-grow md:ml-6">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">₹{item.rentalRate} rental</div>
                            <div className="text-lg font-semibold">₹{(item.total || 0).toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{calculateTotal()}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-4 border-t">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <button
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout <FaChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;