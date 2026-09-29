import React from "react";
import { Sparkles, Clock } from "lucide-react";

export default function AnnouncementBar({ onOpenPromo, onOpenSchedule }) {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="news-tag">HOURS</span>
        <span>
          We are currently closed for walk-ins — schedule your order for fast delivery or pickup!
        </span>
        <button
          onClick={onOpenSchedule}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            padding: "3px 12px",
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <Clock size={13} /> Schedule Order
        </button>
      </div>
    </div>
  );
}
