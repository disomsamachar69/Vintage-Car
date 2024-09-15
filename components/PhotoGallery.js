import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchVintageCarPhotos } from '../utils/unsplash';
import PhotoModal from './PhotoModal'; // Import the PhotoModal component

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // State for the selected photo
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const containerRef = useRef(null);

  useEffect(() => {
    loadMorePhotos(); // Initial load

    // Auto-scrolling function
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          top: 300, // Adjust scroll speed here
          behavior: 'smooth'
        });
      }
    }, 2000); // Adjust interval time here (in milliseconds)

    // Cleanup interval on component unmount
    return () => clearInterval(scrollInterval);
  }, []);

  const loadMorePhotos = async () => {
    const newPhotos = await fetchVintageCarPhotos(page);
    if (newPhotos.length === 0) {
      setHasMore(false);
    }
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setPage(page + 1);
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <img
          src="/logo.png" // Path to your image
          alt="Vintage Car Photos"
          className="w-52 h-33 mx-auto"
        />
      </div>

      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: '100vh' }} // Ensure the container has a height to scroll
      >
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMorePhotos}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
                src={photo.urls.regular}
                alt={photo.alt_description || 'Vintage car photo'}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* Render PhotoModal if there is a selected photo */}
      <PhotoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        image={selectedPhoto}
      />
    </div>
  );
};

export default PhotoGallery;
