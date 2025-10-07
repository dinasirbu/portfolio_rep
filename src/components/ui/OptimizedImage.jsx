import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  onLoad,
  onError,
  placeholder = true,
  fit = "cover",
  backgroundColor = "#f8f9fa",
  imgProps = {},
  style,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading !== 'lazy') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const { style: imgStyle, ...restImgProps } = imgProps;

  return (
    <div
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{ background: backgroundColor, ...(style || {}) }}
      {...props}
    >
      {/* Placeholder/Loading State */}
      {placeholder && !isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="placeholder-shimmer"></div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="image-error">
          <div className="error-icon">📷</div>
          <span>Image failed to load</span>
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
          style={{ objectFit: fit, ...(imgStyle || {}) }}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          {...restImgProps}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
