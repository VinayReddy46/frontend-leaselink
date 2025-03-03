
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const FAQManager = () => {
  const initialFaqs = [
    {
      id: 1,
      question: "How Long Does A Car Rent Take?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra.",
    },
    {
      id: 2,
      question: "How Can I Become A Member?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra.",
    },
    {
      id: 3,
      question: "What Payment Gateway You Support?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra.",
    },
    {
      id: 4,
      question: "How Can I Cancel My Request?",
      answer: "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire. Ante odio dignissim quam, vitae pulvinar turpis erat ac elit eu orci id odio facilisis pharetra.",
    },
  ];

  const [faqs, setFaqs] = useState(initialFaqs);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: "", answer: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFaq({ ...currentFaq, [name]: value });
  };

  const handleAddFaq = () => {
    setShowAddForm(true);
    setEditMode(false);
    setCurrentFaq({ id: null, question: "", answer: "" });
  };

  const handleEditFaq = (faq) => {
    setShowAddForm(true);
    setEditMode(true);
    setCurrentFaq({ ...faq });
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter((faq) => faq.id !== id));
    }
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();

    if (!currentFaq.question || !currentFaq.answer) {
      alert("Please fill in all fields");
      return;
    }

    if (editMode) {
      setFaqs(faqs.map((faq) => (faq.id === currentFaq.id ? { ...currentFaq } : faq)));
    } else {
      const newId = Math.max(...faqs.map((faq) => faq.id), 0) + 1;
      setFaqs([...faqs, { ...currentFaq, id: newId }]);
    }

    setCurrentFaq({ id: null, question: "", answer: "" });
    setEditMode(false);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setCurrentFaq({ id: null, question: "", answer: "" });
    setEditMode(false);
    setShowAddForm(false);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className=" ">
        <h1 className="text-3xl font-bold text-indigo-800 mb-4 flex items-center">
          <i className="pi pi-question-circle mr-2 text-2xl text-center"></i> FAQ Manager
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-2/3">
            <span className="p-input-icon-left w-full">
              
              <InputText
                placeholder="Search FAQs..."
                className="w-full p-2 rounded-lg backdrop-blur-sm bg-white/70 border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                
              />
             
              
            </span>
          </div>
          <button
            onClick={handleAddFaq}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <i className="pi pi-plus mr-2"></i> Add New FAQ
          </button>
        </div>

        {(showAddForm || editMode) && (
          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg mb-6 transform transition-all duration-300 animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center">
              <i className="pi pi-pencil mr-2"></i> {editMode ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <form onSubmit={handleSaveFaq}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Question</label>
                <InputText
                  name="question"
                  value={currentFaq.question}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter FAQ question"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">Answer</label>
                <InputText
                  name="answer"
                  value={currentFaq.answer}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter FAQ answer"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-times mr-2"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <i className="pi pi-check mr-2"></i> Save
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4  rounded-lg">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className=" border-2 border-gray-200  rounded-lg overflow-hidden  transform transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center p-2 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-indigo-800">{faq.question}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditFaq(faq);
                      }}
                      className="flex items-center bg-green-600 text-white px-3 py-1 rounded-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                      <i className="pi pi-pencil mr-1"></i> Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFaq(faq.id);
                      }}
                      className="flex items-center bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <i className="pi pi-trash mr-1"></i> Delete
                    </button>
                    <i
                      className={`pi pi-chevron-down transition-transform duration-200 ${
                        activeIndex === index ? "transform rotate-180" : ""
                      }`}
                    ></i>
                  </div>
                </div>
                {activeIndex === index && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No FAQs found. {searchTerm ? "Try a different search term." : "Add a new FAQ to get started."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQManager;