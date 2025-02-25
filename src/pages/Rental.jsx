import React, { useEffect } from 'react'

const Rental = () => {
  useEffect(()=>{
    window.scroll(0,0)
  },[])
  return (
    <div className='min-h-screen pt-32'>
    This is rental
  </div>
  )
}

export default Rental
