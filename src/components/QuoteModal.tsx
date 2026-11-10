import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { company, products } from '../data/ksgData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedProduct = '',
}) => {
  const [productName, setProductName] = useState(selectedProduct);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('1 Piece');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct);
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'KSG-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello K.S.G. Tools!\nI want to request a quote for:\n*Product:* ${productName || 'Industrial Blades / Tooling'}\n*Quantity:* ${quantity}\n*Name:* ${fullName || 'Interested Buyer'}\n*Phone:* ${phone}\n*Location:* ${location}\n*Notes:* ${notes}`
    );
    window.open(`https://wa.me/${company.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 14, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card"
        style={{
          background: 'linear-gradient(145deg, #101c2c 0%, #17283c 100%)',
          border: '1px solid rgba(242, 140, 40, 0.4)',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '540px',
          padding: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(242, 140, 40, 0.15)',
          color: '#ffffff',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quote modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: '#cbd5e1',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="close" size={16} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '2px solid #22c55e',
                color: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Icon name="check" size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#fff' }}>
              Enquiry Received!
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>
              Thank you for contacting K.S.G. Tools. Our engineering team in Coimbatore will review your specifications and respond shortly.
            </p>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                fontSize: '13px',
              }}
            >
              <div>Reference Code: <strong style={{ color: 'var(--machinery-orange)' }}>{referenceId}</strong></div>
              <div>Direct Line: <strong>{company.phone}</strong></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleWhatsAppSend}
                style={{ background: '#1e7e46', borderColor: '#166534' }}
              >
                <Icon name="chat" size={16} />
                <span>Send via WhatsApp</span>
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  color: 'var(--machinery-orange)',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                }}
              >
                Direct Factory Quote · Coimbatore
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '4px 0 6px 0' }}>
                Request Quotation &amp; Pricing
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                Get competitive direct-from-manufacturer prices, sample timelines, and CAD/drawing reviews.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Select Tool or Machinery Line
                </label>
                <select
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#090e17',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '14px',
                  }}
                >
                  <option value="">General Machinery / Custom Tooling Inquiry</option>
                  {products.slice(0, 30).map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#090e17',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#090e17',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#090e17',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                    Quantity Needed
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Sets / 10 Pieces"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#090e17',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Delivery City / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, Bangalore, Mumbai, Coimbatore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#090e17',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Specifications / Drawing Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Specify material (D2, HCHCr, Carbide), thickness, dimensions, or machine model..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#090e17',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontSize: '13px',
                    resize: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <Icon name="send" size={16} />
                  <span>Submit Factory Enquiry</span>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleWhatsAppSend}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '11px',
                    background: '#1e7e46',
                    color: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #166534',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Icon name="chat" size={16} />
                  <span>Direct WhatsApp Quote (+91 99447 44509)</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
