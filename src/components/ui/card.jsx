import React from "react";
import "./ui.css";

export function Card({ className = "", children }) {
  return <div className={`ui-card ${className}`}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={`ui-card-header ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={`ui-card-title ${className}`}>{children}</h3>;
}
export function CardContent({ className = "", children }) {
  return <div className={`ui-card-content ${className}`}>{children}</div>;
}
