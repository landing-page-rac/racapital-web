'use client';

import React, { useState } from 'react';

interface DownloadFormProps {
  title: string;
  onDownload: (formData: { fullName: string; email: string; phone: string }) => void;
  onClose: () => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({ title, onDownload }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      onDownload(formData);
    }
  };

  return (
    <div className="bg-white p-2">
      <h2 className="text-2xl font-bold text-[#0D52E5] mb-2 text-center">
        Please provide your contact details to download this content
      </h2>
      <p className="text-[#0D52E5] text-sm mb-6 text-center">
        Summary of {title}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="FULL NAME"
            className="w-full px-4 py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="EMAIL ADDRESS"
            className="w-full px-4 py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="PHONE NUMBER"
            className="w-full px-4 py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0D52E5] text-white py-3 px-6 rounded font-semibold hover:bg-[#0A3FB8] transition-colors duration-200"
        >
          DOWNLOAD
        </button>
      </form>
    </div>
  );
};

export default DownloadForm;
