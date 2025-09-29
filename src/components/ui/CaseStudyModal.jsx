import React, { useState, useEffect } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import OptimizedImage from './OptimizedImage';
import GalleryProjectInfo from './GalleryProjectInfo';

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  
  useEffect(() => {
    // Reset loaded images when work changes
    setLoadedImages(new Set());
    // Reset info panel visibility when work changes
    setShowInfoPanel(true);
  }, [work]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };
  
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
          flexDirection: 'row'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - Project info (conditional) */}
        {showInfoPanel && (
          <div style={{
            width: '40%',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            padding: '32px',
            overflowY: 'auto',
            borderRight: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}>
            <GalleryProjectInfo 
              work={work} 
              onClose={onClose} 
              onToggleInfo={() => setShowInfoPanel(false)}
              showInfoPanel={showInfoPanel}
            />
          </div>
        )}

        {/* Right side - Gallery */}
        <div style={{
          width: showInfoPanel ? '60%' : '100%',
          padding: '32px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          borderLeft: showInfoPanel ? '1px solid #e2e8f0' : 'none',
          flexShrink: 0,
          transition: 'width 0.3s ease'
        }}>
          {/* Gallery header */}
          <div style={{ 
            marginBottom: '24px', 
            textAlign: 'center',
            position: 'relative'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a202c', marginBottom: '8px' }}>
              Project Gallery
            </h2>
            <p style={{ fontSize: '1rem', color: '#718096', margin: 0 }}>
              {work.caseStudy?.gallery?.length || 0} images
            </p>
            
            {/* Show Info button (only when info panel is hidden) */}
            {!showInfoPanel && (
              <button
                onClick={() => setShowInfoPanel(true)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s ease',
                  color: '#64748b'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                title="Show project information"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </button>
            )}
          </div>
          
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
                <img 
                  key={i} 
                  src={img.src} 
                  alt={img.alt || `${work.title} ${i + 1}`}
                  loading="lazy"
                  onClick={() => onImageClick(i)}
                  onLoad={() => handleImageLoad(i)}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
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
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;