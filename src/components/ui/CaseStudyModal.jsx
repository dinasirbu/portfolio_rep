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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, List, Grid2X2 } from "lucide-react";
import GalleryProjectInfo from "./GalleryProjectInfo";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  const [showInfoPanel, setShowInfoPanel] = useState(false); // Default to closed
  const [hasSeenHint, setHasSeenHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [panelHeight, setPanelHeight] = useState(50); // Percentage of viewport height

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only run effects if work exists
    if (!work) return;

    // Reset info panel visibility when work changes
    setShowInfoPanel(false);
    setHasSeenHint(false);
    setPanelHeight(50); // Reset panel height

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
  }, [work]);

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

  return (
    <div
      className="custom-modal-overlay"
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
        className="custom-modal"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery Section - Main Focus */}
        <motion.div
          className="gallery-section"
          style={{
            width: isMobile ? "100%" : showInfoPanel ? "70%" : "100%",
            padding: isMobile ? "16px" : "32px",
            paddingTop: isMobile ? "60px" : "32px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            background: "#ffffff",
            position: "relative",
            flex: 1,
          }}
          animate={{
            width: isMobile ? "100%" : showInfoPanel ? "70%" : "100%",
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
            style={{
              marginBottom: isMobile ? "16px" : "24px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <h2
              id="project-title"
              style={{
                fontSize: isMobile ? "1.3rem" : "1.8rem",
                fontWeight: 700,
                color: "#1a202c",
                marginBottom: isMobile ? "10px" : "8px",
              }}
            >
              {work.title}
            </h2>

            {/* View Mode Toggle - Mobile Only - Compact Version */}
            {isMobile ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  margin: "-50px 0",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "#718096" }}>
                  {work.caseStudy?.gallery?.length || 0} images
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    background: "#f1f5f9",
                    padding: "3px",
                    borderRadius: "6px",
                  }}
                >
                  <button
                    onClick={() => setViewMode("list")}
                    style={{
                      padding: "6px 12px",
                      background:
                        viewMode === "list" ? "#667eea" : "transparent",
                      color: viewMode === "list" ? "white" : "#64748b",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="List view"
                  >
                    <List size={14} />
                    <span>List</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    style={{
                      padding: "6px 12px",
                      background:
                        viewMode === "grid" ? "#667eea" : "transparent",
                      color: viewMode === "grid" ? "white" : "#64748b",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="Grid view"
                  >
                    <Grid2X2 size={14} />
                    <span>Grid</span>
                  </button>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "1rem", color: "#718096", margin: 0 }}>
                {work.caseStudy?.gallery?.length || 0} images
              </p>
            )}
          </div>

          {/* Floating Info Badge - Only shown when panel is closed */}
          <AnimatePresence>
            {!showInfoPanel && (
              <motion.button
                onClick={() => setShowInfoPanel(true)}
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
                  position: "fixed",
                  bottom: isMobile ? "20px" : "32px",
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
                  zIndex: 100,
                  animation: hasSeenHint
                    ? "none"
                    : "pulse-glow 2s ease-in-out 3",
                  backdropFilter: "blur(10px)",
                }}
                aria-label="Show project information"
                title="View project details and information"
              >
                <Info size={isMobile ? 16 : 18} />
                <span>Project Info</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Gallery Grid/List */}
          {cs?.gallery && cs.gallery.length > 0 ? (
            <div
              style={{
                display: isMobile && viewMode === "list" ? "flex" : "grid",
                flexDirection:
                  isMobile && viewMode === "list" ? "column" : undefined,
                gridTemplateColumns:
                  isMobile && viewMode === "grid"
                    ? "repeat(2, 1fr)"
                    : !isMobile
                    ? "repeat(auto-fit, minmax(280px, 1fr))"
                    : undefined,
                gap: isMobile
                  ? viewMode === "list"
                    ? "16px"
                    : "12px"
                  : "20px",
                padding: isMobile ? "16px" : "24px",
                background: "#fafbfc",
                border: "1px solid #e2e8f0",
                borderRadius: isMobile ? "8px" : "12px",
                flex: 1,
                overflowY: "auto",
                margin: 0,
                minHeight: isMobile ? "200px" : "400px",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {cs.gallery.map((img, i) => (
                <motion.img
                  key={i}
                  src={img.src}
                  alt={img.alt || `${work.title} ${i + 1}`}
                  loading="lazy"
                  onClick={() => onImageClick(i)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    height: isMobile
                      ? viewMode === "list"
                        ? "auto"
                        : "150px"
                      : "200px",
                    aspectRatio:
                      isMobile && viewMode === "list" ? "auto" : undefined,
                    objectFit:
                      isMobile && viewMode === "list" ? "contain" : "cover",
                    borderRadius: isMobile ? "6px" : "8px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
              ))}
            </div>
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
                width: isMobile ? "100%" : "30%",
                height: isMobile ? `${panelHeight}vh` : "auto",
                minHeight: isMobile ? "30vh" : "auto",
                maxHeight: isMobile ? "85vh" : "auto",
                background: "white",
                borderLeft: isMobile ? "none" : "1px solid #e2e8f0",
                borderTop: isMobile ? "1px solid #e2e8f0" : "none",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                position: isMobile ? "fixed" : "relative",
                bottom: isMobile ? 0 : "auto",
                left: isMobile ? 0 : "auto",
                right: isMobile ? 0 : "auto",
                borderTopLeftRadius: isMobile ? "20px" : 0,
                borderTopRightRadius: isMobile ? "20px" : 0,
                boxShadow: isMobile
                  ? "0 -4px 20px rgba(0, 0, 0, 0.15)"
                  : "none",
                zIndex: 200,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle for mobile */}
              {isMobile && (
                <motion.div
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0}
                  dragMomentum={false}
                  _dragX={0}
                  onDragStart={() => {
                    // Store initial height to prevent jump
                    setPanelHeight(panelHeight);
                  }}
                  onDrag={(e, info) => {
                    // Smoothly change panel height based on drag
                    // Only update if there's meaningful movement (prevents initial jump)
                    if (Math.abs(info.offset.y) < 5) return;

                    const viewportHeight = window.innerHeight;
                    const dragPixels = -info.offset.y; // Negative because up is negative
                    // More responsive: 100px drag = 15vh change
                    const vhChange = (dragPixels / viewportHeight) * 120;
                    const newHeight = Math.max(30, Math.min(85, 50 + vhChange));
                    setPanelHeight(newHeight);
                  }}
                  onDragEnd={(e, info) => {
                    // Close if panel is very small (dragged down a lot)
                    if (panelHeight < 40) {
                      setShowInfoPanel(false);
                      setPanelHeight(50); // Reset for next time
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "grab",
                    flexShrink: 0,
                    touchAction: "none",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      background: "#cbd5e0",
                      borderRadius: "2px",
                    }}
                  />
                </motion.div>
              )}

              {/* Scrollable container for info - NOT draggable */}
              <div
                style={{
                  padding: isMobile ? "0 20px 20px" : "32px",
                  overflowY: "auto",
                  flex: 1,
                  position: "relative",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <GalleryProjectInfo
                  work={work}
                  onClose={onClose}
                  onToggleInfo={() => setShowInfoPanel(false)}
                  showInfoPanel={showInfoPanel}
                  isMobile={isMobile}
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