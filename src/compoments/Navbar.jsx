// // import React, { useState, useEffect, useRef } from "react";
// // import { FaUserCircle } from "react-icons/fa";
// // import { CiSearch } from "react-icons/ci";
// // import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
// // import { HiShoppingCart } from "react-icons/hi2";
// // import { FiMenu, FiX } from "react-icons/fi";
// // import Cart from "./HomeComponents/Cart"; // ✅ Import Cart component




// // const data = [
// //   { name: "Home", link: "/" },
// //   { name: "About Us", link: "/about" },
// //   {
// //     name: "Rent a Product",
// //     link: "/rental",
// //     dropdown: [
// //       { name: "Laptops", link: "/rental/laptops" },
// //       { name: "Printer & Scanner", link: "/rental/printers" },
// //       { name: "TV & Monitors", link: "/rental/monitors" },
// //       { name: "Kitchen Appliance", link: "/rental/kitchen" },
// //       { name: "Projector", link: "/rental/projectors" },
// //       { name: "Tablet", link: "/rental/tablet" },
// //       { name: "Audio & Karaoke", link: "/rental/audio" },
// //       { name: "Air Purifier", link: "/rental/air" },
// //       { name: "Playstation", link: "/rental/playstation" },
// //       { name: "Video Conferencing", link: "/rental/video" },
// //     ],
// //   },
// //   { name: "Contact Us", link: "/contact" },
// // ];

// // // Extract all searchable items for suggestions
// // const allCategories = data.flatMap(item => 
// //   item.dropdown 
// //     ? item.dropdown.map(subItem => ({ 
// //         name: subItem.name, 
// //         link: subItem.link,
// //         category: item.name
// //       })) 
// //     : [{ 
// //         name: item.name, 
// //         link: item.link,
// //         category: null
// //       }]
// // );

// // function Navbar({ cartItems, setCartItems }) { //✅ Receive cart props from App.jsx
// //   const [hovered, setHovered] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [userDropdown, setUserDropdown] = useState(false);
// //   const [searchInput, setSearchInput] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [cartOpen, setCartOpen] = useState(false); // ✅ Toggle cart popup
// //   const searchRef = useRef(null);

// //   // Handle search input change
// //   const handleSearchChange = (e) => {
// //     const value = e.target.value;
// //     setSearchInput(value);
    
// //     if (value.trim() === "") {
// //       setSearchResults([]);
// //       setShowSuggestions(false);
// //       return;
// //     }

// //     // Filter categories based on input
// //     const filtered = allCategories.filter(item => 
// //       item.name.toLowerCase().includes(value.toLowerCase())
// //     );
    
// //     setSearchResults(filtered);
// //     setShowSuggestions(true);
// //   };

// //   // Handle clicking outside of search to close suggestions
// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setShowSuggestions(false);
// //       }
// //     }
    
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [searchRef]);

// //   // Handle search submission
// //   const handleSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (searchResults.length > 0) {
// //       // Navigate to the first result
// //       window.location.href = searchResults[0].link;
// //     }
// //   };

// //   // Handle suggestion click
// //   const handleSuggestionClick = (link) => {
// //     window.location.href = link;
// //     setShowSuggestions(false);
// //   };

// //   return (
// //     <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-3 py-4">
// //       {/* Logo */}
// //       <a href="#" className="flex items-center">
// //         <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
// //       </a>

// //       {/* Mobile Menu Button and User Icon */}
// //       <div className="flex items-center space-x-4 md:hidden">
// //         {/* Toggle Button */}
// //         <button
// //           className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
// //           onClick={() => setMenuOpen(!menuOpen)}
// //         >
// //           {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
// //         </button>

// //         {/* User Icon */}
// //         <button
// //           className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
// //           onClick={() => setUserDropdown(!userDropdown)}
// //         >
// //           <FaUserCircle className="w-6 h-6" />
// //         </button>
// //       </div>

// //       {/* Navigation Links */}
// //       <ul
// //         className={`md:flex md:items-center md:space-x-10 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto shadow-md md:shadow-none transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"
// //           } md:flex`}
// //       >
// //         {data.map((val, index) => (
// //           <li key={index} className="relative group px-6 md:px-0 py-2 md:py-0">
// //             {val.dropdown ? (
// //               <div
// //                 className="relative cursor-pointer"
// //                 onMouseEnter={() => setHovered(true)}
// //                 onMouseLeave={() => setHovered(false)}
// //               >
// //                 <div className="flex items-center text-gray-700 hover:text-blue-800 font-medium text-lg transition-colors duration-200">
// //                   {val.name}
// //                   <IoMdArrowDropdown className="ml-1 text-xl" />
// //                 </div>

