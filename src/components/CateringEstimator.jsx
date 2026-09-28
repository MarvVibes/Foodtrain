import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Check, 
  Flame, 
  MessageSquare, 
  ChefHat, 
  UtensilsCrossed, 
  Wine, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const PACKAGES = [
  {
    id: 'silver',
    name: 'Silver Train Box',
    pricePerGuest: 6500,
    tagline: 'Ideal for office lunches & meetings',
    features: [
      '1/4 Smoked BBQ Flame Chicken',
      'Smokey Firewood Jollof or Fried Rice',
      'Golden Fried Sweet Dodo',
      'Fresh Garden Slaw & Garlic Roll',
      'Chilled Soft Drink / Water'
    ]
  },
  {
    id: 'gold',
    name: 'Gold Executive Platter',
    pricePerGuest: 11500,
    popular: true,
    tagline: 'Best for birthdays, anniversaries & galas',
    features: [
      '1/2 BBQ Chicken or Grilled Croaker Fillet',
      'Tender Beef Suya Skewer + Asun Bite',
      'Signature Jollof Rice + Plantain',
      'Creamy FoodTrain Potato Slaw',
      'Craft Chapman Gold Mocktail'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum Grillmaster VIP',
    pricePerGuest: 18500,
    tagline: 'Ultimate luxury for high-end weddings & feasts',
    features: [
      'Full Mixed Grill (Chicken, Lamb Chops & Prawns)',
      'Spicy Goat Meat Asun Bites',
      'Smokey Basmati Jollof + Fried Yam Fries',
      'Unlimited Gourmet Sauces & Salads',
      'Signature Zobo Blast & Custom Mocktails'
    ]
  }
];

const ADDONS = [
  { id: 'chef', name: 'On-site Live Griller Chef & Pit', price: 35000, desc: 'Smokey theatre cooked live in front of guests' },
  { id: 'buffet', name: 'Chafing Dishes & Warm Buffet Setup', price: 25000, desc: 'Stainless steel warmers and serving utensils' },
  { id: 'servers', name: 'Uniformed FoodTrain Waitstaff (2 Staff)', price: 20000, desc: 'Courteous table service for 4 hours' }
];

export default function CateringEstimator({ selectedBranch }) {
  const [guestCount, setGuestCount] = useState(40);
  const [selectedPackageId, setSelectedPackageId] = useState('gold');
  const [eventType, setEventType] = useState('Birthday / Social Gathering');
  const [selectedAddons, setSelectedAddons] = useState(['chef']);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [eventDate, setEventDate] = useState('');

  const selectedPkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[1];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const foodCost = guestCount * selectedPkg.pricePerGuest;
  const addonsCost = selectedAddons.reduce((acc, id) => {
    const item = ADDONS.find(a => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const grandTotal = foodCost + addonsCost;

  const handleBookViaWhatsApp = (e) => {
    e.preventDefault();

    const addonNames = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).join(', ') || 'None';
    const message = `🍢 *CATERING INQUIRY - FOODTRAIN EVENTS*%0A` +
      `--------------------------------%0A` +
      `👤 *Organizer:* ${contactName || 'Valued Client'}%0A` +
      `📞 *Phone:* ${contactPhone || 'Provided upon call'}%0A` +
      `🎉 *Event Type:* ${eventType}%0A` +
      `📅 *Date:* ${eventDate || 'To be confirmed'}%0A` +
      `👥 *Estimated Guests:* ${guestCount} people%0A` +
      `🍗 *Catering Tier:* ${selectedPkg.name} (₦${selectedPkg.pricePerGuest.toLocaleString()}/person)%0A` +
      `✨ *Add-ons:* ${addonNames}%0A` +
      `--------------------------------%0A` +
      `💰 *Estimated Budget:* ₦${grandTotal.toLocaleString()}%0A` +
      `📍 *Preferred Branch:* ${selectedBranch?.name || 'Lagos Branches'}%0A%0A` +
      `Hello FoodTrain Catering Concierge, please let me know availability and customized menu options for our event!`;

    const phoneNum = selectedBranch?.phone ? selectedBranch.phone.replace(/[^0-9]/g, '') : '2348123456789';
    window.open(`https://wa.me/${phoneNum}?text=${message}`, '_blank');
  };

  return (
    <section className="events-section" id="catering-events-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header-center" style={{ marginBottom: '40px' }}>
          <div className="badge-flame">
            <ChefHat size={14} /> CATERING & PRIVATE EVENTS
          </div>
          <h2 className="section-title">
            Feed Your Crowd with Sizzling Grill Feasts
          </h2>
          <p className="section-subtitle">
            Weddings, corporate summits, birthdays, and private parties. We bring the smoke, sizzle, and legendary Naija flavours directly to your venue.
          </p>
        </div>

        {/* Two-column interactive calculator */}
        <div className="events-container">
          {/* Left Column: Visual Estimator Controls */}
          <div className="catering-calculator-card">
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UtensilsCrossed size={18} color="var(--primary)" /> Interactive Event Estimator
            </h3>

            {/* Event Type Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Select Event Occasion:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                {['Corporate / Office', 'Wedding Reception', 'Birthday Party', 'Private Soiree'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: eventType === type ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: eventType === type ? 'var(--primary-light)' : '#ffffff',
                      color: eventType === type ? 'var(--primary)' : 'var(--text-main)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count Slider */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                  Number of Guests:
                </label>
                <span style={{ 
                  background: 'var(--primary)', 
                  color: '#ffffff', 
                  padding: '4px 14px', 
                  borderRadius: '9999px', 
                  fontSize: '14px', 
                  fontWeight: 800 
                }}>
                  {guestCount} Guests
                </span>
              </div>
              <input 
                type="range"
                min="10"
                max="300"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="calc-guest-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>10 Guests (Intimate)</span>
                <span>150 Guests</span>
                <span>300+ Guests (Festival)</span>
              </div>
            </div>

            {/* Package Cards Selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Select Food Menu Tier:
              </label>
              <div className="package-cards-grid">
                {PACKAGES.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`package-card-btn ${selectedPackageId === pkg.id ? 'selected' : ''}`}
                    style={{ cursor: 'pointer', position: 'relative' }}
                  >
                    {pkg.popular && (
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--accent-gold)',
                        color: 'var(--charcoal)',
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase'
                      }}>
                        Most Popular
                      </span>
                    )}
                    <div style={{ fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                      {pkg.name}
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: selectedPackageId === pkg.id ? 'var(--primary)' : 'var(--text-main)' }}>
                      ₦{pkg.pricePerGuest.toLocaleString()}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>per guest</span>
                  </div>
                ))}
              </div>

              {/* Selected Package Features List */}
              <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '14px', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                  What's included in {selectedPkg.name}:
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
                  {selectedPkg.features.map((feat, idx) => (
                    <li key={idx} style={{ fontSize: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Check size={14} color="#16a34a" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optional Catering Add-ons */}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                Event Upgrades & Experience Add-ons:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {ADDONS.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: isChecked ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                        background: isChecked ? '#fff8f7' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isChecked ? '2px solid var(--primary)' : '2px solid #cbd5e1',
                          background: isChecked ? 'var(--primary)' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff'
                        }}>
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>{addon.name}</span>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>{addon.desc}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>
                        +₦{addon.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Quote Summary & Quick Booking Form */}
          <div>
            <div style={{
              background: 'linear-gradient(145deg, #1f2937, #111827)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                  Estimated Package Budget
                </span>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '9999px' }}>
                  {guestCount} Pax
                </span>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                  ₦{grandTotal.toLocaleString()}
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Approx. ₦{Math.round(grandTotal / guestCount).toLocaleString()} per guest (includes VAT)
                </div>
              </div>

              {/* Price Breakdown list */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                  <span>{selectedPkg.name} ({guestCount} x ₦{selectedPkg.pricePerGuest.toLocaleString()})</span>
                  <span>₦{foodCost.toLocaleString()}</span>
                </div>
                {addonsCost > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                    <span>Selected Experience Add-ons</span>
                    <span>₦{addonsCost.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
                  <span>Setup & Delivery Coordination</span>
                  <span>INCLUDED</span>
                </div>
              </div>

              {/* Quick Contact Form */}
              <form onSubmit={handleBookViaWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <input 
                    type="text"
                    placeholder="Your Name or Company"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input 
                    type="tel"
                    placeholder="WhatsApp Phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <input 
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    background: '#25d366',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '15px',
                    fontSize: '14px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.2s'
                  }}
                >
                  <MessageSquare size={18} /> Request Event Date via WhatsApp
                </button>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '11px', color: '#94a3b8', justifyContent: 'center' }}>
                <ShieldCheck size={14} color="#4ade80" /> FoodTrain Catering Assurance: 100% On-Time Serving Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
