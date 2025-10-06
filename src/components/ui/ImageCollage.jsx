import React, { useState, useCallback, memo } from 'react';
import OptimizedImage from './OptimizedImage';
import { getCustomCollageImages } from '../../config/collageConfig';

const ImageCollage = ({ images, maxImages = 4, variant = 'default', work }) => {
  const [, setLoadedImages] = useState(new Set());
  
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  if (!images || images.length === 0) return null;
  
  // Get custom collage images if configured for this work, otherwise use default logic
  const customImages = work?.id ? getCustomCollageImages(work.id) : null;
  const collageImages = customImages || images.slice(1, maxImages + 1);
  
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

  // Enhanced collage layouts based on variant
  if (variant === 'hero') {
    return (
      <div className="image-collage hero-layout">
        <div className="hero-main">
          <OptimizedImage 
            src={collageImages[0].src} 
            alt={collageImages[0].alt} 
            className="collage-image hero-main-image"
            loading="lazy"
            onLoad={() => handleImageLoad(0)}
          />
        </div>
        <div className="hero-side">
          {collageImages.slice(1, 3).map((img, index) => (
            <OptimizedImage 
              key={index}
              src={img.src} 
              alt={img.alt} 
              className="collage-image hero-side-image"
              loading="lazy"
              onLoad={() => handleImageLoad(index + 1)}
            />
          ))}
          {collageImages.length > 3 && (
            <div className="hero-overlay">
              <OptimizedImage 
                src={collageImages[3].src} 
                alt={collageImages[3].alt} 
                className="collage-image hero-overlay-image"
                loading="lazy"
                onLoad={() => handleImageLoad(3)}
              />
              <div className="more-images-indicator">
                +{images.length - 4}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'masonry') {
    return (
      <div className="image-collage masonry-layout">
        {collageImages.map((img, index) => (
          <div 
            key={index}
            className={`masonry-item masonry-item-${index + 1}`}
          >
            <OptimizedImage 
              src={img.src} 
              alt={img.alt} 
              className="collage-image masonry-image"
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
        {images.length > maxImages && (
          <div className="masonry-overlay">
            <div className="more-images-indicator">
              +{images.length - maxImages}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default enhanced layout
  if (collageImages.length === 1) {
    return (
      <div className="image-collage single enhanced">
        <OptimizedImage 
          src={collageImages[0].src} 
          alt={collageImages[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
        <div className="collage-overlay-gradient" />
      </div>
    );
  }

  if (collageImages.length === 2) {
    return (
      <div className="image-collage two-images enhanced">
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
        <div className="collage-overlay-gradient" />
      </div>
    );
  }

  if (collageImages.length === 3) {
    return (
      <div className="image-collage three-images enhanced">
        <div className="three-main">
          <OptimizedImage 
            src={collageImages[0].src} 
            alt={collageImages[0].alt} 
            className="collage-image"
            loading="lazy"
            onLoad={() => handleImageLoad(0)}
          />
        </div>
        <div className="three-side">
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
        <div className="collage-overlay-gradient" />
      </div>
    );
  }

  // 4 or more images - enhanced grid
  return (
    <div className="image-collage four-images enhanced">
      <div className="four-main">
        <OptimizedImage 
          src={collageImages[0].src} 
          alt={collageImages[0].alt} 
          className="collage-image"
          loading="lazy"
          onLoad={() => handleImageLoad(0)}
        />
      </div>
      <div className="four-side">
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
      <div className="four-overlay">
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
      <div className="collage-overlay-gradient" />
    </div>
  );
};

export default memo(ImageCollage);