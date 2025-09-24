import React from "react";
import "./ui.css";

export function Button({ children, onClick, className = "", variant = "secondary", type = "button" }) {
  return (
      <button
          type={type}
          onClick={onClick}
          className={`ui-button ${variant === "secondary" ? "ui-button--secondary" : "ui-button--primary"} ${className}`}
      >
        {children}
      </button>
  );
}
