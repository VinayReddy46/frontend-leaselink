import { useEffect, useState } from "react";

const LogoCarousel = () => {
  const logos = [
    { id: 1, name: "Hosoren", image: "https://live.themewild.com/carway/assets/img/partner/01.png" },
    { id: 2, name: "Business Review", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },
    { id: 3, name: "Hosoren Premium", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },
    { id: 4, name: "Business Connect", image: "https://live.themewild.com/carway/assets/img/partner/01.png" },
    { id: 5, name: "Hosoren Partner", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },
    { id: 6, name: "Business Elite", image: "https://live.themewild.com/carway/assets/img/partner/01.png" },
    { id: 7, name: "Global Tech", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },
    { id: 8, name: "Business Connect", image: "https://live.themewild.com/carway/assets/img/partner/01.png" },
    { id: 9, name: "Hosoren Partner", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },
    { id: 10, name: "Business Elite", image: "https://live.themewild.com/carway/assets/img/partner/01.png" },
    { id: 11, name: "Global Tech", image: "https://live.themewild.com/carway/assets/img/partner/02.png" },    
  ];

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => (prev <= -100 ? 0 : prev - 20));
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-50 py-16 mb-20 overflow-hidden">
      <div className="relative w-full flex items-center">
        {/* Moving Wrapper */}
        <div
          className="flex transition-transform duration-100 ease-in-out"
          style={{ transform:` translateX(${translateX}%) `}}
        >
          {logos.map((logo) => (
            <div key={logo.id} className="w-1/5 px-4 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center h-32">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="max-h-16 max-w-full opacity-70 hover:opacity-100 transition-opacity duration-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;