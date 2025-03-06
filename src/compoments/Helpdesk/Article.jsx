import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  // Map of article IDs to their content
  const articleContent = {
    // Popular articles
    '1': {
      title: 'How to Create an Account',
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-4">Creating Your Account</h2>
        <p class="text-gray-700 mb-4">Follow these simple steps to create your account:</p>
        <ol class="list-decimal pl-6 mb-4 text-gray-700">
          <li class="mb-2">Click on the "Sign Up" button in the top right corner of the homepage</li>
          <li class="mb-2">Enter your email address and create a password</li>
          <li class="mb-2">Fill in your personal information</li>
          <li class="mb-2">Verify your email address by clicking the link sent to your inbox</li>
          <li class="mb-2">Complete your profile setup</li>
        </ol>
        <p class="text-gray-700 mb-4">Once these steps are completed, you'll have full access to all features of your account.</p>
      `
    },
    '2': {
      title: 'How Does the 14 Day Free Trial Work?',
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-4">Understanding Your Free Trial</h2>
        <p class="text-gray-700 mb-4">Our 14-day free trial gives you complete access to all premium features without any commitment.</p>
        <p class="text-gray-700 mb-4">Here's what you need to know:</p>
        <ul class="list-disc pl-6 mb-4 text-gray-700">
          <li class="mb-2">The trial begins the day you sign up</li>
          <li class="mb-2">You'll have access to all premium features during the trial period</li>
          <li class="mb-2">No credit card is required to start your trial</li>
          <li class="mb-2">You'll receive a reminder 3 days before your trial expires</li>
          <li class="mb-2">You can cancel anytime during the trial with no charges</li>
        </ul>
        <p class="text-gray-700 mb-4">If you decide to continue after the trial, you can select a subscription plan that works for you.</p>
      `
    },
    '3': {
      title: 'How Our Pricing Plans Work',
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-4">Pricing Plans Explained</h2>
        <p class="text-gray-700 mb-4">We offer several pricing tiers to meet different needs and budgets:</p>
        <h3 class="text-xl font-semibold text-gray-800 mt-5 mb-3">Basic Plan - $9.99/month</h3>
        <p class="text-gray-700 mb-4">Perfect for individuals and small projects with limited needs.</p>
        <h3 class="text-xl font-semibold text-gray-800 mt-5 mb-3">Professional Plan - $19.99/month</h3>
        <p class="text-gray-700 mb-4">Ideal for growing businesses with moderate usage requirements.</p>
        <h3 class="text-xl font-semibold text-gray-800 mt-5 mb-3">Enterprise Plan - $49.99/month</h3>
        <p class="text-gray-700 mb-4">Designed for large organizations with advanced needs and high volume.</p>
        <p class="text-gray-700 mb-4">All plans include our core features, with higher tiers offering additional capabilities, increased limits, and priority support.</p>
        <p class="text-gray-700 mb-4">Annual billing options are available with a 20% discount compared to monthly billing.</p>
      `
    },
    '4': {
      title: 'How Can I Edit My Already Existing Page?',
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-4">Editing Your Pages</h2>
        <p class="text-gray-700 mb-4">Modifying your existing pages is simple:</p>
        <ol class="list-decimal pl-6 mb-4 text-gray-700">
          <li class="mb-2">Log in to your account and navigate to the Dashboard</li>
          <li class="mb-2">Find the page you want to edit in the "My Pages" section</li>
          <li class="mb-2">Click the "Edit" button next to the page name</li>
          <li class="mb-2">Use our page editor to make your desired changes</li>
          <li class="mb-2">Preview your changes using the "Preview" button</li>
          <li class="mb-2">When satisfied, click "Save" to publish your updates</li>
        </ol>
        <p class="text-gray-700 mb-4">All changes are saved automatically as drafts until you publish them, allowing you to work on updates without affecting your live page.</p>
      `
    },
    '5': {
      title: 'How Do I See My Published Page?',
      content: `
        <h2 class="text-2xl font-semibold text-gray-800 mt-6 mb-4">Viewing Your Published Pages</h2>
        <p class="text-gray-700 mb-4">There are several ways to access your published pages:</p>
        <h3 class="text-xl font-semibold text-gray-800 mt-5 mb-3">From the Dashboard:</h3>
        <ol class="list-decimal pl-6 mb-4 text-gray-700">
          <li class="mb-2">Go to your Dashboard</li>
          <li class="mb-2">Find the page in your "My Pages" list</li>
          <li class="mb-2">Click the "View" button next to the page name</li>
        </ol>
        <h3 class="text-xl font-semibold text-gray-800 mt-5 mb-3">Using Your Page URL:</h3>
        <p class="text-gray-700 mb-4">Each page has a unique URL that you can bookmark or share. The URL format is typically:</p>
        <p class="bg-gray-100 p-2 rounded text-gray-800 font-mono mb-4"><code>https://yoursite.com/your-page-name</code></p>
        <p class="text-gray-700 mb-4">You can also share your published pages directly to social media or via email using the share options in your Dashboard.</p>
      `
    },
    // Add more articles as needed
  };

  const article = articleContent[articleId] || {
    title: 'Article Not Found',
    content: '<p class="text-gray-700 mb-4">The requested article could not be found.</p>'
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={goBack}
        className="flex items-center text-[#00A99D] hover:text-[#008F85] mb-8"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{article.title}</h1>
        <div 
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Was this article helpful?</h3>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-[#00A99D] text-white rounded-full hover:bg-[#008F85] transition-colors">
              Yes
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;