import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const categories = [
  { label: "Vehicles", options: ["Car", "Bike", "Truck", "Auto", "Bicycle", "Boat", "Fans"] },
  { label: "Apparel", options: ["Clothing", "Shoes", "Accessories", "Grooming", "Watches"] },
  { label: "Electronics", options: ["Laptop", "Mobile", "Camera", "Television", "Tablet", "Projector", "Speakers"] },
  { label: "Real Estate", options: ["Apartment", "House", "Office", "Workspace"] },
];

const pricingOptions = ["Below $50", "$50 - $200", "$200 - $500", "$500 - $600", "Above $600"];

const dummyListings = [
  
  { id: 1, name: "Sedan Car", category: "Car", price: "$200/day", image: "https://images.pexels.com/photos/12353734/pexels-photo-12353734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 2, name: "Sports Bike", category: "Bike", price: "$100/day", image: "https://images.pexels.com/photos/167676/pexels-photo-167676.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, name: "Luxury SUV", category: "Car", price: "$300/day", image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 4, name: "Pickup Truck", category: "Truck", price: "$150/day", image: "https://images.pexels.com/photos/1889703/pexels-photo-1889703.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 5, name: "Auto Rickshaw", category: "Auto", price: "$50/day", image: "https://images.pexels.com/photos/278234/pexels-photo-278234.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 6, name: "Convertible Sports Car", category: "Car", price: "$400/day", image: "https://images.pexels.com/photos/129105/pexels-photo-129105.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 7, name: "Electric Bicycle", category: "Bicycle", price: "$40/day", image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 8, name: "Luxury Yacht", category: "Boat", price: "$2000/day", image: "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 9, name: "Jet Ski", category: "Boat", price: "$300/day", image: "https://images.pexels.com/photos/2204807/pexels-photo-2204807.jpeg?auto=compress&cs=tinysrgb&w=600" },

  
  { id: 10, name: "Formal Suit", category: "Clothing", price: "$90/day", image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 11, name: "Running Shoes", category: "Shoes", price: "$30/day", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 12, name: "Leather Jacket", category: "Clothing", price: "$80/day", image: "https://images.pexels.com/photos/841129/pexels-photo-841129.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 13, name: "Luxury Watch", category: "Watches", price: "$200/day", image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 14, name: "Designer Handbag", category: "Accessories", price: "$100/day", image: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 15, name: "Men's Grooming Kit", category: "Grooming", price: "$25/day", image: "https://images.pexels.com/photos/593823/pexels-photo-593823.jpeg?auto=compress&cs=tinysrgb&w=600" },

  // Electronics
  { id: 16, name: "Gaming Laptop", category: "Laptop", price: "$150/day", image: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 17, name: "Smartphone", category: "Mobile", price: "$50/day", image: "https://images.pexels.com/photos/301401/pexels-photo-301401.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 18, name: "Projector", category: "Projector", price: "$80/day", image: "https://images.pexels.com/photos/5661826/pexels-photo-5661826.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 19, name: "Smart TV", category: "Television", price: "$120/day", image: "https://images.pexels.com/photos/4009409/pexels-photo-4009409.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 20, name: "Wireless Speaker", category: "Speakers", price: "$20/day", image: "https://images.pexels.com/photos/3394661/pexels-photo-3394661.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 21, name: "DSLR Camera", category: "Camera", price: "$100/day", image: "https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 22, name: "Smart Tablet", category: "Tablet", price: "$60/day", image: "https://images.pexels.com/photos/359757/pexels-photo-359757.jpeg?auto=compress&cs=tinysrgb&w=600" },

  // Real Estate
  { id: 23, name: "Studio Apartment", category: "Apartment", price: "$500/month", image: "https://images.pexels.com/photos/4038322/pexels-photo-4038322.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 24, name: "Luxury Villa", category: "House", price: "$2500/month", image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 25, name: "Office Space", category: "Office", price: "$1000/month", image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 26, name: "Co-working Space", category: "Workspace", price: "$300/month", image: "https://images.pexels.com/photos/3182761/pexels-photo-3182761.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 27, name: "Beachfront Apartment", category: "Apartment", price: "$4000/month", image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

export default function RentalList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");  
  const [selectedPrice, setSelectedPrice] = useState("");

  // const [dummyListings, setdummyListings]=useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/dummyListings") // Replace with your API URL
  //     .then((response) => {
  //       setdummyListings(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);
  
  // if (loading) {
  //   return <p>Loading dummyListings...</p>;
  // }

  const filteredListings = dummyListings.filter((listing) =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? listing.category === selectedCategory : true)
  );

  return (
    <div className="max-w-6xl mx-auto p-10 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-3xl border border-gray-300">
      <h2 className="text-3xl font-bold text-gray-900 text-center tracking-wide">Find Your Perfect Rental</h2>
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          className="w-full p-4 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          placeholder="Search rentals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="p-6 bg-white rounded-lg flex flex-wrap gap-4 justify-center shadow-md border border-gray-200">
        {categories.map((cat, index) => (
          <select
            key={index}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-48 p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all"
          >
            <option value="">{cat.label}</option>
            {cat.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        ))}
        <select
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="w-48 p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all"
        >
          <option value="">Select Price</option>
          {pricingOptions.map((price, idx) => (
            <option key={idx} value={price}>{price}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover rounded-lg" />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{listing.name}</h3>
              <p className="text-gray-600 text-sm">{listing.category}</p>
              <p className="text-indigo-600 font-bold text-lg">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

