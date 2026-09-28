import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, PhoneCall } from 'lucide-react';
import { faqs } from '../data/extrasData';

export default function FAQSection({ selectedBranch }) {
  const [openFaqId, setOpenFaqId] = useState('faq-1');

  const toggleFaq = (id) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  const phoneNum = selectedBranch?.phone ? selectedBranch.phone.replace(/[^0-9]/g, '') : '2348123456789';

  return (
    <section className="faq-section" style={{ padding: '60px 0 70px', background: '#ffffff' }} id="faq-section">
      <div className="site-container" style={{ maxWidth: '860px' }}>
        {/* Header */}
        <div className="section-header-center" style={{ marginBottom: '36px' }}>
          <div className="badge-flame">
            <HelpCircle size={14} /> GOT QUESTIONS?
          </div>
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know about our grills, nationwide delivery, spice levels, and catering services.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
          {faqs.map(faq => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                style={{
                  border: isOpen ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  background: isOpen ? '#fffafa' : '#ffffff',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: isOpen ? 'var(--primary)' : 'var(--text-main)',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  <span>{faq.question}</span>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--primary-light)' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? 'var(--primary)' : '#64748b',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 24px 22px',
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    borderTop: '1px dashed rgba(171, 2, 0, 0.15)',
                    paddingTop: '16px'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div 
          className="faq-help-banner"
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            border: '1px solid #86efac',
            borderRadius: '20px',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#14532d', margin: '0 0 4px' }}>
              Still have questions or special dietary requests?
            </h4>
            <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
              Our guest support team at {selectedBranch?.name || 'FoodTrain'} is online right now on WhatsApp.
            </p>
          </div>

          <a 
            href={`https://wa.me/${phoneNum}?text=Hello%20FoodTrain,%20I%20have%20an%20inquiry%20about%20my%20order`}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25d366',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
            }}
          >
            <MessageSquare size={16} /> Chat With Branch Manager
          </a>
        </div>
      </div>
    </section>
  );
}
