'use client'
import { useState, useEffect } from 'react';
import { useContactForm } from '@/shared/hooks';
import { validateContactForm, ValidationErrors } from '@/shared/utils';
import SuccessModal from './SuccessModal';

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

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Watch for success/error states from the hook
  useEffect(() => {
    console.log('useEffect [isSuccess] triggered, isSuccess:', isSuccess);
    if (isSuccess) {
      console.log('SUCCESS! Showing success modal and resetting form');
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
    console.log('useEffect [isError] triggered, isError:', isError, 'error:', error);
    if (isError && error) {
      console.log('ERROR! API error occurred:', error);
      // API errors are handled by showing them in the console
      // You could add additional error handling here if needed
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

    console.log('=== FORM SUBMIT STARTED ===');
    console.log('Form Data:', formData);

    // Validate form
    const errors = validateContactForm(formData);
    console.log('Validation Errors:', errors);
    setValidationErrors(errors);

    // If there are validation errors, don't submit (errors shown inline below inputs)
    if (Object.keys(errors).length > 0) {
      console.log('Validation failed, errors shown inline below inputs');
      return;
    }

    console.log('Validation passed, submitting to API...');

    try {
      console.log('Calling submitContactForm...');
      const result = await submitContactForm(formData);
      console.log('Submit successful, result:', result);
    } catch (error) {
      // Error handling is done in useEffect watching isError
      console.error('Form submission error:', error);
    }

    console.log('=== FORM SUBMIT ENDED ===');
  };

  return (
    <>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      <div className="bg-white p-5 shadow-lg">

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
    </>
  );
};

export default ContactForm; 