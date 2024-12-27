// src/components/Success.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Success = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    if (sessionId) {
      fetchCourseDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  const fetchCourseDetails = async (sessionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/retrieve-checkout-session/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session details');
      }
      const data = await response.json();
      setCourseDetails(data);
      launchConfetti();
    } catch (error) {
      console.error('Error fetching session details:', error);
    } finally {
      setLoading(false);
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bbf7d0', '#86efac', '#4ade80', '#16a34a'], // Soft green tones for a professional look
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-medium text-gray-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-medium text-red-600 max-w-md text-center px-4"
        >
          Failed to retrieve payment details. Please contact support.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div 
        className="bg-white p-10 sm:p-14 rounded-lg shadow-xl text-center max-w-2xl w-full mx-4 border border-gray-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Payment Successful!
        </motion.h2>
        <motion.div
          className="w-20 h-20 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center shadow-inner"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <motion.p 
          className="text-xl mb-6 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Thank you for enrolling in <span className="font-semibold text-gray-800">{courseDetails.courseName}</span>.
        </motion.p>
        <motion.p 
          className="text-lg text-gray-500 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          We look forward to supporting you on your language learning journey.
        </motion.p>
        <motion.button
          className="bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          onClick={() => window.location.href = '/'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Success;
