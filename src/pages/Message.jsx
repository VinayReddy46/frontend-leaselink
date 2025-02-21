import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaSms } from 'react-icons/fa';
import './Message.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Lender', text: 'Hello, how can I help you with the rental?', read: false },
    { sender: 'Renter', text: 'I need more information about the property.', read: true },
  ]);
  const [unreadCount, setUnreadCount] = useState(messages.filter(msg => !msg.read).length);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: 'Renter', text: message, read: false };
      setMessages([...messages, newMessage]);
      setUnreadCount(unreadCount + 1);
      setMessage('');
      handlePushNotification();
    }
  };

  // Handle key press (Enter to send message)
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
    setUnreadCount(0);
  };

  const sendEmailAlert = () => {
    toast.success('📧 Email Alert Sent!', { position: 'top-right' });
  };

  const sendSMSAlert = () => {
    toast.success('📩 SMS Alert Sent!', { position: 'top-right' });
  };

  const handlePushNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('New Message Received!', {
        body: 'You have a new message in your inbox.',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('New Message Received!', {
            body: 'You have a new message in your inbox.',
          });
        }
      });
    }
  };

  return (
    <div className="message-container">
      <div className="header">
        <h3>Message Inbox</h3>
        <div className="notification-icon" onClick={markAllAsRead}>
          <FaBell size={24} />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
      </div>

      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div className="notification-options">
        <button className="email-btn" onClick={sendEmailAlert}>
          <FaEnvelope /> Send Email
        </button>
        <button className="sms-btn" onClick={sendSMSAlert}>
          <FaSms /> Send SMS
        </button>
      </div>
    </div>
  );
};

export default Message;
