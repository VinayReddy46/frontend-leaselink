import { Routes, Route ,useLocation} from "react-router-dom";
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
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./compoments/admin/Dashboard";
import CustomerService from "./compoments/admin/CustomerService";
import Settings from "./compoments/admin/Settings";
import FAQsList from "./compoments/admin/content management/FAQsList";
import Categories from "./compoments/admin/content management/Categories";
import UserManagement from "./compoments/admin/UserManagement";

function App() {
  const location = useLocation();
   // Check if the path starts with "/admin"
   const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
        {!isAdminRoute && <Navbar />} {/* Show Navbar only for non-admin routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verification" element={<Verfication />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/booking-payment" element={<BookingPayment />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/messaging" element={<Message />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/profile" element={<Insurance />} />
        <Route path="*" element={<Error />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="settings" element={<Settings />} />
          <Route path="faqs" element={<FAQsList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users-management" element={<UserManagement />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />} {/* Show Footer only for non-admin routes */}
    </>
  );
}

export default App;
