'use client'
import { useState } from 'react';
import { useContactForm } from '@/shared/hooks';
import { validateContactForm, ValidationErrors } from '@/shared/utils';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const { submitContactForm, isLoading, isSuccess, isError, error } = useContactForm();

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

    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await submitContactForm(formData);
      // Reset form and validation errors on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
      setValidationErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="bg-white p-5 shadow-lg">
      {/* Success/Error Messages */}
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {isError && error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.fullName ? 'border-red-500' : 'border-[#0D52E5]'
              }`}
            required
            placeholder='FULL NAME'
          />
          {validationErrors.fullName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div className='flex gap-3'>
          <div className='flex-1'>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black ${validationErrors.email ? 'border-red-500' : 'border-[#0D52E5]'
                }`}
              required
              placeholder='EMAIL ADDRESS'
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className='flex-1'>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black"
              required
              placeholder='PHONE NUMBER'
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5] text-black"
            required
            placeholder='MESSAGE'
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'SENDING...' : 'SEND'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 