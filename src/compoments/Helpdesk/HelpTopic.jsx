import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const HelpTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  // Map of topic IDs to their titles and content
  const topicContent = {
    '1': {
      title: 'Getting Started',
      content: 'This page contains all the information you need to get started with our platform.',
      articles: [
        { id: 101, title: 'Creating Your First Project' },
        { id: 102, title: 'Understanding the Dashboard' },
        { id: 103, title: 'Basic Navigation Guide' },
      ]
    },
    '2': {
      title: 'My Account',
      content: 'Learn how to manage your account settings, profile, and preferences.',
      articles: [
        { id: 201, title: 'Updating Your Profile' },
        { id: 202, title: 'Security Settings' },
        { id: 203, title: 'Managing Notifications' },
      ]
    },
    '3': {
      title: 'Dispute Settlement',
      content: 'Information about our dispute resolution process and how to handle conflicts.',
      articles: [
        { id: 301, title: 'How to Report a Dispute' },
        { id: 302, title: 'Dispute Resolution Timeline' },
        { id: 303, title: 'Mediation Process Explained' },
      ]
    },
    '4': {
      title: 'File a Claim',
      content: 'Step-by-step guides on how to file different types of claims and track their status.',
      articles: [
        { id: 401, title: 'Claim Eligibility Requirements' },
        { id: 402, title: 'Documentation Needed for Claims' },
        { id: 403, title: 'Tracking Your Claim Status' },
      ]
    },
    '5': {
      title: 'Copyright & Legal',
      content: 'Important legal information about our terms of service, privacy policy, and copyright guidelines.',
      articles: [
        { id: 501, title: 'Terms of Service Explained' },
        { id: 502, title: 'Privacy Policy Overview' },
        { id: 503, title: 'Copyright Infringement Reporting' },
      ]
    },
    '6': {
      title: 'Developers',
      content: 'Technical documentation, API references, and integration guides for developers.',
      articles: [
        { id: 601, title: 'API Documentation' },
        { id: 602, title: 'Integration Examples' },
        { id: 603, title: 'Webhook Setup Guide' },
      ]
    }
  };

  const topic = topicContent[topicId] || {
    title: 'Topic Not Found',
    content: 'The requested topic could not be found.',
    articles: []
  };

  const goBack = () => {
    navigate('/');
  };

  const navigateToArticle = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={goBack}
        className="flex items-center text-[#00A99D] hover:text-[#008F85] mb-8"
      >
        <FaArrowLeft className="mr-2" /> Back to Help Center
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{topic.title}</h1>
        <p className="text-gray-600 mb-8">{topic.content}</p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Articles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topic.articles.map(article => (
            <div 
              key={article.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigateToArticle(article.id)}
            >
              <h3 className="text-lg font-medium text-[#00A99D]">{article.title}</h3>
              <p className="text-gray-500 mt-2">Click to read more</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpTopic;