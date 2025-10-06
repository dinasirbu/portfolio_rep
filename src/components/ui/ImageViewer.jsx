import React, { useState, useEffect, useCallback } from 'react';
import OptimizedImage from './OptimizedImage';
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerStyle, setContainerStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const isOpen = currentIndex !== null && images && images.length > 0;

  useEffect(() => {
    // Only run effects if viewer should be open
    if (!isOpen) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Lock body scroll when viewer is open
    lockScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      // Unlock scroll when viewer closes
      unlockScroll();
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  // Calculate container size based on image dimensions
  useEffect(() => {
    if (currentIndex !== null && images && images.length > 0) {
      const currentImage = images[currentIndex];
      const img = new Image();

      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;
        const aspectRatio = naturalWidth / naturalHeight;

        // Calculate maximum dimensions that fit within viewport
        const maxWidthPercent = isMobile ? 0.95 : 0.8;
        const maxHeightPercent = isMobile ? 0.85 : 0.8;
        const maxWidth = window.innerWidth * maxWidthPercent;
        const maxHeight = window.innerHeight * maxHeightPercent;

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
          maxWidth: isMobile ? "95vw" : "80vw",
          maxHeight: isMobile ? "85vh" : "80vh",
        });
      };

      img.src = currentImage.src;
    }
  }, [currentIndex, images, isMobile]);

  // Early return AFTER all hooks (React rules)
  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="image-viewer-overlay"
      onClick={onClose}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        className="image-viewer-container"
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Mobile tap navigation areas */}
        {isMobile && images.length > 1 && (
          <>
            {/* Left side - Previous image */}
            <div
              className="mobile-nav-area mobile-nav-left"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "30%",
                zIndex: 10,
                cursor: "pointer",
              }}
              aria-label="Previous image"
            />
            {/* Right side - Next image */}
            <div
              className="mobile-nav-area mobile-nav-right"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "30%",
                zIndex: 10,
                cursor: "pointer",
              }}
              aria-label="Next image"
            />
          </>
        )}
        {/* Close button - hidden on mobile */}
        {!isMobile && (
          <button
            className="image-viewer-close"
            onClick={onClose}
            aria-label="Close image viewer"
          >
            ×
          </button>
        )}

        {/* Previous button - hidden on mobile */}
        {images.length > 1 && !isMobile && (
          <button
            className="image-viewer-nav image-viewer-prev"
            onClick={onPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {/* Next button - hidden on mobile */}
        {images.length > 1 && !isMobile && (
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
