import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, MessageCircle, Plus, Minus } from "lucide-react";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  selectedBranch
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  if (!isOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 15000;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.calculatedPrice || item.price) * item.quantity, 0);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : (selectedBranch ? selectedBranch.deliveryFee : 1200);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeededForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const applyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const clean = promoCode.trim().toUpperCase();
    if (clean === "TRAIN10") {
      setDiscountPercent(10);
      setPromoSuccess("10% discount applied to your order!");
    } else if (clean === "SUYA20") {
      setDiscountPercent(20);
      setPromoSuccess("20% FoodTrain VIP discount applied!");
    } else {
      setPromoError("Invalid code. Try 'TRAIN10'");
    }
  };

  // WhatsApp Order Direct Generator
  const generateWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let text = `*NEW ORDER - FOODTRAIN NG* 🚂🔥\n`;
    text += `Branch: ${selectedBranch ? selectedBranch.name : "Ikeja (Allen)"}\n`;
    text += `--------------------------------\n`;

    cartItems.forEach((item, index) => {
      text += `*${index + 1}. ${item.name}* (x${item.quantity})\n`;
      text += `   • Spice: ${item.selectedSpice || "Standard"}\n`;
      if (item.selectedSide) text += `   • Side: ${item.selectedSide}\n`;
      if (item.selectedExtras && item.selectedExtras.length > 0) {
        text += `   • Extras: ${item.selectedExtras.map((e) => e.name).join(", ")}\n`;
      }
      if (item.specialNote) text += `   • Note: "${item.specialNote}"\n`;
      text += `   • Price: ₦${((item.calculatedPrice || item.price) * item.quantity).toLocaleString()}\n\n`;
    });

    text += `--------------------------------\n`;
    text += `Subtotal: ₦${subtotal.toLocaleString()}\n`;
    if (discountAmount > 0) text += `Discount: -₦${discountAmount.toLocaleString()}\n`;
    text += `Delivery Fee: ₦${deliveryFee.toLocaleString()}\n`;
    text += `*TOTAL PAYABLE: ₦${grandTotal.toLocaleString()}*\n\n`;
    text += `Please confirm my order and send payment account details!`;

    const phone = selectedBranch ? selectedBranch.phone.replace(/\s+/g, "") : "2348164940911";
    const waUrl = `https://wa.me/234${phone.startsWith("0") ? phone.slice(1) : phone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <aside className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--text-main)" }}>
              Your Sizzle Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {/* Free Delivery Meter */}
          <div className="free-delivery-meter">
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700 }}>
              {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                <span style={{ color: "var(--success)" }}>🎉 You unlocked FREE Delivery!</span>
              ) : (
                <span style={{ color: "#92400e" }}>
                  Add <strong>₦{amountNeededForFree.toLocaleString()}</strong> more for FREE delivery!
                </span>
              )}
              <span style={{ color: "#92400e" }}>{freeDeliveryProgress}%</span>
            </div>
            <div className="meter-track">
              <div
                className="meter-bar"
                style={{
                  width: `${freeDeliveryProgress}%`,
                  background: subtotal >= FREE_DELIVERY_THRESHOLD ? "var(--success)" : "var(--accent-gold)"
                }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 10px", margin: "auto" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "#f4f4f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}
              >
                <ShoppingBag size={30} color="#9ca3af" />
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "260px", margin: "0 auto 20px" }}>
                Explore our flame-grilled chicken, beef suya, and kitchen delicacies.
              </p>
              <button
                className="btn-primary-hero"
                style={{ padding: "10px 24px", fontSize: "13px", margin: "0 auto" }}
                onClick={onClose}
              >
                Browse Specials
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemUnit = item.calculatedPrice || item.price;
              return (
                <div key={item.cartItemId || item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h4 className="cart-item-title">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId || item.id)}
                        style={{ color: "#9ca3af", transition: "color 0.15s" }}
                        title="Remove Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="cart-item-spice">
                      🌶️ {item.selectedSpice || "Standard"}
                      {item.selectedSide && ` • ${item.selectedSide}`}
                    </div>

                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "4px" }}>
                        + {item.selectedExtras.map((e) => e.name).join(", ")}
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
                      <span className="cart-item-price">
                        ₦{(itemUnit * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity buttons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#ffffff", border: "1px solid var(--border-subtle)", borderRadius: "999px", padding: "2px 8px" }}>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          style={{ padding: "2px", color: "#4b5563" }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: "12px", fontWeight: 700, minWidth: "16px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          style={{ padding: "2px", color: "var(--primary)" }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Promo Code Input */}
          {cartItems.length > 0 && (
            <div style={{ marginTop: "10px", padding: "12px", background: "#ffffff", border: "1px solid var(--border-subtle)", borderRadius: "12px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Tag size={14} style={{ position: "absolute", left: "10px", top: "11px", color: "#9ca3af" }} />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. TRAIN10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px 8px 30px",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                      fontSize: "12px",
                      outline: "none"
                    }}
                  />
                </div>
                <button
                  onClick={applyPromo}
                  style={{
                    background: "#1a1a1a",
                    color: "#ffffff",
                    padding: "0 14px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700
                  }}
                >
                  Apply
                </button>
              </div>
              {promoSuccess && (
                <div style={{ fontSize: "11px", color: "var(--success)", fontWeight: 600, marginTop: "6px" }}>
                  {promoSuccess}
                </div>
              )}
              {promoError && (
                <div style={{ fontSize: "11px", color: "var(--primary)", fontWeight: 600, marginTop: "6px" }}>
                  {promoError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Subtotals & CTAs */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="cart-summary-line" style={{ color: "var(--success)" }}>
                <span>Discount ({discountPercent}%)</span>
                <span>-₦{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Delivery Fee ({selectedBranch ? selectedBranch.name.split(" ")[0] : "Lagos"})</span>
              <span>{deliveryFee === 0 ? "FREE" : `₦${deliveryFee.toLocaleString()}`}</span>
            </div>

            <div className="cart-summary-line total">
              <span>Total Payable</span>
              <span style={{ color: "var(--primary)" }}>₦{grandTotal.toLocaleString()}</span>
            </div>

            {/* Standard Checkout */}
            <button className="btn-checkout-primary" onClick={onProceedCheckout}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Direct WhatsApp Ordering */}
            <button className="btn-whatsapp-checkout" onClick={generateWhatsAppOrder}>
              <MessageCircle size={18} />
              <span>Order via WhatsApp (1-Click)</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
