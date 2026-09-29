import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import BranchModal from "./components/BranchModal";
import HeroSection from "./components/HeroSection";
import FeaturedItemsRow from "./components/FeaturedItemsRow";
import BrowseCategoriesGrid from "./components/BrowseCategoriesGrid";
import SignatureFavourites from "./components/SignatureFavourites";
import CategoryPills from "./components/CategoryPills";
import MenuGrid from "./components/MenuGrid";
import ItemCustomizerModal from "./components/ItemCustomizerModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ScheduleOrderModal from "./components/ScheduleOrderModal";
import OrderTracker from "./components/OrderTracker";
import CateringEstimator from "./components/CateringEstimator";
import GiftCardStudio from "./components/GiftCardStudio";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

import { menuItems } from "./data/menuData";
import { branches } from "./data/branchesData";
import { Flame, Clock, ShieldCheck, Heart, Sparkles, Award, ArrowRight, UtensilsCrossed } from "lucide-react";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeTab, setActiveTab] = useState("home"); // "home" | "menu" | "catering" | "gifts" | "tracking" | "about"
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  
  // Cart state preloaded with delicious demo feast
  const [cartItems, setCartItems] = useState([
    {
      id: "conductors-mega-feast",
      cartItemId: "cart-initial-1",
      name: "The Conductor's Mega Platter",
      price: 13500,
      calculatedPrice: 13500,
      quantity: 1,
      selectedSpice: "Mixed / Balanced",
      selectedSide: "Includes All Standard Sides",
      selectedExtras: [],
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=900&auto=format&fit=crop"
    },
    {
      id: "smoky-party-jollof",
      cartItemId: "cart-initial-2",
      name: "Smoky Firewood Party Jollof",
      price: 2800,
      calculatedPrice: 2800,
      quantity: 1,
      selectedSpice: "Standard Naija Flavour",
      selectedSide: "Grilled Quarter Chicken",
      selectedExtras: [],
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=900&auto=format&fit=crop"
    }
  ]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledOrder, setScheduledOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [promoDiscount, setPromoDiscount] = useState(10); // Code TRAIN10 default
  const [promoCode, setPromoCode] = useState("TRAIN10");
  const [trackedOrderId, setTrackedOrderId] = useState("FT-7291");
  const [toastMessage, setToastMessage] = useState("");

  // Automatically pop up Schedule Order modal when visiting (matching reference site)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScheduleModalOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Quick Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Schedule confirmation handler
  const handleConfirmSchedule = (scheduleData) => {
    setScheduledOrder(scheduleData);
    showToast(
      `Order scheduled! ${scheduleData.type === "delivery" ? "Delivery" : "Pickup"} for ${scheduleData.dayLabel}, ${scheduleData.time} 🔥`
    );
  };

  // Add customized item to cart
  const handleAddToCart = (customizedItem) => {
    setCartItems(prev => {
      // Check if identical item already exists (same id, spice, side)
      const existingIdx = prev.findIndex(i => 
        i.id === customizedItem.id && 
        i.selectedSpice === customizedItem.selectedSpice &&
        i.selectedSide === customizedItem.selectedSide
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += customizedItem.quantity;
        return updated;
      } else {
        return [...prev, customizedItem];
      }
    });

    setCustomizingItem(null);
    showToast(`Added ${customizedItem.quantity}x ${customizedItem.name} to cart! 🍗🔥`);
  };

  // Quick Add from Grid without customization modal
  const handleQuickAdd = (item) => {
    const quickItem = {
      ...item,
      cartItemId: `${item.id}-${Date.now()}`,
      selectedSpice: item.defaultSpice || "Medium Spicy 🌶️",
      selectedSide: item.availableSides && item.availableSides.length > 0 ? item.availableSides[0] : "",
      selectedExtras: [],
      quantity: 1,
      calculatedPrice: item.price
    };
    handleAddToCart(quickItem);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast("Item removed from cart");
  };

  // Order Completed callback from CheckoutModal
  const handleOrderCompleted = (orderRecord) => {
    setTrackedOrderId(orderRecord.orderId);
    setCartItems([]); // Empty cart on successful order
    showToast(`Order #${orderRecord.orderId} Confirmed! The grill is burning!`);
  };

  // Jump to tracker with specific order ID
  const handleOpenTracker = (orderId) => {
    if (orderId) setTrackedOrderId(orderId);
    setActiveTab("tracking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="foodtrain-app-wrapper">
      {/* 1. Cultural Naija Preloader */}
      {showPreloader && (
        <Preloader
          onComplete={() => {
            setShowPreloader(false);
            setTimeout(() => setIsScheduleModalOpen(true), 400);
          }}
        />
      )}

      {/* 2. Top Promotional Announcement Banner */}
      <AnnouncementBar 
        branchName={selectedBranch.name} 
        onSelectBranch={() => setIsBranchModalOpen(true)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
      />

      {/* 3. Sticky Master Navigation Bar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        scheduledOrder={scheduledOrder}
      />

      {/* Main Content Area switched by activeTab */}
      <main className="main-content-flow">
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <>
            {/* 1. Compact Multi-Slide Hero Carousel */}
            <HeroSection 
              onOrderNow={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onViewMenu={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 2. Featured Items Strip (Downtown Grill signature circular plates) */}
            <FeaturedItemsRow 
              items={menuItems}
              onCustomizeItem={(item) => setCustomizingItem(item)}
              onQuickAdd={handleQuickAdd}
            />

            {/* 3. Browse Categories (5 Clean Minimalist Category Cards) */}
            <BrowseCategoriesGrid 
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* 4. Signature Favourites (Only 4 Curated Bestsellers + Full Menu CTA) */}
            <SignatureFavourites 
              items={menuItems}
              onCustomizeItem={(item) => setCustomizingItem(item)}
              onExploreFullMenu={() => {
                setSelectedCategory("all");
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Featured Section: Catering Callout */}
            <section style={{ padding: "40px 0", background: "#faf9f7" }}>
              <div className="site-container">
                <div className="vip-catering-banner">
                  <div style={{ maxWidth: "600px", position: "relative", zIndex: 2 }}>
                    <div className="badge-flame" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff", marginBottom: "14px" }}>
                      <Sparkles size={14} /> VIP CATERING & LIVE GRILL PIT
                    </div>
                    <h3 className="vip-catering-title">
                      Planning an Event? Let FoodTrain Smoke It Out!
                    </h3>
                    <p className="vip-catering-subtext">
                      We bring live charcoal pits, certified grillmasters, and legendary platters to your wedding, birthday, or corporate summit. Instant quotes via our live estimator.
                    </p>
                    <div className="vip-catering-btn-row">
                      <button 
                        onClick={() => {
                          setActiveTab("catering");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="btn-vip-calculate"
                      >
                        Calculate Event Budget <ArrowRight size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setActiveTab("tracking");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="btn-vip-track"
                      >
                        Track An Existing Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Infinite Marquee */}
            <TestimonialsMarquee />

            {/* FAQs Accordion */}
            <FAQSection selectedBranch={selectedBranch} />
          </>
        )}

        {/* TAB 2: MENU ONLY */}
        {activeTab === "menu" && (
          <div style={{ paddingTop: "30px", minHeight: "80vh" }}>
            <div className="site-container">
              <div className="section-header-center" style={{ marginBottom: "24px" }}>
                <div className="badge-flame">
                  <UtensilsCrossed size={14} /> FULL ONLINE MENU
                </div>
                <h1 className="section-title">
                  Explore The Entire FoodTrain Pantry
                </h1>
                <p className="section-subtitle">
                  Every cut slow-smoked to perfection. Customize spice levels, sides, and extras to your taste.
                </p>
              </div>

              <CategoryPills 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            <MenuGrid 
              items={menuItems}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              selectedBranch={selectedBranch}
              onCustomizeItem={(item) => setCustomizingItem(item)}
              onQuickAdd={handleQuickAdd}
            />
          </div>
        )}

        {/* TAB 3: CATERING & EVENTS */}
        {activeTab === "catering" && (
          <div style={{ paddingTop: "20px", minHeight: "80vh" }}>
            <CateringEstimator selectedBranch={selectedBranch} />
          </div>
        )}

        {/* TAB 4: GIFT CARDS STUDIO */}
        {activeTab === "gifts" && (
          <div style={{ paddingTop: "20px", minHeight: "80vh" }}>
            <GiftCardStudio selectedBranch={selectedBranch} />
          </div>
        )}

        {/* TAB 5: LIVE ORDER TRACKER */}
        {activeTab === "tracking" && (
          <div style={{ paddingTop: "20px", minHeight: "80vh" }}>
            <OrderTracker 
              initialOrderId={trackedOrderId}
              onBackToMenu={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}

        {/* TAB 6: ABOUT US */}
        {activeTab === "about" && (
          <div style={{ padding: "50px 0 80px", background: "#ffffff", minHeight: "80vh" }}>
            <div className="site-container" style={{ maxWidth: "860px" }}>
              <div className="section-header-center" style={{ marginBottom: "36px" }}>
                <div className="badge-flame">
                  <Flame size={14} /> OUR STORY & HERITAGE
                </div>
                <h1 className="section-title">
                  Born from Charcoal Embers & Pure Nigerian Passion
                </h1>
                <p className="section-subtitle">
                  We took the legendary flavours of roadside Nigerian suya and flame-grills, elevated them with gourmet hygiene standards, and created an express delivery network across 4 states.
                </p>
              </div>

              <div style={{
                borderRadius: "24px",
                overflow: "hidden",
                marginBottom: "36px",
                boxShadow: "var(--shadow-lg)"
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop" 
                  alt="FoodTrain Grill Station" 
                  style={{ width: "100%", height: "360px", objectFit: "cover" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
                <div style={{ background: "#fafaf8", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
                  <Award size={32} color="var(--primary)" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 6px" }}>Real Charcoal Sizzle</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
                    No artificial smoke flavorings. We fire real fruitwood and coconut shell charcoal for that distinct authentic aroma.
                  </p>
                </div>

                <div style={{ background: "#fafaf8", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
                  <Clock size={32} color="var(--accent-gold)" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 6px" }}>25-Min Express Grid</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
                    Equipped with thermal-sealed delivery bags that keep chicken crisp and suya tender from grill to dining table.
                  </p>
                </div>

                <div style={{ background: "#fafaf8", padding: "24px", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
                  <ShieldCheck size={32} color="#16a34a" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 6px" }}>7 Modern Outposts</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: "1.5" }}>
                    Operating state-of-the-art cloud kitchens and walk-in grill lounges across Ikeja, Lekki, Yaba, Abuja, Ibadan & PH.
                  </p>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button 
                  onClick={() => {
                    setActiveTab("menu");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn-primary"
                  style={{ padding: "16px 36px", fontSize: "16px" }}
                >
                  Taste The Legacy • View Menu <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Rich Footer with Branch Directory */}
      <Footer 
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onSelectBranch={(branch) => {
          setSelectedBranch(branch);
          showToast(`Switched branch to ${branch.name}`);
        }}
      />

      {/* 5. Mobile Fixed Bottom Navigation Dock */}
      <MobileBottomNav 
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 6. Floating WhatsApp Concierge Button */}
      <FloatingWhatsApp selectedBranch={selectedBranch} />

      {/* =====================================================================
          MODALS & OVERLAYS
          ===================================================================== */}
      {/* Branch Switcher Modal */}
      <BranchModal 
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        selectedBranch={selectedBranch}
        onSelectBranch={(branch) => {
          setSelectedBranch(branch);
          setIsBranchModalOpen(false);
          showToast(`Now ordering from ${branch.name}!`);
        }}
      />

      {/* Item Customizer Modal (Spice levels, sides, extras) */}
      <ItemCustomizerModal 
        item={customizingItem}
        isOpen={!!customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        selectedBranch={selectedBranch}
      />

      {/* Full Checkout Modal with simulated payment & WhatsApp 1-Click */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        selectedBranch={selectedBranch}
        discount={promoDiscount}
        promoCode={promoCode}
        onOrderCompleted={handleOrderCompleted}
        onOpenTracker={handleOpenTracker}
      />

      {/* Schedule Order Modal (Replicating reference popup) */}
      <ScheduleOrderModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onConfirm={handleConfirmSchedule}
        branches={branches}
        selectedBranch={selectedBranch}
      />

      {/* Floating Interactive Toast Feedback */}
      {toastMessage && (
        <div style={{
          position: "fixed",
          bottom: "90px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--charcoal)",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "9999px",
          fontSize: "14px",
          fontWeight: 700,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          animation: "fadeInUp 0.25s ease-out"
        }}>
          <Sparkles size={16} color="var(--accent-gold)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
