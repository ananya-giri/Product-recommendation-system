import React, { useState } from "react";
import { Star, Sparkles, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";

/**
 * ProductCard renders product details, rating stars, a category badge,
 * a collapsible specification sheet, and cart integration.
 */
export default function ProductCard({ product, recommendation, onAddToCart }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isRecommended = !!recommendation;

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`glass-card product-card ${isRecommended ? "is-recommended" : ""}`}>
      {isRecommended && (
        <div className="recommendation-badge">
          <Sparkles size={12} />
          <span>AI Recommended Match</span>
        </div>
      )}

      <div className="image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
        <span className="category-badge">{product.category}</span>
      </div>

      <div className="card-content">
        <div className="rating-row">
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} 
                stroke={i < Math.floor(product.rating) ? "#fbbf24" : "rgba(255,255,255,0.25)"} 
              />
            ))}
          </div>
          <span className="rating-value">{product.rating}</span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        {/* Collapsible Specifications Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <button 
            type="button"
            onClick={handleToggleExpand}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.25rem 0",
              alignSelf: "flex-start",
              outline: "none"
            }}
          >
            <span>{isExpanded ? "Hide Details" : "View Specifications"}</span>
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {isExpanded && (
            <div 
              className="specs-table"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "0.35rem", 
                background: "rgba(255, 255, 255, 0.02)", 
                padding: "0.75rem", 
                borderRadius: "8px", 
                border: "1px solid rgba(255, 255, 255, 0.05)",
                animation: "fade-in var(--transition-fast)"
              }}
            >
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>{key}:</span>
                  <span style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom AI / Local Explanatory Bubble */}
        {isRecommended && (
          <div className="ai-reason-bubble">
            <span className="ai-reason-bubble-title">Why it matches:</span>
            <p style={{ color: "var(--text-primary)", fontSize: "0.8rem", margin: 0 }}>
              {recommendation.reason}
            </p>
          </div>
        )}

        <div className="card-footer">
          <span className="product-price">${product.price}</span>
          <button 
            type="button"
            style={{
              background: isRecommended ? "var(--accent-gradient)" : "rgba(255, 255, 255, 0.05)",
              color: "white",
              border: isRecommended ? "none" : "1px solid var(--border-color)",
              padding: "0.5rem 0.85rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              transition: "all var(--transition-fast)"
            }}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
