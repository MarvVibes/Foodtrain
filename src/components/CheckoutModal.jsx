import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  CreditCard, 
  Building2, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  selectedBranch, 
  discount = 0, 
  promoCode = '',
  onOrderCompleted,
  onOpenTracker
}) {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    specialInstructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('transfer'); // 'transfer' | 'card' | 'whatsapp'
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Calculations
  const getItemPrice = (item) => item.calculatedPrice || item.unitPrice || item.price || 0;
  const subtotal = cartItems.reduce((acc, item) => acc + (getItemPrice(item) * item.quantity), 0);
  const deliveryFee = deliveryType === 'pickup' ? 0 : (subtotal >= 25000 ? 0 : (selectedBranch?.deliveryFee || 1500));
  const discountAmount = discount > 0 ? Math.round(subtotal * (discount / 100)) : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1029384756');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number to complete your order.');
      return;
    }

    if (deliveryType === 'delivery' && !formData.address.trim()) {
      alert('Please enter your delivery address so our rider can find you.');
      return;
    }

    setIsProcessing(true);

    // If WhatsApp method, prepare message and open WhatsApp
    if (paymentMethod === 'whatsapp') {
      const itemsText = cartItems.map(item => 
        `• ${item.quantity}x ${item.name} (${item.selectedSpice || item.spiceLevel || 'Spicy'}) - ₦${(getItemPrice(item) * item.quantity).toLocaleString()}`
      ).join('%0A');

      const message = `🔥 *NEW ORDER - FOODTRAIN (${selectedBranch?.name || 'Lagos'})*%0A` +
        `--------------------------------%0A` +
        `👤 *Customer:* ${formData.fullName}%0A` +
        `📞 *Phone:* ${formData.phone}%0A` +
        `🚚 *Type:* ${deliveryType === 'delivery' ? 'Home/Office Delivery' : 'Pickup at Branch'}%0A` +
        (deliveryType === 'delivery' ? `📍 *Address:* ${formData.address}%0A📍 *Landmark:* ${formData.landmark || 'None'}%0A` : '') +
        `--------------------------------%0A` +
        `🛒 *ITEMS:*%0A${itemsText}%0A` +
        `--------------------------------%0A` +
        `💵 *Subtotal:* ₦${subtotal.toLocaleString()}%0A` +
        `🛵 *Delivery:* ${deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}%0A` +
        (discountAmount > 0 ? `🏷️ *Discount (${promoCode}):* -₦${discountAmount.toLocaleString()}%0A` : '') +
        `💰 *TOTAL:* ₦${grandTotal.toLocaleString()}%0A` +
        `💳 *Payment:* Cash on Delivery / WhatsApp Confirmation%0A` +
        (formData.specialInstructions ? `📝 *Note:* ${formData.specialInstructions}` : '');

      const phoneNum = selectedBranch?.phone ? selectedBranch.phone.replace(/[^0-9]/g, '') : '2348123456789';
      window.open(`https://wa.me/${phoneNum}?text=${message}`, '_blank');
    }

    // Simulate order placement
    setTimeout(() => {
      const newOrderId = `FT-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderRecord = {
        orderId: newOrderId,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customer: formData,
        deliveryType,
        branch: selectedBranch,
        items: [...cartItems],
        subtotal,
        deliveryFee,
        discountAmount,
        grandTotal,
        paymentMethod,
        status: 'Order Confirmed',
        estimatedMins: '30-45 mins'
      };

      setCompletedOrder(orderRecord);
      setIsProcessing(false);
      if (onOrderCompleted) {
        onOrderCompleted(orderRecord);
      }
    }, 1200);
  };

  return (
    <div className="cart-drawer-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div 
        className="modal-content-card"
        style={{ 
          maxWidth: '680px', 
          width: '100%', 
          maxHeight: '92vh', 
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          padding: '0'
        }}
      >
        {/* If Order is Completed -> Success View */}
        {completedOrder ? (
          <div style={{ padding: '36px 30px', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#ecfdf5',
              color: '#16a34a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 25px rgba(22, 163, 74, 0.2)'
            }}>
              <CheckCircle2 size={46} />
            </div>

            <div className="badge-flame" style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <Sparkles size={14} /> ORDER CONFIRMED
            </div>
            
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--charcoal)', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              Grill Fire is Lit! 🔥
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '440px', margin: '0 auto 24px' }}>
              Thank you, <strong>{completedOrder.customer.fullName}</strong>. Your order is in the kitchen and will arrive sizzling hot.
            </p>

            {/* Order Highlight Box */}
            <div style={{
              background: '#fafaf8',
              border: '1.5px dashed var(--border-subtle)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #ebe9e1', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Order Reference</span>
                  <strong style={{ fontSize: '18px', color: 'var(--primary)', letterSpacing: '1px' }}>#{completedOrder.orderId}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Est. Delivery Time</span>
                  <strong style={{ fontSize: '15px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} /> {completedOrder.estimatedMins}
                  </strong>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '6px' }}>
                <strong>Branch:</strong> {completedOrder.branch?.name} ({completedOrder.branch?.city})
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '6px' }}>
                <strong>Fulfillment:</strong> {completedOrder.deliveryType === 'delivery' ? `Delivery to ${completedOrder.customer.address}` : `Pickup at Branch (${completedOrder.branch?.address})`}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                <strong>Total Paid:</strong> ₦{completedOrder.grandTotal.toLocaleString()} ({completedOrder.paymentMethod.toUpperCase()})
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <button 
                onClick={() => {
                  onClose();
                  if (onOpenTracker) onOpenTracker(completedOrder.orderId);
                }}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '16px' }}
              >
                Track Live Order Progress <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                Return to Menu
              </button>
            </div>
          </div>
        ) : (
          /* Normal Checkout Form View */
          <div>
            {/* Header */}
            <div style={{ 
              padding: '20px 24px', 
              borderBottom: '1px solid var(--border-subtle)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              background: '#ffffff',
              zIndex: 10
            }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--charcoal)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Complete Your Order
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Ordering from <strong>{selectedBranch?.name || 'Ikeja Branch'}</strong>
                </span>
              </div>
              <button 
                onClick={onClose}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} style={{ padding: '24px' }}>
              {/* Delivery or Pickup Toggle */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Fulfillment Method
                </label>
                <div className="checkout-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: deliveryType === 'delivery' ? '2px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                      background: deliveryType === 'delivery' ? 'var(--primary-light)' : '#ffffff',
                      color: deliveryType === 'delivery' ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <MapPin size={16} /> Doorstep Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: deliveryType === 'pickup' ? '2px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                      background: deliveryType === 'pickup' ? 'var(--primary-light)' : '#ffffff',
                      color: deliveryType === 'pickup' ? 'var(--primary)' : 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Building2 size={16} /> Pickup at Branch (Free)
                  </button>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div style={{ marginBottom: '22px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  1. Contact Information
                </h4>
                <div className="checkout-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Tunde Balogun"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Phone Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="0802 345 6789"
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 36px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details (Only if Delivery chosen) */}
              {deliveryType === 'delivery' ? (
                <div style={{ marginBottom: '22px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    2. Delivery Location
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Street Address & House/Flat No. *
                      </label>
                      <input 
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 14 Admiralty Way, Flat 3B"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Nearest Landmark / Security Gate Info
                      </label>
                      <input 
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        placeholder="e.g. Opposite Dominos Pizza, inform security guard"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1.5px solid var(--border-subtle)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: '22px', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px' }}>
                    Pickup Location:
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    {selectedBranch?.name} - {selectedBranch?.address}
                  </p>
                  <p style={{ fontSize: '12px', color: '#16a34a', margin: '4px 0 0', fontWeight: 600 }}>
                    ✓ Ready in approximately 20-25 mins after order placement.
                  </p>
                </div>
              )}

              {/* Payment Methods */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {deliveryType === 'delivery' ? '3.' : '2.'} Payment Option
                </h4>
                <div className="checkout-payment-methods-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: paymentMethod === 'transfer' ? '2px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                      background: paymentMethod === 'transfer' ? 'var(--primary-light)' : '#ffffff',
                      color: paymentMethod === 'transfer' ? 'var(--primary)' : 'var(--text-main)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <Building2 size={18} style={{ display: 'block', margin: '0 auto 6px' }} />
                    Bank Transfer
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1.5px solid var(--border-subtle)',
                      background: paymentMethod === 'card' ? 'var(--primary-light)' : '#ffffff',
                      color: paymentMethod === 'card' ? 'var(--primary)' : 'var(--text-main)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <CreditCard size={18} style={{ display: 'block', margin: '0 auto 6px' }} />
                    Debit Card / USSD
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: paymentMethod === 'whatsapp' ? '2px solid #25d366' : '1.5px solid var(--border-subtle)',
                      background: paymentMethod === 'whatsapp' ? '#f0fdf4' : '#ffffff',
                      color: paymentMethod === 'whatsapp' ? '#16a34a' : 'var(--text-main)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <MessageSquare size={18} style={{ display: 'block', margin: '0 auto 6px' }} />
                    WhatsApp Order
                  </button>
                </div>

                {/* Sub-view for Bank Transfer */}
                {paymentMethod === 'transfer' && (
                  <div style={{ background: '#fdfbf7', border: '1px solid #fed7aa', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>Bank Transfer Instructions:</span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #fed7aa',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#d97706'
                        }}
                      >
                        <Copy size={13} /> {copiedAccount ? 'Copied!' : 'Copy Acct No'}
                      </button>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.6' }}>
                      <div><strong>Bank:</strong> Zenith Bank / Moniepoint MFB</div>
                      <div><strong>Account Number:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px' }}>1029384756</span></div>
                      <div><strong>Account Name:</strong> FOODTRAIN HOSPITALITY NIG LTD</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        * Please use your full name as payment narration for instant automated clearance.
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-view for Card */}
                {paymentMethod === 'card' && (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                      <ShieldCheck size={18} /> 256-bit Bank Grade Encrypted Gateway
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                      You will be prompted to safely authenticate with your Nigerian ATM card (Mastercard / Visa / Verve) or USSD code.
                    </p>
                  </div>
                )}

                {/* Sub-view for WhatsApp */}
                {paymentMethod === 'whatsapp' && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                      <MessageSquare size={18} /> Instant 1-Click WhatsApp Concierge
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                      Clicking submit will launch a pre-formatted chat with our manager at {selectedBranch?.name}.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Items Preview and Price Breakdown */}
              <div style={{ background: '#fafaf8', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShoppingBag size={15} /> {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items Selected
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Subtotal: ₦{subtotal.toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', borderTop: '1px dashed #e2e0d8', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Estimated Prep Time</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>25 - 35 mins</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Delivery Charge</span>
                    <span style={{ color: deliveryFee === 0 ? '#16a34a' : 'var(--text-main)', fontWeight: 600 }}>
                      {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                      <span>Promo Discount ({promoCode})</span>
                      <span style={{ fontWeight: 700 }}>-₦{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: 'var(--text-main)', paddingTop: '8px', borderTop: '1px solid #e2e0d8', marginTop: '4px' }}>
                    <span>Grand Total:</span>
                    <span style={{ color: 'var(--primary)' }}>₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || cartItems.length === 0}
                className="btn-checkout-primary"
                style={{ cursor: isProcessing ? 'wait' : 'pointer' }}
              >
                {isProcessing ? (
                  <span>Securing Your Feast... ⏳</span>
                ) : (
                  <>
                    <span>Place Order • ₦{grandTotal.toLocaleString()}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', margin: '10px 0 0' }}>
                🔒 100% Satisfaction Guarantee. Authentic Naija Fire Flavours Delivered Fresh.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
