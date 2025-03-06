import React from 'react'
import Carousel from '../compoments/HomeComponents/LandingPageComponents/Carousel.jsx'
import RentalCards from '../compoments/Rentalcomponents/RentalCards.jsx'
import CarRentalSection from '../compoments/HomeComponents/LandingPageComponents/CarRentalSection.jsx'
import FeaturedBuildings from '../compoments/HomeComponents/LandingPageComponents/FeauteredBuildings.jsx'
import BlogPage from '../compoments/HomeComponents/LandingPageComponents/BlogPage.jsx'
import RentalProcess from '../compoments/HomeComponents/LandingPageComponents/HowItsWork.jsx'
import WhyChooseUs from '../compoments/HomeComponents/LandingPageComponents/WhyChooseUs.jsx'
import FAQSection from '../compoments/HomeComponents/LandingPageComponents/FAQs.jsx'
// import ProductDetails from "./compoments/HomeComponents/ProductDetails";
import TestimonialsCarousel from '../compoments/HomeComponents/LandingPageComponents/ScrollingTestimonials.jsx'
import ProductList from '../compoments/HomeComponents/LandingPageComponents/ProductList.jsx'


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
