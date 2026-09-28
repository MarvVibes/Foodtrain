import React, { useState, useEffect } from "react";
import { X, Flame, Plus, Check, Clock } from "lucide-react";

export default function ItemCustomizerModal({ item, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !item) return null;

  const [selectedSpice, setSelectedSpice] = useState(item.defaultSpice || "Medium Spicy");
  const [selectedSide, setSelectedSide] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState("");

  useEffect(() => {
    if (item) {
      setSelectedSpice(item.defaultSpice || (item.spiceLevels && item.spiceLevels[0]) || "Standard");
      setSelectedSide(item.availableSides && item.availableSides.length > 0 ? item.availableSides[0] : "");
      setSelectedExtras([]);
      setQuantity(1);
      setSpecialNote("");
    }
  }, [item]);

  const toggleExtra = (extra) => {
    if (selectedExtras.some((e) => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const itemTotal = (item.price + extrasTotal) * quantity;

  const handleAdd = () => {
    const customizedItem = {
      ...item,
      cartItemId: `${item.id}-${Date.now()}`,
      selectedSpice,
      selectedSide,
      selectedExtras,
      quantity,
      specialNote,
      calculatedPrice: item.price + extrasTotal,
      itemTotal
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)" }}>
              Customize Your Sizzle
            </h3>
            <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700 }}>
              {item.portion}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Item Preview Card */}
          <div style={{ display: "flex", gap: "16px", background: "#fbfbf9", padding: "12px", borderRadius: "14px", border: "1px solid var(--border-subtle)" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "90px", height: "90px", borderRadius: "10px", objectFit: "cover" }}
            />
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)", marginBottom: "4px" }}>
                {item.name}
              </h4>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.4, marginBottom: "6px" }}>
                {item.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px", fontWeight: 900, color: "var(--primary)" }}>
                  ₦{item.price.toLocaleString()}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}>
                  <Clock size={12} color="var(--primary)" /> {item.prepTime}
                </span>
              </div>
            </div>
          </div>

          {/* Spice Level Selector */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <div className="custom-option-group">
              <div className="option-group-title">
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Flame size={15} color="var(--primary)" />
                  Spice &amp; Pepper Level
                </span>
                <span className="required-badge">Required</span>
              </div>
              <div className="spice-options-grid">
                {item.spiceLevels.map((lvl) => {
                  const isSelected = selectedSpice === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      className={`spice-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedSpice(lvl)}
                    >
                      <div style={{ fontSize: "13px" }}>{lvl}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Side Pairing Selector */}
          {item.availableSides && item.availableSides.length > 0 && (
            <div className="custom-option-group">
              <div className="option-group-title">
                <span>Select Side Pairing</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Choose 1</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {item.availableSides.map((side) => {
                  const isSelected = selectedSide === side;
                  return (
                    <button
                      key={side}
                      type="button"
                      onClick={() => setSelectedSide(side)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-subtle)",
                        background: isSelected ? "var(--primary-light)" : "#ffffff",
                        color: isSelected ? "var(--primary)" : "var(--text-main)",
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "13px",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>{side}</span>
                      {isSelected && <Check size={14} color="var(--primary)" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-on Extras */}
          {item.extras && item.extras.length > 0 && (
            <div className="custom-option-group">
              <div className="option-group-title">
                <span>Add Extra Sizzle (Optional)</span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Add as desired</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {item.extras.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.name === extra.name);
                  return (
                    <div
                      key={extra.name}
                      className={`extra-item-row ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleExtra(extra)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: isSelected ? "2px solid var(--primary)" : "1.5px solid #d1d5db",
                            background: isSelected ? "var(--primary)" : "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff"
                          }}
                        >
                          {isSelected && <Check size={13} strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: isSelected ? 700 : 500, color: "var(--text-main)" }}>
                          {extra.name}
                        </span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)" }}>
                        +₦{extra.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Special Note */}
          <div className="custom-option-group">
            <label style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
              Special Kitchen Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Cut into small chunks, separate the pepper dip, extra napkins..."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid var(--border-subtle)",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="quantity-controller">
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="qty-count">{quantity}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <button type="button" className="btn-add-modal" onClick={handleAdd}>
            <Plus size={18} />
            <span>Add to Cart • ₦{itemTotal.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
