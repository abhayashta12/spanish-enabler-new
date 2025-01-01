import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const AccCourse = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(80000); // in cents ($800.00)
  const [showConfetti, setShowConfetti] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
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
          originPage: 'Acc',
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

  const course = {
    title: 'Spanish Speaking Accelerator',
    description: `Start Speaking Spanish Confidently in Just 3 Weeks`,
    price: discountedPrice,
    highlights: [
      '❌ “I struggle to understand native speakers—they talk too fast!”',
      '❌ “I overthink conjugations and freeze when speaking.”',
      '❌ “I feel insecure about making mistakes, and I hate feeling ‘cringe.’”',
      '❌ “I’m an introvert. Speaking in front of others is hard.”',
    ],
    solution: `You are not alone. These are REAL challenges. But here’s the truth: you can overcome every single one.`,
    introduction: `Introducing The Spanish Speaking Accelerator Program` +
      `\nA 40-hour hands-on solution designed to help you:`,
    benefits: [
      '✅ Speak Spanish confidently in a safe, supportive space where you feel heard and encouraged.',
      '✅ Practice daily and stop worrying about mistakes.',
      '✅ Master verb conjugations so they feel natural in real conversations.',
      '✅ Understand native speakers—even when they talk fast or use slang.',
    ],
    testimonials: [
      `Real Students, Real Results`,
      `Jeremy Parker from Atlanta, GA, says:`,
      `“I love learning new concepts and instantly applying them in conversations. The visuals on verb conjugations make it so clear and easy.”`,
    ],
    callToAction: `Ready to Transform Your Spanish?`,
    callDetails: [
      'Book a Free Learning Strategy Call with David, The Spanish Enabler, today!',
      'What Happens on the Call?',
      '• Talk about your biggest Spanish struggles and goals.',
      '• Build a step-by-step plan to finally speak Spanish confidently.',
      '• Discover how the SSA Program can transform your skills in just 3 months.',
      'No pressure. Just clarity and support.',
    ],
    suitability: [
      `This Course is For You If:`,
      '✅ You know a lot of Spanish words, but find it hard to put sentences together.',
      '✅ You understand Spanish but are scared of speaking it.',
      '✅ You practice alone, but struggle to speak with others.',
      '✅ You want to improve, but feel stuck and don’t know where to start.',
      '✅ You wish someone could guide you step-by-step to speak confidently.',
      '✅ You’re tired of learning on your own and want support from expert coaches.',
      '✅ You want real conversations that help you finally use what you’ve learned.',
    ],
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative pb-16">
      <div className="fixed top-0 w-full bg-black text-white text-center py-3 z-50 shadow-md" style={{ top: '80px' }}>
        🎉 Holiday Special Offer - Limited Time Only! 🎉
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
            Master Spanish with the Accelerator Program
          </h1>
          <p className="text-lg mb-8 text-[#666666]">
            Transform your Spanish in just 3 weeks with personalized, practical coaching.
          </p>
          <button
            className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-md hover:bg-black transition-colors"
            onClick={() => document.getElementById('course-details').scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </button>
        </div>
      </header>

      <main>
        <section id="course-details" className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-lg relative">
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">{course.title}</h2>
            <p className="text-lg text-[#666666] mb-6">{course.description}</p>
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
                setSelectedCourse(course);
              }}
              disabled={loading}
            >
              Enroll Now
            </button>
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
              

              {/* DESCRIPTION

              <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-lg relative">
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">{course.title}</h2>
            <p className="text-lg text-[#666666] mb-6">{course.introduction}</p>
            <ul className="list-disc pl-5 mb-6 text-[#1a1a1a]">
              {course.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <p className="text-md text-[#1a1a1a] mb-6 font-semibold">{course.solution}</p>
            <ul className="list-disc pl-5 mb-6 text-[#1a1a1a]">
              {course.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <blockquote className="italic text-[#666666] mb-6">
              {course.testimonials.map((testimonial, index) => (
                <p key={index}>{testimonial}</p>
              ))}
            </blockquote>
            <div className="mb-6">
              <h4 className="font-semibold mb-4">{course.callToAction}</h4>
              <ul className="list-disc pl-5 text-sm">
                {course.callDetails.map((detail, index) => (
                  <li key={index} className="text-[#1a1a1a]">{detail}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold mb-4">{course.suitability[0]}</h4>
              <ul className="list-disc pl-5 text-sm">
                {course.suitability.slice(1).map((point, index) => (
                  <li key={index} className="text-[#1a1a1a]">{point}</li>
                ))}
              </ul>
            </div>
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Benefits:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {selectedCourse?.benefits?.map((benefit, index) => (
                    <li key={index} className="text-[#1a1a1a]">{benefit}</li>
                  ))}
                </ul>

                <h4 className="font-semibold mb-4 mt-6">Transformation:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {selectedCourse.transformation.map((point, index) => (
                    <li key={index} className="text-[#1a1a1a]">{point}</li>
                  ))}
                </ul>
              </div>
              </div> */}

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

export default AccCourse;
