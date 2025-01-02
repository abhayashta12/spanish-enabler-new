import React, { useState } from "react";
import { FaTiktok, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Ensure REACT_APP_API_URL points to your server, e.g. http://localhost:4242
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "Subscription successful!");
        setEmail("");
      } else {
        const error = await response.json();
        setMessage(error.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <footer className="bg-[#0b0f19] text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Spanish Enabler Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">The Spanish Enabler</h3>
          <p className="text-sm text-gray-400">
            Empowering you to learn Spanish effectively and confidently, one step at a time.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a
              href="https://www.tiktok.com/@thespanishenabler"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-xl hover:text-yellow-500 transition-colors duration-300" />
            </a>
            <a
              href="https://www.instagram.com/thespanishenabler/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl hover:text-yellow-500 transition-colors duration-300" />
            </a>
            <a
              href="https://www.youtube.com/@TheSpanishEnabler/videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-xl hover:text-yellow-500 transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#hero" className="text-gray-400 hover:underline hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:underline hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#courses" className="text-gray-400 hover:underline hover:text-white">
                Courses
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:underline hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Stay updated with our latest courses and tips.
          </p>
          <form onSubmit={handleSubmit} className="newsletter-bar flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="mt-4 text-sm text-yellow-400">{message}</p>}
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-10 border-t border-gray-800 pt-4">
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Spanish Enabler. All Rights Reserved.</p>
          <p className="space-x-2">
            {/* <a href="#privacy" className="hover:text-white hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-white hover:underline">
              Terms of Service
            </a> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;