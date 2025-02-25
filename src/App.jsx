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
import ForgotPassword from "./pages/ForgotPassword";
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
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path="/booking-payment" element={<BookingPayment/>} />
        <Route path="/ratings" element={<Ratings/>} />
        <Route path="/messaging" element={<Message/>} />
        <Route path="/insurance" element={<Insurance/>} />
        <Route path="/profile" element={<Insurance/>} />
        <Route path="*" element={<Error/>}/>

       
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
        <Route path="/security" element={<Security />} />
      </Routes>
      <Footer/>

    
      </div>
  );
}

export default App;
