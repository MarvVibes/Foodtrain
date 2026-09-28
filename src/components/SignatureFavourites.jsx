import React from "react";
import { UtensilsCrossed, ArrowRight, Clock, Star, Plus } from "lucide-react";

export default function SignatureFavourites({ items = [], onCustomizeItem, onExploreFullMenu }) {
  // 4 curated best-sellers with valid IDs
  const signatureIds = [
    "crispy-glazed-wings",
    "smoky-party-jollof",
    "sizzle-duo-box",
    "gizz-snail-combo"
  ];

  const matched = signatureIds
    .map(id => items.find(item => item.id === id))
    .filter(Boolean);

  const signatures = matched.length >= 4 ? matched : items.slice(4, 8);

  return (
    <section className="signatures-section">
      <div className="site-container">
        {/* Header */}
        <div className="section-header-center" style={{ marginBottom: "40px" }}>
          <div className="badge-flame-sm">
            <UtensilsCrossed size={12} color="var(--primary)" />
            <span>OUR MENU</span>
          </div>
          <h2 className="section-title-display">
            Signature Favourites
          </h2>
          <p className="section-subtitle">
            Fresh off the grill, served with love — seasoned just the way you like it.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="signatures-grid-4">
          {signatures.map(item => (
            <div key={item.id} className="signature-card">
              <div 
                className="sig-card-media-wrap"
                onClick={() => onCustomizeItem(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="sig-card-img" 
                  loading="lazy"
                />
                <span className="sig-prep-badge">
                  <Clock size={11} /> {item.prepTime || "20 mins"}
                </span>
                {item.badge && (
                  <span className="sig-status-badge">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="sig-card-info">
                <div className="sig-meta-row">
                  <span className="sig-category-label">
                    {item.category === "combos" ? "Platter Combo" : "Flame Special"}
                  </span>
                  <div className="sig-rating-wrap">
                    <Star size={12} fill="#d97706" color="#d97706" />
                    <span>{item.rating || "4.9"}</span>
                  </div>
                </div>

                <h3 
                  className="sig-item-title"
                  onClick={() => onCustomizeItem(item)}
                  title={item.name}
                >
                  {item.name}
                </h3>
                
                <p className="sig-item-desc">
                  {item.description}
                </p>

                <div className="sig-card-bottom">
                  <div>
                    <span className="sig-price-label">Price</span>
                    <strong className="sig-price-val">₦{item.price.toLocaleString()}.00</strong>
                  </div>

                  <button 
                    type="button"
                    onClick={() => onCustomizeItem(item)}
                    className="btn-sig-order"
                  >
                    <span>Customize</span>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Full Menu Button */}
        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <button 
            type="button"
            onClick={onExploreFullMenu}
            className="btn-explore-full-menu"
          >
            <span>Explore Full Menu ({items.length} Delicacies)</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
