import React from "react";
import { Sparkles } from "lucide-react";

export default function AnnouncementBar({ onOpenPromo }) {
  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="news-tag">NEWS</span>
        <span>
          Flame-grilled favourites delivered in 25 mins across Lagos, Abuja, Ibadan &amp; PH!
        </span>
        <button
          onClick={onOpenPromo}
          style={{
            color: "#FFB800",
            textDecoration: "underline",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px"
          }}
        >
          <Sparkles size={13} /> Use code TRAIN10 for 10% Off
        </button>
      </div>
    </div>
  );
}
