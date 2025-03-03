import React, { useEffect, useState } from "react";

const Chatbot = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 800);

    setInput("");
  };

  const getBotResponse = (message) => {
    const lowerMsg = message.toLowerCase();
  
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) return "Hi there! 😊";
    if (lowerMsg.includes("how are you")) return "I'm just a bot, but I'm doing great! Thanks for asking. 🤖";
    if (lowerMsg.includes("help")) return "Sure! What do you need help with? 🛠️";
    if (lowerMsg.includes("who are you")) return "I'm your friendly chatbot! Here to assist you. 🤖";
    if (lowerMsg.includes("what's your name") || lowerMsg.includes("your name")) return "I'm ChatBot! You can call me Bot. 🤖";
    if (lowerMsg.includes("bye")) return "Goodbye! Have a great day! 👋";
    if (lowerMsg.includes("thank you") || lowerMsg.includes("thanks")) return "You're very welcome! 😊";
    if (lowerMsg.includes("what can you do")) return "I can chat with you, answer questions, and provide basic assistance. Try asking me something!";
    if (lowerMsg.includes("tell me a joke")) return "Why don't programmers like nature? Too many bugs! 🐛😂";
    if (lowerMsg.includes("do you like humans")) return "Of course! You created me. 😊";
    if (lowerMsg.includes("what is the meaning of life")) return "42! Or maybe it's just about being happy. 🌍";
    if (lowerMsg.includes("are you real")) return "I'm as real as your imagination lets me be! 😆";
    if (lowerMsg.includes("where are you from")) return "I'm from the internet! 🌍";
    if (lowerMsg.includes("favorite color")) return "I love all colors, but blue seems pretty cool! 🎨";
    if (lowerMsg.includes("can you sing")) return "I would, but I might break your speakers! 🎶😆";
    if (lowerMsg.includes("tell me something interesting")) return "Did you know that honey never spoils? Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible! 🍯";
    
    return "I'm not sure how to respond to that. Can you rephrase? 🤔";
  };
  

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white-900 text-white rounded-lg shadow-2xl border border-white-700">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Chatbot</h2>
      <div className="h-72 overflow-y-auto p-4 bg-white-800 rounded-lg border border-white-600 shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-xl max-w-[75%] shadow-md ${
              msg.sender === "user"
                ? "ml-auto bg-white-500 text-black text-right"
                : "bg-white-700 text-black text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow p-3 rounded-md bg-white-700 text-black outline-none border border-gray-100 focus:ring-2 focus:ring-gray-100"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 px-5 py-3 rounded-md hover:bg-green-800 transition duration-300 shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
