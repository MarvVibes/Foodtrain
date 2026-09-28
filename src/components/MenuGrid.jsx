import React from "react";
import { Star, Clock, Plus, Flame, SlidersHorizontal } from "lucide-react";

export default function MenuGrid({
  items,
  selectedCategory,
  searchQuery,
  selectedBranch,
  onCustomizeItem,
  onQuickAdd
}) {
  // Filter by category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-section" id="menu">
      <div className="container">
        {/* Section Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
          <div className="section-tagline">
            <Flame size={14} color="var(--primary)" />
            <span>Fresh Off The Coals</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 className="section-heading">Our Flame-Grilled Menu</h2>
              <p className="section-subtext">
                Prepared with our signature 12-spice marinade and slow charcoal-grilled to lock in smoky juices.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-muted)", fontWeight: 600 }}>
              <span>Showing:</span>
              <strong style={{ color: "var(--primary)" }}>{filteredItems.length} delicacies</strong>
              <span>at</span>
              <strong style={{ color: "var(--text-main)" }}>{selectedBranch ? selectedBranch.name : "All Branches"}</strong>
            </div>
          </div>
        </div>

        {/* Empty State if Search Finds Nothing */}
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fafaf8", borderRadius: "24px", border: "1.5px dashed var(--border-subtle)" }}>
            <Flame size={44} color="#d1d5db" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)", marginBottom: "8px" }}>
              No dishes found matching "{searchQuery}"
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "400px", margin: "0 auto" }}>
              Try searching for "Suya", "Chicken", "Yam", or select a category above.
            </p>
          </div>
        ) : (
          /* Food Grid */
          <div className="food-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="food-card">
                {/* Media & Badges */}
                <div className="food-card-media" onClick={() => onCustomizeItem(item)} style={{ cursor: "pointer" }}>
                  <img src={item.image} alt={item.name} loading="lazy" />

                  {item.badge && (
                    <span className={`food-badge-pill ${item.badge.toLowerCase().replace(/\s+/g, "-")}`}>
                      {item.badge}
                    </span>
                  )}

                  <div className="prep-time-badge">
                    <Clock size={11} />
                    <span>{item.prepTime}</span>
                  </div>

                  <button
                    className="card-quick-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCustomizeItem(item);
                    }}
                    title="Customize & Add"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="food-card-body">
                  <div className="food-title-wrap">
                    <h3
                      className="food-card-title"
                      onClick={() => onCustomizeItem(item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </h3>
                    <div className="food-rating-wrap">
                      <Star size={13} fill="#d97706" color="#d97706" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <p className="food-card-portion">{item.portion}</p>
                  <p className="food-card-desc">{item.description}</p>

                  <div className="food-card-footer">
                    <div className="price-box">
                      <span className="main-price">₦{item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="original-price">
                          ₦{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      className="btn-customize-item"
                      onClick={() => onCustomizeItem(item)}
                    >
                      <SlidersHorizontal size={13} />
                      <span>Customize</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
