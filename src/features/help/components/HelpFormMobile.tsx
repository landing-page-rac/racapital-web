'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '@/shared/hooks/useContactForm';
import { validateContactForm, ValidationErrors } from '@/shared/utils/validation';
import { ContactUsData } from '../types';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  location: string;
}

interface HelpFormMobileProps {
  data: ContactUsData;
}

const HelpFormMobile: React.FC<HelpFormMobileProps> = ({ data }) => {
  const { submitContactForm, isLoading, isSuccess, isError, error } = useContactForm();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Prepare topic from selected interests
      const topic = formData.interests.length > 0 ? formData.interests.join(', ') : '-';

      await submitContactForm({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        topic: topic,
        location: formData.location || '-'
      });

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        interests: [],
        location: ''
      });
      setValidationErrors({});
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-5 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Success/Error Messages */}
        {isSuccess && (
          <motion.div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
          </motion.div>
        )}

        {isError && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error || 'An error occurred while sending your message. Please try again.'}
          </motion.div>
        )}

        {/* What's on your mind section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-medium text-[#0D52E5] mb-4">
            {data.topicTitle}
          </h3>
          <div className="space-y-3">
            {data.topicOptions.map((option, index) => (
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
                  checked={formData.interests.includes(option.label)}
                  onChange={() => handleCheckboxChange(option.label, 'interests')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm flex-shrink-0"
                  style={{ borderColor: '#0D52E5' }}
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option.label}</span>
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
            {data.locationTitle}
          </h3>
          <div className="space-y-3">
            {data.locationOptions.map((option, index) => (
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
                  checked={formData.location === option.label}
                  onChange={() => handleCheckboxChange(option.label, 'location')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm flex-shrink-0"
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option.label}</span>
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
              className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.fullName ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.fullName ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='FULL NAME'
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
            )}
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
              className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.email ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.email ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='EMAIL ADDRESS'
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
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
              className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.phone ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.phone ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='PHONE NUMBER'
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
            )}
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
              className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.message ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='MESSAGE'
            />
            {validationErrors.message && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:ring-offset-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            {isLoading ? 'SENDING...' : 'SEND'}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default HelpFormMobile; 