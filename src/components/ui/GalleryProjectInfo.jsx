import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './badge';
import { Button } from './button';

const GalleryProjectInfo = ({ work, onClose, onToggleInfo, showInfoPanel }) => {
  if (!work?.caseStudy) return null;

  const { summary, client, project, year, role, objectives, tags } = work.caseStudy;

  return (
    <motion.div 
      className="gallery-project-info"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="gallery-info-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h1 className="project-title">{work.title}</h1>
          <button
            onClick={onToggleInfo}
            style={{
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
            title="Hide project information"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="project-meta">
          {client && <span className="client">{client}</span>}
          {project && <span className="project">{project}</span>}
          {year && <span className="year">{year}</span>}
        </div>
      </div>
      
      {/* Summary */}
      {summary && (
        <div className="gallery-info-section">
          <h3 className="section-title">Project Overview</h3>
          <p className="summary">{summary}</p>
        </div>
      )}
      
      {/* Role */}
      {role && (
        <div className="gallery-info-section">
          <h3 className="section-title">My Role</h3>
          <p className="role-text">{role}</p>
        </div>
      )}
      
      {/* Objectives */}
      {objectives && objectives.length > 0 && (
        <div className="gallery-info-section">
          <h3 className="section-title">Key Objectives</h3>
          <ul className="objectives-list">
            {objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="gallery-info-section">
          <h3 className="section-title">Skills & Tools</h3>
          <div className="tags-container">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="skill-tag">{tag}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Close Button */}
      <div className="gallery-info-actions">
        <Button onClick={onClose} variant="outline" className="close-btn">
          Close Gallery
        </Button>
      </div>
    </motion.div>
  );
};

export default memo(GalleryProjectInfo);
