import { FaBuilding, FaHandshake, FaHome } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container min-h-screen mx-auto px-4 mt-24">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          About Us
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
          Welcome to *LeaseLink*, your trusted platform for finding the perfect rental property. Whether you're searching for an apartment, house, or commercial space, we make renting seamless, secure, and hassle-free.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="flex flex-col items-center text-center">
            <FaHome className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Wide Property Listings</h3>
            <p className="text-gray-600 mt-2">
              Browse thousands of rental listings across prime locations, curated to suit every budget and lifestyle.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <FaHandshake className="text-5xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Trusted Partnerships</h3>
            <p className="text-gray-600 mt-2">
              We collaborate with verified landlords and agencies to provide a secure and transparent renting experience.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <FaBuilding className="text-5xl text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Seamless Experience</h3>
            <p className="text-gray-600 mt-2">
              Our platform offers easy search, virtual tours, and secure online transactions to make renting effortless.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;