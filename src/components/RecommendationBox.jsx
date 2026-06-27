import React, { useState } from "react";
import { Sparkles, Trash2, ArrowRight, CornerDownLeft, History, RotateCcw } from "lucide-react";

/**
 * RecommendationBox manages the search preference textarea, 
 * renders presets, and logs clickable query history.
 */
export default function RecommendationBox({ 
  onSearch, 
  onClear, 
  isLoading, 
  isAiActive, 
  summary, 
  hasActiveFilters,
  searchHistory = [],
  onClearHistory
}) {
  const [query, setQuery] = useState("");

  const presetSuggestions = [
    "I want a phone under $500",
    "Active noise canceling headphones",
    "Gifts for a gaming setup under $100",
    "Fitness gear and smart wearable"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handlePresetClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleClearClick = () => {
    setQuery("");
    onClear();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="glass-panel rec-container">
      <div className="rec-title-row">
        <Sparkles size={18} style={{ color: isAiActive ? "var(--color-accent)" : "#f59e0b" }} />
        <h2>Ask Recommendations</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ position: "relative" }}>
          <textarea
            className="prompt-textarea"
            placeholder={
              isAiActive 
                ? "Describe what you're looking for (e.g. 'Apple laptop for study' or 'budget audio under $100')..."
                : "Enter query (e.g. 'phone under 500', 'noise-canceling headphones')..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div style={{ 
            position: "absolute", 
            bottom: "8px", 
            right: "12px", 
            display: "flex", 
            alignItems: "center", 
            gap: "0.25rem",
            fontSize: "0.7rem", 
            color: "var(--text-muted)",
            pointerEvents: "none"
          }}>
            <span>Enter to send</span>
            <CornerDownLeft size={10} />
          </div>
        </div>

        <div className="action-row">
          <button 
            type="submit" 
            className="recommend-btn"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? (
              <>
                <span className="status-dot ai" style={{ width: "6px", height: "6px" }}></span>
                <span>AI is thinking...</span>
              </>
            ) : (
              <>
                <span>Get Recommendations</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {(query || hasActiveFilters) && (
            <button 
              type="button" 
              className="clear-btn"
              onClick={handleClearClick}
              disabled={isLoading}
              title="Reset search and filters"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestion pills */}
      <div className="suggestions-box">
        <span className="suggestions-title">Try asking:</span>
        <div className="pills-container">
          {presetSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              className="pill"
              onClick={() => handlePresetClick(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Query History Timeline */}
      {searchHistory.length > 0 && (
        <div className="suggestions-box" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
            <span className="suggestions-title" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <History size={12} />
              <span>Recent Queries</span>
            </span>
            <button 
              onClick={onClearHistory}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
                outline: "none"
              }}
              title="Clear search history"
            >
              <RotateCcw size={10} />
              <span>Clear</span>
            </button>
          </div>
          <div className="pills-container">
            {searchHistory.map((histQuery, idx) => (
              <button
                key={idx}
                type="button"
                className="pill"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.25rem",
                  borderColor: "rgba(255,255,255,0.04)",
                  background: "rgba(255,255,255,0.01)" 
                }}
                onClick={() => {
                  setQuery(histQuery);
                  onSearch(histQuery);
                }}
                disabled={isLoading}
              >
                <span>{histQuery}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations summary box */}
      {(isLoading || summary) && (
        <div className="rec-output-box">
          <div className="rec-output-header">
            {isLoading ? (
              <span>Analyzing Catalog...</span>
            ) : (
              <>
                <Sparkles size={12} style={{ color: isAiActive ? "var(--color-accent)" : "#f59e0b" }} />
                <span>Recommendation Summary</span>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="skeleton-loader">
              <div className="skeleton-line" style={{ width: "100%" }}></div>
              <div className="skeleton-line" style={{ width: "90%" }}></div>
              <div className="skeleton-line" style={{ width: "65%" }}></div>
            </div>
          ) : (
            <div className={`ai-summary-text ${isAiActive ? "" : "local-summary"}`}>
              {summary}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
