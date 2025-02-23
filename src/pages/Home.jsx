import React from 'react';
import { motion } from 'framer-motion';
import { Car, Star, Shield, Clock, CheckCircle, Calendar, MapPin, Wifi, Battery, Music, Wind, Gauge } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* main image and title */}
      <header className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center justify-around gap-5"
        >
          <div className="lg:w-1/2">
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Drive Your Dreams
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience luxury and comfort with our premium car rental service. Choose from our wide selection of vehicles for your perfect journey.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/30">
                Browse Cars
              </button>
              <button className="border border-white/20 hover:border-white/40 px-8 py-3 rounded-full text-lg font-semibold transition-all hover:shadow-lg">
                Learn More
              </button>
            </motion.div>
          </div>
          <motion.div 
            className="lg:w-1/4 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute -inset-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-lg opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1612545667889-b061512d0dfa?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym13JTIwY2FyfGVufDB8fDB8fHww" 
              alt="Luxury Car"
              className="rounded-lg shadow-2xl relative"
            />
          </motion.div>
        </motion.div>
      </header>

      {/* Quick Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Pickup Date</p>
                  <input type="date" className="bg-transparent text-white outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <select className="bg-transparent text-white outline-none">
                    <option value="ny" className="text-gray-900">New York</option>
                    <option value="la" className="text-gray-900">Los Angeles</option>
                    <option value="ch" className="text-gray-900">Chicago</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all hover:shadow-lg">
                  Search Available Cars
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Some Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience the perfect blend of luxury, reliability, and exceptional service with our premium car rental solutions.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Car, title: "Premium Fleet", desc: "Latest models from top luxury brands" },
              { icon: Star, title: "5-Star Service", desc: "Exceptional customer support available 24/7" },
              { icon: Shield, title: "Full Insurance", desc: "Comprehensive coverage for peace of mind" },
              { icon: Clock, title: "Flexible Rentals", desc: "Daily, weekly, or monthly options" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars images */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Popular Vehicles</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose from our selection of premium vehicles for your perfect journey
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Tesla Model S",
                image: "https://images.unsplash.com/photo-1617704548623-340c52d35cef?auto=format&fit=crop&w=800&q=80",
                price: "299",
                features: [
                  { icon: Battery, text: "Electric" },
                  { icon: Gauge, text: "0-60 mph in 3.1s" },
                  { icon: Wifi, text: "Auto Pilot" }
                ]
              },
              {
                name: "Porsche 911",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
                price: "399",
                features: [
                  { icon: Gauge, text: "443 HP" },
                  { icon: Wind, text: "Sport Mode" },
                  { icon: Music, text: "Premium Audio" }
                ]
              },
              {
                name: "Range Rover Sport",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
                price: "349",
                features: [
                  { icon: Shield, text: "4x4" },
                  { icon: Wind, text: "Air Suspension" },
                  { icon: Music, text: "Meridian™ Sound" }
                ]
              }
            ].map((car, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    {car.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1 text-sm text-gray-400">
                        <feature.icon className="w-4 h-4" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${car.price}</span>
                      <span className="text-gray-400">/day</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* reviews of customers */}
      <section className="py-20">
        <div className="container bg-red-600 mx-auto px-4">
        
        
          <div className="grid bg-grey-600 grid-cols-1 md:grid-cols-3 gap-8">
            {
              <h1> reviews here</h1>
            }
          </div>
        </div>
      </section>

      {/* marketing div */}
      <section className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')`
              }}
            ></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Experience the thrill of driving your dream car today. Book now and get special introductory rates.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8 items-center mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>Price match guarantee</span>
                </div>
              </div>
              <motion.button 
                className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:shadow-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Dream Car Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

     
    </div>
  );
}

export default Home;