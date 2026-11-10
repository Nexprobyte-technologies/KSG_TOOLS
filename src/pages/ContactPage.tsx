import React, { useState } from 'react';
import { company, factsheet, products } from '../data/ksgData';
import { Icon } from '../components/Icon';
import { ShapeGridBackground } from '../components/ShapeGridBackground';

interface ContactPageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  navigate,
  openQuoteModal,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [productLine, setProductLine] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'KSG-MSG-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(id);
    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const text = encodeURIComponent(
      `Hello K.S.G. Tools!\nI am inquiring from your website:\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Email:* ${email}\n*Company:* ${companyName || 'N/A'}\n*Product:* ${productLine || 'Custom Tooling'}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/${company.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <main>
      {/* 1. Page Hero */}
      <section className="page-hero matched-page-hero">
        <ShapeGridBackground className="page-hero-shape-grid" />
        <div className="container">
          <div className="page-hero-grid">
            <div className="page-hero-content">
              <div className="page-breadcrumb">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                >
                  Home
                </a>
                <span className="bc-sep">/</span>
                <span>Contact Us</span>
              </div>
              <span className="eyebrow">Get in Touch</span>
              <h1>Contact Us</h1>
              <p>
                Reach out directly to K.S.G. Tools in Coimbatore for price quotes, custom sampling, machinery consultations, and factory site visits.
              </p>
              <div className="page-hero-pills">
                <span className="page-hero-pill">
                  <Icon name="chat" size={13} /> Instant WhatsApp Response
                </span>
                <span className="page-hero-pill">
                  <Icon name="factory" size={13} /> Direct Coimbatore Workshop
                </span>
                <span className="page-hero-pill">
                  <Icon name="truck" size={13} /> Pan-India Logistics
                </span>
              </div>
            </div>

            <div className="page-hero-aside">
              <div className="hero-capability-card">
                <div className="capability-card-head">
                  <span className="capability-badge">
                    <Icon name="phone" size={13} /> Hotline
                  </span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Direct Factory
                  </span>
                </div>
                <div className="capability-title">Speak with Engineers</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 16px 0' }}>
                  Call our technical line directly to discuss drawing requirements, blade metallurgy (D2, HCHCr), or regrinding schedules.
                </p>
                <div className="capability-actions">
                  <a
                    href={`tel:${company.phoneLink}`}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Icon name="phone" size={15} />{company.phone}
                  </a>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Hello%20KSG%20Tools%2C%20I%20would%20like%20to%20get%20in%20touch%20regarding%20cutting%20tools.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-hero-wa"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Icon name="chat" size={15} />+91 {company.whatsapp.slice(2)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Left Form */}
            <div
              className="contact-form-wrap"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
            >
              <span className="eyebrow">Direct Inquiry</span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0 12px', color: '#0f172a' }}>
                Send Factory Message
              </h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: 1.55 }}>
                Fill out your details below to receive a direct manufacturer quote, CAD sampling estimate, or technical consultation.
              </p>

              {submitted ? (
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#dcfce7',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Icon name="check" size={28} />
                  </div>
                  <h3 style={{ color: '#166534', fontSize: '18px', marginBottom: '8px' }}>
                    Message Received!
                  </h3>
                  <p style={{ color: '#374151', fontSize: '14px', marginBottom: '16px' }}>
                    Thank you, <strong>{fullName}</strong>. We have logged your request under reference code{' '}
                    <strong style={{ color: 'var(--machinery-orange)' }}>{refId}</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleWhatsAppForward}
                      style={{
                        background: '#1e7e46',
                        color: '#fff',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="chat" size={16} /> Forward via WhatsApp
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setSubmitted(false)}
                      style={{ padding: '10px 16px' }}
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
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
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sri Krishna Polymers"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Product or Service Category
                    </label>
                    <select
                      value={productLine}
                      onChange={(e) => setProductLine(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        background: '#ffffff',
                      }}
                    >
                      <option value="">Select Category / Machinery Line</option>
                      <option value="Shredder Knives">Shredder Knives &amp; Cutters</option>
                      <option value="Chipper Knives">Wood Chipper Blades</option>
                      <option value="Granulator Blades">Plastic Granulator Blades</option>
                      <option value="Grinder Blades">Plastic Grinder Blades</option>
                      <option value="Shredding Machine">Industrial Shredding Machinery</option>
                      <option value="Tools And Dies">Press Tools, Dies &amp; Patterns</option>
                      <option value="VMC Machine Job Work">4-Axis CNC VMC Job Work</option>
                      <option value="Blade Resharpening">Industrial Blade Regrinding &amp; Resharpening</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                      Detailed Requirements / Drawing Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please mention knife dimensions (length x width x thickness), material requirements (D2, HCHCr, Carbide), machinery model, or custom job work..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ justifyContent: 'center', padding: '14px', fontSize: '15px' }}
                  >
                    <Icon name="send" size={16} /> Send Factory Message
                  </button>
                </form>
              )}
            </div>

            {/* Right Information Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Card 1: Works & Address */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(242, 140, 40, 0.1)',
                      color: 'var(--machinery-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="factory" size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', fontWeight: 700 }}>
                      Workshop &amp; Unit
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      {company.name}
                    </h3>
                  </div>
                </div>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                  {company.address}
                </p>
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
                >
                  <Icon name="pin" size={15} /> Open in Google Maps ↗
                </a>
              </div>

              {/* Card 2: Contact Numbers & WhatsApp */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon name="phone" size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', fontWeight: 700 }}>
                      Voice &amp; WhatsApp
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                      Direct Communication
                    </h3>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href={`tel:${company.phoneLink}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#0f172a',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <span>📞 Voice: {company.phone}</span>
                    <span style={{ color: 'var(--machinery-orange)', fontSize: '12px' }}>Call Direct →</span>
                  </a>

                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Hi%20K.S.G.%20Tools%2C%20I%20am%20contacting%20you%20from%20your%20website.`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: '#f0fdf4',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#166534',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    <span>💬 WhatsApp: +91 {company.whatsapp.slice(2)}</span>
                    <span style={{ color: '#16a34a', fontSize: '12px' }}>Chat Now →</span>
                  </a>

                  <a
                    href={`mailto:${company.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#0f172a',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <span>✉️ {company.email}</span>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>Send Email →</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Operating Timings & Credentials */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                }}
              >
                <h4 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>
                  Operational Timings &amp; Tax Credentials
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: '#475569' }}>
                  <div><strong>Monday – Saturday:</strong> 9:00 AM – 7:00 PM</div>
                  <div><strong>Sunday:</strong> Closed / Emergency Breakdown Support</div>
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                    <strong>GSTIN:</strong> {company.gst} (Tamil Nadu)
                  </div>
                  <div><strong>CEO / Proprietor:</strong> {factsheet.ceo}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed Section */}
          <div style={{ marginTop: '50px' }}>
            <div className="section-head center">
              <span className="eyebrow">
                <Icon name="pin" size={14} /> Factory &amp; Workshop Map
              </span>
              <h2>Find Our Factory in Coimbatore</h2>
            </div>

            <div className="location-box-card">
              <div className="location-map-wrap">
                <iframe
                  src={company.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="K.S.G. Tools Exact Location on Google Maps - Saravanampatti, Coimbatore"
                  aria-label="K.S.G. Tools Google Maps location"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA Band */}
      <section className="cta-band" aria-label="Call to action">
        <div className="container">
          <h2 style={{ color: '#ffffff', fontWeight: 800 }}>
            Looking for Shredder Knives or Blades?
          </h2>
          <p style={{ color: '#e2e8f0' }}>
            Get competitive quotes and timely delivery for your industrial cutting requirements.
          </p>
          <div className="cta-actions">
            <a href={`tel:${company.phoneLink}`} className="btn btn-primary">
              Call Now
            </a>
            <button
              type="button"
              className="btn btn-outline"
              style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.5)' }}
              onClick={() => openQuoteModal()}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
