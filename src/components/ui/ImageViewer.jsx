import React, { useState, useEffect, useCallback, useRef } from 'react';
import OptimizedImage from './OptimizedImage';
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getTouchDistance = (touch1, touch2) => {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.hypot(dx, dy);
};

const getTouchCenter = (touch1, touch2) => ({
  x: (touch1.clientX + touch2.clientX) / 2,
  y: (touch1.clientY + touch2.clientY) / 2,
});

const SCALE_MIN = 1;
const SCALE_MAX = 4;
const SCALE_RESET_THRESHOLD = 1.05;

const ImageViewer = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const [, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerStyle, setContainerStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [transform, setTransform] = useState({ scale: SCALE_MIN, x: 0, y: 0 });
  const transformRef = useRef({ scale: SCALE_MIN, x: 0, y: 0 });
  const pendingTransformRef = useRef(null);
  const rafRef = useRef(null);
  const pinchStateRef = useRef(null);
  const panStateRef = useRef(null);
  const containerRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const isOpen = currentIndex !== null && images && images.length > 0;

  const resolveIsMobile = useCallback(() => {
    if (typeof window === "undefined") return false;

    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
    const width = window.innerWidth;

    // Treat touch devices as mobile regardless of orientation, or narrow viewports on desktop
    return coarsePointer || width <= 820;
  }, []);

  useEffect(() => {
    // Only run effects if viewer should be open
    if (!isOpen) return;

    const checkMobile = () => {
      setIsMobile(resolveIsMobile());
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.screen?.orientation?.addEventListener?.("change", checkMobile);

    // Lock body scroll when viewer is open
    lockScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.screen?.orientation?.removeEventListener?.("change", checkMobile);
      // Unlock scroll when viewer closes
      unlockScroll();
    };
  }, [isOpen, resolveIsMobile]);

  const flushTransform = useCallback(() => {
    if (pendingTransformRef.current) {
      setTransform(pendingTransformRef.current);
      pendingTransformRef.current = null;
    }
    rafRef.current = null;
  }, []);

  useEffect(() => () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pendingTransformRef.current = null;
    }
  }, []);

  const updateTransform = useCallback(
    (updater) => {
      const base = transformRef.current;
      const next = typeof updater === "function" ? updater(base) : updater;
      transformRef.current = next;
      pendingTransformRef.current = next;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(flushTransform);
      }
    },
    [flushTransform]
  );

  const resetTransform = useCallback(() => {
    pinchStateRef.current = null;
    panStateRef.current = null;
    updateTransform({ scale: SCALE_MIN, x: 0, y: 0 });
  }, [updateTransform]);

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
    if (!isMobile) return;

    if (e.touches.length === 2) {
      setTouchStart(null);
      setTouchEnd(null);
      const containerRect = containerRef.current?.getBoundingClientRect();
      const center = getTouchCenter(e.touches[0], e.touches[1]);
      const centerRelative = containerRect
        ? {
            x: center.x - (containerRect.left + containerRect.width / 2),
            y: center.y - (containerRect.top + containerRect.height / 2),
          }
        : { x: 0, y: 0 };
      pinchStateRef.current = {
        initialDistance: getTouchDistance(e.touches[0], e.touches[1]),
        initialScale: transformRef.current.scale,
        lastCenter: centerRelative,
      };
      panStateRef.current = null;
      return;
    }

    if (transformRef.current.scale > SCALE_MIN && e.touches.length === 1) {
      panStateRef.current = {
        lastX: e.touches[0].clientX,
        lastY: e.touches[0].clientY,
      };
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]?.clientX ?? null);
  };

  const onTouchMove = (e) => {
    if (!isMobile) return;

    if (e.touches.length === 2 && pinchStateRef.current) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const rawScale =
        pinchStateRef.current.initialScale * (distance / pinchStateRef.current.initialDistance);
      const nextScale = clamp(rawScale, SCALE_MIN, SCALE_MAX);

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) {
        updateTransform({ scale: nextScale, x: 0, y: 0 });
        return;
      }

      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const centerPoint = getTouchCenter(e.touches[0], e.touches[1]);
      const centerRelative = {
        x: centerPoint.x - containerCenterX,
        y: centerPoint.y - containerCenterY,
      };
      const previousCenter = pinchStateRef.current.lastCenter ?? centerRelative;
      const limitX = (containerRect.width * (nextScale - 1)) / 2;
      const limitY = (containerRect.height * (nextScale - 1)) / 2;

      updateTransform((prev) => {
        const scaleRatio = prev.scale === 0 ? 1 : nextScale / prev.scale;

        let nextX = prev.x + previousCenter.x * (1 - scaleRatio);
        let nextY = prev.y + previousCenter.y * (1 - scaleRatio);

        nextX += centerRelative.x - previousCenter.x;
        nextY += centerRelative.y - previousCenter.y;

        return {
          scale: nextScale,
          x: clamp(nextX, -limitX, limitX),
          y: clamp(nextY, -limitY, limitY),
        };
      });

      pinchStateRef.current.lastCenter = centerRelative;
      return;
    }

    if (transformRef.current.scale > SCALE_MIN && e.touches.length === 1) {
      e.preventDefault();
      const { clientX, clientY } = e.touches[0];

      if (!panStateRef.current) {
        panStateRef.current = { lastX: clientX, lastY: clientY };
        return;
      }

      const deltaX = clientX - panStateRef.current.lastX;
      const deltaY = clientY - panStateRef.current.lastY;
      panStateRef.current = { lastX: clientX, lastY: clientY };

      updateTransform((prev) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return prev;

        const limitX = (containerRect.width * (prev.scale - 1)) / 2;
        const limitY = (containerRect.height * (prev.scale - 1)) / 2;

        return {
          ...prev,
          x: clamp(prev.x + deltaX, -limitX, limitX),
          y: clamp(prev.y + deltaY, -limitY, limitY),
        };
      });

      return;
    }

    if (transformRef.current.scale > SCALE_MIN) {
      return;
    }

    setTouchEnd(e.targetTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = (e) => {
    if (!isMobile) return;

    if (pinchStateRef.current && e.touches.length < 2) {
      pinchStateRef.current = null;
    }

    if (transformRef.current.scale > SCALE_MIN) {
      if (e.touches.length === 1) {
        panStateRef.current = {
          lastX: e.touches[0].clientX,
          lastY: e.touches[0].clientY,
        };
      } else {
        panStateRef.current = null;
      }

      if (e.touches.length === 0 && transformRef.current.scale < SCALE_RESET_THRESHOLD) {
        resetTransform();
      }
      return;
    }

    if (!touchStart || touchEnd === null) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    setTouchStart(null);
    setTouchEnd(null);

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  // Calculate container size based on image dimensions
  useEffect(() => {
    if (!isOpen) {
      resetTransform();
    }
  }, [isOpen, resetTransform]);

  useEffect(() => {
    if (!isOpen) return;

    resetTransform();

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
  }, [currentIndex, images, isMobile, isOpen, resetTransform]);

  // Early return AFTER all hooks (React rules)
  if (!isOpen) return null;

  const currentImage = images[currentIndex];
  const isZoomed = transform.scale > SCALE_RESET_THRESHOLD;

  const containerClassName = `image-viewer-container${
    isMobile && isZoomed ? " mobile-zoomed" : ""
  }`;
  const overlayClassName = `image-viewer-overlay${
    isMobile && isZoomed ? " mobile-zoomed" : ""
  }`;

  return (
    <div
      className={overlayClassName}
      onClick={onClose}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        className={containerClassName}
        style={{
          ...containerStyle,
          ...(isMobile && isZoomed
            ? {
                width: "100vw",
                height: "100vh",
                maxWidth: "100vw",
                maxHeight: "100vh",
              }
            : {}),
        }}
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
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
          backgroundColor="transparent"
          fit="contain"
          style={{
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
            transition: isZoomed ? "transform 0s" : "transform 0.25s ease-out",
            cursor: isZoomed ? "grab" : "auto",
          }}
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
