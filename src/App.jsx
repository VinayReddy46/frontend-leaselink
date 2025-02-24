import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Favorites from './compoments/ProfileComponents/Favorites'
import Transactions from "./compoments/ProfileComponents/Transactions"
import Billinginfo from "./compoments/ProfileComponents/Billinginfo"
import Settings from "./compoments/ProfileComponents/Settings"
import Logout from "./compoments/ProfileComponents/Logout"
import MyCarListing from "./compoments/ProfileComponents/MyCarListing";
import MyProfile from "./compoments/ProfileComponents/MyProfile";
function App() {
  return (
     <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verification" element={<Verfication/>} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/rental" element={<Rental/>} />
        <Route path="/booking-payment" element={<BookingPayment/>} />
        <Route path="/ratings" element={<Ratings/>} />
        <Route path="/messaging" element={<Message/>} />
        <Route path="/insurance" element={<Insurance/>} />
        <Route path="/profile" element={<Profile/>}>
        <Route path="" element={<MyProfile />} />
        <Route path="mycar" element={<MyCarListing />} />
        <Route path="favorites" element={<Favorites />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="billinginfo" element={<Billinginfo />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>

    
      </div>
  );
}

export default App;
