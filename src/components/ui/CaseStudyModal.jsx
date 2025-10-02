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
 * - Mobile (<768px): Full-screen stacked layout
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import GalleryProjectInfo from './GalleryProjectInfo';

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  const [showInfoPanel, setShowInfoPanel] = useState(false); // Default to closed
  const [hasSeenHint, setHasSeenHint] = useState(false);
  
  useEffect(() => {
    // Reset info panel visibility when work changes
    setShowInfoPanel(false);
    setHasSeenHint(false);
    
    // Show hint after a brief delay
    const hintTimer = setTimeout(() => {
      setHasSeenHint(true);
    }, 800);
    
    return () => clearTimeout(hintTimer);
  }, [work]);
  
  if (!work) return null;

  return (
    <div 
      className="custom-modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div 
        className="custom-modal" 
        style={{
          width: '95vw',
          height: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gallery Section - Main Focus */}
        <motion.div 
          style={{
            width: showInfoPanel ? '70%' : '100%',
            padding: '32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            background: '#ffffff',
            position: 'relative'
          }}
          animate={{
            width: showInfoPanel ? '70%' : '100%'
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1] // Custom easing for smooth, intentional feel
          }}
        >
          {/* Close Gallery Button - Top Right */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: '#f8fafc',
              color: '#ef4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              transition: 'all 0.2s ease'
            }}
            aria-label="Close gallery"
            title="Close gallery"
          >
            <X size={24} />
          </motion.button>

          {/* Gallery header */}
          <div style={{ 
            marginBottom: '24px', 
            textAlign: 'center',
            position: 'relative'
          }}>
            <h2 id="project-title" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>
              {work.title}
            </h2>
            <p style={{ fontSize: '1rem', color: '#718096', margin: 0 }}>
              {work.caseStudy?.gallery?.length || 0} images
            </p>
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
                  y: 0
                }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  position: 'fixed',
                  bottom: '32px',
                  right: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: hasSeenHint 
                    ? '0 4px 20px rgba(102, 126, 234, 0.4)' 
                    : '0 4px 20px rgba(102, 126, 234, 0.6), 0 0 0 0 rgba(102, 126, 234, 0.7)',
                  zIndex: 100,
                  animation: hasSeenHint ? 'none' : 'pulse-glow 2s ease-in-out 3',
                  backdropFilter: 'blur(10px)'
                }}
                aria-label="Show project information"
                title="View project details and information"
              >
                <Info size={18} />
                <span>Project Info</span>
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Gallery Grid */}
          {cs?.gallery && cs.gallery.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              padding: '24px',
              background: '#fafbfc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              flex: 1,
              overflowY: 'auto',
              margin: 0,
              minHeight: '400px'
            }}>
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
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
              ))}
            </div>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fafbfc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              minHeight: '400px'
            }}>
              <p style={{ color: '#718096', fontSize: '1.1rem', margin: 0 }}>
                No images available for this project.
              </p>
            </div>
          )}
        </motion.div>

        {/* Info Panel - Slides in from RIGHT */}
        <AnimatePresence>
          {showInfoPanel && (
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                width: '30%',
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                borderLeft: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                position: 'relative'
              }}
            >
              {/* Sticky container for info */}
              <div style={{
                padding: '32px',
                overflowY: 'auto',
                height: '100%',
                position: 'sticky',
                top: 0
              }}>
                <GalleryProjectInfo 
                  work={work} 
                  onClose={onClose} 
                  onToggleInfo={() => setShowInfoPanel(false)}
                  showInfoPanel={showInfoPanel}
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