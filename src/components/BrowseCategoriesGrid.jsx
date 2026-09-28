import React from "react";
import { Search, ArrowRight } from "lucide-react";
import { categories } from "../data/menuData";

export default function BrowseCategoriesGrid({ onSelectCategory }) {
  // Rich photography and descriptive sub-labels for each category matching Downtown Grill
  const categoryMetadata = {
    grills: {
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop",
      sublabel: "Suya, Wings & Asun"
    },
    kitchen: {
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop",
      sublabel: "Party Jollof & Snails"
    },
    combos: {
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop",
      sublabel: "Feast Platters & Boxes"
    },
    sides: {
      image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=900&auto=format&fit=crop",
      sublabel: "Fried Yam & Dodo"
    },
    drinks: {
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=900&auto=format&fit=crop",
      sublabel: "Zobo & Chilled Chapman"
    }
  };

  // Only take specific categories (exclude 'all')
  const catList = categories.filter(c => c.id !== "all");

  return (
    <section className="browse-section">
      <div className="site-container">
        {/* Header split matching Downtown Grill */}
        <div className="section-header-split">
          <div className="browse-header-left">
            <div className="badge-flame-sm">
              <Search size={12} color="var(--primary)" />
              <span>BROWSE</span>
            </div>
            <h2 className="section-title-display">
              What are you craving?
            </h2>
          </div>
          <div className="browse-header-right">
            <p className="browse-subtitle-text">
              Choose from our most popular categories and find your next favourite.
            </p>
            <button 
              type="button"
              onClick={() => onSelectCategory("all")}
              className="btn-browse-view-all"
            >
              <span>View Full Menu</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* 5-Column High-Res Category Photography Cards */}
        <div className="category-tiles-grid">
          {catList.map(cat => {
            const meta = categoryMetadata[cat.id] || {
              image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=900&auto=format&fit=crop",
              sublabel: "Delicious dishes"
            };

            return (
              <div 
                key={cat.id}
                className="category-tile-card"
                onClick={() => onSelectCategory(cat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectCategory(cat.id);
                  }
                }}
              >
                {/* Full-bleed category photo */}
                <img 
                  src={meta.image} 
                  alt={cat.name} 
                  className="cat-tile-bg-img"
                  loading="lazy"
                />

                {/* Rich dark gradient vignette */}
                <div className="cat-tile-gradient-overlay" />

                {/* Text and badges overlaid */}
                <div className="cat-tile-overlay-content">
                  <div className="cat-tile-text-wrap">
                    <span className="cat-count-badge">
                      {cat.count} Dishes
                    </span>
                    <h3 className="cat-tile-title">{cat.name}</h3>
                    <p className="cat-tile-sublabel">{meta.sublabel}</p>
                  </div>

                  <div className="cat-tile-action-circle">
                    <ArrowRight size={16} />
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