// //                 {/* Dropdown Menu */}
// //                 <ul
// //                   className={`absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${hovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
// //                     }`}
// //                   style={{
// //                     maxHeight: "250px",
// //                     overflowY: "auto",
// //                     scrollbarWidth: "none",
// //                     msOverflowStyle: "none",
// //                   }}
// //                   onMouseEnter={() => setHovered(true)}
// //                   onMouseLeave={() => setHovered(false)}
// //                 >
// //                   {val.dropdown.map((item, subIndex) => (
// //                     <li key={subIndex} className="px-5 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200">
// //                       <a href={item.link} className="w-full block">{item.name}</a>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ) : (
// //               <a
// //                 href={val.link}
// //                 className="text-gray-700 hover:text-blue-800 font-medium block md:inline text-lg transition-colors duration-200"
// //               >
// //                 {val.name}
// //               </a>
// //             )}
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Icons Section (Hidden in Mobile View) */}
// //       <div className="hidden md:flex items-center space-x-4">
// //         {/* Search Bar with Suggestions */}
// //         <div ref={searchRef} className="relative">
// //           <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden">
// //             <input
// //               type="text"
// //               placeholder="Search here..."
// //               className="w-full px-4 py-2 outline-none border-none"
// //               value={searchInput}
// //               onChange={handleSearchChange}
// //               onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
// //             />
// //             <button 
// //               type="submit" 
// //               className="flex items-center justify-center px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
// //             >
// //               <CiSearch className="w-5 h-5" />
// //             </button>
// //           </form>

// //           {/* Search Suggestions Dropdown */}
// //           {showSuggestions && searchResults.length > 0 && (
// //             <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
// //               {searchResults.map((result, index) => (
// //                 <li 
// //                   key={index} 
// //                   className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
// //                   onClick={() => handleSuggestionClick(result.link)}
// //                 >
// //                   <div className="text-gray-700">{result.name}</div>
// //                   {result.category && (
// //                     <div className="text-xs text-gray-500">in {result.category}</div>
// //                   )}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>

// //         {/* Notification and Shopping Cart Icons */}
// //         <div className="flex items-center space-x-4">
// //           <a
// //             href="#"
// //             className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
// //           >
// //             <IoMdNotificationsOutline className="w-6 h-6" />
// //           </a>
// //           <a
// //             href="#"
// //             className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
// //           >
// //             <HiShoppingCart className="w-6 h-6" />
// //           </a>
// //         </div>

// //         {/* User Profile Icon */}
// //         <div
// //           className="relative"
// //           onMouseEnter={() => setUserDropdown(true)}
// //           onMouseLeave={() => setUserDropdown(false)}
// //         >
// //           <button className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
// //             <FaUserCircle className="w-7 h-7" />
// //           </button>

// //           {/* Dropdown Menu */}
// //           <ul
// //             className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${userDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
// //               }`}
// //           >
// //             <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //               <a href="/profile">Profile</a>
// //             </li>
// //             <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //               <a href="/settings">Settings</a>
// //             </li>
// //             <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //               <a href="/logout">Logout</a>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>

// //       {/* Mobile Search Bar (Visible when menu is open) */}
// //       {menuOpen && (
// //         <div ref={searchRef} className="absolute top-16 left-0 w-full px-4 py-2 bg-white md:hidden">
// //           <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden">
// //             <input
// //               type="text"
// //               placeholder="Search here..."
// //               className="w-full px-4 py-2 outline-none border-none"
// //               value={searchInput}
// //               onChange={handleSearchChange}
// //               onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
// //             />
// //             <button 
// //               type="submit" 
// //               className="flex items-center justify-center px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
// //             >
// //               <CiSearch className="w-5 h-5" />
// //             </button>
// //           </form>

// //           {/* Mobile Search Suggestions */}
// //           {showSuggestions && searchResults.length > 0 && (
// //             <ul className="bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
// //               {searchResults.map((result, index) => (
// //                 <li 
// //                   key={index} 
// //                   className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
// //                   onClick={() => handleSuggestionClick(result.link)}
// //                 >
// //                   <div className="text-gray-700">{result.name}</div>
// //                   {result.category && (
// //                     <div className="text-xs text-gray-500">in {result.category}</div>
// //                   )}
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       )}

