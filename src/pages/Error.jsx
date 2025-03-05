import React,{useEffect} from 'react';

const Error = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Animated 404 Illustration */}
      <div className="relative w-60 h-60 mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-4 bg-white rounded-full shadow-lg flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1886/1886495.png" // Path relative to the public folder
            alt="404 Not Found"
            className="w-40 h-40 object-contain" // Adjust size as needed
          />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-3 animate-bounce">
        🚀 Oops! Page Not Found
      </h1>

      {/* Description */}
      <p className="text-base text-gray-600 text-center mb-6 max-w-md">
        🔍 We looked everywhere for this page. Are you sure the website URL is correct?<br />
        💬 Get in touch with the site owner or try again.
      </p>

      {/* Go Back Home Button */}
      <a
        href="/"
        className="px-5 py-2.5 bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        🏠 Go Back Home
      </a>

      {/* Additional Links */}
      <div className="mt-6 flex space-x-3">
        <a
          href="/contact"
          className="text-sm text-gray-600 hover:text-purple-600 transition duration-300"
        >
          📞 Contact Support
        </a>
        <span className="text-gray-400">|</span>
        <a
          href="/faq"
          className="text-sm text-gray-600 hover:text-blue-600 transition duration-300"
        >
          ❓ Visit FAQ
        </a>
      </div>
    </div>
  );
};

export default Error;