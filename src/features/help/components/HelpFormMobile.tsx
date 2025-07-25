'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  location: string;
}

const HelpFormMobile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    interests: [],
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value: string, type: 'interests' | 'location') => {
    if (type === 'interests') {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.includes(value)
          ? prev.interests.filter(item => item !== value)
          : [...prev.interests, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        location: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Help form submitted:', formData);
  };

  const interestOptions = [
    "Passing on our wealth in line with our family's purpose, wishes and values",
    "Raising capital for my business or seeking advice on the pre- and post-sale of my business",
    "Seeking interesting investment ideas or looking to appoint a trusted investment manager",
    "Moving to another country and would like help planning both the financial and lifestyle aspects",
    "National and international tax planning",
    "Something else"
  ];

  const locationOptions = [
    "Our wealth is based largely in one country",
    "Our wealth is based in more than one country"
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 mx-4 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* What's on your mind section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-medium text-[#0D52E5] mb-4">
            WHAT&apos;S ON YOUR MIND?
          </h3>
          <div className="space-y-3">
            {interestOptions.map((option, index) => (
              <motion.label
                key={index}
                className="flex items-start space-x-3 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                viewport={{ once: true }}
              >
                <input
                  type="checkbox"
                  checked={formData.interests.includes(option)}
                  onChange={() => handleCheckboxChange(option, 'interests')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm flex-shrink-0"
                  style={{ borderColor: '#0D52E5' }}
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Your location section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-medium text-[#0D52E5] mb-4">
            YOUR LOCATION
          </h3>
          <div className="space-y-3">
            {locationOptions.map((option, index) => (
              <motion.label
                key={index}
                className="flex items-start space-x-3 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <input
                  type="checkbox"
                  checked={formData.location === option}
                  onChange={() => handleCheckboxChange(option, 'location')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm flex-shrink-0"
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Contact form fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='FULL NAME'
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='EMAIL ADDRESS'
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='PHONE NUMBER'
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white resize-none"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='MESSAGE'
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:ring-offset-2 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            SEND
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default HelpFormMobile; 