import { useState } from 'react';
import { Button } from "primereact/button";
import { FaChevronDown } from 'react-icons/fa';
import { FaQuestion } from "react-icons/fa6";
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How Long Does A Car Rent Take ?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra."
    },
    {
      question: "How Can I Become A Member ?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra."
    },
    {
      question: "What Payment Gateway You Support ?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra."
    },
    {
      question: "How Can I Cancel My Request ?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        <div className="space-y-8">
          <div className="space-y-4">
          <h6 className="text-indigo-700 font-semibold  text-xl">
  FAQ'S
</h6>
<Button label="Increment" icon="pi pi-plus"  />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              General <span className="text-indigo-600">Frequently</span> Asked Questions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              There are many variations of passages of Lorem Ipsum available, but the 
              majority have suffered alteration in some form, by injected humour, or 
              randomised words which don't look even.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="https://live.themewild.com/carway/assets/img/faq/01.jpg"
              alt="Luxury Car"
              className="w-full h-[300px] object-cover"
            />
          </div>
        </div>

      
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-50  rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
            >
               
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === index}
              >
                <div className='bg-indigo-600 text-white p-3 rounded-lg'><FaQuestion size={16}/></div>
                <div className="flex items-center gap-4 ">
      <div className="flex items-center gap-4 border-t-2 border-transparent hover:border-indigo-500">
 
</div>


                  <span className={` font-bold  text-black-600 transition-transform duration-300 ${openIndex === index ? " text-indigo-600": ""}`}>{faq.question}</span>
                </div>
                <div className={`w-6 h-6  transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180 text-indigo-600' : ''
                  }`}><FaChevronDown/> </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-indigo-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;