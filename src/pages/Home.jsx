import React from 'react'
import Carousel from '../compoments/HomeComponents/Carousel'
import RentalCards from '../compoments/HomeComponents/RentalCards.jsx'
import CarRentalSection from '../compoments/HomeComponents/CarRentalSection.jsx'
import FeaturedBuildings from '../compoments/HomeComponents/FeauteredBuildings.jsx'
import BlogPage from '../compoments/HomeComponents/BlogPage.jsx'
import RentalProcess from '../compoments/HomeComponents/HowItsWork.jsx'
import WhyChooseUs from '../compoments/HomeComponents/WhyChooseUs.jsx'
import FAQSection from '../compoments/HomeComponents/FAQs.jsx'
// import ProductDetails from "./compoments/HomeComponents/ProductDetails";
import TestimonialsCarousel from '../compoments/HomeComponents/ScrollingTestimonials.jsx'
import ProductList from '../compoments/HomeComponents/ProductList.jsx'


const Home = () => {
  return (

    <>
       <div className="relative z-0"> {/* Ensure Home doesn’t overlap Navbar */}
        <Carousel />
        <ProductList/>
        <FeaturedBuildings/>
        <BlogPage/>
        <TestimonialsCarousel/>
        <RentalProcess/>
        <CarRentalSection/>
        <WhyChooseUs/> 
        <FAQSection/>
      </div>
      </>
    
  )
}

export default Home
