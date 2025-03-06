import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaTimes, FaPhone, FaMicrophone, FaFileUpload } from "react-icons/fa";

const Chatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (product) {
      setMessages([
        { text: `Hello! I'm interested in ${product.name}. Can you provide more details?`, sender: "user" },
        { 
          text: `Sure! Here are some details about ${product.name}:\nBrand: ${product.brand}\nModel: ${product.model}\nProcessor: ${product.processor}\nPrice: ${product.price}`,
          sender: "bot" 
        },
      ]);

      setSuggestions([
        "Is this available?",
        "What are the payment options?",
        "Can I see more images?",
        "What is the warranty?",
      ]);
    } else {
      setMessages([{ text: "Hello! How can I assist you today?", sender: "bot" }]);
      setSuggestions([
        "Show me your latest products",
        "What are your delivery options?",
        "Do you offer discounts?",
        "How can I contact support?",
      ]);
    }
  }, [product]);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'll get back to you shortly!", sender: "bot" }]);
    }, 800);

    setInput("");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages([...messages, { text: `📁 ${file.name}`, sender: "user", fileURL: URL.createObjectURL(file) }]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;

      const audioChunks = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setMessages([...messages, { text: "🎤 Voice Message", sender: "user", audio: url }]);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]); // Remove suggestions after clicking one
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Header with Product Details */}
      <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {product && <img src={product.image} alt="Product" className="w-10 h-10 rounded-md" />}
          <h2 className="text-lg font-semibold">{product ? product.name : "Chat Support"}</h2>
        </div>
        <div className="flex gap-3">
          <FaPhone className="cursor-pointer text-xl hover:text-green-400" title="Call" />
          <FaTimes className="cursor-pointer text-xl hover:text-red-400" title="Close" onClick={() => navigate(-1)} />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`flex my-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[75%] text-sm shadow-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.text}
              {msg.fileURL && (
                <a href={msg.fileURL} download className="block text-xs text-white underline">
                  Download File
                </a>
              )}
              {msg.audio && (
                <audio controls className="mt-2">
                  <source src={msg.audio} type="audio/mp3" />
                  Your browser does not support audio playback.
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Messages - Disappear After Click */}
      {suggestions.length > 0 && (
        <div className="p-2 bg-gray-200 flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion, index) => (
            <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input & Buttons */}
      <div className="flex items-center p-3 border-t border-gray-300">
        <label htmlFor="file-upload" className="cursor-pointer mr-2">
          <FaFileUpload className="text-xl text-blue-500 hover:text-blue-700" title="Upload File" />
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />

        {recording ? (
          <button onClick={stopRecording} className="ml-2 text-red-500">
            ⏹ Stop Recording
          </button>
        ) : (
          <FaMicrophone className="cursor-pointer text-xl text-blue-500 hover:text-blue-700" title="Record Voice" onClick={startRecording} />
        )}

        <input type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} className="flex-grow p-2 rounded-lg border border-gray-400 focus:outline-none ml-2" />

        <button onClick={handleSend} className="ml-2 bg-blue-500 p-3 rounded-full text-white hover:bg-blue-700">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
