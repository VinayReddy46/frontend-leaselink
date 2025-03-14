import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { useGetFaqsQuery, useCreateFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } from "../../../redux/services/FAQsSlice";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const FAQManager = () => {
  const { data: faqs = [], refetch } = useGetFaqsQuery();
  const [createFaq] = useCreateFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [editMode, setEditMode] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({ id: null, question: "", answer: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFaq(id).unwrap()
          .then(() => {
            toast.success("FAQ deleted successfully");
            refetch();
          })
          .catch(() => {
            toast.error("Failed to delete FAQ");
          });
      
      }
    });
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();

    if (!currentFaq.question || !currentFaq.answer) {
      alert("Please fill in all fields");
      return;
    }

    const action = editMode ? updateFaq : createFaq;
    action(editMode ? {id:currentFaq._id,updatedData:currentFaq}:currentFaq).unwrap()
      .then(() => {
        toast.success(`FAQ ${editMode ? "updated" : "created"} successfully`);
        refetch();
      })
      .catch(() => {
        toast.error(`Failed to ${editMode ? "update" : "create"} FAQ`);
      });

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
                <textarea
                  name="answer"
                  rows={3}
                  value={currentFaq.answer}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter FAQ answer"
                  autoFocus
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
                key={faq._id}
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
                        handleDeleteFaq(faq._id);
                      }}
                      className="flex items-center bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <i className="pi pi-trash mr-1"></i> Delete
                    </button>
                  </div>
                </div>
                
                  <div className="py-4 px-2 bg-white">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                
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