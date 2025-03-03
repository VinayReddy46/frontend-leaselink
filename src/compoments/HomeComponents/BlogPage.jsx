import React, { useState } from "react";
import { FaUser, FaRegCalendarAlt, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import LogoCarousel from "./LogoCarousel";
import AnimationScroller from "../../utils/AnimationScroller";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "There Are Many Variations Of The Passages Available Suffered",
      author: "Alicia Davis",
      date: "March 17, 2024",
      image: "https://live.themewild.com/carway/assets/img/blog/01.jpg",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo ac leo fermentum."
    },
    {
      id: 2,
      title: "There Are Many Variations Of The Passages Available Suffered",
      author: "Alicia Davis",
      date: "March 17, 2024",
      image: "https://live.themewild.com/carway/assets/img/blog/02.jpg",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo ac leo fermentum."
    },
    {
      id: 3,
      title: "There Are Many Variations Of The Passages Available Suffered",
      author: "Alicia Davis",
      date: "March 17, 2024",
      image: "https://live.themewild.com/carway/assets/img/blog/03.jpg",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo ac leo fermentum."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <LogoCarousel />
      <div className="text-center mb-12">
        <h1 className="text-2xl text-indigo-500 font-medium uppercase tracking-wider mb-2">OUR BLOG</h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center">
          <span className="text-gray-900">Latest News &</span>
          <span className="text-indigo-500 ml-2">Blog</span>
        </h2>
        <AnimationScroller />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const BlogCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
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
        <h3 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: expanded ? 1 : 0, height: expanded ? "auto" : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="text-gray-700 text-sm mt-2">{post.content}</p>
        </motion.div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center mt-4 px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
        >
          {expanded ? "Show Less" : "Read More"}
          {expanded ? <FaArrowUp className="h-4 w-4 ml-2" /> : <FaArrowRight className="h-4 w-4 ml-2" />}
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
