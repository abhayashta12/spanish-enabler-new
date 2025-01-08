import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import david from "../assets/david.webp";
 

const Hero = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // New state for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (!popupDismissed) {
      const handleScroll = () => {
        const heroSection = document.getElementById("hero");
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          if (heroBottom <= window.innerHeight / 2) {
            setShowPopup(true);
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [popupDismissed]);

  const handleClosePopup = () => {
    console.log("Close button clicked");
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const handleSubscribe = async () => {
    setShowPopup(false);
    setPopupDismissed(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Subscription successful!");
        // Show the success popup after successful subscription
        setShowSuccessPopup(true);
        setName("");
        setEmail("");
      } else {
        const error = await response.json();
        setMessage(error.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  // Function to close the success popup
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-white to-gray-100 p-10 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.2)] max-w-md w-full relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <motion.h3
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-gray-800"
                  >
                    Elevate Your Spanish
                  </motion.h3>
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-base text-gray-600 leading-relaxed"
                  >
                    Take your Spanish to the Next Level. <br/><br/>
                    Get exclusive tips, practical tools, and updates to help you speak Spanish confidently.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up Now
                </motion.button>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-center text-gray-500"
                >
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </motion.p>

                {message && (
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm text-center text-yellow-500"
                  >
                    {message}
                  </motion.p>
                )}
              </div>

              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-yellow-300 rounded-full opacity-50"></div>
              {/* <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-300 rounded-full opacity-50"></div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.2)] max-w-sm w-full relative text-center"
            >
              {/* Close Button for success popup */}
              <button
                onClick={handleCloseSuccessPopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to Spanish Enabler!
              </h3>
              <p className="text-gray-700">
                Thank you for subscribing. Get ready to elevate your Spanish
                skills and stay updated with exclusive content.
              </p>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-green-300 rounded-full opacity-50"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <section
  id="hero"
  className="relative h-screen bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundColor: "#f5f0e1",
    backgroundImage: `url(${david})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black opacity-40"></div>
  <div className="container mx-auto relative text-center text-white z-10 px-4">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 tracking-wide leading-tight mt-40">
      WORLD'S #1 SPANISH <br />
      &nbsp;LANGUAGE COACH
    </h1>
    <div className="flex flex-wrap justify-center items-center gap-4 max-w-[90%] mx-auto">
      <a
        href="https://stan.store/TheSpanishEnabler/p/get-my-ebook-now-aybig"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-gradient w-full sm:w-auto">
          FREE EBOOK
        </button>
      </a>
      {/* <Link to="/courses/OneonOne">
        <button className="border-2 border-blue-500 hover:bg-blue-500 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full m-2 transition-all duration-300 w-full sm:w-auto">
          ONE ON ONE COACHING
        </button>
      </Link>
      <Link to="/courses/Group">
        <button className="border-2 border-blue-500 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full m-2 transition-all duration-300 w-full sm:w-auto">
          GROUP COACHING
        </button>
      </Link>
      <Link to="/courses/Acc">
        <button className="border-2 border-blue-500 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full m-2 transition-all duration-300 w-full sm:w-auto">
          SPANISH ACCELERATOR
        </button>
      </Link> */}
      <a
        href="https://www.skool.com/spanish-enablers-pro-5048/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-gradient w-full sm:w-auto">
          SKOOL PRO COMMUNITY
        </button>
      </a>

      {/* <a
        href=" https://www.skool.com/the-spanish-enablers-3330/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 animate-gradient w-full sm:w-auto">
          SKOOL FREE COMMUNITY
        </button>
      </a> */}
    </div>
  </div>
</section>




    </>
  );
};

export default Hero;