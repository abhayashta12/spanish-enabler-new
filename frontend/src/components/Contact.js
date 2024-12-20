import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
 

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFocus = (field) => {
    setFocused((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field) => {
    if (formData[field] === '') {
      setFocused((prevState) => ({ ...prevState, [field]: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('One or more EmailJS environment variables are missing.');
      setErrorMessage('Configuration error. Please try again later.');
      return;
    }

    try {
      const result = await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey);

      console.log('Email successfully sent!', result.text);
      setSuccessMessage('Your message has been sent successfully!');
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '' });
      setFocused({ name: false, email: false, message: false });
    } catch (error) {
      console.error('There was an error sending the email:', error);
      setErrorMessage(`Oops! Something went wrong. Please try again later. Error details: ${error.text || 'Unknown error'}`);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-95">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-5xl font-serif font-bold text-center mb-8 text-gray-800">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Ready to speak Spanish confidently? Get in touch today and start your journey!
        </p>

        {successMessage && (
          <div className="bg-green-50 text-green-800 p-4 mb-6 rounded-md border border-green-200">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-50 text-red-800 p-4 mb-6 rounded-md border border-red-200">
            {errorMessage}
          </div>
        )}

        <form
          className="bg-white p-8 rounded-md shadow-sm border border-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <input
                className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={() => handleBlur('name')}
                required
              />
              <label
                className={`absolute left-3 transition-all duration-200 ${
                  focused.name || formData.name
                    ? 'text-xs text-gray-600 -top-2 bg-white px-1'
                    : 'text-gray-500 top-3'
                }`}
              >
                Your Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                required
              />
              <label
                className={`absolute left-3 transition-all duration-200 ${
                  focused.email || formData.email
                    ? 'text-xs text-gray-600 -top-2 bg-white px-1'
                    : 'text-gray-500 top-3'
                }`}
              >
                Your Email
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                className="w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 transition duration-200 resize-none"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={() => handleBlur('message')}
                required
              ></textarea>
              <label
                className={`absolute left-3 transition-all duration-200 ${
                  focused.message || formData.message
                    ? 'text-xs text-gray-600 -top-2 bg-white px-1'
                    : 'text-gray-500 top-3'
                }`}
              >
                Your Message
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 transition-colors text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
