import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OneonOneCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [customPrice, setCustomPrice] = useState(0);

  // Define courses as an array of objects
  const courses = [
    {
      id: 1,
      title: 'A1 - Beginner',
      description: 'Start your Spanish journey: Speak confidently from day',
      price: 216000, 
      learnmore:'Embark on an interactive journey that transforms "hola" into meaningful conversations.',
    },
    {
      id: 2,
      title: 'A2 - Elementary',
      description: 'Build your foundation: Speak Spanish like it’s second',
      price: 270000, 
      learnmore:'Gain practical skills and confidence to navigate everyday situations effortlessly.'
    },
    {
      id: 3,
      title: 'B1 - Intermediate',
      description: 'Find your voice: Express your ideas and connect with Spanish speakers.',
      price: 324000,
      learnmore:'Immerse yourself in dynamic content that boosts your speaking and comprehension skills.'
    },
    {
      id: 4,
      title: 'B2 Level Intermediate',
      description: 'Master the art of conversation—speak Spanish with nuance and flair',
      price: 405000, 
      learnmore:'Refine your abilities with advanced topics and authentic cultural experiences.'
    },
    {
      id: 5,
      title: 'Custom Advanced',
      description: 'Learn the basics of Custom Advanced.',
      learnmore:'Refine your abilities with advanced topics and authentic cultural experiences.',
      priceOptions: [
        {
          label: 'On Demand - 1 Unit (2 Hours)',
          price: 9000, // $90.00 in cents
        },
        {
          label: 'Explorer - 5 Units (10 Hours)',
          price: 40500, // $405.00 in cents
        },
        {
          label: 'Adventurer - 10 Units (20 Hours)',
          price: 76500, // $765.00 in cents
        },
      ],
    },
  ];

  useEffect(() => {
    // Ensure body overflow is controlled depending on modal status
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCourse]);

  const handleCheckout = async (courseName, price) => {
    if (!courseName || price === 0) {
      console.error("Missing course name or price.");
      return;
    }

    try {
      // Sending a request to the backend server to create a Stripe checkout session
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Sending specific course data depending on which course button is clicked
          courseName: courseName,
          price: price, // Price in cents
          originPage: 'oneonone', // Specify that this request is coming from the OneOnOneCourse page
        }),
      });

      const session = await response.json();

      // Check if the session response has the URL
      if (session.url) {
        // Redirect to Stripe Checkout
        window.location.href = session.url;
      } else {
        console.error('Checkout session creation failed:', session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="py-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl font-serif mb-4 text-[#1a1a1a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Master Spanish with One-on-One Coaching
          </motion.h1>
          <motion.p
            className="text-lg mb-8 text-[#666666]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Personalized lessons tailored to your learning style and goals. Start your journey to fluency today!
          </motion.p>
          <motion.button
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md hover:bg-black transition-colors"
            onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Courses
          </motion.button>
        </div>
      </header>

      <main>
        <section id="courses" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl font-serif mb-12 text-center text-[#1a1a1a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              Choose Your Level
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="bg-white p-8 rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">{course.title}</h3>
                  <p className="text-[#666666] mb-6">{course.description}</p>
                  {course.id === 5 ? (
                    <>
                      <select
                        className="mb-4 border border-gray-300 p-2 rounded-md w-full"
                        onChange={(e) => {
                          const selectedOption = course.priceOptions.find(option => option.label === e.target.value);
                          setSelectedOption(selectedOption);
                          setCustomPrice(selectedOption.price);
                        }}
                      >
                        <option value="">Select a package</option>
                        {course.priceOptions.map((option, index) => (
                          <option key={index} value={option.label}>
                            {option.label} - ${(option.price / 100).toFixed(2)}
                          </option>
                        ))}
                      </select>
                      {selectedOption && (
                        <p className="text-2xl font-bold mb-6 text-[#1a1a1a]">
                          ${((customPrice || 0) / 100).toFixed(2)}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-2xl font-bold mb-6 text-[#1a1a1a]">${(course.price / 100).toFixed(2)}</p>
                  )}
                  <button
                    className="w-full bg-[#1a1a1a] text-white py-2.5 rounded-md hover:bg-black transition-colors"
                    onClick={() => {
                      if (course.id === 5 && selectedOption) {
                        setSelectedCourse(course);
                      } else if (course.id !== 5) {
                        setSelectedCourse(course);
                      }
                    }}
                  >
                    Learn More
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-md w-full relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 text-[#1a1a1a] hover:text-gray-700 text-4xl"
              >
                ×
              </button>
              <h3 className="text-2xl font-semibold mb-2">{selectedCourse?.title}</h3>
              <p className="text-[#666666] mb-6">{selectedCourse?.description}</p>
              
              <div className="mb-8">
                <h4 className="font-semibold mb-4">What do you get?</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-[#1a1a1a]">{selectedCourse.learnmore}</li>
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  ${selectedCourse && selectedCourse.id === 5 && customPrice ? (customPrice / 100).toFixed(2) : (selectedCourse?.price / 100).toFixed(2)}
                </p>
                <motion.button
                  className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md hover:bg-black transition-colors"
                  onClick={() => handleCheckout(selectedCourse?.title, selectedCourse?.id === 5 ? customPrice : selectedCourse?.price)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={selectedCourse && selectedCourse.id === 5 && !customPrice}
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OneonOneCourse;
