'use client'
import { useState } from 'react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
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
            className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5]"
            required
            placeholder='FULL NAME'
          />
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
              className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5]"
              required
              placeholder='EMAIL ADDRESS'

            />
          </div>

          {/* Phone Number */}
          <div className='flex-1'>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5]"
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
            className="w-full px-4 py-3 border border-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-[#0D52E5]"
            required
            placeholder='MESSAGE'
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ContactForm; 