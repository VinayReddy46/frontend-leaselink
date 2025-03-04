import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function NotificationDetails() {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notification details based on ID
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${id}`
        );
        const data = await response.json();
        setNotification(data);
      } catch (err) {
        setError("Failed to load notification");
        console.log(err)
      }
      setLoading(false);
    };

    fetchNotification();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 py-12">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-12">{error}</p>;

  return (
    <div className="flex items-center justify-center">
    <div className="max-w-4xl mx-5 mt-20 py-12 px-6 bg-white shadow-lg rounded-lg mt-[100px] mb-9">
      {/* Notification Content */}
      <h2 className="text-2xl font-semibold mb-4">{notification.title}</h2>
      
      <p className="text-gray-600">Thumbnail: {notification.thumbnailUrl}</p>
      {/* Back Button */}
      <Link to="/" className="bg-green-500 py-2 px-3 rounded-lg text-white  mb-4 inline-block mt-2">
         Back to Home
      </Link>
    </div>
    </div>
  );
}

export default NotificationDetails;