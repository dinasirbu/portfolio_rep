import React, { useState, useCallback, memo } from 'react';
import OptimizedImage from './OptimizedImage';

const ImageCollage = ({ images, maxImages = 4, variant = 'default', work }) => {
  const [, setLoadedImages] = useState(new Set());
  
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  if (!images || images.length === 0) return null;
  
  // Custom collage images for specific projects
  const getCustomCollageImages = (workId) => {
    switch (workId) {
      case 'branding-granier':
        return [
          { src: '/branding/granier-presentation/granier-16.jpg', alt: 'Granier brand identity 16' },
          { src: '/branding/granier-presentation/granier-17.jpg', alt: 'Granier brand identity 17' },
          { src: '/branding/granier-presentation/granier-06.jpg', alt: 'Granier brand identity 6' }
        ];
      case 'packaging-apifera-3jars':
        return [
          { src: '/packaging/apifera-3-jars-presentation/apifera-3-jars-04.jpg', alt: 'Apifera 3 jars packaging 4' },
          { src: '/packaging/apifera-3-jars-presentation/apifera-3-jars-05.jpg', alt: 'Apifera 3 jars packaging 5' },
          { src: '/packaging/apifera-3-jars-presentation/apifera-3-jars-06.jpg', alt: 'Apifera 3 jars packaging 6' },
          { src: '/packaging/apifera-3-jars-presentation/apifera-3-jars-07.jpg', alt: 'Apifera 3 jars packaging 7' }
        ];
      case 'packaging-apifera-hexagon':
        return [
          { src: '/packaging/apifera-hexagon-presentation/apifera-hexagon-04.jpg', alt: 'Apifera hexagon packaging 4' },
          { src: '/packaging/apifera-hexagon-presentation/apifera-hexagon-05.jpg', alt: 'Apifera hexagon packaging 5' },
          { src: '/packaging/apifera-hexagon-presentation/apifera-hexagon-06.jpg', alt: 'Apifera hexagon packaging 6' },
          { src: '/packaging/apifera-hexagon-presentation/apifera-hexagon-07.jpg', alt: 'Apifera hexagon packaging 7' }
        ];
      case 'packaging-selik':
        return [
          { src: '/packaging/selik-presentation/Selik-16.jpg', alt: 'Selik packaging 16' },
          { src: '/packaging/selik-presentation/Selik-04.jpg', alt: 'Selik packaging 4' },
          { src: '/packaging/selik-presentation/Selik-05.jpg', alt: 'Selik packaging 5' },
          { src: '/packaging/selik-presentation/Selik-06.jpg', alt: 'Selik packaging 6' }
        ];
      case 'packaging-lunchemeat':
        // Try different combination: 02, 05, 08, 10 for better visual variety
        return [
          { src: '/packaging/lunchemeat-presentation/Lunchemeat-02.jpg', alt: 'Lunchemeat packaging 2' },
          { src: '/packaging/lunchemeat-presentation/Lunchemeat-05.jpg', alt: 'Lunchemeat packaging 5' },
          { src: '/packaging/lunchemeat-presentation/Lunchemeat-08.jpg', alt: 'Lunchemeat packaging 8' },
          { src: '/packaging/lunchemeat-presentation/Lunchemeat-10.jpg', alt: 'Lunchemeat packaging 10' }
        ];
      case 'packaging-sousages':
        // Set crenvurști-04 as main image: 04, 05, 07, 11
        return [
          { src: '/packaging/sousages-presentation/crenvurști-04.jpg', alt: 'Sousages packaging 4' },
          { src: '/packaging/sousages-presentation/crenvurști-05.jpg', alt: 'Sousages packaging 5' },
          { src: '/packaging/sousages-presentation/crenvurști-07.jpg', alt: 'Sousages packaging 7' },
          { src: '/packaging/sousages-presentation/crenvurști-11.jpg', alt: 'Sousages packaging 11' }
        ];
      default:
        return null;
    }
  };

  // Use custom collage images if available, otherwise use default logic
  const customImages = work ? getCustomCollageImages(work.id) : null;
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