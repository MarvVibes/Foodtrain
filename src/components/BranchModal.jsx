import React from "react";
import { MapPin, Phone, Clock, Star, Check, X } from "lucide-react";
import { branches } from "../data/branchesData";

export default function BranchModal({ isOpen, onClose, selectedBranch, onSelectBranch }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: "620px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)" }}>
              Select FoodTrain Branch
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>
              Choose your nearest kitchen for fresh, hot delivery or express pickup
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: "65vh" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {branches.map((b) => {
              const isSelected = selectedBranch && selectedBranch.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBranch(b);
                    onClose();
                  }}
                  style={{
                    border: isSelected ? "2px solid var(--primary)" : "1.5px solid var(--border-subtle)",
                    background: isSelected ? "var(--primary-light)" : "#ffffff",
                    borderRadius: "16px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px"
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: isSelected ? "var(--primary)" : "var(--text-main)"
                        }}
                      >
                        {b.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          background: "#ecfdf5",
                          color: "#059669",
                          padding: "2px 8px",
                          borderRadius: "999px"
                        }}
                      >
                        {b.state}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "8px"
                      }}
                    >
                      <MapPin size={13} style={{ color: "var(--primary)", shrink: 0 }} />
                      {b.address}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        fontSize: "12px",
                        color: "#4b5563",
                        flexWrap: "wrap"
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} color="var(--primary)" /> {b.hours}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Phone size={12} color="var(--primary)" /> {b.phone}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "3px", color: "#d97706", fontWeight: 700 }}>
                        <Star size={12} fill="#d97706" color="#d97706" /> {b.rating} ({b.reviews})
                      </span>
                    </div>
                  </div>

                  <div style={{ alignSelf: "center", flexShrink: 0 }}>
                    {isSelected ? (
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--primary)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Check size={18} strokeWidth={3} />
                      </div>
                    ) : (
                      <button
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          background: "#f3f4f6",
                          color: "#374151",
                          padding: "8px 14px",
                          borderRadius: "999px",
                          transition: "all 0.15s ease"
                        }}
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
