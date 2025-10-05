/**
 * Utility to manage body scroll locking for modals
 * Handles multiple modals and ensures proper cleanup
 */

let scrollLockCount = 0;
let originalBodyStyle = null;

export const lockScroll = () => {
  if (scrollLockCount === 0) {
    // Save original styles
    originalBodyStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    // Add padding to compensate for scrollbar removal
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  
  scrollLockCount++;
};

export const unlockScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  
  if (scrollLockCount === 0 && originalBodyStyle) {
    // Restore original styles
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;
    originalBodyStyle = null;
  }
};

// Emergency cleanup function
export const forceUnlockScroll = () => {
  scrollLockCount = 0;
  if (originalBodyStyle) {
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;
    originalBodyStyle = null;
  }
};
