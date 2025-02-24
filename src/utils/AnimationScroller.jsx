import { useState, useEffect } from "react";

const AnimationScroller = () => {
  const [moveRight, setMoveRight] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setMoveRight((prev) => !prev);
    }, 2000); // Change direction every 2 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="flex items-center justify-center space-x-4 mt-4 ">
        <div className="w-28 h-4 flex items-center justify-center relative overflow-hidden rounded-full border-4 border-indigo-600">
          <div
            className={`w-6 h-1 bg-indigo-500 rounded-full absolute transition-transform duration-1000 ease-in-out ${
              moveRight ? "translate-x-[36px]" : "-translate-x-[36px]"
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default AnimationScroller;