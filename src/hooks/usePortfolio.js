import { useState, useMemo, useCallback, useEffect } from 'react';
import { WORKS, CATEGORIES } from '../constants/portfolioData';

export const usePortfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCategoryCards, setShowCategoryCards] = useState(true);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;
      if (state) {
        if (state.showCategoryCards !== undefined) {
          setShowCategoryCards(state.showCategoryCards);
        }
        if (state.activeCategory !== undefined) {
          setActiveCategory(state.activeCategory);
        }
        if (state.selectedWork !== undefined) {
          setSelectedWork(state.selectedWork);
        }
        if (state.selectedImageIndex !== undefined) {
          setSelectedImageIndex(state.selectedImageIndex);
        }
      } else {
        // Default state when no history state
        setShowCategoryCards(true);
        setActiveCategory("All");
        setSelectedWork(null);
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initialize with current URL state
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || "All";
    const workId = urlParams.get('work');
    const imageIndex = urlParams.get('image');
    
    if (workId) {
      const work = WORKS.find(w => w.id === workId);
      if (work) {
        setSelectedWork(work);
        setShowCategoryCards(false);
        setActiveCategory(work.category);
        if (imageIndex !== null) {
          setSelectedImageIndex(parseInt(imageIndex));
        }
      }
    } else if (category !== "All") {
      setActiveCategory(category);
      setShowCategoryCards(false);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update URL and history when state changes
  const updateHistory = useCallback((newState) => {
    const currentState = {
      showCategoryCards,
      activeCategory,
      selectedWork,
      selectedImageIndex
    };
    
    const updatedState = { ...currentState, ...newState };
    
    // Update URL
    const url = new URL(window.location);
    url.search = '';
    
    if (updatedState.selectedWork) {
      url.searchParams.set('work', updatedState.selectedWork.id);
      if (updatedState.selectedImageIndex !== null) {
        url.searchParams.set('image', updatedState.selectedImageIndex.toString());
      }
    } else if (!updatedState.showCategoryCards && updatedState.activeCategory !== "All") {
      url.searchParams.set('category', updatedState.activeCategory);
    }
    
    // Update browser history
    window.history.pushState(updatedState, '', url);
  }, [showCategoryCards, activeCategory, selectedWork, selectedImageIndex]);

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
    updateHistory({ activeCategory: category, showCategoryCards: false });
  }, [updateHistory]);

  const handleBackToCategories = useCallback(() => {
    setShowCategoryCards(true);
    setActiveCategory("All");
    updateHistory({ showCategoryCards: true, activeCategory: "All", selectedWork: null, selectedImageIndex: null });
  }, [updateHistory]);

  const handleWorkSelect = useCallback((work) => {
    setSelectedWork(work);
    updateHistory({ selectedWork: work, selectedImageIndex: null });
  }, [updateHistory]);

  const handleWorkClose = useCallback(() => {
    setSelectedWork(null);
    setSelectedImageIndex(null);
    updateHistory({ selectedWork: null, selectedImageIndex: null });
  }, [updateHistory]);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
    updateHistory({ selectedImageIndex: index });
  }, [updateHistory]);

  const handleImageViewerClose = useCallback(() => {
    setSelectedImageIndex(null);
    updateHistory({ selectedImageIndex: null });
  }, [updateHistory]);

  const handleNextImage = useCallback(() => {
    if (selectedWork?.caseStudy?.gallery) {
      const gallery = selectedWork.caseStudy.gallery;
      const newIndex = selectedImageIndex < gallery.length - 1 ? selectedImageIndex + 1 : 0;
      setSelectedImageIndex(newIndex);
      updateHistory({ selectedImageIndex: newIndex });
    }
  }, [selectedWork, selectedImageIndex, updateHistory]);

  const handlePrevImage = useCallback(() => {
    if (selectedWork?.caseStudy?.gallery) {
      const gallery = selectedWork.caseStudy.gallery;
      const newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : gallery.length - 1;
      setSelectedImageIndex(newIndex);
      updateHistory({ selectedImageIndex: newIndex });
    }
  }, [selectedWork, selectedImageIndex, updateHistory]);

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
