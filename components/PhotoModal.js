// components/PhotoModal.js

import React from 'react';
import { FaTimes } from 'react-icons/fa'; // FontAwesome close icon

const PhotoModal = ({ isOpen, onClose, image }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 rounded-lg max-w-4xl mx-4">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <img
          className="w-full h-auto max-h-[80vh] object-contain"
          src={image.urls.regular}
          alt={image.alt_description || 'Preview'}
        />
      </div>
    </div>
  );
};

export default PhotoModal;
