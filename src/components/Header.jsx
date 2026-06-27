import React from "react";
import { Sparkles, Cpu, Settings, ShoppingBag } from "lucide-react";

/**
 * Header component displaying the navigation, AI status badge, 
 * settings trigger, and the interactive shopping cart.
 */
export default function Header({ 
  isAiActive, 
  onOpenSettings, 
  cartCount, 
  onToggleCart 
}) {
  return (
    <header className="header-container">
      <div className="logo-section">
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <span className="logo-text">Spearmint</span>
          <span className="logo-badge" style={{ marginLeft: "0.5rem" }}>Recs</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Engine mode status pill */}
        <button 
          className="engine-status" 
          onClick={onOpenSettings}
          title="Click to configure API Key"
        >
          <span className={`status-dot ${isAiActive ? "ai" : "local"}`}></span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {isAiActive ? (
              <>
                <Sparkles size={13} style={{ color: "#34d399" }} />
                <span className="engine-name-text">Gemini AI</span>
              </>
            ) : (
              <>
                <Cpu size={13} style={{ color: "#fbbf24" }} />
                <span className="engine-name-text">Local Engine</span>
              </>
            )}
          </span>
        </button>

        {/* Shopping Cart Trigger */}
        <button 
          className="clear-btn" 
          onClick={onToggleCart}
          title="Open Cart"
          style={{ 
            width: "38px", 
            height: "38px", 
            position: "relative",
            background: cartCount > 0 ? "rgba(99, 102, 241, 0.15)" : "rgba(255, 255, 255, 0.05)",
            borderColor: cartCount > 0 ? "var(--color-primary)" : "var(--border-color)",
            color: cartCount > 0 ? "var(--text-primary)" : "var(--text-secondary)"
          }}
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "var(--accent-gradient)",
              color: "white",
              fontSize: "0.65rem",
              fontWeight: "700",
              minWidth: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifycontent: "center",
              padding: "0 4px",
              border: "2px solid var(--bg-dark)",
              boxShadow: "0 0 10px rgba(236, 72, 153, 0.5)",
              animation: "pulse 2s infinite"
            }}>
              {cartCount}
            </span>
          )}
        </button>

        {/* Settings modal trigger */}
        <button 
          className="clear-btn" 
          onClick={onOpenSettings}
          title="Engine Settings"
          style={{ width: "38px", height: "38px" }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
