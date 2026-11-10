import React, { useState, useMemo } from 'react';
import { infrastructure, company, InfrastructureItem } from '../data/ksgData';
import { Icon } from '../components/Icon';

interface PhotosPageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const PhotosPage: React.FC<PhotosPageProps> = ({
  navigate,
  openQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<InfrastructureItem | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    infrastructure.forEach((item) => cats.add(item.category));
    return Array.from(cats);
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return infrastructure;
    return infrastructure.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main>
      {/* 1. Page Hero */}
      <section className="page-hero photos-page-hero">
        <canvas className="shapegrid-canvas page-hero-canvas" />
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
                <span>Manufacturing Area &amp; Facilities</span>
              </div>
              <span className="eyebrow">Direct Factory Workshop</span>
              <h1>Manufacturing Area &amp; Facilities</h1>
              <p>
                Explore our direct manufacturing plant, 4-Axis CNC VMC machining centers, turret milling machines, and precision toolroom infrastructure in Coimbatore.
              </p>
              <div className="page-hero-pills">
                <span className="page-hero-pill">
                  <Icon name="gear" size={13} /> ±0.02mm CNC Tolerance
                </span>
                <span className="page-hero-pill">
                  <Icon name="shield" size={13} /> HRC 58-62 Hardened Steel
                </span>
                <span className="page-hero-pill">
                  <Icon name="factory" size={13} /> Coimbatore Works Direct
                </span>
              </div>
            </div>

            <div className="page-hero-aside">
              <div className="hero-capability-card photos-capability-card">
                <div className="capability-card-head">
                  <span className="capability-badge">
                    <Icon name="gear" size={13} /> K.S.G. Tools
                  </span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Estd. 2009
                  </span>
                </div>
                <div className="capability-title">Precision Tooling Manufacturer</div>
                <div className="photos-capability-items">
                  <div>
                    <strong><Icon name="wrench" size={13} /> Industrial Knives</strong>
                    <span>Chipper, shredder, grinder &amp; granulator blades</span>
                  </div>
                  <div>
                    <strong><Icon name="gear" size={13} /> Tools &amp; Dies</strong>
                    <span>Press tool dies, patterns &amp; progressive tools</span>
                  </div>
                </div>
                <div className="capability-actions">
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hi K.S.G. Tools, I would like to know more about your manufacturing facilities.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn photos-hero-whatsapp"
                  >
                    <Icon name="chat" size={15} /> WhatsApp Quote
                  </a>
                  <a
                    href={`tel:${company.phoneLink}`}
                    className="btn-hero-call photos-hero-call"
                  >
                    <Icon name="phone" size={14} /> Call {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Grid */}
      <section className="section photos-gallery-section">
        <div className="container">
          <div className="photos-gallery-heading">
            <span className="eyebrow">Our Manufacturing Infrastructure</span>
            <h2>Manufacturing Area &amp; Facilities</h2>
            <p>
              Explore K.S.G. Tools’ physical workshop facilities in Coimbatore, equipped with high-precision FEELER CNC Vertical Machining Centers (VMC), turret milling machines, toolroom grinding, and industrial pneumatics.
            </p>
          </div>
          {/* Category Filter Pills */}
          <div className="photos-category-tabs">
            <button
              type="button"
              className={`cat-tab ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Facilities
            </button>
            {[...categories].sort((a, b) => {
              const priority = [
                'VMC Machinery',
                'Conventional Machining',
                'Pneumatics & Power',
                'Tooling & Fixtures',
                'Material Handling',
              ];
              return (priority.indexOf(a) === -1 ? priority.length : priority.indexOf(a))
                - (priority.indexOf(b) === -1 ? priority.length : priority.indexOf(b));
            }).map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cat-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Infrastructure Cards Grid */}
          <div
            className="photos-infrastructure-grid"
          >
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="infra-card"
                style={{
                  background: 'var(--bg, #ffffff)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveItem(item)}
              >
                <div style={{ position: 'relative', height: '240px', background: '#090e17', overflow: 'hidden' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(9, 14, 23, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--machinery-orange)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: '1px solid rgba(242, 140, 40, 0.4)',
                    }}
                  >
                    {item.category}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.65)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                    }}
                  >
                    <Icon name="maximize" size={16} />
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px', color: '#0f172a' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', fontWeight: 600 }}>
                    Model: <span style={{ color: '#0f172a' }}>{item.model}</span> · {item.manufacturer}
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55, marginBottom: '14px', flex: 1 }}>
                    {item.desc}
                  </p>
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '8px 10px',
                      fontSize: '11.5px',
                      color: '#334155',
                      lineHeight: 1.45,
                    }}
                  >
                    <strong>Specs:</strong> {item.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      {activeItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 14, 23, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveItem(null);
          }}
        >
          <div
            style={{
              maxWidth: 'min(1100px, 94vw)',
              maxHeight: '92vh',
              width: '100%',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              aria-label="Close photo view"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <Icon name="close" size={18} />
            </button>

            <img
              src={activeItem.img}
              alt={activeItem.title}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '92vh',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </div>
      )}

      {/* 4. CTA Band */}
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