// //       {/* User Dropdown for Mobile View */}
// //       {userDropdown && (
// //         <ul className="absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg md:hidden">
// //           <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //             <a href="/profile">Profile</a>
// //           </li>
// //           <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //             <a href="/settings">Settings</a>
// //           </li>
// //           <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //             <a href="/favourites">Favourites</a>
// //           </li>
// //           <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
// //             <a href="/logout">Logout</a>
// //           </li>
// //         </ul>
// //       )}
// //     </nav>
// //   );
// // }

// // export default Navbar;


// import React, { useState, useEffect, useRef } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
// import { HiShoppingCart } from "react-icons/hi2";
// import { FiMenu, FiX } from "react-icons/fi";
// import Cart from "./HomeComponents/Cart"; // ✅ Import Cart Component
// import { motion } from "framer-motion"; // ✅ Import Framer Motion for animation



// const data = [
//   { name: "Home", link: "/" },
//   { name: "About Us", link: "/about" },
//   {
//     name: "Rent a Product",
//     link: "/rental",
//     dropdown: [
//       { name: "Laptops", link: "/rental/laptops" },
//       { name: "Printer & Scanner", link: "/rental/printers" },
//       { name: "TV & Monitors", link: "/rental/monitors" },
//       { name: "Kitchen Appliance", link: "/rental/kitchen" },
//       { name: "Projector", link: "/rental/projectors" },
//       { name: "Tablet", link: "/rental/tablet" },
//       { name: "Audio & Karaoke", link: "/rental/audio" },
//       { name: "Air Purifier", link: "/rental/air" },
//       { name: "Playstation", link: "/rental/playstation" },
//       { name: "Video Conferencing", link: "/rental/video" },
//     ],
//   },
//   { name: "Contact Us", link: "/contact" },
// ];

// // Extract all searchable items for suggestions
// const allCategories = data.flatMap(item => 
//   item.dropdown 
//     ? item.dropdown.map(subItem => ({ 
//         name: subItem.name, 
//         link: subItem.link,
//         category: item.name
//       })) 
//     : [{ 
//         name: item.name, 
//         link: item.link,
//         category: null
//       }]
// );

// function Navbar() {

// const Navbar = ({ cartItems, setCartItems }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);
//   const [searchInput, setSearchInput] = useState("");
//   const [cartOpen, setCartOpen] = useState(false); // ✅ Toggle cart popup
//   const searchRef = useRef(null);

//   // Calculate cart count
//   const cartItemCount = cartItems.length;

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   return (
//     <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-3 py-4">
//       {/* Logo */}
//       <a href="/" className="flex items-center">
//         <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
//       </a>

//       {/* Cart Icon with Badge */}
//       <motion.button
//         onClick={() => setCartOpen(!cartOpen)}
//         className="relative p-2 hover:bg-gray-100 rounded-full"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <HiShoppingCart className="h-6 w-6 text-gray-600" />
        
//         {/* Show red badge only if cart has items */}
//         {cartItemCount > 0 && (
//           <motion.span 
//             className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           >
//             {cartItemCount}
//           </motion.span>
//         )}
//       </motion.button>

//       {/* Cart Popup */}
//       {cartOpen && (
//         <div className="absolute top-12 right-4 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
//           <Cart items={cartItems} setCartItems={setCartItems} onClose={() => setCartOpen(false)} />
//         </div>
//       )}
//     </nav>
//   );
// };

// };
// export default Navbar;



import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdNotificationsOutline } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi2";
import { FiMenu, FiX } from "react-icons/fi";

const data = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  {
    name: "Rent a Product",
    link: "/rental",
    dropdown: [
      { name: "Laptops", link: "/rental/laptops" },
      { name: "Printer & Scanner", link: "/rental/printers" },
      { name: "TV & Monitors", link: "/rental/monitors" },
      { name: "Kitchen Appliance", link: "/rental/kitchen" },
      { name: "Projector", link: "/rental/projectors" },
      { name: "Tablet", link: "/rental/tablet" },
      { name: "Audio & Karaoke", link: "/rental/audio" },
      { name: "Air Purifier", link: "/rental/air" },
      { name: "Playstation", link: "/rental/playstation" },
      { name: "Video Conferencing", link: "/rental/video" },
    ],
  },
  { name: "Contact Us", link: "/contact" },
];

