import React from "react";
import { Flame, Utensils, Box, Sparkles, Coffee } from "lucide-react";
import { categories } from "../data/menuData";

export default function CategoryPills({ selectedCategory, onSelectCategory }) {
  const getIcon = (id) => {
    switch (id) {
      case "grills":
        return <Flame size={15} />;
      case "kitchen":
        return <Utensils size={15} />;
      case "combos":
        return <Box size={15} />;
      case "sides":
        return <Sparkles size={15} />;
      case "drinks":
        return <Coffee size={15} />;
      default:
        return null;
    }
  };

  return (
    <div className="category-filter-scroller no-scrollbar">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`category-tab-btn ${isActive ? "active" : ""}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
            <span className="category-count-pill">({cat.count})</span>
          </button>
        );
      })}
    </div>
  );
}
