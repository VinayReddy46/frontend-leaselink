import React from 'react'
import Carousel from '../compoments/HomeComponents/Carousel'
import RentalCards from '../compoments/HomeComponents/RentalCards.jsx'
import RentalList from '../compoments/HomeComponents/RentalList.jsx'
import CarRentalSection from '../compoments/HomeComponents/CarRentalSection.jsx'
import FeaturedBuildings from '../compoments/HomeComponents/FeauteredBuildings.jsx'
import Rent from '../compoments/HomeComponents/Rent.jsx'


const Home = () => {
  return (

    <>
       <div className="relative z-0"> {/* Ensure Home doesn’t overlap Navbar */}
        <Carousel />
        <RentalList/>
        <RentalCards/>
        
        <FeaturedBuildings/>
        <Rent/>
        <CarRentalSection/>
      </div>
      </>
    
  )
}

export default Home
