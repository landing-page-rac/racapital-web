'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EventData } from '../../types';
import { Modal, DownloadForm } from '../../../../shared/components/ui';

interface EventAttachmentProps {
  event: EventData;
}

const EventAttachment: React.FC<EventAttachmentProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event.attachment || !event.attachment.media || !event.attachment.media.url) return null;

  // Extract file key from URL by removing the S3 base URL
  const getFileKey = (url: string) => {
    const baseUrl = 'https://rac-content-bucket.s3.ap-southeast-3.amazonaws.com';
    return url.replace(baseUrl, '').replace(/^\//, ''); // Remove leading slash if present
  };

  const handleDownload = (formData: { fullName: string; email: string; phone: string }) => {
    // Here you can implement the actual download logic
    console.log('Download requested with form data:', formData);
    console.log('File URL:', event.attachment?.media?.url);

    // For now, just close the modal
    setIsModalOpen(false);

    // You can add actual download logic here:
    // window.open(event.attachment?.media?.url, '_blank');
  };

  return (
    <>
      <motion.section
        className="bg-white py-16 px-4 -mx-4 sm:-mx-6 lg:-mx-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.button
            className="border border-[#0D52E5] text-[#0D52E5] px-8 py-4 hover:bg-[#0D52E5] hover:text-white transition-colors duration-200 cursor-pointer text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            Download Summary File
          </motion.button>
        </div>
      </motion.section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DownloadForm
          title={event.title || 'Event'}
          collectionType="Event"
          collectionIdentifier={event.documentId}
          fileKey={event.attachment?.media?.url ? getFileKey(event.attachment.media.url) : ''}
          fileUrl={event.attachment?.media?.url || ''}
          onDownload={handleDownload}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default EventAttachment;
