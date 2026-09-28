import React, { useState, useEffect } from "react";
import { Flame, ArrowRight, Clock, Star, ShoppingBag, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop",
    pill: "Sizzling Hot Embers Daily",
    title: "Grill favourites, delivered",
    subtitle: "Authentic Nigerian flame-grilled chicken, tender beef suya and spicy asun dispatched hot to your door in 25 minutes.",
    cta: "Order Now"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    pill: "Authentic Kano Yaji Spice",
    title: "Tender Suya & Sizzling Platters",
    subtitle: "Thinly sliced prime beef charred over red-hot coals, served with freshly sliced onions and spicy pepper dip.",
    cta: "Taste Suya"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1600&auto=format&fit=crop",
    pill: "Express Thermal Dispatch",
    title: "Fresh Off The Coals To You",
    subtitle: "Thermal-sealed bags preserve that unmistakable charcoal aroma and smokey heat from our kitchen to your table.",
    cta: "Explore Feasts"
  }
];

export default function HeroSection({ onOrderNow, onViewMenu }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="hero-wrapper">
      <div className="site-container">
        {/* Compact, Multi-Slide Hero Card */}
        <div className="hero-compact-card">
          {/* Background Images with Crossfade */}
          {HERO_SLIDES.map((s, idx) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.title}
              className={`hero-slide-img ${idx === currentSlide ? "active" : ""}`}
            />
          ))}

          {/* Gradient Darkness Overlay */}
          <div className="hero-gradient-overlay" />

          {/* Slide Navigation Arrows */}
          <button 
            type="button"
            onClick={prevSlide}
            className="hero-arrow-btn left"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            type="button"
            onClick={nextSlide}
            className="hero-arrow-btn right"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Hero Content with Compact Typography */}
          <div className="hero-content-compact">
            <div className="hero-pill-badge">
              <Flame size={13} color="var(--accent-gold)" />
              <span>{slide.pill}</span>
            </div>

            <h1 className="hero-heading-compact">
              {slide.title}
            </h1>

            <p className="hero-subtext-compact">
              {slide.subtitle}
            </p>

            <div className="hero-cta-row">
              <button 
                type="button"
                className="btn-primary-compact" 
                onClick={onOrderNow}
              >
                <span>{slide.cta}</span>
                <ArrowRight size={15} />
              </button>
              <button 
                type="button"
                className="btn-ghost-compact" 
                onClick={onViewMenu}
              >
                View Menu
              </button>
            </div>
          </div>

          {/* Slide Indicators Dots */}
          <div className="hero-dots-wrap">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`hero-dot ${idx === currentSlide ? "active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Clean, Refined Single-Line Trust Strip */}
        <div className="trust-strip-refined">
          <div className="trust-item">
            <Clock size={16} color="var(--primary)" />
            <span>25-Min Delivery</span>
          </div>
          <span className="trust-sep">•</span>
          <div className="trust-item">
            <Star size={16} fill="#d97706" color="#d97706" />
            <span style={{ color: "var(--charcoal)", fontWeight: 700 }}>4.8 Star Rating</span>
          </div>
          <span className="trust-sep">•</span>
          <div className="trust-item">
            <ShoppingBag size={16} color="var(--primary)" />
            <span>50k+ Orders Served</span>
          </div>
          <span className="trust-sep">•</span>
          <div className="trust-item">
            <ShieldCheck size={16} color="#16a34a" />
            <span style={{ color: "#16a34a", fontWeight: 700 }}>100% Charcoal Grilled</span>
          </div>
        </div>
      </div>

      {/* Subtle Animated Liquid Wave Transition */}
      <div className="liquid-wave-divider">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="#ffffff">
          <path d="M0,20 C320,50 640,0 960,35 C1120,48 1280,52 1440,25 L1440,60 L0,60 Z"></path>
        </svg>
      </div>
    </div>
  );
}
