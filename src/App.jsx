import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react"; // ✅ Keep existing imports


import Home from "./pages/Home";
import Login from "./pages/Login";
import Verfication from "./pages/Verfication";
import AdminDashboard from "./pages/AdminDashboard";
import Rental from "./pages/Rental";
import BookingPayment from "./pages/BookingPayment";
import Ratings from "./pages/Ratings";
import Message from "./pages/Message";
import Insurance from "./pages/Insurance";
import Navbar from "./compoments/Navbar";
import Footer from "./pages/Footer";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import ProductDetails from "./compoments/HomeComponents/ProductDetails";
import Cart from "./compoments/HomeComponents/Cart";
import Checkout from "./compoments/HomeComponents/Checkout";
import MyOrders from "./compoments/HomeComponents/MyOrders";
// import CartPage from "./compoments/HomeComponents/CartPage";
import PaymentPage from "./compoments/HomeComponents/PaymentForm";
import ForgotPassword from "./pages/ForgotPassword";
import AddProduct from "./pages/AddProduct";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./compoments/admin/Dashboard";
import CustomerService from "./compoments/admin/CustomerService";
import Settings from "./compoments/admin/Settings";
import FAQManager from "./compoments/admin/contentmangement/FAQsList";
import CategoryList from "./compoments/admin/contentmangement/Categories";
import UserManagement from "./compoments/admin/UserMangement";

// Dummy Components (Keep them as placeholders)
const Laptops = () => <h1>Laptops Page</h1>;
const TVMonitors = () => <h1>TV & Monitors Page</h1>;
const AirPurifiers = () => <h1>Air Purifiers Page</h1>;
const Projectors = () => <h1>Projectors Page</h1>;
const PS5 = () => <h1>Playstation 5 Page</h1>;
const Tablets = () => <h1>Tablets Page</h1>;
const Printers = () => <h1>Printers Page</h1>;
const Audio = () => <h1>Audio & Karaoke Page</h1>;
const Kitchen = () => <h1>Kitchen Products Page</h1>;
const VideoConference = () => <h1>Video Conference Page</h1>;
const Office = () => <h1>Office Equipment Page</h1>;
const Security = () => <h1>Security Cameras Page</h1>;

// 🔄 Animation Variants
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeInOut" } },
};
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // 🛒 Cart State
  const [cartItems, setCartItems] = useState([]);

  // 💾 Load Cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 💾 Save Cart to LocalStorage when cart updates
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      {!isAdminRoute && <Navbar />} {/* Show Navbar only for non-admin routes */}

      {/* ✅ Page Animation Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verfication />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/rental/:category" element={<Rental />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/messaging" element={<Message />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/profile" element={<Insurance />} />
            <Route path="*" element={<Error />} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* 🔹 Additional Pages */}
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/tv-monitors" element={<TVMonitors />} />
            <Route path="/air-purifiers" element={<AirPurifiers />} />
            <Route path="/projectors" element={<Projectors />} />
            <Route path="/ps5" element={<PS5 />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/printers" element={<Printers />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/video-conference" element={<VideoConference />} />
            <Route path="/office" element={<Office />} />
            <Route path="/security" element={<Security />} />

            {/* 🔹 Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customer-service" element={<CustomerService />} />
              <Route path="settings" element={<Settings />} />
              <Route path="faqs" element={<FAQManager />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="users-management" element={<UserManagement />} />
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isAdminRoute && <Footer />} {/* Show Footer only for non-admin routes */}
    </div>
  );
}

export default App;