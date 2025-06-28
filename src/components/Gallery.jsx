import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Gallery.css';

function Gallery() {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const galleryItems = useMemo(() => [
    {
      id: 1,
      imageUrl: "/img/gallery/1.png"
    },
    {
      id: 2,
      imageUrl: "/img/gallery/2.png"
    },
    {
      id: 3,
      imageUrl: "/img/gallery/3.png"
    },
    {
      id: 4,
      imageUrl: "/img/gallery/4.png"
    },
    {
      id: 5,
      imageUrl: "/img/gallery/5.png"
    },
    {
      id: 6,
      imageUrl: "/img/gallery/6.png"
    },
    {
      id: 7,
      imageUrl: "/img/gallery/7.png"
    },
    {
      id: 8,
      imageUrl: "/img/gallery/8.png"
    },
    {
      id: 9,
      imageUrl: "/img/gallery/9.png"
    },
    {
      id: 10,
      imageUrl: "/img/gallery/10.png"
    },
    {
      id: 11,
      imageUrl: "/img/gallery/4.jpg"
    },
    {
      id: 12,
      imageUrl: "/img/gallery/11.png"
    },
    {
      id: 13,
      imageUrl: "/img/gallery/12.png"
    },
    {
      id: 14,
      imageUrl: "/img/gallery/13.png"
    },
    {
      id: 15,
      imageUrl: "/img/gallery/14.png"
    },
    {
      id: 16,
      imageUrl: "/img/gallery/15.jpg"
    }
  ], []);
  
  useEffect(() => {
    if (imagesLoaded === galleryItems.length) {
      setIsReady(true);
    }
  }, [imagesLoaded, galleryItems.length]);

  const handleImageLoaded = useCallback(() => {
    setImagesLoaded(prev => prev + 1);
  }, []);

  const handleImageClick = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="gallery-container">
      <div className="masonry-gallery">
        {galleryItems.map(item => (
          <div key={item.id} className="gallery-item" onClick={() => handleImageClick(item)}>
            <img 
              src={item.imageUrl} 
              alt={item.title}
              onLoad={handleImageLoaded}
              className={isReady ? "loaded" : ""}
            />
            <div className="gallery-item-title">{item.title}</div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div className="gallery-modal" onClick={handleCloseModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
            <div className="modal-title">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
