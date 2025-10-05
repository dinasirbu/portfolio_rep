import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import ImageCollage from './ImageCollage';

const PortfolioCard = ({ work, onOpen, index }) => {
  const handleViewGallery = (e) => {
    // Prevent opening if clicking on a button or interactive element
    if (e && e.target.tagName === 'BUTTON') {
      e.stopPropagation();
    }
    onOpen(work);
  };

  // Determine collage variant based on work category for visual variety
  const getCollageVariant = (category) => {
    const variants = {
      'Branding': 'hero',
      'Logo': 'default', 
      'Packaging': 'default',
      'Social Media': 'hero'
    };
    return variants[category] || 'default';
  };

  const collageVariant = getCollageVariant(work.category);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 }
      }}
      initial="initial"
      animate="animate"
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1], 
        delay: index * 0.04 
      }}
      whileHover={{ y: -4 }}
      onClick={handleViewGallery}
      style={{ cursor: 'pointer' }}
    >
      <Card className="portfolio-card">
        <div className="card-cover">
          <ImageCollage 
            images={work.caseStudy?.gallery || [work.cover]} 
            variant={collageVariant}
            maxImages={4}
            work={work}
            showProjectInfo={true}
          />
          <div className="cover-gradient" />
          <div className="category-badge">
            <Badge>{work.category}</Badge>
          </div>
          <div className="work-title-overlay">
            {work.title}
          </div>
        </div>
        
        <CardContent className="card-content">
          <div className="card-tags">
            {(work.caseStudy?.tags ?? ["Design"]).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="tag">{tag}</Badge>
            ))}
          </div>
          
          <div className="card-summary">
            {work.caseStudy?.summary?.substring(0, 100)}...
          </div>
          
          <Button 
            onClick={handleViewGallery}
            className="view-gallery-btn"
          >
            View Gallery ({work.caseStudy?.gallery?.length || 0} images)
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default memo(PortfolioCard);
