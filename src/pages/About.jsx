import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "With over 15 years in real estate, Sarah founded RentEase to simplify the rental process for everyone.",
    },
    // Add other team members...
  ];

  const testimonials = [
    {
      name: "Daniel M.",
      text: "Finding my dream apartment was so easy with this platform. The virtual tours saved me so much time!",
      image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // Add other testimonials...
  ];

  const values = [
    {
      title: "Transparency",
      icon: "🔍",
      description: "No hidden fees or surprise conditions. We believe in clear communication and honest dealings.",
    },
    // Add other values...
  ];

  // Reusable Components
  const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
    </div>
  );

  const GlassCard = ({ children }) => (
    <div className="backdrop-blur-md bg-white/40 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      {children}
    </div>
  );

  const TeamMemberCard = ({ member, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="overflow-hidden rounded-xl shadow-lg mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
      <p className="text-blue-600 mb-3">{member.position}</p>
      <p className="text-gray-600">{member.bio}</p>
    </motion.div>
  );

  const TestimonialCard = ({ testimonial, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="backdrop-blur-lg bg-white/50 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
          loading="lazy"
        />
        <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
      </div>
      <p className="text-gray-700 italic">"{testimonial.text}"</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Modern Living Space"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            About <span className="text-blue-400">RentEase</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white mb-10">
            Transforming the rental experience with technology, transparency, and a personal touch.
          </p>
          <GlassCard>
            <p className="text-white text-lg">
              Founded in 2018, we've helped thousands of people find their perfect rental home.
              Our mission is to make renting simple, transparent, and stress-free for both tenants and property owners.
            </p>
          </GlassCard>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                RentEase was born from a simple observation: renting shouldn't be complicated.
                Our founder, Sarah Johnson, experienced firsthand the stress and confusion of finding a quality rental property.
              </p>
              <p className="mt-4">
                What started as a small operation with just 10 properties has grown into a trusted platform connecting thousands
                of renters with their ideal homes. We've expanded our services while maintaining our core values of honesty,
                quality, and exceptional customer service.
              </p>
              <p className="mt-4">
                Today, we're proud to offer a seamless digital experience backed by a team of real people who understand your
                unique needs and preferences. Whether you're looking for your first apartment or managing multiple properties,
                we're here to make renting easier.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Team meeting"
                className="w-full h-auto transform transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-purple-100">
        <SectionHeader title="Our Values" subtitle="The principles that guide everything we do" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader title="Meet Our Team" subtitle="The passionate people behind RentEase" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 to-blue-100">
        <SectionHeader title="What Our Clients Say" subtitle="Real experiences from real customers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-gradient-to-r from-blue-700/70 to-purple-700/70 rounded-2xl p-8 sm:p-12 shadow-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Rental?</h2>
            <p className="text-xl mb-8">
              Our team is here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md">
                Browse Properties
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white font-bold rounded-lg hover:bg-white/20 transition-colors duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;