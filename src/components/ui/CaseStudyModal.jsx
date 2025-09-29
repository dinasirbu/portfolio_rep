import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Badge } from './badge';
import { Button } from './button';
import OptimizedImage from './OptimizedImage';

const CaseStudyModal = ({ work, onClose, onImageClick }) => {
  const cs = work?.caseStudy;
  const [loadedImages, setLoadedImages] = useState(new Set());
  
  useEffect(() => {
    // Reset loaded images when work changes
    setLoadedImages(new Set());
  }, [work]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };
  
  if (!work) return null;

  return (
    <Dialog open={!!work} onOpenChange={(open) => !open && onClose()} className="case-study-modal">
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
              {cs.gallery.map((img, i) => (
                <OptimizedImage 
                  key={i} 
                  src={img.src} 
                  alt={img.alt || `${work.title} ${i + 1}`}
                  className="gallery-image"
                  loading="lazy"
                  onClick={() => onImageClick(i)}
                  onLoad={() => handleImageLoad(i)}
                />
              ))}
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
