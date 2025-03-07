import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react"; // ✅ Add useState & useEffect
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Signin from "./pages/Signin";
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
import ProductDetails from "./compoments/CartComponents/ProductDetails";
import Cart from "./compoments/CartComponents/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import AddProduct from "./pages/AddProduct";
import Chatbot from "./pages/Chatbot";
import Dashboard from "./compoments/admin/Dashboard";
import CustomerService from "./compoments/admin/CustomerService";
import Settings from "./compoments/admin/Settings";
import ProfileSettings from "./compoments/profileComponents/ProfileSettings";
import FAQManager from "./compoments/admin/contentmangement/FAQsList";
import CategoryList from "./compoments/admin/contentmangement/Categories";
import UserManagement from "./compoments/admin/UserMangement";
// import PaymentForm from "./compoments/HomeComponents/PaymentForm";
import TrustSystem from "./pages/Ratings";
import AboutUs from "./pages/About"
import NotificationDetails from "./compoments/navbarComponents/NotificationDetails"
import Profile from "./pages/Profile";
import MyOrders from "./compoments/profileComponents/MyOrders";
import Checkout from "./compoments/CartComponents/Checkout";
import HelpDesk from "./compoments/HelpDesk/HelpDesk";
import HelpTopic from "./compoments/HelpDesk/HelpTopic";
import Article from "./compoments/HelpDesk/Article";
import ContactSupport from "./compoments/HelpDesk/ContactSupport";
import DisputaAndFile from "./compoments/Helpdesk/DisputeAndFile";
import { SearchProvider } from "./compoments/contexts/SearchContext";
import Myrentedproducts from "./compoments/profileComponents/MyRentedProducts";
import { WishlistProvider } from "./compoments/contexts/WishlistContext";
import WishlistPage from "./compoments/HomeComponents/LandingPageComponents/WishlistPage";
import HelpdeskBtn from "./pages/HelpdeskBtn";


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
const Security = () => <h1>Security Cameras Page</h1>;

function App() {
  const location = useLocation();
  // Check if the path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");
  // 🛒 Cart State
  const [cartItems, setCartItems] = useState([]);

  // 💾 Load Cart from LocalStorage (Persistent Cart)
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
    <SearchProvider>
      <WishlistProvider>
        <div>

          {!isAdminRoute && <Navbar />} {/* Show Navbar only for non-admin routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verfication />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/rental/:category" element={<Rental />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/notification/:id" element={<NotificationDetails />} />
            {/* added */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            {/* <Route path="/payment" element={<PaymentForm/>} /> */}
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/messaging" element={<Message />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<ProfileSettings />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/myrentedproducts" element={<Myrentedproducts />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} />
            <Route path="/Helpdesk" element={<HelpDesk />} />
            <Route path="/help-topic/:topicId" element={<HelpTopic />} />
            <Route path="/article/:articleId" element={<Article />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/disputeandfile" element={<DisputaAndFile />} />


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
            {/* <Route path="/Rating" element={<TrustSystem />} /> */}
            {/* Admin Routes */}
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



          {!isAdminRoute && <Footer />} {/* Show Footer only for non-admin routes */}

          {!isAdminRoute && <HelpdeskBtn/>}
        </div>
      </WishlistProvider>
    </SearchProvider>
  );
}

export default App;