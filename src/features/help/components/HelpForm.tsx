'use client'
import { useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  interests: string[];
  location: string;
}

const HelpForm: React.FC = () => {
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
    <div className="bg-white/95 backdrop-blur-sm p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* What's on your mind section */}
        <div>
          <h3 className="text-xl font-medium text-[#0D52E5] mb-6">
            WHAT&apos;S ON UR MIND?
          </h3>
          <div className="space-y-4">
            {interestOptions.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(option)}
                  onChange={() => handleCheckboxChange(option, 'interests')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm"
                  style={{ borderColor: '#0D52E5' }}
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Your location section */}
        <div>
          <h3 className="text-xl font-medium text-[#0D52E5] mb-6">
            YOUR LOCATION
          </h3>
          <div className="space-y-4">
            {locationOptions.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.location === option}
                  onChange={() => handleCheckboxChange(option, 'location')}
                  className="mt-1 w-4 h-4 text-[#0D52E5] border-[#0D52E5] focus:ring-[#0D52E5] rounded-sm"
                />
                <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
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
              className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='FULL NAME'
            />
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
                className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
                style={{ borderColor: '#0D52E5' }}
                required
                placeholder='EMAIL ADDRESS'
              />
            </div>

            <div className='flex-1'>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white"
                style={{ borderColor: '#0D52E5' }}
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
              rows={6}
              className="w-full px-4 py-4 border focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent placeholder-[#0D52E5] text-[#0D52E5] bg-white resize-none"
              style={{ borderColor: '#0D52E5' }}
              required
              placeholder='MESSAGE'
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0D52E5] text-white py-4 px-6 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:ring-offset-2 text-lg"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpForm; 