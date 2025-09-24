import React from "react";
import "./ui.css";

export function Badge({ children, variant = "solid", className = "" }) {
  return (
      <span className={`ui-badge ${variant === "outline" ? "ui-badge--outline" : ""} ${className}`}>
      {children}
    </span>
  );
}
