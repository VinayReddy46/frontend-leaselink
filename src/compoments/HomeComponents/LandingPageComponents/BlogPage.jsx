import React, { useState } from "react";
import LogoCarousel from "../LandingPageComponents/LogoCarousel";
import { FaRegCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import AnimationScroller from "../../../utils/AnimationScroller";
import { useGetBlogsQuery } from "../../../redux/services/blogSlice";

const BlogPage = () => {
  const { data: posts = [] } = useGetBlogsQuery();
  const [openPosts, setOpenPosts] = useState({});

  const togglePost = (postId) => {
    setOpenPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle the specific post
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <LogoCarousel />

      <div className="text-center mb-12">
        <h1 className="text-2xl text-indigo-500 font-medium uppercase tracking-wider mb-2">
          OUR BLOG
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center">
          <span className="text-gray-900">Latest News &</span>
          <span className="text-indigo-500 ml-2">Blog</span>
        </h2>

        <AnimationScroller />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={post.image.url}
                alt="Blog Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-col items-start justify-between">
              <div className="">
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <FaRegCalendarAlt className="h-4 w-4 text-indigo-500 mr-1" />
                  <span>{post.createdAt}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {post.title}
              </h3>
              </div>
           

              <button
                onClick={() => togglePost(post._id)}
                className="inline-flex items-center justify-between gap-3 my-2 px-5 py-2 rounded-md bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors"
              >
                {openPosts[post._id] ? "Read Less" : "Read More"}
                {openPosts[post._id] ? (
                  <FaChevronUp className="" />
                ) : (
                  <FaChevronDown className="" />
                )}
              </button>

              {openPosts[post._id] && (
                <div className=" text-gray-700">
                  <p>{post.description}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
