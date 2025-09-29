import { useState, useMemo, useCallback } from 'react';
import { WORKS, CATEGORIES } from '../constants/portfolioData';

export const usePortfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
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

  // Filter works based on active category
  const filteredWorks = useMemo(() => {
    if (activeCategory === "All") return WORKS;
    return WORKS.filter((work) => work.category === activeCategory);
  }, [activeCategory]);

  // Navigation handlers
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
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
    selectedWork,
    selectedImageIndex,
    
    // Computed values
    categoryCounts,
    filteredWorks,
    categories: CATEGORIES,
    
    // Handlers
    handleCategoryChange,
    handleWorkSelect,
    handleWorkClose,
    handleImageClick,
    handleImageViewerClose,
    handleNextImage,
    handlePrevImage,
  };
};
