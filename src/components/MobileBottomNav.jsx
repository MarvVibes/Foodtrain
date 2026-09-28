import React from 'react';
import { Home, UtensilsCrossed, Calendar, Bike, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav({ 
  activeTab, 
  onSelectTab, 
  cartCount = 0, 
  onOpenCart 
}) {
  return (
    <nav className="mobile-bottom-dock">
      <button 
        type="button"
        onClick={() => onSelectTab('home')}
        className={`dock-item-btn ${activeTab === 'home' ? 'active' : ''}`}
      >
        {activeTab === 'home' && <div className="dock-active-pill" />}
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        type="button"
        onClick={() => onSelectTab('menu')}
        className={`dock-item-btn ${activeTab === 'menu' ? 'active' : ''}`}
      >
        {activeTab === 'menu' && <div className="dock-active-pill" />}
        <UtensilsCrossed size={20} />
        <span>Menu</span>
      </button>

      <button 
        type="button"
        onClick={() => onSelectTab('catering')}
        className={`dock-item-btn ${activeTab === 'catering' ? 'active' : ''}`}
      >
        {activeTab === 'catering' && <div className="dock-active-pill" />}
        <Calendar size={20} />
        <span>Catering</span>
      </button>

      <button 
        type="button"
        onClick={() => onSelectTab('tracking')}
        className={`dock-item-btn ${activeTab === 'tracking' ? 'active' : ''}`}
      >
        {activeTab === 'tracking' && <div className="dock-active-pill" />}
        <Bike size={20} />
        <span>Track</span>
      </button>

      <button 
        type="button"
        onClick={onOpenCart}
        className="dock-item-btn"
        style={{ color: cartCount > 0 ? 'var(--primary)' : '#94a3b8' }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-8px',
              background: 'var(--primary)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff'
            }}>
              {cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>
    </nav>
  );
}
