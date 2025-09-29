import { useState, useMemo, useCallback } from 'react';
import { WORKS, CATEGORIES } from '../constants/portfolioData';

export const usePortfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCategoryCards, setShowCategoryCards] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return WORKS.reduce((acc, work) => {
      acc[work.category] = (acc[work.category] || 0) + 1;
      acc["All"] = (acc["All"] || 0) + 1;
      return acc;
    }, {});
  }, []);

  // Generate category previews (first few images from each category)
  const categoryPreviews = useMemo(() => {
    const previews = {};
    
    CATEGORIES.forEach(category => {
      if (category === "All") {
        // For "All", show a mix from different categories
        const allImages = [];
        WORKS.forEach(work => {
          if (work.caseStudy?.gallery && work.caseStudy.gallery.length > 1) {
            allImages.push(work.caseStudy.gallery[1]); // Skip first image (description)
          }
        });
        previews[category] = allImages.slice(0, 3);
      } else {
        // For specific categories, get images from works in that category
        const categoryWorks = WORKS.filter(work => work.category === category);
        const categoryImages = [];
        
        categoryWorks.forEach(work => {
          if (work.caseStudy?.gallery && work.caseStudy.gallery.length > 1) {
            categoryImages.push(work.caseStudy.gallery[1]); // Skip first image (description)
          }
        });
        
        previews[category] = categoryImages.slice(0, 3);
      }
    });
    
    return previews;
  }, []);

  // Filter works based on active category
  const filteredWorks = useMemo(() => {
    if (activeCategory === "All") return WORKS;
    return WORKS.filter((work) => work.category === activeCategory);
  }, [activeCategory]);

  // Navigation handlers
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setShowCategoryCards(false); // Always show projects when category is selected
  }, []);

  const handleBackToCategories = useCallback(() => {
    setShowCategoryCards(true);
    setActiveCategory("All");
  }, []);

  const handleWorkSelect = useCallback((work) => {
    setSelectedWork(work);
  }, []);

  const handleWorkClose = useCallback(() => {
    setSelectedWork(null);
  }, []);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  const handleImageViewerClose = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleNextImage = useCallback(() => {
    if (selectedWork?.caseStudy?.gallery) {
      const gallery = selectedWork.caseStudy.gallery;
      setSelectedImageIndex(prev => 
        prev < gallery.length - 1 ? prev + 1 : 0
      );
    }
  }, [selectedWork]);

  const handlePrevImage = useCallback(() => {
    if (selectedWork?.caseStudy?.gallery) {
      const gallery = selectedWork.caseStudy.gallery;
      setSelectedImageIndex(prev => 
        prev > 0 ? prev - 1 : gallery.length - 1
      );
    }
  }, [selectedWork]);

  return {
    // State
    activeCategory,
    showCategoryCards,
    selectedWork,
    selectedImageIndex,
    
    // Computed values
    categoryCounts,
    categoryPreviews,
    filteredWorks,
    categories: CATEGORIES,
    
    // Handlers
    handleCategoryChange,
    handleBackToCategories,
    handleWorkSelect,
    handleWorkClose,
    handleImageClick,
    handleImageViewerClose,
    handleNextImage,
    handlePrevImage,
  };
};
