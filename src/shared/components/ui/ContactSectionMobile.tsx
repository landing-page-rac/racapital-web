'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import superGraphic from "../../../features/landing/assets/super-graphic-white.png";
import Image from "next/image";
import { useContactForm } from '@/shared/hooks';
import { validateContactForm, ValidationErrors } from '@/shared/utils';
import SuccessModal from './SuccessModal';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSectionMobile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { submitContactForm, isLoading, isSuccess, isError, error } = useContactForm();

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Watch for success/error states from the hook
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
      setValidationErrors({});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && error) {
      console.log('ERROR! API error occurred:', error);
      // API errors are handled by showing them in the console
    }
  }, [isError, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateContactForm(formData);
    setValidationErrors(errors);

    // If there are validation errors, don't submit (errors shown inline below inputs)
    if (Object.keys(errors).length > 0) {
      console.log('Validation failed, errors shown inline below inputs');
      return;
    }

    try {
      await submitContactForm(formData);
    } catch (error) {
      // Error handling is done in useEffect watching isError
      console.error('Form submission error:', error);
    }
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <section className="bg-[#0D52E5] py-16 px-4 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={superGraphic.src}
            alt="Background Graphic"
            className="w-full h-full object-cover opacity-30"
            fill
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              How Can We <span className="underline decoration-2 underline-offset-4">Aid</span> You?
            </h2>
            <p className="text-lg leading-relaxed text-blue-100 max-w-2xl mx-auto">
              Nothing beats a one-on-one discussion. If you&apos;d like to learn more about our tailored solutions, drop us a line and one of our consultants will reach out shortly.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-5 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.fullName ? 'border-red-500' : 'border-[#0D52E5]'}`}
                  placeholder='FULL NAME'
                />
                {validationErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
                )}
              </motion.div>

              {/* Email Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.email ? 'border-red-500' : 'border-[#0D52E5]'}`}
                  placeholder='EMAIL ADDRESS'
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </motion.div>

              {/* Phone Number */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.phone ? 'border-red-500' : 'border-[#0D52E5]'}`}
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
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.message ? 'border-red-500' : 'border-[#0D52E5]'}`}
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
                className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                {isLoading ? 'SENDING...' : 'SEND'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSectionMobile; 