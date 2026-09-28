import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Award } from 'lucide-react';
import { testimonials } from '../data/extrasData';

export default function TestimonialsMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-section" style={{ padding: '60px 0 20px', background: '#faf9f7', overflow: 'hidden' }}>
      <div className="site-container">
        {/* Header */}
        <div className="section-header-center" style={{ marginBottom: '32px' }}>
          <div className="badge-flame">
            <Award size={14} /> 4.9 ★ ON GOOGLE REVIEWS
          </div>
          <h2 className="section-title">
            Loved by 25,000+ Foodies Nationwide
          </h2>
          <p className="section-subtitle">
            Here's what our regulars in Lagos, Abuja, Ibadan, and Port Harcourt have to say about the FoodTrain experience.
          </p>
        </div>
      </div>

      {/* Marquee Scroller */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="testimonial-card">
              {/* Top: Stars and Quote icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#ffb800" color="#ffb800" />
                  ))}
                </div>
                <MessageSquareQuote size={20} color="var(--primary)" opacity={0.4} />
              </div>

              {/* Comment text */}
              <p style={{
                fontSize: '13.5px',
                color: 'var(--text-main)',
                lineHeight: '1.6',
                fontStyle: 'italic',
                margin: 0,
                flexGrow: 1
              }}>
                "{item.comment}"
              </p>

              {/* Tag for dish ordered */}
              <div style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '9999px',
                width: 'fit-content'
              }}>
                Ordered: {item.dish}
              </div>

              {/* Customer Author profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.name}
                    <CheckCircle2 size={13} color="#16a34a" />
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
