import { useEffect, useState } from "react";

function Carousel() {
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const nextImg = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => {
      clearInterval(nextImg);
    };
  }, [current]);

  const slides = [
    {
      image: "http://getwallpapers.com/wallpaper/full/3/3/4/490956.jpg",
      title: "Camera Rental In Your",
      highlight: "Desired",
      subtitle: "Destination",
      discount: "50% OFF RESERVED NOW!",
      description:
        "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.",
    },
    {
      image: "http://getwallpapers.com/wallpaper/full/3/3/4/490956.jpg",
      title: "Phone Rental In Your",
      highlight: "Desired",
      subtitle: "Destination",
      discount: "50% OFF RESERVED NOW!",
      description:
        "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.",
    },
    {
      image: "http://getwallpapers.com/wallpaper/full/3/3/4/490956.jpg",
      title: "Property Rental In Your",
      highlight: "Desired",
      subtitle: "Destination",
      discount: "50% OFF RESERVED NOW!",
      description:
        "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.",
    },
  ];

  return (
    <div className="relative  z-0 w-full h-[500px] md:h-screen overflow-hidden mt-16">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative bg-cover"
          >
            <img
              src={slide.image}
              alt="Slide"
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex px-4 sm:px-10">
              <div
                className="max-w-2xl text-center text-white"
                style={{ marginTop: "10%", marginLeft: "10%" }}
              >
                <span className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold">
                  {slide.discount}
                </span>

                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4">
                  {slide.title}{" "}
                  <span className="text-blue-400">{slide.highlight}</span>{" "}
                  {slide.subtitle}
                </h1>

                <p className="mt-2 sm:mt-4 text-sm sm:text-lg md:text-xl opacity-90">
                  {slide.description}
                </p>

                <div className="mt-4 sm:mt-6 flex flex-row sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-4 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold">
                    About More →
                  </button>
                  <button className="bg-white hover:bg-gray-200 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 bg-gray-700 text-white p-2 sm:p-3 md:p-4 rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        ❯
      </button>
    </div>
  );
}

export default Carousel;