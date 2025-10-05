import React, { useState, useEffect, useCallback } from 'react';
import OptimizedImage from './OptimizedImage';

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerStyle, setContainerStyle] = useState({});

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    } else if (e.key === 'ArrowRight') {
      onNext();
    }
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Calculate container size based on image dimensions
  useEffect(() => {
    if (currentIndex !== null && images && images.length > 0) {
      const currentImage = images[currentIndex];
      const img = new Image();
      
      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;
        const aspectRatio = naturalWidth / naturalHeight;
        
        // Calculate maximum dimensions that fit within viewport
        const maxWidth = window.innerWidth * 0.8; // 80% of viewport width
        const maxHeight = window.innerHeight * 0.8; // 80% of viewport height
        
        let containerWidth, containerHeight;
        
        if (aspectRatio > 1) {
          // Landscape image
          containerWidth = Math.min(maxWidth, naturalWidth);
          containerHeight = containerWidth / aspectRatio;
          
          if (containerHeight > maxHeight) {
            containerHeight = maxHeight;
            containerWidth = containerHeight * aspectRatio;
          }
        } else {
          // Portrait or square image
          containerHeight = Math.min(maxHeight, naturalHeight);
          containerWidth = containerHeight * aspectRatio;
          
          if (containerWidth > maxWidth) {
            containerWidth = maxWidth;
            containerHeight = containerWidth / aspectRatio;
          }
        }
        
        setImageDimensions({ width: containerWidth, height: containerHeight });
        setContainerStyle({
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          maxWidth: '80vw',
          maxHeight: '80vh'
        });
      };
      
      img.src = currentImage.src;
    }
  }, [currentIndex, images]);

  if (currentIndex === null || !images || images.length === 0) return null;
  
  const currentImage = images[currentIndex];
  
  return (
    <div 
      className="image-viewer-overlay"
      onClick={onClose}
    >
      <div 
        className="image-viewer-container"
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="image-viewer-close"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          ×
        </button>
        
        {/* Previous button */}
        {images.length > 1 && (
          <button
            className="image-viewer-nav image-viewer-prev"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}
        
        {/* Next button */}
        {images.length > 1 && (
          <button
            className="image-viewer-nav image-viewer-next"
            onClick={onNext}
            aria-label="Next image"
          >
            ›
          </button>
        )}
        
        {/* Main image */}
        <OptimizedImage
          src={currentImage.src}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="image-viewer-main"
          loading="eager"
          placeholder={false}
        />
        
        {/* Image counter */}
        <div className="image-viewer-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
