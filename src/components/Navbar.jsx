import React, { useState } from "react";
import {
  Utensils,
  PartyPopper,
  Gift,
  ClipboardList,
  Info,
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  X
} from "lucide-react";

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedBranch,
  onOpenBranchModal,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  onOpenSearch
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const popularSearches = [
    "Flame Chicken",
    "Beef Suya",
    "Asun",
    "Fried Yam",
    "Gizz-Snail",
    "Party Jollof"
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="main-navbar">
      <div className="container">
        <div className="nav-inner">
          {/* Logo & Desktop Nav Links */}
          <div className="nav-brand-wrap">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/foodtrain-logo.svg"
                alt="FoodTrain - Flame-Grilled Delights"
                className="nav-logo"
              />
            </a>

            <nav className="desktop-nav-links">
              <button
                className={`nav-item-btn ${activeTab === "menu" ? "active" : ""}`}
                onClick={() => handleNavClick("menu")}
              >
                <Utensils size={17} />
                <span>Menu</span>
              </button>
              <button
                className={`nav-item-btn ${activeTab === "catering" ? "active" : ""}`}
                onClick={() => handleNavClick("catering")}
              >
                <PartyPopper size={17} />
                <span>Events &amp; Catering</span>
              </button>
              <button
                className={`nav-item-btn ${activeTab === "gifts" ? "active" : ""}`}
                onClick={() => handleNavClick("gifts")}
              >
                <Gift size={17} />
                <span>Gift Cards</span>
              </button>
              <button
                className={`nav-item-btn ${activeTab === "tracking" ? "active" : ""}`}
                onClick={() => handleNavClick("tracking")}
              >
                <ClipboardList size={17} />
                <span>Track Order</span>
              </button>
              <button
                className={`nav-item-btn ${activeTab === "about" ? "active" : ""}`}
                onClick={() => handleNavClick("about")}
              >
                <Info size={17} />
                <span>About Us</span>
              </button>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="nav-right-actions">
            {/* Branch Selector Pill */}
            <button
              className="branch-select-pill"
              onClick={onOpenBranchModal}
              title="Change Delivery Branch"
            >
              <MapPin size={15} color="var(--primary)" />
              <span className="branch-status-dot"></span>
              <span className="branch-name-text">
                {selectedBranch ? selectedBranch.name : "Select Branch"}
              </span>
              <ChevronDown size={14} color="#6b7280" />
            </button>

            {/* Search Trigger */}
            <button
              className="icon-action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Shopping Cart Button */}
            <button
              className="icon-action-btn"
              onClick={onOpenCart}
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-counter-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {isSearchOpen && (
        <div className="search-expand-bar">
          <div className="container">
            <div className="search-input-box">
              <Search size={18} color="var(--primary)" />
              <input
                type="text"
                placeholder="Search flame grills, suya, sides, drinks or kitchen specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={16} color="#6b7280" />
                </button>
              )}
            </div>

            <div className="popular-chips">
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#9ca3af", letterSpacing: "1px" }}>
                Popular Searches:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  className="popular-chip-btn"
                  onClick={() => {
                    setSearchQuery(term);
                    setActiveTab("menu");
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
