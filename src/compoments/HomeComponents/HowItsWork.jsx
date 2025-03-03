import React from 'react';
import { FaMapMarkerAlt, FaCar, FaCreditCard, FaCarSide } from 'react-icons/fa';
import { TiChevronRight } from "react-icons/ti";
import AnimationScroller from "../../utils/AnimationScroller"

const ProcessStep = ({ number, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center max-w-xs mx-auto">
      <div className="relative w-32 flex items-center justify-center pt-3">
      <div className="absolute top-0 left-0 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg text-white font-bold z-10">
    {number}
  </div>
        <div className="flex items-center justify-center w-28 h-28  rounded-full mb-4 border-2 border-indigo-600 ">
         <div className="relative w-24 h-24 flex items-center justify-center bg-indigo-600 rounded-full overflow-hidden group">
  {/* Icon */}
  <div className="text-white text-3xl z-10">
    {icon}
  </div>

  {/* Radial Hover Effect */}
  <div className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
</div>
        </div>
      </div>
      <div className='w-64 text-center'>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 text-center ">{description}</p>
      </div>
      
    </div>
  );
};

const ProcessStepConnector = () => (
  <div className="hidden md:flex items-center justify-center relative -top-14">
    <div className="flex space-x-1 items-center justify-center">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={` bg-gray-300 rounded-full`} style={{width:`${(i+2)*2}px`, height:`${(i+2)*2}px`}}/>
      ))}
      <div className="relative -left-2 text-gray-300"><TiChevronRight size={32}/></div>
    </div>
  </div>
);

const RentalProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Pick Destination',
      description: 'Select your pickup location and desired destination for your journey.',
      icon: <FaMapMarkerAlt />
    },
    {
      number: '02',
      title: 'Choose Perfect Car',
      description: 'Browse through our fleet and select the vehicle that suits your needs.',
      icon: <FaCar />
    },
    {
      number: '02',
      title: 'Online Payment',
      description: 'Securely complete your reservation with our easy payment system.',
      icon: <FaCreditCard />
    },
    {
      number: '03',
      title: 'Enjoy Your Car Ride',
      description: 'Pick up your vehicle and enjoy the freedom of the open road.',
      icon: <FaCarSide />
    }
  ];

  return (
    <div className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-600 font-medium uppercase tracking-wider mb-2">PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            How It's <span className="text-indigo-600">Work</span>
          </h2>
          <AnimationScroller/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`md:col-span-${index === steps.length - 1 ? '1' : '1'}`}>
                <ProcessStep {...step} />
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block md:col-span-1">
                  <ProcessStepConnector />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalProcess;