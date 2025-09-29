import React from 'react';

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    } else if (e.key === 'ArrowRight') {
      onNext();
    }
  }, [onClose, onPrev, onNext]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (currentIndex === null || !images || images.length === 0) return null;
  
  const currentImage = images[currentIndex];

  return (
    <div 
      className="image-viewer-overlay"
      onClick={onClose}
    >
      <div 
        className="image-viewer-container"
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
        <img
          src={currentImage.src}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="image-viewer-main"
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
