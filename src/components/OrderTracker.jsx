import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Flame, 
  Package, 
  Bike, 
  Sparkles, 
  MessageSquare,
  AlertCircle,
  RotateCw,
  ChefHat
} from 'lucide-react';

const SAMPLE_ORDERS = {
  'FT-7291': {
    orderId: 'FT-7291',
    customerName: 'Chinedu Okafor',
    branchName: 'Ikeja Allen Avenue',
    branchPhone: '+234 812 345 6789',
    destination: '18 Isaac John Street, GRA Ikeja',
    orderTime: '12:42 PM',
    estimatedDelivery: '01:15 PM (In 14 mins)',
    currentStepIndex: 3, // 0 to 4 (Step 4: Rider Musa En Route)
    rider: {
      name: 'Musa Bello',
      phone: '+234 814 992 1083',
      vehicle: 'Honda Ace 125 (Plate: KJA-482-XY)',
      rating: '4.95 ★ (840 deliveries)'
    },
    items: [
      { name: 'Full Smoked BBQ Chicken', qty: 1, spice: 'Naija Fire 🔥🔥🔥', price: 9500 },
      { name: 'Smokey Jollof Rice Special', qty: 2, spice: 'Spicy Medium', price: 7000 },
      { name: 'Sweet Plantain Dodo', qty: 2, spice: 'Mild', price: 2400 },
      { name: 'Zobo Blast (Spiced Hibiscus)', qty: 2, spice: 'Chilled', price: 3000 }
    ],
    subtotal: 21900,
    deliveryFee: 0,
    total: 21900
  },
  'FT-8402': {
    orderId: 'FT-8402',
    customerName: 'Amina Al-Hassan',
    branchName: 'Wuse 2, Abuja',
    branchPhone: '+234 818 901 2345',
    destination: '44 Adetokunbo Ademola Crescent, Wuse 2',
    orderTime: '01:10 PM',
    estimatedDelivery: '01:50 PM (In 28 mins)',
    currentStepIndex: 1, // Step 2: Fire on the Grill
    rider: {
      name: 'Ibrahim Danladi',
      phone: '+234 809 112 3344',
      vehicle: 'Bajaj Boxer 150 (Plate: ABJ-109-AA)',
      rating: '4.88 ★ (420 deliveries)'
    },
    items: [
      { name: 'FoodTrain Mega Platter Feast', qty: 1, spice: 'FoodTrain Signature Spice', price: 28500 },
      { name: 'Crispy Grilled Wings Box (12pcs)', qty: 1, spice: 'Hot Suya Glaze', price: 8500 },
      { name: 'Chapman Gold Cocktail', qty: 3, spice: 'Cold', price: 5400 }
    ],
    subtotal: 42400,
    deliveryFee: 0,
    total: 42400
  }
};

const TRACKER_STEPS = [
  {
    title: 'Order Confirmed',
    description: 'Ticket received and queued in kitchen display system.',
    icon: CheckCircle2,
    time: 'Step 1'
  },
  {
    title: 'Fire on the Grill',
    description: 'Chef is searing and seasoning your flame-grilled items.',
    icon: Flame,
    time: 'Step 2'
  },
  {
    title: 'Packed & Thermal Sealed',
    description: 'Sealed inside FoodTrain insulated thermal bag to retain heat.',
    icon: Package,
    time: 'Step 3'
  },
  {
    title: 'Rider Musa En Route',
    description: 'Dispatched via dispatch motorbike. Approaching your area.',
    icon: Bike,
    time: 'Step 4'
  },
  {
    title: 'Delivered & Savoured',
    description: 'Order handed over sizzling hot. Enjoy your Naija feast!',
    icon: Sparkles,
    time: 'Step 5'
  }
];

