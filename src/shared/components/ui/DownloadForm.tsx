'use client';

import React, { useState } from 'react';
import { useAttachmentLog } from '../../hooks';

interface DownloadFormProps {
  title: string;
  collectionType: string;
  collectionIdentifier: string;
  fileKey: string;
  fileUrl: string;
  onDownload: (formData: { fullName: string; email: string; phone: string }) => void;
  onClose: () => void;
}

const DownloadForm: React.FC<DownloadFormProps> = ({
  title,
  collectionType,
  collectionIdentifier,
  fileKey,
  fileUrl,
  onDownload,
  onClose
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const { submitAttachmentLog, isLoading, isError, error } = useAttachmentLog();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      try {
        // Submit to attachment log API
        await submitAttachmentLog({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          collectionType,
          collectionIdentifier,
          fileKey,
        });

        // Call the original onDownload callback
        onDownload(formData);

        // Redirect to the file URL in a new tab
        window.open(fileUrl, '_blank');

        // Close the modal
        onClose();
      } catch (error) {
        console.error('Failed to submit attachment log:', error);
        // Still call onDownload even if logging fails
        onDownload(formData);

        // Still redirect to file even if logging fails
        window.open(fileUrl, '_blank');

        // Close the modal
        onClose();
      }
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D52E5] mb-2">
        Please provide your contact details to download this content
      </h2>
      <p className="text-[#0D52E5] text-sm mb-6">
        Summary of {title}
      </p>

      {isError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error || 'An error occurred. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="FULL NAME"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent text-sm sm:text-base"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="EMAIL ADDRESS"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent text-sm sm:text-base"
            required
            disabled={isLoading}
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="PHONE NUMBER"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-[#0D52E5] rounded text-[#0D52E5] placeholder-[#0D52E5] focus:outline-none focus:ring-2 focus:ring-[#0D52E5] focus:border-transparent text-sm sm:text-base"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0D52E5] text-white py-2 sm:py-3 px-4 sm:px-6 rounded font-semibold hover:bg-[#0A3FB8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          disabled={isLoading}
        >
          {isLoading ? 'PROCESSING...' : 'DOWNLOAD'}
        </button>
      </form>
    </div>
  );
};

export default DownloadForm;
