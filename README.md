# 🌱 Spearmint Recs — AI Product Recommendation System

An impressive, high-fidelity React application that displays an interactive product catalog and utilizes an AI-powered recommendation system to match custom natural language shopping preferences (e.g., *"I want a phone under $500"* or *"wireless headphones with active noise cancellation"*).

Built as a production-grade portfolio project showcasing clean architecture, security best practices, environment configuration, state management, and modern fluid UI design.

---

## 🚀 Key Features

*   **Dual-Engine Architecture (AI & Local fallback)**:
    *   **Gemini AI Engine**: Utilizes **Gemini 1.5 Flash** (via direct Google REST API calls) to parse query parameters using natural language, returning structured JSON recommendations containing matching IDs and custom explanations.
    *   **Local Fallback Engine**: If no API key is set, a rule-based algorithm takes over. It extracts budget limits via regex, performs category checks, and scores keyword overlap to provide high-quality matching recommendations instantly.
*   **Environment Configuration (`.env`)**: Supports storing keys securely inside environment variables using Vite prefixes, accompanied by a checklist example template (`.env.example`).
*   **Secure API Handling**: Local API key configurations are written to a UI settings dashboard panel which stores keys client-side in `localStorage` securely. `.env` credentials are systematically excluded from version control via `.gitignore`.
*   **Interactive Shopping Cart**: A slide-out cart drawer overlay with animated count badges, quantity adjustments, and mock checkouts.
*   **Real-time Category Sliding Tabs**: Horizontal scrollable categories with active highlight indicators and dynamic item counts (e.g., `Electronics (7)`).
*   **Collapsible Tech Specs Sheet**: Expandable spec accordions on each product card with clean tabular details.
*   **Interactive Search History**: Recalls recent queries, displaying them in the sidebar as click-to-search pills.
*   **Toaster Alerts**: Custom success, warning, and info notification toasts for an app-state feedback loop.

---

## 📐 System Architecture & Data Flow

```
                  ┌──────────────────────────────┐
                  │   User Preference Query      │
                  └──────────────┬───────────────┘
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │    App.jsx State Coordinator │
                  └──────────────┬───────────────┘
                                 │ (Checks key in .env or localSettings)
                                 ├──────────────────────────────┐
                                 │ (Key Exists)                 │ (No Key / Error)
                                 ▼                              ▼
                  ┌──────────────────────────────┐┌──────────────────────────────┐
                  │       Gemini AI Engine       ││     Local Fallback Engine    │
                  │      (Gemini 1.5 Flash)      ││     (Rule-Based Matcher)     │
                  │   - Mime-Type: JSON mode     ││   - Regex Budget Parsing     │
                  │   - Custom Shopping Persona  ││   - Category Word Weights    │
                  │   - Custom Reasons Output    ││   - Token Keyword Scores     │
                  └──────────────┬───────────────┘└──────────────┬───────────────┘
                                 │                              │
                                 └──────────────┬───────────────┘
                                                │
                                                ▼ (Structured JSON Output)
                                  { recommendations: [...], summary: "..." }
                                                │
                                                ▼
                  ┌──────────────────────────────┐
                  │    Highlighted Matches Grid  │
                  │    + Explanatory Reason      │
                  └──────────────────────────────┘
```

---

## 🛠️ Tech Stack

*   **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) (Ultra-fast Hot Module Replacement)
*   **Iconography**: [Lucide React](https://lucide.dev/) (Clean vector icons)
*   **Styling**: Pure **Vanilla CSS** (Designed with modern variables, neon styling, custom scrollbars, keyframe-animated loaders, and glassmorphic blurs)
*   **API Model**: Google **Gemini 1.5 Flash** API

---

## 📥 Installation & Local Setup

### Prerequisites
Make sure you have **Node.js** (v18.0.0 or higher) and **npm** installed.

### 1. Clone the repository
```bash
git clone https://github.com/ananya-giri/Product-recommendation-system.git
cd Product-recommendation-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the template file to configure your local variables:
```bash
cp .env.example .env
```
Open the newly created `.env` file and insert your Gemini API Key:
```env
VITE_GEMINI_API_KEY=AIzaSy...your_gemini_key_here...
```
*(If you do not have an API key, leave it blank; the app will automatically mount using the local scoring fallback, and you can also enter your key directly in the web UI's settings panel later).*

### 4. Boot Development Server
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173/`** to run the app.

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and styling assets
│   ├── components/
│   │   ├── Header.jsx             # Top Navbar, Cart Badge, Status Dot
│   │   ├── ProductCard.jsx        # Product detail cards, Specs Accordion, Cart action
│   │   ├── RecommendationBox.jsx  # Search inputs, Presets, History logger, Shimmers
│   │   └── SettingsModal.jsx      # API key configurations drawer
│   ├── utils/
│   │   ├── products.js            # Mock Product catalog database
│   │   ├── localEngine.js         # Fallback regex budget parser and search tag weights
│   │   └── aiEngine.js            # Fetch calls structure to Gemini AI API
│   ├── App.jsx             # State manager, filters, shopping cart computations
│   ├── index.css           # Design tokens, variables, custom transitions, glassmorphic rules
│   └── main.jsx            # React rendering mount entry
├── .env.example            # Environment variables placeholder
├── index.html              # Main HTML entry configured with SEO metadata and favicon
└── package.json            # Scripts and dependencies setup
```

---

## 🏆 Portfolio Design Features

1.  **Glassmorphic Layouts**: Semi-transparent card panels with border glares and backdrop filters (`blur(16px)`) creating a luxurious layered layout.
2.  **State Resilience**: Network request errors are caught gracefully. If an API call fails due to keys, permissions, or quota issues, the App automatically falls back to local rules and displays a warning banner explaining what happened.
3.  **Clean Code Practices**: Documented with clear, comprehensive JSDoc structures describing state controls and scoring loops to showcase professional coding standards.
