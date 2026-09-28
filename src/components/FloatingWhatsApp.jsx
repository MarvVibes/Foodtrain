import React, { useState } from 'react';
import { MessageSquare, Flame, X } from 'lucide-react';

export default function FloatingWhatsApp({ selectedBranch }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNum = selectedBranch?.phone ? selectedBranch.phone.replace(/[^0-9]/g, '') : '2348123456789';
  const branchName = selectedBranch?.name || 'FoodTrain';

  return (
    <div style={{ position: 'relative' }}>
      {/* Floating Tooltip Bubble */}
      {showTooltip && (
        <div className="floating-whatsapp-tooltip">
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={13} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <strong style={{ fontSize: '12px', color: 'var(--text-main)' }}>{branchName} Online</strong>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
            Hungry? Send your order or cravings directly on WhatsApp! 🍗🔥
          </p>
        </div>
      )}

      {/* Main Floating Button */}
      <a 
        href={`https://wa.me/${phoneNum}?text=Hello%20${encodeURIComponent(branchName)},%20I%20would%20like%20to%20place%20a%20grill%20order!`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <MessageSquare size={28} />
      </a>
    </div>
  );
}