// Extract all searchable items for suggestions
const allCategories = data.flatMap(item => 
  item.dropdown 
    ? item.dropdown.map(subItem => ({ 
        name: subItem.name, 
        link: subItem.link,
        category: item.name
      })) 
    : [{ 
        name: item.name, 
        link: item.link,
        category: null
      }]
);

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    if (value.trim() === "") {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    // Filter categories based on input
    const filtered = allCategories.filter(item => 
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSuggestions(true);
  };

  // Handle clicking outside of search to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to the first result
      window.location.href = searchResults[0].link;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (link) => {
    window.location.href = link;
    setShowSuggestions(false);
  };

  return (
    <nav className="fixed bg-white top-0 left-0 w-full shadow-md z-50 flex items-center justify-between px-3 py-4">
      {/* Logo */}
      <a href="#" className="flex items-center">
        <img src="/leaselinklogo.png" alt="Logo" className="w-[150px] h-[65px]" />
      </a>

      {/* Mobile Menu Button and User Icon */}
      <div className="flex items-center space-x-4 md:hidden">
        {/* Toggle Button */}
        <button
          className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>

        {/* User Icon */}
        <button
          className="p-2 bg-blue-50 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors duration-200"
          onClick={() => setUserDropdown(!userDropdown)}
        >
          <FaUserCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`md:flex md:items-center md:space-x-10 absolute md:static bg-white md:bg-transparent top-16 left-0 w-full md:w-auto shadow-md md:shadow-none transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden"
          } md:flex`}
      >
        {data.map((val, index) => (
          <li key={index} className="relative group px-6 md:px-0 py-2 md:py-0">
            {val.dropdown ? (
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="flex items-center text-gray-700 hover:text-blue-800 font-medium text-lg transition-colors duration-200">
                  {val.name}
                  <IoMdArrowDropdown className="ml-1 text-xl" />
                </div>

                {/* Dropdown Menu */}
                <ul
                  className={`absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${hovered ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}
                  style={{
                    maxHeight: "250px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {val.dropdown.map((item, subIndex) => (
                    <li key={subIndex} className="px-5 py-3 text-gray-700 hover:bg-blue-50 transition-all duration-200">
                      <a href={item.link} className="w-full block">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <a
                href={val.link}
                className="text-gray-700 hover:text-blue-800 font-medium block md:inline text-lg transition-colors duration-200"
              >
                {val.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Icons Section (Hidden in Mobile View) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Search Bar with Suggestions */}
        <div ref={searchRef} className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-4 py-2 outline-none border-none"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
            />
            <button 
              type="submit" 
              className="flex items-center justify-center px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
            >
              <CiSearch className="w-5 h-5" />
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchResults.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <li 
                  key={index} 
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSuggestionClick(result.link)}
                >
                  <div className="text-gray-700">{result.name}</div>
                  {result.category && (
                    <div className="text-xs text-gray-500">in {result.category}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notification and Shopping Cart Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
          >
            <IoMdNotificationsOutline className="w-6 h-6" />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:bg-blue-800 hover:text-white p-3 rounded-full transition-colors duration-200"
          >
            <HiShoppingCart className="w-6 h-6" />
          </a>
        </div>

        {/* User Profile Icon */}
        <div
          className="relative"
          onMouseEnter={() => setUserDropdown(true)}
          onMouseLeave={() => setUserDropdown(false)}
        >
          <button className="text-gray-600 hover:text-blue-800 transition-colors duration-200">
            <FaUserCircle className="w-7 h-7" />
          </button>

          {/* Dropdown Menu */}
          <ul
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${userDropdown ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
          >
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/profile">Profile</a>
            </li>
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/settings">Settings</a>
            </li>
            <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Search Bar (Visible when menu is open) */}
      {menuOpen && (
        <div ref={searchRef} className="absolute top-16 left-0 w-full px-4 py-2 bg-white md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-4 py-2 outline-none border-none"
              value={searchInput}
              onChange={handleSearchChange}
              onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
            />
            <button 
              type="submit" 
              className="flex items-center justify-center px-4 py-3 text-gray-600 transition-colors duration-200 hover:bg-blue-800 hover:text-white"
            >
              <CiSearch className="w-5 h-5" />
            </button>
          </form>

          {/* Mobile Search Suggestions */}
          {showSuggestions && searchResults.length > 0 && (
            <ul className="bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
              {searchResults.map((result, index) => (
                <li 
                  key={index} 
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                  onClick={() => handleSuggestionClick(result.link)}
                >
                  <div className="text-gray-700">{result.name}</div>
                  {result.category && (
                    <div className="text-xs text-gray-500">in {result.category}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* User Dropdown for Mobile View */}
      {userDropdown && (
        <ul className="absolute top-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg md:hidden">
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/profile">Profile</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/settings">Settings</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/favourites">Favourites</a>
          </li>
          <li className="px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200">
            <a href="/logout">Logout</a>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
