import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { branches } from '../data/branchesData';

export default function Footer({ onNavigateTab, onSelectBranch }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="site-footer">
      {/* Top Liquid Wave Border */}
      <div className="footer-top-wave">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,56 1440,64 L1440,64 L0,64 Z" />
        </svg>
      </div>

      <div className="site-container">
        {/* Main Grid */}
        <div className="footer-grid">
          {/* Brand & Mission Column */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="/foodtrain-logo-white.svg" 
                alt="FoodTrain" 
                style={{ height: '42px', width: 'auto' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>
                FOODTRAIN
              </span>
            </div>
            
            <p>
              Nigeria's foremost flame-grilled street food institution. Marinated in authentic yaji spice, charred over natural embers, and dispatched piping hot to your doorstep.
            </p>

            {/* Newsletter Subscription */}
            <div style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-gold)', display: 'block', marginBottom: '8px' }}>
                Join the VIP FoodTrain Club
              </span>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 10px' }}>
                Get 10% off your first online feast with code <strong>TRAIN10</strong>
              </p>
              
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '13px', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Welcome to the FoodTrain family! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address" 
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #404040',
                      background: '#262626',
                      color: '#ffffff',
                      fontSize: '13px',
                      flexGrow: 1,
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ padding: '10px 16px', borderRadius: '8px', fontSize: '13px' }}
                  >
                    Join <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-col-title">Quick Explore</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#menu-section" onClick={(e) => { e.preventDefault(); onNavigateTab('menu'); }}>
                  Full Interactive Menu
                </a>
              </li>
              <li>
                <a href="#track-order-section" onClick={(e) => { e.preventDefault(); onNavigateTab('tracking'); }}>
                  Live Order Tracker (GPS)
                </a>
              </li>
              <li>
                <a href="#catering-events-section" onClick={(e) => { e.preventDefault(); onNavigateTab('catering'); }}>
                  Event Catering Estimator
                </a>
              </li>
              <li>
                <a href="#gift-card-section" onClick={(e) => { e.preventDefault(); onNavigateTab('gifts'); }}>
                  Digital Gift Cards Studio
                </a>
              </li>
              <li>
                <a href="#faq-section" onClick={(e) => { e.preventDefault(); onNavigateTab('home'); }}>
                  FAQs & Spice Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Branch Directory Column */}
          <div>
            <h4 className="footer-col-title">Our Branches</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {branches.slice(0, 4).map(b => (
                <div 
                  key={b.id} 
                  className="branch-footer-item"
                  onClick={() => onSelectBranch && onSelectBranch(b)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="branch-footer-name">
                    📍 {b.name} ({b.city})
                  </span>
                  <span className="branch-footer-addr">
                    {b.address} • {b.phone}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Opening Hours & Contacts */}
          <div>
            <h4 className="footer-col-title">Kitchen Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--charcoal-muted)' }}>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>Monday – Thursday:</strong>
                10:00 AM – 11:00 PM
              </div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block' }}>Friday – Sunday:</strong>
                10:00 AM – 12:30 AM (Midnight Grills)
              </div>
              <div style={{ marginTop: '8px' }}>
                <strong style={{ color: 'var(--accent-gold)', display: 'block' }}>Headquarters & Hotline:</strong>
                <span>hello@foodtrain.ng</span><br />
                <span>+234 812 345 6789</span>
              </div>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Instagram"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  title="X (Twitter)"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  title="Facebook"
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} FoodTrain Hospitality Ltd. Modeled after Downtown Grill & built for supreme Nigerian flavor excellence.
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '12px' }}>
              <ShieldCheck size={16} /> Paystack & Flutterwave Secured
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['VERVE', 'MASTERCARD', 'VISA', 'MONIEPOINT'].map(badge => (
                <span 
                  key={badge}
                  style={{
                    background: '#262626',
                    border: '1px solid #404040',
                    color: '#e5e5e5',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
