import React from "react";
import { Flame, Plus, Clock, Star } from "lucide-react";

export default function FeaturedItemsRow({ items = [], onCustomizeItem, onQuickAdd: _onQuickAdd }) {
  // Select 4 iconic dishes using the actual IDs from menuData
  const featuredIds = [
    "conductors-mega-feast",
    "special-beef-suya",
    "flame-grilled-chicken",
    "tender-asun"
  ];

  // Match items by ID, or fallback to first 4 available items
  const matched = featuredIds
    .map(id => items.find(item => item.id === id))
    .filter(Boolean);

  const displayItems = matched.length >= 4 ? matched : items.slice(0, 4);

  // 4 modern appetizing Green + White + Gold theme variations
  const cardThemes = [
    { bg: "#F0FDF4", border: "#DCFCE7", tag: "Platter Feast", accent: "#0D7A42" },
    { bg: "#FFFBEB", border: "#FEF3C7", tag: "Must Try", accent: "#D97706" },
    { bg: "#ECFDF5", border: "#D1FAE5", tag: "Bestseller", accent: "#059669" },
    { bg: "#FFFDF0", border: "#FEF08A", tag: "Signature Asun", accent: "#B45309" }
  ];

  return (
    <section className="featured-items-section">
      <div className="site-container">
        {/* Modern Brand Header */}
        <div className="section-header-center" style={{ marginBottom: "50px" }}>
          <div className="badge-flame-sm">
            <Flame size={13} color="var(--primary)" />
            <span>TOP PICKS</span>
          </div>
          <h2 className="section-title-display">
            Don't miss these!
          </h2>
          <p className="section-subtitle">
            Our most frequently ordered dishes, seasoned and flame-grilled daily.
          </p>
        </div>

        {/* 4-Item Grid with Signature Overlapping Circular Plates */}
        <div className="featured-grid-4">
          {displayItems.map((item, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div 
                key={item.id} 
                className="featured-item-card"
                style={{ 
                  backgroundColor: theme.bg,
                  borderColor: theme.border
                }}
              >
                {/* Floating Plate with Sunburst Badge */}
                <div 
                  className="featured-plate-stage"
                  onClick={() => onCustomizeItem(item)}
                >
                  {/* 16-petal Scalloped Star/Sunburst Accent Seal */}
                  <svg 
                    viewBox="0 0 120 120" 
                    className="plate-sunburst-badge"
                    aria-hidden="true"
                  >
                    <g fill={theme.accent} fillOpacity="0.16">
                      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => (
                        <rect
                          key={i}
                          x="20"
                          y="20"
                          width="80"
                          height="80"
                          rx="22"
                          transform={`rotate(${angle} 60 60)`}
                        />
                      ))}
                    </g>
                  </svg>

                  {/* Circular Food Plate Disc */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="featured-plate-img" 
                    loading="lazy"
                  />

                  {/* Time Badge */}
                  <span className="plate-badge-time">
                    <Clock size={11} /> {item.prepTime || "20 mins"}
                  </span>
                </div>

                {/* Card Body */}
                <div className="featured-card-body">
                  <div className="featured-card-top-row">
                    <span 
                      className="featured-tag-pill"
                      style={{ color: theme.accent, backgroundColor: "#ffffff" }}
                    >
                      {item.badge || theme.tag}
                    </span>
                    <div className="featured-rating">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{item.rating || "4.9"}</span>
                    </div>
                  </div>

                  <h3 
                    className="featured-item-name"
                    onClick={() => onCustomizeItem(item)}
                    title={item.name}
                  >
                    {item.name}
                  </h3>

                  <p className="featured-item-portion">
                    {item.portion || item.defaultSpice || "Fresh off the grill"}
                  </p>

                  <div className="featured-price-row">
                    <span className="featured-item-price">
                      ₦{item.price.toLocaleString()}.00
                    </span>
                    
                    <button 
                      type="button"
                      onClick={() => onCustomizeItem(item)}
                      className="btn-featured-add"
                      title="Customize & Add to order"
                    >
                      <Plus size={15} /> Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
