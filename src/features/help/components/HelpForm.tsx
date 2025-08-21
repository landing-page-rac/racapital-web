'use client'
import { useState } from 'react';
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

interface HelpFormProps {
  data: ContactUsData;
}

const HelpForm: React.FC<HelpFormProps> = ({ data }) => {
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
    <div className="bg-white/95 backdrop-blur-sm p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Success/Error Messages */}
        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'An error occurred while sending your message. Please try again.'}
          </div>
        )}

        {/* What's on your mind section */}
        <div>
          <h3 className="text-xl font-medium text-[#0D52E5] mb-6">
            {data.topicTitle}
          </h3>
          <div className="space-y-4">
            {data.topicOptions.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(option.label)}
                  onChange={() => handleCheckboxChange(option.label, 'interests')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm"
                  style={{ borderColor: '#0D52E5' }}
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Your location section */}
        <div>
          <h3 className="text-xl font-medium text-[#0D52E5] mb-6">
            {data.locationTitle}
          </h3>
          <div className="space-y-4">
            {data.locationOptions.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.location === option.label}
                  onChange={() => handleCheckboxChange(option.label, 'location')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm"
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Contact form fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.fullName ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.fullName ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='FULL NAME'
            />
            {validationErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
            )}
          </div>

          {/* Email and Phone */}
          <div className='flex gap-4'>
            <div className='flex-1'>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.email ? 'border-red-500' : ''}`}
                style={{ borderColor: validationErrors.email ? '#ef4444' : '#0D52E5' }}
                required
                placeholder='EMAIL ADDRESS'
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className='flex-1'>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white ${validationErrors.phone ? 'border-red-500' : ''}`}
                style={{ borderColor: validationErrors.phone ? '#ef4444' : '#0D52E5' }}
                required
                placeholder='PHONE NUMBER'
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
              style={{ borderColor: validationErrors.message ? '#ef4444' : '#0D52E5' }}
              required
              placeholder='MESSAGE'
            />
            {validationErrors.message && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:ring-offset-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'SENDING...' : 'SEND'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm; 