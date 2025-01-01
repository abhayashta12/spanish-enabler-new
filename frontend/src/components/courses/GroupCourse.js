import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const GroupCourse = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(80000); // in cents ($800.00)
  const [showConfetti, setShowConfetti] = useState(true);
  const [loading, setLoading] = useState(false);

  // New state for handling popup similar to OneonOneCourse
  const [selectedCourse, setSelectedCourse] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Show confetti instantly and hide after 6 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Control body overflow based on popup
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCourse]);

  const courses = [
    {
      title: 'A1 Level Beginner',
      description: 'Learn the basic vocabulary, grammar, and phrases to get started on your Spanish journey.',
      price: 5000,
      features: ['Basic vocabulary', 'Simple grammar structures', 'Everyday phrases', 'Cultural introduction'],
    },
    {
      title: 'A2 Level Beginner',
      description: 'Build upon your beginner knowledge to form more detailed phrases and conversation skills.',
      price: 6000,
      features: ['Expanded vocabulary', 'More complex grammar', 'Basic conversation skills', 'Reading simple texts'],
    },
    {
      title: 'B1 Level Intermediate',
      description: 'Enhance your conversation skills and start understanding more complex texts and phrases.',
      price: 7000,
      features: ['Advanced vocabulary', 'Complex grammar structures', 'Fluent conversations', 'Understanding native speakers'],
    },
    {
      title: 'B2 Level Intermediate',
      description: 'Improve your fluency, understand more difficult texts, and participate in advanced conversations.',
      price: 8000,
      features: ['Professional vocabulary', 'Nuanced grammar usage', 'Debate and discussion skills', 'Cultural deep dives'],
    },
    {
      title: 'Custom Advanced',
      description: 'Achieve near-native proficiency, engage in deep conversations, and fully grasp Spanish culture and language.',
      price: 10000,
      features: ['Specialized vocabulary', 'Native-like fluency', 'Advanced writing skills', 'Cultural mastery'],
    },
  ];

  const faqs = [
    { question: 'How long does each course last?', answer: 'Each course typically lasts for 8 weeks, with two 1-hour group sessions per week.' },
    { question: 'How many students are in each group?', answer: 'Our group courses usually have 4-8 students to ensure everyone gets enough attention and practice time.' },
    { question: 'Can I switch levels during the course?', answer: 'Yes, if you find the course too easy or difficult, we can assess your level and move you to a more suitable group.' },
    { question: 'Are the lessons conducted online or in-person?', answer: 'We offer both online and in-person group options, depending on your preference and location.' },
    { question: 'What materials are provided with the course?', answer: 'All necessary learning materials, including textbooks and online resources, are included in the course fee.' },
  ];

  const handleCheckout = async (courseName, price) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName: courseName,
          price: price,
          originPage: 'Group',
        }),
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Checkout session creation failed:', session);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'SPANISHSPECIAL' && !discountApplied) {
      const discountAmount = 56700; // Price in Cents
      setDiscountedPrice(discountAmount);
      setDiscountApplied(true);
    } else {
      alert('Invalid coupon code or coupon already applied');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative pb-16">
      {/* Black Friday Floating Banner */}
      <div className="fixed top-0 w-full bg-black text-white text-center py-3 z-50 shadow-md" style={{ top: '80px' }}>
        🎉 Holiday Special Offer - Limited Time Only! APPLY COUPON CODE "SPANISHSPECIAL" 🎉
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          run={true}
        />
      )}

      <header className="py-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif mb-4 text-[#1a1a1a]">
            Master Spanish with Group Coaching
          </h1>
          <p className="text-lg mb-8 text-[#666666]">
            Join our group sessions and learn Spanish with peers. Start your journey to fluency today!
          </p>
          <button
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md hover:bg-black transition-colors"
            onClick={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Courses
          </button>
        </div>
      </header>

      <main>
        <section id="courses" className="py-20 px-4">
          <div className="max-w-6xl mx-auto mb-12">
            <motion.div
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg relative"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Spanish Speaking Accelerator</h2>
              <p className="text-lg text-[#666666] mb-6">
                Start speaking Spanish confidently in just 3 weeks—or your money back!
              </p>
              <p className="text-3xl font-bold text-green-600 mb-6">
                Price: ${(discountedPrice / 100).toFixed(2)}
              </p>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-400 p-2 rounded-md w-2/3 mr-2"
                />
                <button
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:bg-black transition-colors"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </button>
              </div>
              <button
                className={`w-full bg-[#1a1a1a] text-white py-2.5 rounded-md hover:bg-black transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                  setSelectedCourse({
                    title: 'Spanish Speaking Accelerator',
                    description: 'Start speaking Spanish confidently in just 3 weeks—or your money back!',
                    price: discountedPrice
                  });
                }}
                disabled={loading}
              >
                Learn More
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.title}
                className="bg-gray-300 p-8 rounded-lg border border-gray-200 relative overflow-hidden cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-[#1a1a1a]">{course.title}</h3>
                <p className="text-[#666666] mb-6">{course.description}</p>
                <p className="text-2xl font-bold mb-6 text-[#1a1a1a]">
                  ${(course.price / 100).toFixed(2)}
                </p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <motion.p
                    className="text-white text-2xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    Coming Soon
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif mb-12 text-center text-[#1a1a1a]">
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-[#1a1a1a]"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span>{expandedFaq === index ? '−' : '+'}</span>
                </button>
                {expandedFaq === index && (
                  <p className="mt-2 text-[#666666]">{faq.answer}</p>
                )}
              </div>
            ))}
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
              <h3 className="text-2xl font-semibold mb-2">{selectedCourse.title}</h3>
              <p className="text-[#666666] mb-6">{selectedCourse.description}</p>
              
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Benefits:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                   <li className="text-[#1a1a1a]">
                   <strong>Speak Naturally, Fast:</strong> Skip the grammar drills and get straight to speaking with real-time feedback from expert teachers.
                   </li>
                   <li className="text-[#1a1a1a]">
                   <strong>Tailored for You:</strong> Personalized coaching ensures you overcome your unique challenges and see instant progress.
                   </li>
                   <li className="text-[#1a1a1a]">
                   <strong>Practical, Real-World Focus:</strong> Master Spanish for life, work, and travel—no fluff, just skills you’ll actually use.
                   </li>
                   </ul><br/>


                 <h4 className="font-semibold mb-4">Transformation:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-sm">
                   <li className="text-[#1a1a1a]">
                   <strong>From Stuck to Fluent:</strong> Break through fear and hesitation to confidently hold Spanish conversations anywhere.
                   </li>
                   <li className="text-[#1a1a1a]">
                   <strong>From Awkward to Authentic:</strong>  Speak like a native by practicing real-life scenarios and cultural nuances.
                   </li>
                   <li className="text-[#1a1a1a]">
                   <strong>From Learning Alone to Thriving Together:</strong> Join a vibrant community of learners and unlock fluency faster through collaboration.
                   </li>
                   </ul>
                   <br/>

                   <p className="text-lg text-[#1a1a1a] mb-6 "> <strong>
                   Why wait? Join now and transform the way you learn Spanish forever!
                   </strong>
              </p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">
                  ${(selectedCourse.price / 100).toFixed(2)}
                </p>
                <motion.button
                  className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md hover:bg-black transition-colors"
                  onClick={() => handleCheckout(selectedCourse.title, selectedCourse.price)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Enroll Now'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupCourse;
