import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FiMenu,
  FiBarChart2,
  FiSettings,
  FiUsers,
  FiFileText,
  FiHelpCircle,
  FiTag,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiBarChart2 />, path: "dashboard" },
    {
      name: "Content Management",
      icon: <FiFileText />, 
      children: [
        { name: "FAQs", path: "faqs", icon: <FiHelpCircle /> },
        { name: "Categories", path: "categories", icon: <FiTag /> },
      ],
    },
    { name: "Users Management", icon: <FiUsers />, path: "users-management" },
    {
      name: "Customer Service",
      icon: <FiMessageSquare />,
      path: "customer-service",
    },
    { name: "Settings", icon: <FiSettings />, path: "settings" },
  ];

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside
      className={`h-screen bg-white flex flex-col py-4 px-2 fixed top-0 left-0 transition-all duration-300 shadow-lg z-20 ${
        isOpen || isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-6">
        {(isOpen || isHovered) && <span className="text-xl font-bold text-indigo-800 drop-shadow-sm">Admin Panel</span>}
        <button
          className="p-2 rounded hover:bg-indigo-200"
          onClick={toggleSidebar}
        >
          <FiMenu size={22} />
        </button>
      </div>

      <nav className="flex flex-col justify-between h-full space-y-1 ">
        <div>

       
        {menuItems.map((item, index) => (
          <div key={index} className={`relative my-2 ${
            location.pathname.includes(item.path) ? "border-r-4 border-indigo-600" : ""
          }`}>
            <NavLink to={item?.path}
              className={`flex items-center justify-between py-3 px-3 rounded-lg  cursor-pointer hover:bg-indigo-200 transition-all  ${
                location.pathname.includes(item.path) ? "font-semibold bg-indigo-200 " : ""
              }`}
              onClick={() => item.children && toggleMenu(item.name)}
            >
              <div  className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                {(isOpen || isHovered) && <span className="text-md font-medium">{item.name}</span>}
              </div>
              {item.children && (isOpen || isHovered) && (
                <span>
                  {openMenus[item.name] ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </span>
              )}
            </NavLink>

            {item.children && openMenus[item.name] && (
              <div className={`${isOpen || isHovered ?"ml-3":""} mt-1 space-y-2`}>
                {item.children.map((child, childIndex) => (
                   <div key={childIndex} className={`relative ${
                    location.pathname.includes(child.path) ? "border-r-4 border-indigo-600" : ""
                  }`}>
                  <NavLink
                    key={childIndex}
                    to={child.path}
                    className={`flex items-center gap-3 p-3 text-md rounded-lg hover:bg-indigo-200 transition-all ${
                      location.pathname.includes(child.path) ? "bg-indigo-200 font-semibold" : ""
                    }`}
                  >
                    <span className="text-lg">{child.icon}</span>
                    {(isOpen || isHovered) && <span>{child.name}</span>}
                  </NavLink>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}
         </div>
         
         <Link to="/">
  <div className="bg-blue-500 text-white py-3 px-3 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-all">
    <span className="text-lg">
      <FaHome />
    </span>
    {(isOpen || isHovered) && <span className="text-md font-medium">Home</span>}
  </div>
</Link>
         
         
      </nav>
    </aside>
  );
};

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-indigo-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="p-6 h-full">
          <div className="w-full min-h-full bg-white rounded-lg shadow p-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}