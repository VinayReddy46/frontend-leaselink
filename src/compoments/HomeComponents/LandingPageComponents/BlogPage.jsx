import React from "react";
import LogoCarousel from "../LandingPageComponents/LogoCarousel";
import { useState, useEffect } from "react";
import { FaUser, FaRegCalendarAlt, FaArrowRight } from "react-icons/fa";
import AnimationScroller from "../../../utils/AnimationScroller"

const BlogPage = () => {
  // const [blogPosts, setblogPosts]=useState([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/blogPosts") // Replace with your API URL
  //     .then((response) => {
  //       setblogPosts(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);
  
  // if (loading) {
  //   return <p>Loading blogPosts...</p>;
  // }
  
    const blogPosts = [
      {
        id: 1,
        title: "There Are Many Variations Of The Passages Available Suffered",
        author: "Alicia Davis",
        date: "March 17, 2024",
        image: "https://live.themewild.com/carway/assets/img/blog/01.jpg"
      },
      {
        id: 2,
        title: "There Are Many Variations Of The Passages Available Suffered",
        author: "Alicia Davis",
        date: "March 17, 2024",
        image: "https://live.themewild.com/carway/assets/img/blog/02.jpg"
      },
      {
        id: 3,
        title: "There Are Many Variations Of The Passages Available Suffered",
        author: "Alicia Davis",
        date: "March 17, 2024",
        image: "https://live.themewild.com/carway/assets/img/blog/03.jpg"
      }
    ];
  
    return (
      <div className="container mx-auto px-4 py-12">

        <LogoCarousel/>
    
        <div className="text-center mb-12">
          <h1 className="text-2xl text-indigo-500 font-medium uppercase tracking-wider mb-2">OUR BLOG</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center">
            <span className="text-gray-900">Latest News &</span>
            <span className="text-indigo-500 ml-2">Blog</span>
          </h2>

       
<AnimationScroller/>

        </div>



        
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="relative h-56 md:h-64 overflow-hidden">
            <img
              src={post.image}
              alt="Blog Post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <div className="flex items-center mr-6">
                <FaUser className="h-4 w-4 text-indigo-500 mr-1" />
                <span>By {post.author}</span>
              </div>

              <div className="flex items-center">
                <FaRegCalendarAlt className="h-4 w-4 text-indigo-500 mr-1" />
                <span>{post.date}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {post.title}
            </h3>

            <a
              href="#"
              className="inline-flex items-center mt-4 px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
            >
              Read More
              <FaArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>       

    
        <div className="mt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300">Previous</a>
            <a href="#" className="px-4 py-2 bg-indigo-500 text-white">1</a>
            <a href="#" className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300">2</a>
            <a href="#" className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300">3</a>
            <a href="#" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300">Next</a>
          </nav>
        </div>
        


      </div>
    );
  };
  
  export default BlogPage;