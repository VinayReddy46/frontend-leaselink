import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { FiUser, FiSettings } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./navbarComponents/Notifications";
import { AiOutlineProduct } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import Wallet from "./navbarComponents/Wallet";
import { logout } from "../redux/features/authSlice";
import { useGetCategoriesQuery } from "../redux/services/categoriesSlice";
import { useCountCartItemsQuery } from "../redux/services/cartApiSlice";

function Navbar() {
  const { userInfo, isAuthenticated } = useSelector(state => state.auth);
  const userId = userInfo?.id;
  
  // Fetch cart count from API
  const { data: cartCountData } = useCountCartItemsQuery(userId, {
    skip: !userId // Skip the query if userId is not available
  });
  
  // Get cart count from API response
  const cartCount = cartCountData?.count || 0;
  
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = 'user'; // This would normally come from your auth context/state
  
  // Fetch categories
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  // Navigation data with icons
  const data = [
    {
      name: "Home",
      link: "/",

    },
    {
      name: "About Us",
      link: "/aboutus",

    },
    {
      name: "Rent a Product",
      link: "/rental",
      // Replace hardcoded dropdown with dynamic categories
      dropdown: error ? [
        { name: "Error loading categories", link: "/rental" }
      ] : isLoading ? [
        { name: "Loading categories...", link: "/rental" }
      ] : categoriesData?.categories ? 
        [
          { name: "All Products", link: "/rental" },
          ...categoriesData.categories.map(category => ({
            name: category.name,
            link: `/rental/${category._id}`,
            categoryId: category._id // Store ID for reference
          }))
        ] : 
        // Fallback if categories are not available yet
        [
          { name: "No categories available", link: "/rental" }
        ],
    },
    role === 'user1' ?
      { name: "Add Product", link: "/addproduct" }
      : { name: "Dashboard", link: "/admin" }
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

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login', { state: { returnUrl: '/home' } });
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  };

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
      navigate(searchResults[0].link);
      setSearchInput("");
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (link) => {
    navigate(link);
    setSearchInput("");
    setShowSuggestions(false);
  };

  // Check if current path matches a menu item
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-screen bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/leaselinklogo.png" alt="Logo" className="w-auto h-12" />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on Mobile */}
          <div className="hidden lg:flex items-center justify-center">
            {data.map((item, index) => (
              <div key={index} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        setHovered(hovered === item.name ? null : item.name);
                      }}
                      className={`flex items-center space-x-1.5 px-2 py-1 rounded-md text-base font-medium transition-colors duration-200 
                     ${isActive(item.link) ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
                    >
                      <span className="ml-1.5">{item.name}</span>
                      <IoMdArrowDropdown className="text-xl" />
                    </button>

                    {/* Dropdown Panel */}
                    <div
                      className={`absolute left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-20 transition-all duration-200 ease-in-out transform origin-top-left
                   ${hovered === item.name ? "opacity-100 max-h-72 overflow-y-auto visible" : "opacity-0 max-h-0 invisible"}`}
                    >
                      <div className="p-2 max-h-96 grid grid-cols-2 gap-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className={`block px-4 py-3 text-sm rounded-md hover:bg-blue-50 transition-colors duration-150 text-gray-700`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 
                   ${isActive(item.link) ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>

            ))}
          </div>

          {/* Right side elements: Search, notifications, cart, user */}
          <div className="flex items-center space-x-5">
            {/* Desktop Search */}
            <div ref={searchRef} className="hidden md:block relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-60 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <CiSearch className="w-5 h-5" />
                  </span>
                </div>
              </form>

              {/* Search Suggestions */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <ul className="py-1 max-h-64 overflow-y-auto">
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
                </div>
              )}
            </div>

            {/* Notification and Cart Icons */}
            <div className="flex items-center space-x-2">
             
              <Notifications />

              <Link to="/cart" className="p-2.5 text-gray-600 rounded-full hover:bg-gray-100 hover:text-blue-600 transition-colors relative">
                <FaShoppingCart className="w-5 h-5" />
                

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold px-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
               <Wallet/>
            </div>

            {/* User Profile or Login Button */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <div
                  className="relative"
                // onMouseEnter={() => setUserDropdown(true)}
                // onMouseLeave={() => setUserDropdown(false)}
                >
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setUserDropdown(!userDropdown)}>
                    <FaUserCircle className="w-7 h-7" />
                  </button>

                  {/* User Dropdown */}
                  <div
                    className={`absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200 ease-in-out transform origin-top-right
                      ${userDropdown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                  >
                    <div className="border-b border-gray-100 p-4">
                      <p className="text-sm font-medium text-gray-700">Welcome back!</p>
                      <p className="text-xs text-gray-500">Manage your account</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setUserDropdown(!userDropdown)}
                      >
                        <FiUser className="w-4 h-4 mr-3 text-gray-500" />
                        My Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setUserDropdown(!userDropdown)}>
                        <FiSettings className="w-4 h-4 mr-3 text-gray-500" />
                        Settings
                      </Link>
                      <Link
                        to="/bank"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <AiOutlineProduct className="w-4 h-4 mr-3 text-gray-500" />
                        <span>Bank Details</span>
                      </Link>
                      <Link
                        to="/myrentedproducts"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        <AiOutlineProduct className="w-4 h-4 mr-3 text-gray-500" />
                        <span>My lending orders</span>
                      </Link>
                      <Link to="/myorders" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setUserDropdown(!userDropdown)}>
                        <IoCartOutline className="w-4 h-4 mr-3 text-gray-500" />
                        My rental Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        <HiOutlineLogout className="w-4 h-4 mr-3 text-gray-500" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only visible when menu is open */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {/* Mobile Search */}
          <div className="py-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-lg overflow-hidden border border-gray-300"
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-2 py-2.5 focus:outline-none"
                value={searchInput}
                onChange={handleSearchChange}
                onFocus={() => searchInput.trim() !== "" && setShowSuggestions(true)}
              />
              <button type="submit" className="px-4 py-2.5 bg-gray-100 text-gray-700">
                <CiSearch className="w-5 h-5" />
              </button>
            </form>

            {/* Mobile Search Results */}
            {showSuggestions && searchResults.length > 0 && (
              <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="py-1 max-h-64 overflow-y-auto">
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
              </div>
            )}
          </div>

          {/* Mobile Navigation Links */}
          {data.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <div className="space-y-1  ">
                  {/* Dropdown Title */}
                  <button
                    onClick={() => setHovered(hovered === item.name ? null : item.name)}
                    className={`flex justify-between items-center w-full px-3 py-2.5 rounded-md text-left 
                      ${isActive(item.link)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    <span className="flex items-center">
                      {item.name}
                    </span>
                    <IoMdArrowDropdown className={`text-xl transition-transform duration-200 ${hovered === item.name ? "transform rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Items */}
                  <div
                    className={`transition-all duration-200 ease-in-out overflow-hidden
                      ${hovered === item.name ? "max-h-72 opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}
                  >
                    <div className="pl-5 pr-3  space-y-1 border-l-2 border-gray-100 ml-3">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className={`block px-3 py-2 rounded-md text-sm
                            ${isActive(subItem.link)
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-600 hover:bg-gray-50"}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={item.link}
                  className={`flex items-center px-3 py-2.5 rounded-md text-base
                    ${isActive(item.link)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile User Controls */}
          <div className="pt-2 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-700">Account</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUser className="w-5 h-5 mr-2" />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiSettings className="w-5 h-5 mr-2" />
                  <span>Settings</span>
                </Link>
                <Link
                  to="/myrentedproducts"
                  className="flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaShoppingCart className="w-5 h-5 mr-2" />
                  <span>My Rented Products</span>
                </Link>
                <Link
                  to="/myorders"
                  className="flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaShoppingCart className="w-5 h-5 mr-2" />
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <HiOutlineLogout className="w-5 h-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLoginClick();
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;