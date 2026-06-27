import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import RecommendationBox from "./components/RecommendationBox";
import ProductCard from "./components/ProductCard";
import SettingsModal from "./components/SettingsModal";
import { products } from "./utils/products";
import { getLocalRecommendations } from "./utils/localEngine";
import { getAIRecommendations } from "./utils/aiEngine";
import { HelpCircle, Sparkles, ShoppingBag, X, Info, Plus, Minus, Trash2, ArrowUpDown } from "lucide-react";

/**
 * App is the core coordinator for SmartCart Recs.
 * It manages:
 * - Environment variables and local settings configs
 * - Mock shopping cart & drawer overlays
 * - Floating toasts notification system
 * - Recent search history logging
 * - Real-time categories sliding tabs & sort filters
 */
export default function App() {
  // Config States
  const [apiKey, setApiKey] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Recommendation States
  const [activeQuery, setActiveQuery] = useState("");
  const [recommendations, setRecommendations] = useState(null); 
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [engineUsed, setEngineUsed] = useState("local"); 

  // Catalog States
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Recruiter Upgrade: Mock Shopping Cart States
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Recruiter Upgrade: Query History
  const [searchHistory, setSearchHistory] = useState([]);

  // Recruiter Upgrade: Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Toast trigger utility
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // On Mount: Load Environment Key or LocalStorage Key
  useEffect(() => {
    // 1. Check Vite Environment Variable first (best practice)
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    // 2. Fallback to LocalStorage UI configuration
    const savedKey = localStorage.getItem("smartcart_api_key");

    if (envKey) {
      setApiKey(envKey);
      setEngineUsed("ai");
      showToast("Initialized Gemini API Key from environment variables (.env)", "info");
    } else if (savedKey) {
      setApiKey(savedKey);
      setEngineUsed("ai");
      showToast("Initialized Gemini API Key from UI settings cache", "info");
    } else {
      setEngineUsed("local");
      showToast("Welcome! Configure a Gemini API Key or use the Local fallback engine.", "info");
    }

    // Load search history
    const savedHistory = localStorage.getItem("smartcart_query_history");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save API key callback
  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem("smartcart_api_key", newKey);
      setEngineUsed("ai");
      showToast("API Configuration saved. Gemini AI Engine enabled!");
    } else {
      localStorage.removeItem("smartcart_api_key");
      setEngineUsed("local");
      showToast("API Configuration cleared. Reverted to Local Engine fallback.", "warning");
    }
  };

  // Core search runner (AI vs Local fallback)
  const handleSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsLoading(true);
    setActiveQuery(trimmedQuery);

    // Save search history (max 6 items, avoid duplicates)
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== trimmedQuery.toLowerCase());
      const newHistory = [trimmedQuery, ...filtered].slice(0, 6);
      localStorage.setItem("smartcart_query_history", JSON.stringify(newHistory));
      return newHistory;
    });

    if (apiKey) {
      try {
        setEngineUsed("ai");
        const result = await getAIRecommendations(trimmedQuery, apiKey);
        setRecommendations(result.recommendations || []);
        setSummary(result.summary || "Here are your custom AI recommendations.");
        showToast("AI Recommendations generated successfully!", "success");
      } catch (error) {
        console.error("AI Recommendation failed, falling back to local engine:", error);
        setEngineUsed("local");
        const fallbackResult = getLocalRecommendations(trimmedQuery);
        setRecommendations(fallbackResult.recommendations);
        setSummary(
          `AI Engine Error: ${error.message}. Successfully fell back to Local Search Engine.\n\n${fallbackResult.summary}`
        );
        showToast("Gemini key error. Fell back to Local Search Engine.", "warning");
      }
    } else {
      setEngineUsed("local");
      const result = getLocalRecommendations(trimmedQuery);
      setRecommendations(result.recommendations);
      setSummary(result.summary);
      showToast("Local recommendation engine matches loaded.", "info");
    }
    setIsLoading(false);
  };

  // Clear query resets
  const handleClear = () => {
    setActiveQuery("");
    setRecommendations(null);
    setSummary("");
    showToast("Recommendations filter cleared", "info");
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("smartcart_query_history");
    showToast("Search history log cleared", "info");
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        showToast(`Increased quantity of ${product.name} in cart`);
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      showToast(`Added ${product.name} to cart`);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing.quantity > 1) {
        return prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      }
      return prev.filter(item => item.product.id !== productId);
    });
    showToast("Removed item from cart", "info");
  };

  const handleCheckout = () => {
    alert("Thank you for testing the SmartCart cart demo! This mock transaction was successful.");
    setCart([]);
    setIsCartOpen(false);
    showToast("Transaction completed and cart cleared!");
  };

  // Compute item category list options dynamically
  const categories = ["All", "Electronics", "Gaming", "Home & Office", "Fitness"];

  // Filter products by active category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (categoryFilter === "All") return true;
      return product.category === categoryFilter;
    });
  }, [categoryFilter]);

  // Apply sorting filter
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price-low-high") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high-low") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return list.sort((a, b) => b.rating - a.rating);
    return list; // featured default
  }, [filteredProducts, sortBy]);

  // Map recommendations for quick O(1) checks in components
  const recommendationsMap = useMemo(() => {
    if (!recommendations) return {};
    return recommendations.reduce((acc, curr) => {
      acc[curr.productId] = curr;
      return acc;
    }, {});
  }, [recommendations]);

  // Get recommended catalog details for top row section
  const recommendedProductsList = useMemo(() => {
    if (!recommendations) return [];
    return products
      .filter(p => recommendationsMap[p.id])
      .map(p => ({
        ...p,
        recommendation: recommendationsMap[p.id]
      }));
  }, [recommendations, recommendationsMap]);

  // Total pricing computation
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="app-container">
      <Header 
        isAiActive={!!apiKey && engineUsed === "ai"} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        cartCount={cartCount}
        onToggleCart={() => setIsCartOpen(true)}
      />

      {/* Hero Header */}
      <section className="hero-section">
        <span className="hero-tagline">AI-Powered Shopping Assistant</span>
        <h1 className="hero-title">Discover Your Next Favorite Find</h1>
        <p className="hero-desc">
          Describe what you need in plain text (e.g. budget, features, category) and our recommendation engine will search the catalog to suggest matching items.
        </p>
      </section>

      <main className="main-layout">
        {/* Sidebar Controls */}
        <aside className="sidebar">
          <RecommendationBox 
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isLoading}
            isAiActive={!!apiKey && engineUsed === "ai"}
            summary={summary}
            hasActiveFilters={!!activeQuery}
            searchHistory={searchHistory}
            onClearHistory={handleClearHistory}
          />
        </aside>

        {/* Product Display Area */}
        <section className="catalog-section">
          {/* 1. Recommended Matches Grid */}
          {activeQuery && recommendations && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={20} style={{ color: engineUsed === "ai" ? "var(--color-accent)" : "#f59e0b" }} />
                <h2 style={{ fontSize: "1.35rem" }}>
                  {engineUsed === "ai" ? "AI Recommendations" : "Local Matches"} for "{activeQuery}"
                </h2>
              </div>
              
              {recommendedProductsList.length > 0 ? (
                <div className="products-grid">
                  {recommendedProductsList.map(product => (
                    <ProductCard 
                      key={`rec-${product.id}`} 
                      product={product} 
                      recommendation={product.recommendation}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel empty-state">
                  <HelpCircle size={36} className="empty-state-icon" />
                  <h3>No Direct Matches Found</h3>
                  <p>Try refining your query, adjusting the budget limit, or clearing the filter.</p>
                </div>
              )}
              
              <hr style={{ border: "0", height: "1px", background: "var(--border-color)", margin: "1.5rem 0" }} />
            </div>
          )}

          {/* 2. Full Catalog Header & Category Sliding tab pills */}
          <div className="catalog-header" style={{ borderBottom: "none", paddingBottom: "0" }}>
            <div className="catalog-title-group">
              <h2>{activeQuery ? "All Catalog Products" : "Explore Catalog"}</h2>
              <span className="product-count">({sortedProducts.length} items)</span>
            </div>

            {/* Sort Select list */}
            <div className="filter-row">
              <ArrowUpDown size={14} style={{ color: "var(--text-muted)" }} />
              <select 
                className="category-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ minWidth: "140px" }}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Slide Tab Pills for Categories */}
          <div className="category-tabs-row">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${categoryFilter === cat ? "is-active" : ""}`}
                onClick={() => setCategoryFilter(cat)}
              >
                <span>{cat}</span>
                <span className="category-tab-count">
                  {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <ProductCard 
                  key={`catalog-${product.id}`} 
                  product={product} 
                  recommendation={recommendationsMap[product.id]}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel empty-state">
              <ShoppingBag size={36} className="empty-state-icon" />
              <h3>No Products in this Category</h3>
              <p>Try changing the category filter to explore other available products.</p>
            </div>
          )}
        </section>
      </main>

      <footer style={{ 
        marginTop: "auto", 
        paddingTop: "2rem", 
        borderTop: "1px solid var(--border-color)", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        fontSize: "0.8rem",
        color: "var(--text-muted)",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <span>&copy; 2026 SmartCart Recs Shopping Assistant. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }} onClick={(e) => {e.preventDefault(); setIsSettingsOpen(true);}}>API Settings</a>
          <span>&middot;</span>
          <span style={{ color: "var(--text-secondary)" }}>Powered by Gemini Flash</span>
        </div>
      </footer>

      {/* 3. Settings Configuration overlay */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />

      {/* Recruiter Upgrade: Mock Shopping Cart slide Drawer */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingBag size={18} style={{ color: "var(--color-primary)" }} />
                <h3>Your Shopping Bag ({cartCount})</h3>
              </div>
              <button className="close-modal-btn" onClick={() => setIsCartOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="cart-items-list">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div className="cart-item-row" key={`cart-${item.product.id}`}>
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.product.name}</span>
                      <span className="cart-item-price">${item.product.price} each</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button 
                        className="clear-btn" 
                        style={{ width: "26px", height: "26px", padding: 0 }}
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: "0.9rem", fontWeight: "600", minWidth: "16px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button 
                        className="clear-btn" 
                        style={{ width: "26px", height: "26px", padding: 0 }}
                        onClick={() => handleAddToCart(item.product)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "1rem", 
                  height: "80%",
                  textAlign: "center" 
                }}>
                  <ShoppingBag size={48} style={{ color: "var(--text-muted)" }} />
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Your shopping bag is empty.<br />Add products from the catalog to get started.
                  </p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                  Shipping & taxes calculated at checkout. This is a mockup demo.
                </p>
                <button type="button" className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recruiter Upgrade: Floating Toasts notification list */}
      <div className="toasts-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
