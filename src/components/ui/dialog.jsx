import React from "react";
import "./ui.css";

export function Dialog({ open, onOpenChange = () => {}, children }) {
  if (!open) return null;
  const handleOverlay = () => onOpenChange(false);
  return (
      <div className="ui-modal-overlay" onClick={handleOverlay}>
        {/* Stop bubbling so clicks inside content don't close the modal */}
        <div className="ui-modal" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
export function DialogHeader({ children, className = "" }) {
  return <div className={`ui-modal-header ${className}`}>{children}</div>;
}
export function DialogTitle({ children, className = "" }) {
  return <h4 className={`ui-modal-title ${className}`}>{children}</h4>;
}
export function DialogDescription({ children, className = "" }) {
  return <p className={`ui-modal-description ${className}`}>{children}</p>;
}
