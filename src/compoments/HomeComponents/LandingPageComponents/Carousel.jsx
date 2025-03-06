import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

function ResponsiveCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Expanded slides with more content
  const slides = [
    {
      image:
        "https://img.freepik.com/premium-photo/bluecolored-electronic-gadgets-devices-arran_762785-77964.jpg?ga=GA1.1.1742722089.1732539385&semt=ais_hybrid",
      title: "Tech Gadgets",
      highlight: "Innovative",
      subtitle: "Devices",
      discount: "45% OFF TODAY!",
      description:
        "Explore the latest in cutting-edge technology and smart devices. From smartphones to wearables, we've got everything you need.",
      features: ["Latest models", "Extended warranty", "Free shipping"],
      color: "bg-indigo-600",
      buttonColor: "bg-indigo-700",
      ctaText: "Explore Technology",
      tag: "BESTSELLER",
    },
    {
      image:
        "https://media.istockphoto.com/id/637327254/photo/tv-living-room-with-window.jpg?s=612x612&w=0&k=20&c=eSLsRgyIZpU1g5FsZ1_pGb4bA-8Rrvj2dt73tDt2K8k=",
      title: "Home Entertainment",
      highlight: "Immersive",
      subtitle: "Systems",
      discount: "50% OFF THIS WEEK!",
      description:
        "Transform your living space with premium audio-visual solutions. Experience cinema-quality entertainment from the comfort of your home.",
      features: ["4K & 8K TVs", "Surround sound", "Smart integration"],
      color: "bg-teal-600",
      buttonColor: "bg-teal-700",
      ctaText: "Upgrade Home Setup",
      tag: "POPULAR",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Workstation Setup",
      highlight: "Efficient",
      subtitle: "Gear",
      discount: "40% OFF NOW!",
      description:
        "Boost productivity with top-tier workplace technology. Ergonomic designs combined with powerful performance for professionals.",
      features: ["Ergonomic designs", "High performance", "Connectivity options"],
      color: "bg-orange-600",
      buttonColor: "bg-orange-700",
      ctaText: "Optimize Workspace",
      tag: "NEW ARRIVAL",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Gaming Essentials",
      highlight: "Ultimate",
      subtitle: "Experience",
      discount: "35% OFF LIMITED TIME!",
      description:
        "Level up your gaming with state-of-the-art consoles, accessories, and peripherals designed for the serious gamer.",
      features: ["Latest consoles", "Gaming accessories", "VR equipment"],
      color: "bg-purple-600",
      buttonColor: "bg-purple-700",
      ctaText: "Game On",
      tag: "TRENDING",
    },
    {
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Smart Home",
      highlight: "Connected",
      subtitle: "Living",
      discount: "30% OFF EVERYTHING!",
      description:
        "Automate your home with cutting-edge smart devices. Control lighting, security, climate, and more from your smartphone.",
      features: ["Voice assistants", "Security systems", "Smart appliances"],
      color: "bg-blue-600",
      buttonColor: "bg-blue-700",
      ctaText: "Connect Your Home",
      tag: "EXCLUSIVE",
    },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  // Auto-play logic with pause functionality
  useEffect(() => {
    if (!isAutoScrollEnabled || isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalRef.current);
  }, [nextSlide, isPaused, isAutoScrollEnabled, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " ") {
        e.preventDefault(); // Prevent default spacebar behavior (scrolling)
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch navigation
  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // IntersectionObserver to pause when not in viewport
  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsPaused(true);
        } else if (entry.isIntersecting && isAutoScrollEnabled) {
          setIsPaused(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(carouselRef.current);
    return () => {
      if (carouselRef.current) {
        observer.disconnect();
      }
    };
  }, [isAutoScrollEnabled]);

  // Preload all images for smoother transitions
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  return (
    <div
      ref={carouselRef}
      className="relative w-full max-w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[100vh] overflow-hidden rounded-xl shadow-xl group bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        if (isAutoScrollEnabled) {
          setIsPaused(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-gray-200" aria-label="Slide progress">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: ((current + 1) / totalSlides) * 100 + "%" }}
        ></div>
      </div>

      {/* Auto-scroll toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsAutoScrollEnabled((prev) => !prev)}
          className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
          aria-label={isAutoScrollEnabled ? "Disable auto-scroll" : "Enable auto-scroll"}
        >
          {isAutoScrollEnabled ? (
            <FaPause className="text-white w-3 h-3" />
          ) : (
            <FaPlay className="text-white w-3 h-3" />
          )}
        </button>
      </div>

      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out transform-gpu h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
        aria-live="polite"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            aria-hidden={current !== index}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              loading={index === 0 || index === current ? "eager" : "lazy"}
            />

            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-4xl text-center text-white animate-fadeIn">
                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className={`${slide.color} px-2 py-1 text-xs font-bold rounded-md`}>
                    {slide.tag}
                  </span>
                </div>

                {/* Discount badge */}
                <span
                  className={`${slide.color} inline-block px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-4 transition-transform hover:scale-105 shadow-lg`}
                >
                  {slide.discount}
                </span>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4">
                  {slide.title}{" "}
                  <span className="text-blue-400">{slide.highlight}</span>{" "}
                  {slide.subtitle}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-[90%] sm:max-w-lg md:max-w-xl mx-auto mb-3 sm:mb-4 md:mb-6">
                  {slide.description}
                </p>

                {/* Features */}
                <div className="hidden sm:flex justify-center space-x-4 mb-4 md:mb-6">
                  {slide.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-xs md:text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                  <button
                    className={`${slide.buttonColor} text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg`}
                    aria-label={`Shop ${slide.title}`}
                  >
                    {slide.ctaText} →
                  </button>
                  <button
                    className="bg-white text-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 transform hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                    aria-label={`Learn more about ${slide.title}`}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-2 right-2 sm:left-4 sm:right-4 -translate-y-1/2 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <FaChevronLeft className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        >
          <FaChevronRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default ResponsiveCarousel;