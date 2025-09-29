import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Badge } from './badge';
import { Button } from './button';

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(6); // Show first 6 images initially
  
  useEffect(() => {
    // Reset loaded images when work changes
    setLoadedImages(new Set());
    setVisibleImages(6);
  }, [work]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const loadMoreImages = () => {
    setVisibleImages(prev => Math.min(prev + 6, cs?.gallery?.length || 0));
  };
  
  if (!work) return null;

  return (
    <Dialog open={!!work} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="case-study-modal">
        <DialogHeader>
          <DialogTitle className="case-study-title">{work.title}</DialogTitle>
          {cs?.client && (
            <DialogDescription className="case-study-meta">
              <strong>{cs.client}</strong> · {cs.project}{cs?.year ? ` · ${cs.year}` : ""}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="case-study-content">
          {/* Project Summary */}
          {cs?.summary && (
            <div className="case-study-summary">
              <p>{cs.summary}</p>
            </div>
          )}

          {/* Gallery */}
          {cs?.gallery && cs.gallery.length > 0 && (
            <div className="case-study-gallery">
              {cs.gallery.slice(0, visibleImages).map((img, i) => (
                <img 
                  key={i} 
                  src={img.src} 
                  alt={img.alt || `${work.title} ${i + 1}`}
                  className="gallery-image"
                  loading="lazy"
                  onClick={() => onImageClick(i)}
                  onLoad={() => handleImageLoad(i)}
                />
              ))}
              
              {/* Load More Button */}
              {visibleImages < cs.gallery.length && (
                <div className="load-more-container">
                  <Button 
                    onClick={loadMoreImages}
                    variant="outline"
                    className="load-more-btn"
                  >
                    Load More Images ({cs.gallery.length - visibleImages} remaining)
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Project Details */}
          <div className="case-study-details">
            {cs?.objectives?.length > 0 && (
              <div className="case-study-section">
                <h4 className="section-title">Project Objectives</h4>
                <ul className="objectives-list">
                  {cs.objectives.map((objective, i) => (
                    <li key={i} className="objective-item">{objective}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {cs?.role && (
              <div className="case-study-section">
                <h4 className="section-title">My Role</h4>
                <p className="role-description">{cs.role}</p>
              </div>
            )}

            {/* Tags */}
            <div className="case-study-tags">
              {(cs?.tags || []).map((tag) => (
                <Badge key={tag} variant="outline" className="project-tag">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="case-study-actions">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
