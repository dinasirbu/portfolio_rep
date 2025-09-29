import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ProjectInfo = ({ work, variant = 'card' }) => {
  if (!work?.caseStudy) return null;

  const { summary, client, project, year, role, objectives } = work.caseStudy;

  if (variant === 'compact') {
    return (
      <motion.div 
        className="project-info compact-info"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="info-header">
          <div className="project-title">{work.title}</div>
          <div className="project-meta">
            {client && <span className="client">{client}</span>}
            {year && <span className="year">{year}</span>}
          </div>
        </div>
        
        {summary && (
          <div className="info-summary">
            {summary.length > 100 
              ? `${summary.substring(0, 100)}...`
              : summary
            }
          </div>
        )}
        
        {role && (
          <div className="info-role">
            <strong>Role:</strong> {role}
          </div>
        )}
      </motion.div>
    );
  }

  // Default card variant
  return (
    <motion.div 
      className="project-info card-info"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="info-header">
        <div className="project-title">{work.title}</div>
        <div className="project-meta">
          {client && <span className="client">{client}</span>}
          {project && <span className="project">{project}</span>}
          {year && <span className="year">{year}</span>}
        </div>
      </div>
      
      {summary && (
        <div className="info-content">
          <p className="summary">{summary}</p>
        </div>
      )}
      
      {role && (
        <div className="role-section">
          <div className="role-label">My Role</div>
          <div className="role-text">{role}</div>
        </div>
      )}
      
      {objectives && objectives.length > 0 && (
        <div className="objectives-section">
          <div className="objectives-label">Key Objectives</div>
          <ul className="objectives-list">
            {objectives.slice(0, 2).map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
            {objectives.length > 2 && (
              <li className="more-objectives">+{objectives.length - 2} more objectives</li>
            )}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default memo(ProjectInfo);
