import React, { memo, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { Badge } from './badge';
import parseCaseStudyText from '../../utils/caseStudyParser';

const GalleryProjectInfo = ({
  work,
  onToggleInfo,
  isMobile,
  isLandscape = false,
}) => {
  const caseStudy = work?.caseStudy;

  const { summary, client, project, year, role, objectives, tags, fullText } =
    caseStudy || {};

  const parsedCaseStudy = useMemo(() => {
    if (!fullText) return null;
    return parseCaseStudyText(fullText);
  }, [fullText]);

  const meta = useMemo(
    () => ({
      client: parsedCaseStudy?.meta?.client || client,
      project: parsedCaseStudy?.meta?.project || project,
      year: parsedCaseStudy?.meta?.year || year,
    }),
    [parsedCaseStudy, client, project, year]
  );

  const hasMetaBadge = Boolean(meta.client || meta.project || meta.year);
  const hasTags = Array.isArray(tags) && tags.length > 0;
  const hasParsedSections = Boolean(parsedCaseStudy?.sections?.length);

  const [collapsedIds, setCollapsedIds] = useState(new Set());

  useEffect(() => {
    setCollapsedIds(new Set());
  }, [fullText]);

  if (!caseStudy) return null;

  const toggleSection = (id) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const ensureSectionOpen = (id) => {
    setCollapsedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleTocLinkClick = (event, id) => {
    event.preventDefault();
    ensureSectionOpen(id);
    if (typeof document === 'undefined') return;

    window.requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;

      const container = target.closest('.gallery-info-scroll');
      if (container) {
        const targetRect = target.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const offset = targetRect.top - containerRect.top + container.scrollTop - 12;
        container.scrollTo({ top: offset, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    });
  };

  // Chevron direction for panel hide button still adapts to layout
  const shouldUseDownChevron = isMobile || isLandscape;

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
              transform: shouldUseDownChevron ? 'rotate(0deg)' : 'none'
            }}
            aria-label="Hide project information panel"
            title="Hide info panel"
          >
            {shouldUseDownChevron ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </motion.button>
        </div>
        {hasMetaBadge && !hasParsedSections && (
          <div className="project-meta">
            {meta.client && <span className="client">{meta.client}</span>}
            {meta.project && <span className="project">{meta.project}</span>}
            {meta.year && <span className="year">{meta.year}</span>}
          </div>
        )}
      </div>

      {parsedCaseStudy ? (
        <>
          {parsedCaseStudy.subtitle ? (
            <p className="case-study-subtitle">{parsedCaseStudy.subtitle}</p>
          ) : null}

          {hasMetaBadge && (
            <div className="case-study-meta-grid">
              {meta.client ? (
                <div className="meta-item">
                  <span className="meta-label">Client</span>
                  <span className="meta-value">{meta.client}</span>
                </div>
              ) : null}
              {meta.project ? (
                <div className="meta-item">
                  <span className="meta-label">Project</span>
                  <span className="meta-value">{meta.project}</span>
                </div>
              ) : null}
              {meta.year ? (
                <div className="meta-item">
                  <span className="meta-label">Year</span>
                  <span className="meta-value">{meta.year}</span>
                </div>
              ) : null}
            </div>
          )}

          {parsedCaseStudy.sections.length > 1 ? (
            <div className="case-study-toc">
              <span className="case-study-toc__label">Quick outline</span>
              <ul className="case-study-toc__list">
                {parsedCaseStudy.sections.map((section) => (
                  <li key={section.id} className="case-study-toc__item">
                    <a
                      href={`#${section.id}`}
                      className="case-study-toc__link"
                      onClick={(event) => handleTocLinkClick(event, section.id)}
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {parsedCaseStudy.sections.map((section) => {
            const isOpen = !collapsedIds.has(section.id);
            return (
              <motion.section
                layout
                key={section.id}
                id={section.id}
                className={`case-study-section${isOpen ? ' case-study-section--open' : ''}`}
                initial={false}
              >
                <button
                  type="button"
                  className="case-study-section__toggle"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${section.id}-content`}
                >
                  <span className="case-study-section__title-inline">{section.heading}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>
                <motion.div
                  id={`${section.id}-content`}
                  className="case-study-section__panel"
                  initial={false}
                  animate={isOpen ? 'open' : 'collapsed'}
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                  style={{ overflow: 'hidden' }}
                  aria-hidden={!isOpen}
                >
                  <div
                    className="case-study-section__body"
                    style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                  >
                    {section.type === 'list' ? (
                      <ul className="case-study-list">
                        {section.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      section.paragraphs.map((paragraph, idx) => (
                        <p key={idx} className="case-study-paragraph">
                          {paragraph}
                        </p>
                      ))
                    )}
                  </div>
                </motion.div>
              </motion.section>
            );
          })}
        </>
      ) : (
        <>
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
        </>
      )}

      {/* Tags */}
      {hasTags && (
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

      {/* Desktop Hide Info CTA */}
      {!isMobile && (
        <div className="gallery-info-actions">
          <button
            type="button"
            className="hide-info-button"
            onClick={onToggleInfo}
            aria-label="Hide project information panel"
          >
            <X size={16} />
            <span>Hide Info</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default memo(GalleryProjectInfo);
