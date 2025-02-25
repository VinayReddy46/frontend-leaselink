import { useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";



const products = [
    { id: 1, name: "Laptop", category: "laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",rating:1,},
    { 
      id: 2, 
      name: "Ultrabook", 
      category: "Laptops", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2071&auto=format&fit=crop", 
      rating: 2, 
     
    },
    { 
      id: 3, 
      name: "Business Laptop", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1570215171323-4ec3273c67e3?q=80&w=2071&auto=format&fit=crop", 
      rating: 5, 
       
    },
    { 
      id: 4, 
      name: "MacBook Pro", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2071&auto=format&fit=crop", 
      rating: 5, 
      
    },
    { 
      id: 5, 
      name: "Budget Laptop", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1570215171323-4ec3273c67e3?q=80&w=2071&auto=format&fit=crop", 
      rating: 3, 
       
    },
    { 
      id: 6, 
      name: "2-in-1 Convertible", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=2071&auto=format&fit=crop", 
      rating: 4, 
       
    },
    { 
      id: 7, 
      name: "Workstation Laptop", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=2071&auto=format&fit=crop", 
      rating: 5, 
    },
    { 
      id: 8, 
      name: "Chromebook", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=2071&auto=format&fit=crop", 
      rating: 3, 
    },
    { 
      id: 9, 
      name: "Student Laptop", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1570215171323-4ec3273c67e3?q=80&w=2071&auto=format&fit=crop", 
      rating: 4, 
    },
    { 
      id: 10, 
      name: "High-Performance Laptop", 
      category: "laptops", 
      image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=2071&auto=format&fit=crop", 
      rating: 5, 
  
    },
  
    { id: 11, name: "Gaming Laptop", category: "Laptops", image: "https://images.unsplash.com/photo-1560252719-59e35a3bbc6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, name: "projector", category: "Projectors", image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    {
      id: 13,
      name: "4K Ultra HD Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1606778302966-168f652ffbe0?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 14,
      name: "Portable Mini Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1612787163347-2755ef97a17f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 15,
      name: "LED Home Theater Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 16,
      name: "Wireless Smart Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1603202521294-0a95dc4c1c35?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 17,
      name: "Business Presentation Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1550953855-9a5035b62e1d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 18,
      name: "Full HD 1080p Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 19,
      name: "Gaming Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 20,
      name: "Short Throw Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1619021570158-b157e625d945?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 21,
      name: "Laser Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1571247901945-607c7f4b029e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 22,
      name: "Conference Room Projector",
      category: "projectors",
      image: "https://images.unsplash.com/photo-1590658268034-7262cb574b37?q=80&w=2070&auto=format&fit=crop",
    },
    { id: 23, name: "Smart TV", category: "tv&monitors", image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=2077&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    {
      id: 24,
      name: "Smart TV",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=2077&auto=format&fit=crop",
    },
    {
      id: 25,
      name: "4K Ultra HD TV",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4bde?q=80&w=2077&auto=format&fit=crop",
    },
    {
      id: 26,
      name: "Curved OLED TV",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1527718641255-324f8e2d0421?q=80&w=2077&auto=format&fit=crop",
    },
    {
      id: 27,
      name: "Gaming Monitor",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1543764477-67ba21c9f5b3?q=80&w=2077&auto=format&fit=crop",
    },
    {
      id: 28,
      name: "Ultra-Wide Monitor",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1611186871348-b2e077bdaa4d?q=80&w=2077&auto=format&fit=crop",
    },
    {
      id: 29,
      name: "Portable Monitor",
      category: "tv&monitors",
      image: "https://images.unsplash.com/photo-1622017029353-22d30ea4ab37?q=80&w=2077&auto=format&fit=crop",
    },
    { id: 5, name: "playstation-5", category: "gaming", image: "" },
    { id: 2, name: "Bike", category: "bike", image: "" },
    { id: 3, name: "Car", category: "cars", image: "" },
    { id: 4, name: "Air Conditioner", category: "aircooler", image: "tv.jpg" },
    { id: 5, name: "PlayStation 5", category: "gaming", image: "ps5.jpg" },
  ];
function SearchResults() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q") || "";
  
    
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  

    const renderStars = (rating) => {
      const stars = Math.round(rating); 
      return "★".repeat(stars) + "☆".repeat(5 - stars);
    };
  
    return (
      <div className="p-12 mt-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Search Results for "<span className="text-blue-600">{query}</span>"
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-1">{product.category}</p>
  
          
                <p className="text-yellow-500 text-lg font-bold mb-2">
                  {renderStars(product.rating)} ({product.rating})
                </p>
  
            
                <p className="text-gray-700 mb-4 text-sm">
                  <strong>Description:</strong> {product.description || "No description available."}
                </p>
  
                <div className="flex flex-wrap gap-3 mt-4">
                  <button className="w-full md:w-auto px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-green-700 transition">
                    <FiShoppingCart/>
                  </button>
                  <button className="w-full md:w-auto px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-red-700 transition">
                    <FaRegHeart/>
                  </button>
                  <button className="w-full md:w-auto px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-yellow-500 transition">
                    <IoChatboxOutline/>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700">No products found.</p>
          )}
        </div>
      </div>
    );
  }
  export default SearchResults;