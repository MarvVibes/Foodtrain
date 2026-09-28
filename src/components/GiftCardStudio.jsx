import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  CreditCard, 
  Check, 
  Copy, 
  Send, 
  Heart,
  Share2,
  Flame
} from 'lucide-react';

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000];

export default function GiftCardStudio({ selectedBranch }) {
  const [theme, setTheme] = useState('emerald'); // 'emerald' | 'gold' | 'charcoal'
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('Chidinma Eze');
  const [senderName, setSenderName] = useState('David');
  const [personalNote, setPersonalNote] = useState('Treat yourself to the best BBQ in town! 🔥');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [generatedCard, setGeneratedCard] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleCreateCard = (e) => {
    e.preventDefault();
    if (activeAmount < 2000) {
      alert('Minimum gift card amount is ₦2,000.');
      return;
    }

    const voucherCode = `FT-VOUCHER-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedCard({
      code: voucherCode,
      amount: activeAmount,
      recipient: recipientName,
      sender: senderName,
      note: personalNote,
      theme,
      validUntil: 'Valid for 12 months at all FoodTrain branches'
    });
  };

  const handleCopyCode = () => {
    if (!generatedCard) return;
    navigator.clipboard.writeText(generatedCard.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section className="gift-section" id="gift-card-section">
      <div className="site-container">
        {/* Section Header */}
        <div className="section-header-center" style={{ marginBottom: '40px' }}>
          <div className="badge-flame" style={{ background: 'rgba(255,184,0,0.15)', color: 'var(--accent-gold)' }}>
            <Gift size={14} /> DIGITAL FOODTRAIN GIFT CARDS
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            Gift the Irresistible Sizzle
          </h2>
          <p className="section-subtitle" style={{ color: '#94a3b8' }}>
            Instant digital vouchers redeemable online or at any FoodTrain branch nationwide.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Left: Realistic Live Card Preview */}
          <div>
            <div className={`gift-card-preview ${theme}`}>
              {/* Card Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Flame size={18} color="#ffffff" />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '1px', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                      FOODTRAIN
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Digital Feast Voucher
                  </span>
                </div>

                <div style={{
                  width: '38px',
                  height: '28px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, #e5e7eb, #9ca3af)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }}></div>
              </div>

              {/* Card Center: Amount Display */}
              <div style={{ margin: '20px 0' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                  Card Value
                </span>
                <div style={{ fontSize: '34px', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>
                  ₦{activeAmount.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginTop: '4px' }}>
                  "{personalNote || 'Enjoy your meal!'}"
                </div>
              </div>

              {/* Card Bottom Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block' }}>
                    Recipient
                  </span>
                  <strong style={{ fontSize: '14px', color: '#ffffff' }}>
                    {recipientName || 'Lucky Foodie'}
                  </strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block' }}>
                    From
                  </span>
                  <strong style={{ fontSize: '14px', color: '#ffffff' }}>
                    {senderName || 'A Caring Friend'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Generated Voucher Notification */}
            {generatedCard && (
              <div style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '16px',
                padding: '18px',
                marginTop: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} /> Voucher Activated!
                  </span>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Copy size={12} /> {copiedCode ? 'Copied' : 'Copy Voucher'}
                  </button>
                </div>
                <div style={{
                  background: '#000000',
                  padding: '10px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  letterSpacing: '2px',
                  textAlign: 'center',
                  color: 'var(--accent-gold)',
                  fontWeight: 800
                }}>
                  {generatedCard.code}
                </div>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '8px 0 0', textAlign: 'center' }}>
                  Apply this code in the Cart promo box for instant ₦{generatedCard.amount.toLocaleString()} discount!
                </p>
              </div>
            )}
          </div>

          {/* Right: Customization Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '28px',
            backdropFilter: 'blur(12px)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              Design Your Gift Card
            </h3>

            <form onSubmit={handleCreateCard} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Card Color Theme Picker */}
              <div>
                <label style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Choose Card Theme:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[
                    { id: 'emerald', label: 'Emerald Green', bg: '#0D7A42' },
                    { id: 'gold', label: 'Crown Gold', bg: '#d97706' },
                    { id: 'charcoal', label: 'Dark Carbon', bg: '#374151' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        background: t.bg,
                        color: '#ffffff',
                        border: theme === t.id ? '2px solid #ffffff' : '1px solid transparent',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  Select Gift Value:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                  {PRESET_AMOUNTS.map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      style={{
                        padding: '10px 4px',
                        borderRadius: '8px',
                        background: (!customAmount && selectedAmount === amt) ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
                        color: '#ffffff',
                        border: (!customAmount && selectedAmount === amt) ? '1.5px solid #ffffff' : '1px solid rgba(255,255,255,0.1)',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <input 
                  type="number"
                  placeholder="Or enter custom amount in ₦ (min ₦2,000)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Names and Note */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Recipient Name</label>
                  <input 
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Your Name</label>
                  <input 
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Personal Message on Card</label>
                <input 
                  type="text"
                  value={personalNote}
                  maxLength={60}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="e.g. Happy Birthday Chinedu! Feast well."
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  marginTop: '8px'
                }}
              >
                Generate & Activate Card (₦{activeAmount.toLocaleString()})
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
