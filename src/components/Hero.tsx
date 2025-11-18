// import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Correct import

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background with zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.15 }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src="https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg"
          alt="Vietnam landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Discover <span className="text-amber-400">Vietnam</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow"
        >
          Authentic journeys crafted with care.  
          Your trusted Destination Management Company in Vietnam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <Link
            to="/contact"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