export default function OrderTracker({ initialOrderId = 'FT-7291', onBackToMenu }) {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState(SAMPLE_ORDERS[initialOrderId] || SAMPLE_ORDERS['FT-7291']);
  const [simulatedStep, setSimulatedStep] = useState(SAMPLE_ORDERS[initialOrderId]?.currentStepIndex ?? 3);
  const [countdownSeconds, setCountdownSeconds] = useState(840); // 14 mins

  // Sync if initialOrderId prop changes
  useEffect(() => {
    if (initialOrderId) {
      setSearchInput(initialOrderId);
      if (SAMPLE_ORDERS[initialOrderId]) {
        setActiveOrder(SAMPLE_ORDERS[initialOrderId]);
        setSimulatedStep(SAMPLE_ORDERS[initialOrderId].currentStepIndex);
      }
    }
  }, [initialOrderId]);

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchInput.trim().toUpperCase().replace('#', '');
    
    if (SAMPLE_ORDERS[cleanId]) {
      setActiveOrder(SAMPLE_ORDERS[cleanId]);
      setSimulatedStep(SAMPLE_ORDERS[cleanId].currentStepIndex);
    } else {
      // Create a dynamic realistic tracked order
      const dynamicOrder = {
        orderId: cleanId,
        customerName: 'Valued Foodie',
        branchName: 'Ikeja Branch',
        branchPhone: '+234 812 345 6789',
        destination: 'Your Provided Delivery Address',
        orderTime: 'Just Now',
        estimatedDelivery: '30 - 40 mins',
        currentStepIndex: 1,
        rider: {
          name: 'Musa Bello',
          phone: '+234 814 992 1083',
          vehicle: 'Honda Ace 125',
          rating: '4.95 ★'
        },
        items: [
          { name: 'Full Smoked BBQ Chicken', qty: 1, spice: 'Naija Fire', price: 9500 },
          { name: 'Smokey Jollof Rice', qty: 1, spice: 'Spicy', price: 3500 }
        ],
        subtotal: 13000,
        deliveryFee: 1500,
        total: 14500
      };
      setActiveOrder(dynamicOrder);
      setSimulatedStep(1);
    }
  };

  const advanceSimulation = () => {
    setSimulatedStep(prev => (prev < TRACKER_STEPS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="tracker-section" id="track-order-section">
      <div className="site-container">
        {/* Tracker Section Header */}
        <div className="section-header-center" style={{ marginBottom: '32px' }}>
          <div className="badge-flame">
            <Bike size={14} /> LIVE GPS DISPATCH TRACKER
          </div>
          <h2 className="section-title">
            Track Your FoodTrain Feast
          </h2>
          <p className="section-subtitle">
            From the sizzling grill to your doorstep. Watch your order progress in real-time.
          </p>

          {/* Quick Search Form */}
          <form 
            onSubmit={handleSearch}
            style={{
              maxWidth: '540px',
              margin: '24px auto 16px',
              display: 'flex',
              gap: '10px',
              background: '#ffffff',
              padding: '6px 8px 6px 16px',
              borderRadius: '9999px',
              border: '1.5px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}>
              <Search size={18} color="var(--primary)" />
              <input 
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. FT-7291)"
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              />
            </div>
            <button 
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '9999px' }}
            >
              Track Order
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Try demo orders:</span>
            <button 
              type="button"
              onClick={() => {
                setSearchInput('FT-7291');
                setActiveOrder(SAMPLE_ORDERS['FT-7291']);
                setSimulatedStep(3);
                setCountdownSeconds(840);
              }}
              style={{
                background: activeOrder?.orderId === 'FT-7291' ? 'var(--primary-light)' : '#f3f4f6',
                border: activeOrder?.orderId === 'FT-7291' ? '1px solid var(--primary)' : '1px solid #e5e7eb',
                color: activeOrder?.orderId === 'FT-7291' ? 'var(--primary)' : 'var(--text-main)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              #FT-7291 (Rider En Route)
            </button>
            <button 
              type="button"
              onClick={() => {
                setSearchInput('FT-8402');
                setActiveOrder(SAMPLE_ORDERS['FT-8402']);
                setSimulatedStep(1);
                setCountdownSeconds(1680);
              }}
              style={{
                background: activeOrder?.orderId === 'FT-8402' ? 'var(--primary-light)' : '#f3f4f6',
                border: activeOrder?.orderId === 'FT-8402' ? '1px solid var(--primary)' : '1px solid #e5e7eb',
                color: activeOrder?.orderId === 'FT-8402' ? 'var(--primary)' : 'var(--text-main)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              #FT-8402 (On the Grill)
            </button>
          </div>
        </div>

        {/* Main Tracker Card */}
        <div className="tracker-card">
          {/* Card Top Info */}
          <div className="tracker-header-box">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--charcoal)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Order #{activeOrder.orderId}
                </h3>
                <span className="tracker-badge">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  {TRACKER_STEPS[simulatedStep].title}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                Dispatched from <strong>{activeOrder.branchName}</strong> • Placed at {activeOrder.orderTime}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Estimated Arrival</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                  ⏱️ {formatCountdown(countdownSeconds)}
                </span>
              </div>
              <button
                type="button"
                onClick={advanceSimulation}
                title="Click to simulate next status in delivery lifecycle"
                style={{
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-main)'
                }}
              >
                <RotateCw size={14} /> Next Stage
              </button>
            </div>
          </div>

          {/* 5-Step Visual Progress Timeline */}
          <div className="tracker-timeline" style={{ position: 'relative' }}>
            {TRACKER_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isCompleted = idx < simulatedStep;
              const isActive = idx === simulatedStep;

              return (
                <div 
                  key={step.title}
                  className={`timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                >
                  <div className="step-node">
                    <IconComp size={20} />
                  </div>
                  <div className="step-info">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rider and Delivery Details Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px', 
            marginTop: '36px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Rider Profile Card */}
            <div style={{ 
              background: '#fcfbfa', 
              borderRadius: '16px', 
              padding: '20px', 
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Assigned Dispatch Rider
                  </span>
                  <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    VERIFIED PILOT
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 800
                  }}>
                    MB
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>
                      {activeOrder.rider.name}
                    </h4>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                      {activeOrder.rider.vehicle}
                    </p>
                    <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 700 }}>
                      {activeOrder.rider.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rider Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a 
                  href={`tel:${activeOrder.rider.phone}`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    background: '#ffffff',
                    border: '1.5px solid var(--border-subtle)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={15} color="var(--primary)" /> Call Rider
                </a>
                <a 
                  href={`https://wa.me/${activeOrder.rider.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    background: '#25d366',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#ffffff',
                    textDecoration: 'none'
                  }}
                >
                  <MessageSquare size={15} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Destination & Order Items Box */}
            <div style={{ 
              background: '#fcfbfa', 
              borderRadius: '16px', 
              padding: '20px', 
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Delivery Destination
                </span>
                <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} color="var(--primary)" /> {activeOrder.destination}
                </p>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Items in this Box ({activeOrder.items.length})
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {activeOrder.items.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text-main)' }}>
                        <strong>{item.qty}x</strong> {item.name} <span style={{ color: 'var(--primary)', fontSize: '11px' }}>({item.spice})</span>
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        ₦{(item.price * item.qty).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #e5e4de', fontSize: '15px', fontWeight: 800 }}>
                  <span>Total Bill:</span>
                  <span style={{ color: 'var(--primary)' }}>₦{activeOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Need Assistance Hotline Banner */}
          <div style={{ 
            marginTop: '24px', 
            background: '#fff8eb', 
            border: '1px solid #fef3c7', 
            borderRadius: '12px', 
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} color="#d97706" />
              <span style={{ fontSize: '13px', color: '#92400e', fontWeight: 500 }}>
                Need to modify your delivery or special drop-off instructions?
              </span>
            </div>
            <a 
              href={`tel:${activeOrder.branchPhone}`}
              style={{
                color: '#b45309',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'underline'
              }}
            >
              Call Branch Hotline ({activeOrder.branchPhone})
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
