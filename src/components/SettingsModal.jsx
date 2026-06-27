import React, { useState, useEffect } from "react";
import { X, Sparkles, Key, AlertCircle, Info, Check } from "lucide-react";

export default function SettingsModal({ isOpen, onClose, onSave, currentApiKey }) {
  const [apiKey, setApiKey] = useState("");
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (currentApiKey) {
      setApiKey(currentApiKey);
    } else {
      setApiKey("");
    }
    setIsSaved(false);
  }, [currentApiKey, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Quick format validation for Google API Keys:
    // Typically 39 characters, starting with "AIzaSy"
    if (apiKey.trim() && !apiKey.startsWith("AIzaSy")) {
      setIsValidFormat(false);
      return;
    }

    setIsValidFormat(true);
    onSave(apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey("");
    onSave("");
    setIsSaved(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Key size={18} style={{ color: "var(--color-primary)" }} />
            <h3>Engine Configuration</h3>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="form-label">Gemini API Key</span>
              {apiKey ? (
                <span className="api-badge">Configured</span>
              ) : (
                <span className="api-badge missing">Using Local Engine</span>
              )}
            </div>
            
            <input
              type="password"
              className="form-input"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setIsValidFormat(true);
                setIsSaved(false);
              }}
            />
            
            {!isValidFormat && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#f87171", fontSize: "0.75rem" }}>
                <AlertCircle size={12} />
                <span>Google API keys typically start with 'AIzaSy'. Please verify your key.</span>
              </div>
            )}
            
            <span className="input-help">
              Your API Key is saved directly in your browser's local storage and is only sent directly to Google's Gemini API endpoints.
            </span>
          </div>

          <div style={{ 
            background: "rgba(99, 102, 241, 0.05)", 
            border: "1px solid rgba(99, 102, 241, 0.15)",
            padding: "0.75rem", 
            borderRadius: "8px",
            display: "flex",
            gap: "0.5rem",
            fontSize: "0.8rem"
          }}>
            <Info size={16} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              <strong>How it works:</strong> If you supply a Gemini API Key, the app uses <strong>Gemini 1.5 Flash</strong> to parse your queries with advanced AI and match products. Without it, the app falls back to a custom local rule-based engine.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button 
              type="submit" 
              className="save-btn" 
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              {isSaved ? (
                <>
                  <Check size={16} />
                  <span>Saved & Applied!</span>
                </>
              ) : (
                <span>Save Configuration</span>
              )}
            </button>
            
            {apiKey && (
              <button 
                type="button" 
                className="clear-btn" 
                onClick={handleClear}
                style={{ width: "auto", padding: "0 1rem", fontSize: "0.85rem" }}
              >
                Clear Key
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
