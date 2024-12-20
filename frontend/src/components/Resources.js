import React from 'react';
import { motion } from 'framer-motion';
 

const Resources = () => (
  <section id="resources" className="py-24 bg-gradient-to-b from-white to-gray-100">
    <div className="container mx-auto text-center px-4">
      <motion.h2
        className="text-5xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Valuable Resources
      </motion.h2>
      <motion.p
        className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Enhance your Spanish learning journey with our curated resources and expert guidance.
      </motion.p>
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: '360px' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.loom.com/embed/e8e4306b290243ed916e89011339ead9"
            title="Live Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a
          href="https://stan.store/TheSpanishEnabler"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Download Free Resources
        </a>
      </motion.div>
    </div>
  </section>
);

export default Resources;