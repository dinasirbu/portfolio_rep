import React, { useState, useCallback, memo } from 'react';
import OptimizedImage from './OptimizedImage';

const ImageCollage = ({ images, maxImages = 4 }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  if (!images || images.length === 0) return null;
  
  // Take the first few images, skipping the first one (description image)
  const collageImages = images.slice(1, maxImages + 1);
  
  if (collageImages.length === 0) {
    // Fallback to first image if no other images
    return (
      <div className="image-collage single">
        <OptimizedImage 
          src={images[0].src} 
          alt={images[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
      </div>
    );
  }

  if (collageImages.length === 1) {
    return (
      <div className="image-collage single">
        <OptimizedImage 
          src={collageImages[0].src} 
          alt={collageImages[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
      </div>
    );
  }

  if (collageImages.length === 2) {
    return (
      <div className="image-collage two-images">
        <OptimizedImage 
          src={collageImages[0].src} 
          alt={collageImages[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
        <OptimizedImage 
          src={collageImages[1].src} 
          alt={collageImages[1].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(1)}
        />
      </div>
    );
  }

  if (collageImages.length === 3) {
    return (
      <div className="image-collage three-images">
        <OptimizedImage 
          src={collageImages[0].src} 
          alt={collageImages[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
        <OptimizedImage 
          src={collageImages[1].src} 
          alt={collageImages[1].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(1)}
        />
        <OptimizedImage 
          src={collageImages[2].src} 
          alt={collageImages[2].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(2)}
        />
      </div>
    );
  }

  // 4 or more images
  return (
    <div className="image-collage four-images">
      <img 
        src={collageImages[0].src} 
        alt={collageImages[0].alt} 
        className="collage-image"
        loading="lazy"
        onLoad={() => handleImageLoad(0)}
      />
      <img 
        src={collageImages[1].src} 
        alt={collageImages[1].alt} 
        className="collage-image"
        loading="lazy"
        onLoad={() => handleImageLoad(1)}
      />
      <img 
        src={collageImages[2].src} 
        alt={collageImages[2].alt} 
        className="collage-image"
        loading="lazy"
        onLoad={() => handleImageLoad(2)}
      />
      <div className="collage-overlay">
        <OptimizedImage 
          src={collageImages[3].src} 
          alt={collageImages[3].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(3)}
        />
        <div className="more-images-indicator">
          +{images.length - 4}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCollage);
