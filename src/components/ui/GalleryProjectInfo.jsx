import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';

const GalleryProjectInfo = ({
  work,
  onClose,
  onToggleInfo,
  showInfoPanel,
  isMobile,
}) => {
  if (!work?.caseStudy) return null;

  const { summary, client, project, year, role, objectives, tags } =
    work.caseStudy;

  return (
    <motion.div
      className="gallery-project-info"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="gallery-info-header">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "12px",
            gap: "12px",
          }}
        >
          <h1 className="project-title" style={{ flex: 1 }}>
            {work.title}
          </h1>
          <motion.button
            onClick={onToggleInfo}
            className="info-close-button"
            whileHover={{ scale: 1.1, backgroundColor: "#f1f5f9" }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              color: "#64748b",
              flexShrink: 0,
              transform: isMobile ? 'rotate(0deg)' : 'none'
            }}
            aria-label="Hide project information panel"
            title="Hide info panel"
          >
            {isMobile ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </motion.button>
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
              <Badge key={tag} variant="outline" className="skill-tag">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Close Button - Only on desktop */}
      {!isMobile && (
        <div
          className="gallery-info-actions"
          style={undefined}
        >
          <Button
            onClick={onClose}
            variant="outline"
            className="close-btn"
          >
            Close Gallery
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default memo(GalleryProjectInfo);
