/**
 * CaseStudyModal - Project Gallery with Collapsible Info Panel
 * 
 * This component displays project galleries with an optional information panel.
 * 
 * UX Design Principles:
 * - Gallery-first approach: Default state shows only the gallery
 * - Subtle discovery: Floating "Info" badge with gentle pulse animation hints at additional content
 * - Smooth transitions: All animations use custom easing for intentional, professional feel
 * - User control: Visitors decide whether to view project details or focus on visuals
 * - Accessible: Full ARIA labels, keyboard navigation, and focus management
 * 
 * Layout Behavior:
 * - Default: Gallery at 100% width
 * - Info Panel Open: Gallery 70% | Info Panel 30%
 * - Info panel slides in from right with smooth animation
 * - Info panel content is sticky during scroll
 * 
 * Responsive:
 * - Desktop (>1024px): Side-by-side layout
 * - Tablet (768-1024px): Stacked layout (gallery 60%, info 40%)
 * - Mobile (<768px): Full-screen stacked layout with bottom sheet for info
 */

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, List, Grid2X2 } from "lucide-react";
import GalleryProjectInfo from "./GalleryProjectInfo";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

const CaseStudyModal = ({ work, onClose, onImageClick, isImageViewerOpen }) => {
  const cs = work?.caseStudy;
  const [showInfoPanel, setShowInfoPanel] = useState(false); // Default to closed
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [panelWidth, setPanelWidth] = useState(30); // Percentage of modal width for desktop
  const [dragStartWidth, setDragStartWidth] = useState(30); // Track starting width when drag begins
  const mobileInfoMaxHeight = isLandscape ? "100vh" : "calc(100vh - 96px)";
  const [showViewControls, setShowViewControls] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState("forward");
  const [isNearGalleryEnd, setIsNearGalleryEnd] = useState(false);

  const galleryScrollRef = useRef(null);
  const galleryGridRef = useRef(null);
  const swipeStateRef = useRef(null);
  const suppressNextTapRef = useRef(false);
  const swipeResetTimeoutRef = useRef(null);
  const showViewControlsRef = useRef(true);
  const lastControlsToggleRef = useRef(0);
  const headerRef = useRef(null);
  const headerHeightRef = useRef(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOffsetRef = useRef(0);
  const [headerOffset, setHeaderOffset] = useState(0);
  const lastScrollPositionsRef = useRef(new WeakMap());

  const setShowViewControlsSafely = useCallback((nextValue) => {
    if (showViewControlsRef.current === nextValue) return;
    showViewControlsRef.current = nextValue;
    setShowViewControls(nextValue);
  }, []);

  const triggerHapticFeedback = useCallback(() => {
    if (typeof window === "undefined") return;
    const navigatorRef = window.navigator;
    if (navigatorRef?.userActivation && !navigatorRef.userActivation.hasBeenActive) {
      return;
    }
    if (navigatorRef?.vibrate) {
      navigatorRef.vibrate(15);
    }
    try {
      const anyNavigator = navigatorRef;
      if (anyNavigator?.webkit?.messageHandlers?.notificationFeedbackGenerator) {
        anyNavigator.webkit.messageHandlers.notificationFeedbackGenerator.postMessage("impact");
      }
    } catch (error) {
      // Ignore unsupported bridges
    }
  }, []);

  const changeViewMode = useCallback(
    (mode, directionHint = null) => {
      if (mode === viewMode) return;
      const direction = directionHint || (mode === "grid" ? "forward" : "backward");
      setTransitionDirection(direction);
      setViewMode(mode);
      triggerHapticFeedback();
    },
    [triggerHapticFeedback, viewMode]
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const checkMobile = () => {
      const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
      const prefersHover = window.matchMedia?.("(hover: hover)")?.matches ?? false;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const shortestSide = Math.min(width, height);

      const baseMobileWidth = width <= 768;
      const touchOnlyDevice = coarsePointer && !prefersHover;
      const touchAdaptiveLayout = touchOnlyDevice && (width <= 1024 || shortestSide <= 820);

      const shouldUseMobileLayout = baseMobileWidth || touchAdaptiveLayout;

      setIsMobile(shouldUseMobileLayout);
      setIsLandscape(shouldUseMobileLayout && width > height);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.screen?.orientation?.addEventListener?.("change", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.screen?.orientation?.removeEventListener?.("change", checkMobile);
    };
  }, []);
  useEffect(() => {
    // Only run effects if work exists
    if (!work) return;

    // Reset info panel visibility when work changes
    setShowInfoPanel(false);
    setHasSeenHint(false);
    setViewMode("list");
    setPanelWidth(30); // Reset panel width
    setDragStartWidth(30); // Reset drag start width
    setTransitionDirection("forward");
    setIsNearGalleryEnd(false);
    headerOffsetRef.current = 0;
    setHeaderOffset(0);
    setShowViewControlsSafely(true);
  lastControlsToggleRef.current = typeof performance !== "undefined" ? performance.now() : Date.now();

    // Show hint after a brief delay
    const hintTimer = setTimeout(() => {
      setHasSeenHint(true);
    }, 800);

    // Lock body scroll when modal is open
    lockScroll();

    return () => {
      clearTimeout(hintTimer);
      // Unlock scroll when modal closes
      unlockScroll();
    };
  }, [work, setShowViewControlsSafely]);

  // ESC key handler to close modal (only when image viewer is not open)
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && !isImageViewerOpen) {
        onClose();
      }
    };

    // Add event listener when modal is open
    if (work) {
      document.addEventListener('keydown', handleEscKey);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [work, onClose, isImageViewerOpen]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (!isMobile) {
      headerHeightRef.current = 0;
      setHeaderHeight(0);
      headerOffsetRef.current = 0;
      setHeaderOffset(0);
      return undefined;
    }

    const node = headerRef.current;
    if (!node) return undefined;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const nextHeight = rect?.height ?? 0;
      if (Math.abs(nextHeight - headerHeightRef.current) > 0.5) {
        headerHeightRef.current = nextHeight;
        setHeaderHeight(nextHeight);
        if (headerOffsetRef.current > nextHeight) {
          headerOffsetRef.current = nextHeight;
          setHeaderOffset(nextHeight);
        }
      }
    };

    measure();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => measure());
      resizeObserver.observe(node);
    } else {
      window.addEventListener("resize", measure);
      window.addEventListener("orientationchange", measure);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", measure);
        window.removeEventListener("orientationchange", measure);
      }
    };
  }, [isMobile, work, viewMode]);

  useEffect(() => {
    const getNow = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

    if (!isMobile) {
      headerOffsetRef.current = 0;
      setHeaderOffset(0);
      headerHeightRef.current = 0;
      setHeaderHeight(0);
      setShowViewControlsSafely(true);
      lastControlsToggleRef.current = getNow();
      setIsNearGalleryEnd(false);
      lastScrollPositionsRef.current = new WeakMap();
      return undefined;
    }

  const scrollContainer = galleryScrollRef.current;

  if (!scrollContainer) return undefined;

  lastControlsToggleRef.current = getNow();

    const updateNearBottom = () => {
      const node = scrollContainer;
      const distanceFromBottom = node.scrollHeight - node.clientHeight - node.scrollTop;
      if (!Number.isNaN(distanceFromBottom)) {
        setIsNearGalleryEnd(distanceFromBottom < 240);
      }
    };

    const updateHeaderState = (scrollTopValue) => {
      const height = headerHeightRef.current || headerHeight;
      if (height <= 0) return;

      const shouldHideHeader = scrollTopValue > 1;
      const nextOffset = shouldHideHeader ? height : 0;

      if (headerOffsetRef.current !== nextOffset) {
        headerOffsetRef.current = nextOffset;
        setHeaderOffset(nextOffset);

        const timestamp = getNow();
        const shouldShowControls = nextOffset === 0;

        if (showViewControlsRef.current !== shouldShowControls && timestamp - lastControlsToggleRef.current > 80) {
          lastControlsToggleRef.current = timestamp;
          setShowViewControlsSafely(shouldShowControls);
        }
      }
    };

    const handleScroll = () => {
      const current = scrollContainer.scrollTop;
      updateHeaderState(current);
      updateNearBottom();
    };

    updateHeaderState(scrollContainer.scrollTop);
    updateNearBottom();

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, headerHeight, setShowViewControlsSafely, work]);

  useEffect(() => {
    if (isMobile) {
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      lastControlsToggleRef.current = now;
      headerOffsetRef.current = 0;
      setHeaderOffset(0);
      setShowViewControlsSafely(true);
    }
  }, [viewMode, isMobile, setShowViewControlsSafely]);

  useEffect(() => {
    showViewControlsRef.current = showViewControls;
  }, [showViewControls]);

  useEffect(() => () => {
    if (swipeResetTimeoutRef.current) {
      clearTimeout(swipeResetTimeoutRef.current);
    }
  }, []);

  // Early return AFTER hooks (React rules)
  if (!work) return null;

  const modalStyle = isMobile
    ? {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        borderRadius: "0",
        overflow: "hidden",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }
    : {
        width: "95vw",
        height: "90vh",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      };

  const totalImages = cs?.gallery?.length || 0;
  const imageCountLabel = `${totalImages} image${totalImages === 1 ? "" : "s"}`;
  const isCompactGallery = totalImages > 0 && totalImages <= 4;
  const isGridView = !isMobile || viewMode === "grid";
  const showFloatingInfoButton = !showInfoPanel || isMobile;
  const animationDirection = transitionDirection === "backward" ? "backward" : "forward";
  const galleryViewKey = `${isGridView ? "grid" : "list"}-${isMobile ? "mobile" : "desktop"}`;
  const mobileFabBottom = isNearGalleryEnd
    ? "calc(env(safe-area-inset-bottom, 0px) + 96px)"
    : "calc(env(safe-area-inset-bottom, 0px) + 54px)";

  const galleryViewClassNames = [
    "gallery-grid",
    isMobile ? "gallery-grid--mobile" : "gallery-grid--desktop",
    isGridView ? "gallery-grid--grid" : "gallery-grid--list",
    isMobile && isLandscape && isGridView ? "gallery-grid--landscape" : "",
    isMobile && isGridView && isCompactGallery ? "gallery-grid--compact" : "",
    isMobile && showFloatingInfoButton ? "gallery-grid--has-fab" : "",
    isMobile && showFloatingInfoButton && isNearGalleryEnd ? "gallery-grid--fab-expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const headerClassNames = [
    "gallery-section-header",
    isMobile ? "gallery-section-header--mobile" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const viewSwitchClassNames = [
    "gallery-view-switch",
    showViewControls ? "" : "gallery-view-switch--hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const headerVisibilityFraction = headerHeight > 0 ? Math.min(1, headerOffset / headerHeight) : 0;
  const headerOpacity = isMobile ? Math.max(0, 1 - headerVisibilityFraction) : 1;
  const headerTransform = isMobile ? `translate3d(0, -${headerOffset.toFixed(2)}px, 0)` : undefined;
  const headerPointerEvents = isMobile ? (headerOpacity < 0.05 ? "none" : "auto") : undefined;
  const headerMarginBottom = isMobile
    ? `${Math.max(0, 12 * headerOpacity).toFixed(1)}px`
    : "16px";

  const galleryGridVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === "backward" ? -36 : 36,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "backward" ? 36 : -36,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const handleGalleryTouchStart = (event) => {
    if (!isMobile || event.touches.length !== 1) return;

    const touch = event.touches[0];
    swipeStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      isVertical: false,
    };
  };

  const handleGalleryTouchMove = (event) => {
    if (!isMobile || !swipeStateRef.current) return;

    const touch = event.touches[0];
    const state = swipeStateRef.current;
    const deltaX = touch.clientX - state.startX;
    const deltaY = touch.clientY - state.startY;

    if (!state.isVertical && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      state.isVertical = true;
      return;
    }

    state.lastX = touch.clientX;
    state.lastY = touch.clientY;
  };

  const handleGalleryTouchEnd = (event) => {
    if (!isMobile || !swipeStateRef.current) {
      swipeStateRef.current = null;
      return;
    }

    const state = swipeStateRef.current;

    if (state.isVertical) {
      swipeStateRef.current = null;
      return;
    }

    const endX = state.lastX ?? state.startX;
    const deltaX = endX - state.startX;

    if (Math.abs(deltaX) >= 50) {
      if (deltaX < 0 && viewMode !== "grid") {
        changeViewMode("grid", "forward");
      } else if (deltaX > 0 && viewMode !== "list") {
        changeViewMode("list", "backward");
      }

      if (swipeResetTimeoutRef.current) {
        clearTimeout(swipeResetTimeoutRef.current);
      }

      suppressNextTapRef.current = true;
      swipeResetTimeoutRef.current = window.setTimeout(() => {
        suppressNextTapRef.current = false;
        swipeResetTimeoutRef.current = null;
      }, 350);
      event.preventDefault();
      event.stopPropagation();
    }

    swipeStateRef.current = null;
  };

  const handleGalleryTouchCancel = () => {
    swipeStateRef.current = null;
  };

  const overlayClassName = [
    "custom-modal-overlay",
    isMobile ? "custom-modal-overlay--mobile" : "custom-modal-overlay--desktop",
  ]
    .filter(Boolean)
    .join(" ");

  const modalClassName = [
    "custom-modal",
    isMobile ? "custom-modal--mobile" : "custom-modal--desktop",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClassName}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div
  className={modalClassName}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery Section - Main Focus */}
        <motion.div
          className="gallery-section"
          ref={galleryScrollRef}
          style={{
            width: isMobile ? "100%" : showInfoPanel ? `${100 - panelWidth}%` : "100%",
            padding: isMobile ? "0 14px 24px" : "32px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            position: "relative",
            flex: 1,
          }}
          animate={{
            width: isMobile ? "100%" : showInfoPanel ? `${100 - panelWidth}%` : "100%",
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1], // Custom easing for smooth, intentional feel
          }}
        >
          {/* Close Gallery Button - Top Right */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: isMobile ? "fixed" : "absolute",
              top: isMobile ? "12px" : "24px",
              right: isMobile ? "12px" : "24px",
              width: isMobile ? "40px" : "44px",
              height: isMobile ? "40px" : "44px",
              borderRadius: "50%",
              border: "none",
              background: "#f8fafc",
              color: "#ef4444",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 100,
              transition: "all 0.2s ease",
            }}
            aria-label="Close gallery"
            title="Close gallery"
          >
            <X size={isMobile ? 20 : 24} />
          </motion.button>

          {/* Gallery header */}
          <div
            ref={headerRef}
            className={headerClassNames}
            style={{
              marginBottom: headerMarginBottom,
              textAlign: isMobile ? "center" : "left",
              transform: headerTransform,
              opacity: headerOpacity,
              pointerEvents: headerPointerEvents,
              willChange: isMobile ? "transform, opacity" : undefined,
            }}
          >
            <h2
              id="project-title"
              className="gallery-section-title"
              style={{
                fontSize: isMobile ? "1.3rem" : "1.8rem",
                fontWeight: 700,
                color: "#1a202c",
                marginBottom: isMobile ? "6px" : "0",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              {work.title}
            </h2>

            {/* View Mode Toggle - Mobile Only - Compact Version */}
            {isMobile ? (
              <div
                className={viewSwitchClassNames}
                data-active-mode={viewMode}
                aria-hidden={!showViewControls}
              >
                <span className="gallery-view-switch__rail" aria-hidden="true" />
                <button
                  onClick={() => changeViewMode("list", "backward")}
                  type="button"
                  className="gallery-view-switch__button"
                  data-active={viewMode === "list"}
                  aria-pressed={viewMode === "list"}
                  disabled={!showViewControls}
                  title="Show images in a vertical list"
                >
                  <span className="gallery-view-switch__icon">
                    <List size={16} aria-hidden="true" />
                  </span>
                  <span className="gallery-view-switch__label">List</span>
                </button>
                <button
                  onClick={() => changeViewMode("grid", "forward")}
                  type="button"
                  className="gallery-view-switch__button"
                  data-active={viewMode === "grid"}
                  aria-pressed={viewMode === "grid"}
                  disabled={!showViewControls}
                  title="Show images in a grid"
                >
                  <span className="gallery-view-switch__icon">
                    <Grid2X2 size={16} aria-hidden="true" />
                  </span>
                  <span className="gallery-view-switch__label">Grid</span>
                </button>
                {totalImages > 0 ? (
                  <span
                    className="gallery-view-switch__count"
                    role="status"
                    aria-live="polite"
                    aria-label={`Gallery contains ${imageCountLabel}`}
                  >
                    {imageCountLabel}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Floating Info Badge - Only shown when panel is closed */}
          <AnimatePresence>
            {(!showInfoPanel || isMobile) && (
              <motion.button
                onClick={() => {
                  if (showInfoPanel && isMobile) {
                    setShowInfoPanel(false);
                    return;
                  }
                  setShowInfoPanel(true);
                }}
                className="floating-info-badge"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: isMobile ? "fixed" : "fixed",
                  bottom: isMobile
                    ? showInfoPanel
                      ? isLandscape
                        ? "24px"
                        : "80px"
                      : mobileFabBottom
                    : "32px",
                  right: isMobile ? "20px" : "32px",
                  left: isMobile ? "20px" : "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: isMobile ? "14px 20px" : "12px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  fontSize: isMobile ? "0.9rem" : "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: hasSeenHint
                    ? "0 4px 20px rgba(102, 126, 234, 0.4)"
                    : "0 4px 20px rgba(102, 126, 234, 0.6), 0 0 0 0 rgba(102, 126, 234, 0.7)",
                  zIndex: showInfoPanel && isMobile ? 350 : 100,
                  animation: hasSeenHint
                    ? "none"
                    : "pulse-glow 2s ease-in-out 3",
                  backdropFilter: "blur(10px)",
                }}
                aria-label={
                  showInfoPanel && isMobile
                    ? "Hide project information"
                    : "Show project information"
                }
                title={
                  showInfoPanel && isMobile
                    ? "Hide project information"
                    : "View project details and information"
                }
              >
                {showInfoPanel && isMobile ? (
                  <X size={isMobile ? 16 : 18} />
                ) : (
                  <Info size={isMobile ? 16 : 18} />
                )}
                <span>{showInfoPanel && isMobile ? "Hide Info" : "Project Info"}</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Gallery Grid/List */}
          {cs?.gallery && cs.gallery.length > 0 ? (
            <AnimatePresence mode="wait" custom={animationDirection}>
              <motion.div
                key={galleryViewKey}
                className={galleryViewClassNames}
                ref={galleryGridRef}
                onTouchStart={handleGalleryTouchStart}
                onTouchMove={handleGalleryTouchMove}
                onTouchEnd={handleGalleryTouchEnd}
                onTouchCancel={handleGalleryTouchCancel}
                variants={galleryGridVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={animationDirection}
              >
                {cs.gallery.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img.src}
                    alt={img.alt || `${work.title} ${i + 1}`}
                    loading="lazy"
                    onClick={() => {
                      if (isMobile && suppressNextTapRef.current) {
                        suppressNextTapRef.current = false;
                        return;
                      }
                      onImageClick(i);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="gallery-grid__image"
                    data-view={isMobile ? viewMode : "grid"}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fafbfc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                minHeight: "400px",
              }}
            >
              <p style={{ color: "#718096", fontSize: "1.1rem", margin: 0 }}>
                No images available for this project.
              </p>
            </div>
          )}
        </motion.div>

        {/* Info Panel - Slides in from RIGHT on desktop, BOTTOM on mobile */}
        <AnimatePresence>
          {showInfoPanel && (
            <motion.div
              initial={
                isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
              }
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={
                isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 }
              }
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                width: isMobile ? "100%" : `${panelWidth}%`,
                height: isMobile ? "auto" : "auto",
                minHeight: isMobile ? "auto" : "auto",
                maxHeight: isMobile ? mobileInfoMaxHeight : "auto",
                background: "white",
                borderLeft: isMobile ? "none" : "1px solid #e2e8f0",
                borderTop: isMobile && !isLandscape ? "1px solid #e2e8f0" : "none",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: isMobile ? "fixed" : "relative",
                bottom: isMobile && !isLandscape ? 0 : "auto",
                top: isMobile && isLandscape ? 0 : "auto",
                left: isMobile ? 0 : "auto",
                right: isMobile ? 0 : "auto",
                borderTopLeftRadius: isMobile && !isLandscape ? "20px" : 0,
                borderTopRightRadius: isMobile && !isLandscape ? "20px" : 0,
                boxShadow: isMobile && !isLandscape
                  ? "0 -4px 20px rgba(0, 0, 0, 0.15)"
                  : "none",
                zIndex: 200,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Resize handle for desktop */}
              {!isMobile && (
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => {
                    // Store the current width when drag starts
                    setDragStartWidth(panelWidth);
                  }}
                  onDrag={(e, info) => {
                    // Calculate new panel width based on actual cursor movement
                    // Use a more natural scaling: 1px drag = 0.2% width change
                    const widthChange = -info.offset.x * 0.2;
                    const newWidth = Math.max(20, Math.min(60, dragStartWidth + widthChange));
                    setPanelWidth(newWidth);
                  }}
                  onDragEnd={() => {
                    // Keep the panel exactly where the user released it
                    // No snapping - let it stay at the exact width
                    // This prevents the jumping behavior
                  }}
                  onDoubleClick={() => {
                    // Toggle between collapsed and expanded on double-click
                    if (panelWidth <= 25) {
                      setPanelWidth(60); // Expand
                    } else {
                      setPanelWidth(20); // Collapse
                    }
                  }}
                  style={{
                    position: "absolute",
                    left: "-8px",
                    top: 0,
                    bottom: 0,
                    width: "16px",
                    cursor: "col-resize",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 300,
                  }}
                  title="Drag to resize panel • Double-click to toggle"
                >
                  <motion.div
                    whileHover={{ backgroundColor: "#667eea", scale: 1.1 }}
                    style={{
                      width: "4px",
                      height: "60px",
                      background: "#cbd5e0",
                      borderRadius: "2px",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                </motion.div>
              )}

              {/* Scrollable container for info - NOT draggable */}
              <div
                style={{
                  padding: isMobile ? "20px 20px 20px" : "32px",
                  overflowY: "auto",
                  flex: 1,
                  position: "relative",
                  WebkitOverflowScrolling: "touch",
                  touchAction: "auto",
                }}
              >
                <GalleryProjectInfo
                  work={work}
                  onClose={onClose}
                  onToggleInfo={() => setShowInfoPanel(false)}
                  showInfoPanel={showInfoPanel}
                  isMobile={isMobile}
                  isLandscape={isLandscape}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add keyframe animation for pulse glow */}
      <style>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(102, 126, 234, 0.8), 0 0 0 8px rgba(102, 126, 234, 0.2);
          }
          100% {
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          }
        }
        
        .floating-info-badge:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
        
        .floating-info-badge:focus:not(:focus-visible) {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default CaseStudyModal;