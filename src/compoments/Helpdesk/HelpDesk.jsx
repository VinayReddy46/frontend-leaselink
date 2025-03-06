import { useState } from 'react';
import { 
  FaSearch, 
  FaRocket, 
  FaUserCircle, 
  FaBalanceScale, 
  FaFileAlt, 
  FaLock, 
  FaCode 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigateToTopic = (topicId) => {
    navigate(`/help-topic/${topicId}`);
  };

  const navigateToArticle = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const navigateToSupport = () => {
    navigate('/contact-support');
  };
const navigateToDamage=()=>{
  navigate('/damage')
}
  const helpTopics = [
    {
      id: 1,
      title: 'Getting Started',
      description: 'Articles to get you up and running, quick and easy.',
      icon: <FaRocket className="text-[#00A99D] text-3xl" />
    },
    {
      id: 2,
      title: 'My Account',
      description: 'How to manage your account and it\'s features.',
      icon: <FaUserCircle className="text-[#00A99D] text-3xl" />
    },
    {
      id: 3,
      title: 'Dispute Settlement',
      description: 'Information about how we handle disputes between parties.',
      icon: <FaBalanceScale className="text-[#00A99D] text-3xl" />
    },
    {
      id: 4,
      title: 'File a Claim',
      description: 'How to file a claim and track its progress.',
      icon: <FaFileAlt className="text-[#00A99D] text-3xl" />
    },
    {
      id: 5,
      title: 'Copyright & Legal',
      description: 'Important information about how we handle your privacy and data.',
      icon: <FaLock className="text-[#00A99D] text-3xl" />
    },
    {
      id: 6,
      title: 'Developers',
      description: 'Developer documentation and integration features.',
      icon: <FaCode className="text-[#00A99D] text-3xl" />
    }
  ];

  const popularArticles = [
    { id: 1, title: 'How to Create an Account' },
    { id: 2, title: 'How Does the 14 Day Free Trial Work?' },
    { id: 3, title: 'How Our Pricing Plans Work' },
    { id: 4, title: 'How Can I Edit My Already Existing Page?' },
    { id: 5, title: 'How Do I See My Published Page?' }
  ];

  return (
    <div className="font-sans">
      {/* Hero Section with Search */}
      <div className="bg-[#00A99D] py-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-white text-4xl font-bold mb-8">How can we help?</h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search the Knowledge Base"
              className="w-full py-4 px-12 rounded-full text-lg focus:outline-none shadow-lg"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>
        </div>
        
        {/* Background Icons (Decorative) */}
        <div className="absolute left-10 top-10 opacity-10">
          <FaUserCircle className="text-white text-6xl" />
        </div>
        <div className="absolute right-10 top-10 opacity-10">
          <FaCode className="text-white text-6xl" />
        </div>
        <div className="absolute left-1/4 bottom-10 opacity-10">
          <FaFileAlt className="text-white text-6xl" />
        </div>
        <div className="absolute right-1/4 bottom-10 opacity-10">
          <FaBalanceScale className="text-white text-6xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Help Topics Section */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Help Topics</h2>
            <hr className="mb-8 border-gray-200" />
            
            <div className="grid md:grid-cols-2 gap-8">
              {helpTopics.map(topic => (
                <div 
                  key={topic.id} 
                  className="flex items-start border-b border-gray-100 pb-8 cursor-pointer hover:bg-gray-50 p-4 rounded transition-colors"
                  onClick={() => topic.id === 3||4 ? navigate('/disputeandfile') : navigateToTopic(topic.id)}
                >
                  <div className="mr-4">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-gray-600">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Popular Articles */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Articles</h3>
              <ul className="space-y-3">
                {popularArticles.map((article) => (
                  <li key={article.id}>
                    <a 
                      href="#" 
                      className="text-gray-700 hover:text-[#00A99D] block py-2 px-3 hover:bg-gray-100 rounded transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToArticle(article.id);
                      }}
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Support */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Need Support?</h3>
              <p className="text-gray-700 mb-6">
                Can't find the answer you're looking for? Don't worry we're here to help!
              </p>
              <button 
                className="bg-[#00A99D] hover:bg-[#008F85] text-white font-medium py-3 px-6 rounded-full transition duration-300 w-full"
                onClick={navigateToSupport}
              >
                CONTACT SUPPORT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;