import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import img1 from "../../assets/profile-1.webp";
import img2 from "../../assets/profile-2.webp";
import img3 from "../../assets/profile-3.webp";
import img4 from "../../assets/profile-4.webp";
import img5 from "../../assets/profile-5.webp";
import img6 from "../../assets/profile-6.webp";
import AnimationScroller from "../../utils/AnimationScroller";
import { FaRegStar } from "react-icons/fa6";

const TestimonialsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Parker Jimenez",
      role: "Customer",
      image: img1,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 5,
    },
    {
      id: 2,
      name: "Heruli Nez",
      role: "Customer",
      image: img2,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 2,
    },
    {
      id: 3,
      name: "Sylvia H Green",
      role: "Customer",
      image: img3,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 5,
    },
    {
      id: 4,
      name: "Gordo Novak",
      role: "Customer",
      image: img4,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 3,
    },
    {
      id: 5,
      name: "Jon Nez",
      role: "Customer",
      image: img5,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 4,
    },
    {
      id: 6,
      name: "Ram",
      role: "Customer",
      image: img6,
      text: "There are many variations of passages available but the majority have suffered to the alteration in some injected.",
      rating: 5,
    },
  ];

  const cardsPerView = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
  };

  // Get current cards per view based on screen size
  const getCurrentCardsPerView = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    if (width < 768) return cardsPerView.mobile;
    if (width < 1280) return cardsPerView.tablet;
    return cardsPerView.desktop;
  };

  // Calculate max slide index based on current view
  const getMaxSlideIndex = () => {
    const currentCardsPerView = getCurrentCardsPerView();
    return Math.max(0, testimonials.length - currentCardsPerView);
  };

  // Auto scroll functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => {
          const maxIndex = getMaxSlideIndex();
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const maxIndex = getMaxSlideIndex();
      if (activeSlide > maxIndex) {
        setActiveSlide(maxIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSlide]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  // Calculate translation percentage based on screen size
  const getTranslationPercentage = () => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    if (width < 768) return activeSlide * 100; // 1 card (100% width)
    if (width < 1280) return activeSlide * 50; // 2 cards (50% width each)
    return activeSlide * 25; // 4 cards (25% width each)
  };

  // Calculate card width class based on screen size
  const getCardWidthClass = () => {
    return "w-full md:w-1/2 xl:w-1/4";
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-indigo-500 font-medium uppercase tracking-wider mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Client <span className="text-indigo-500">Say's</span>
          </h2>
          <AnimationScroller />
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${getTranslationPercentage()}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${getCardWidthClass()} flex-shrink-0 px-3 min-h-96 items-center `}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="">
                  <div className=" w-28 h-28 p-1 relative top-12 left-4 z-10 flex items-center justify-center rounded-full " style={{borderLeft:"6px solid blue", borderRight:"6px solid blue", borderTop:"6px solid oklch(0.21 0.034 264.665)", borderBottom:"6px solid white",}}>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className=" w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white text-gray-800  pt-14 rounded-lg p-6 relative overflow-hidden shadow-lg">
                  <div className="absolute top-8 right-5  opacity-30">
                    {/* <FaQuoteRight size={100} /> */}
                    <img
                      src="https://live.themewild.com/carway/assets/img/icon/quote.svg"
                      className="w-24"
                    />
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-indigo-500">{testimonial.role}</p>

                      <p className="my-4 text-gray-600">{testimonial.text}</p>

                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400" />
                        ))}
                        {testimonial.rating !== 5
                          ? [...Array(5 - testimonial.rating)].map((_, i) => (
                              <FaRegStar key={i} className="text-yellow-400" />
                            ))
                          : " "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(getMaxSlideIndex() + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index ? "w-8 bg-indigo-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;