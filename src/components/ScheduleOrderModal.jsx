import React, { useState, useMemo } from "react";
import { X, MapPin, ChevronDown, Check, Clock, Calendar, Store, Sparkles } from "lucide-react";

export default function ScheduleOrderModal({
  isOpen,
  onClose,
  onConfirm,
  branches = [],
  selectedBranch
}) {
  const [scheduleType, setScheduleType] = useState("delivery"); // "delivery" | "pickup"
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:00 AM - 12:00 PM");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupBranchId, setPickupBranchId] = useState(
    selectedBranch ? selectedBranch.id : (branches[0]?.id || "ph-flagship")
  );

  // Generate the next 7 days dynamically starting from today
  const availableDays = useMemo(() => {
    const days = [];
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayNum = d.getDate();
      const dayLabel = i === 0 ? "Today" : dayNames[d.getDay()];
      const fullDate = `${dayLabel}, ${d.getDate()} ${monthNames[d.getMonth()]}`;

      days.push({
        id: i,
        dayNum,
        dayLabel,
        fullDate,
        isToday: i === 0
      });
    }
    return days;
  }, []);

  const timeSlots = [
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM",
    "08:00 PM - 09:00 PM",
    "09:00 PM - 10:00 PM"
  ];

  if (!isOpen) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    const chosenDay = availableDays[selectedDateIdx];
    const pickedBranch = branches.find((b) => b.id === pickupBranchId) || selectedBranch;

    onConfirm({
      type: scheduleType,
      date: chosenDay.fullDate,
      dayNum: chosenDay.dayNum,
      dayLabel: chosenDay.dayLabel,
      time: selectedTimeSlot,
      address: scheduleType === "delivery" ? deliveryAddress : pickedBranch?.address,
      branch: pickedBranch
    });

    onClose();
  };

  return (
    <div
      className="schedule-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="schedule-modal-dialog">
        {/* Modal Header */}
        <div className="schedule-modal-header">
          <div>
            <h2 className="schedule-modal-title">Schedule your order</h2>
            <p className="schedule-modal-subtitle">
              We are currently closed, schedule your order for later.
            </p>
          </div>
          <button
            className="schedule-close-btn"
            onClick={onClose}
            aria-label="Close schedule modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Schedule Type Toggle (Delivery vs Pickup) */}
        <div className="schedule-type-toggle">
          <button
            type="button"
            className={`schedule-type-pill ${scheduleType === "delivery" ? "active" : ""}`}
            onClick={() => setScheduleType("delivery")}
          >
            Schedule Delivery
          </button>
          <button
            type="button"
            className={`schedule-type-pill ${scheduleType === "pickup" ? "active" : ""}`}
            onClick={() => setScheduleType("pickup")}
          >
            Schedule Pickup
          </button>
        </div>

        <form onSubmit={handleConfirm}>
          {/* CHOOSE A DATE */}
          <div className="schedule-form-section">
            <span className="schedule-field-label">CHOOSE A DATE</span>
            <div className="schedule-date-scroller no-scrollbar">
              {availableDays.map((item, idx) => {
                const isSelected = selectedDateIdx === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`schedule-date-circle ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedDateIdx(idx)}
                  >
                    <span className="schedule-date-num">{item.dayNum}</span>
                    <span className="schedule-date-day">{item.dayLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CHOOSE A TIME SLOT */}
          <div className="schedule-form-section">
            <span className="schedule-field-label">CHOOSE A TIME SLOT</span>
            <div className="schedule-select-container">
              <select
                className="schedule-time-select"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <div className="schedule-select-chevron">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* DELIVERY ADDRESS / PICKUP BRANCH */}
          <div className="schedule-form-section">
            <span className="schedule-field-label">
              {scheduleType === "delivery" ? "DELIVERY ADDRESS" : "PICKUP BRANCH"}
            </span>

            {scheduleType === "delivery" ? (
              <div className="schedule-input-wrapper">
                <div className="schedule-input-icon">
                  <MapPin size={18} color="#0D7A42" />
                </div>
                <input
                  type="text"
                  className="schedule-text-input"
                  placeholder="Enter delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="schedule-select-container">
                <select
                  className="schedule-time-select"
                  value={pickupBranchId}
                  onChange={(e) => setPickupBranchId(e.target.value)}
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.city} ({b.address})
                    </option>
                  ))}
                </select>
                <div className="schedule-select-chevron">
                  <ChevronDown size={18} />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Button */}
          <button type="submit" className="schedule-confirm-btn">
            Confirm Schedule
          </button>
        </form>
      </div>
    </div>
  );
}
