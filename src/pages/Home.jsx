import React from 'react'
import BlogPage from '../compoments/home/Blogpage'
import ProcessStep from "../compoments/home/HowItsWork"
import WhyChooseUs from '../compoments/home/WhyChooseUs'
import FAQSection from '../compoments/home/FAQs'
import TestimonialsCarousel from '../compoments/home/ScrollingTestimonials'
import { IoMdArrowRoundUp } from "react-icons/io";
TestimonialsCarousel
const Home = () => {
  return (
    <div>
      <BlogPage/>
      <ProcessStep/>
      <WhyChooseUs/>
      <FAQSection/>
      <TestimonialsCarousel/>
       {/* Scroll to Top Button */}
       <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <IoMdArrowRoundUp size={32}/>
        </button>
      </div>
    </div>
  )
}

export default Home
