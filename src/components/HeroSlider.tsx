import React, { useState, useEffect } from 'react';
import { Product, featuredSlugs, products, company } from '../data/ksgData';
import { Icon } from './Icon';

interface HeroSliderProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  navigate,
  openQuoteModal,
}) => {
  const featuredProducts: Product[] = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, featuredProducts.length, currentIndex]);

  if (featuredProducts.length === 0) return null;

  const current = featuredProducts[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const waText = encodeURIComponent(
    `Hi K.S.G. Tools, I want to request a quote for ${current.name} (Code: #${current.id}).`
  );

  return (
    <div
      className="hero-slider-wrap"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-slider-head">
        <span className="slider-badge">
          <span className="live-pulse-dot" />
          FEATURED TOOLING
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="slider-counter">
            <span className="current-num">{currentIndex + 1}</span> /{' '}
            <span>{featuredProducts.length}</span>
          </div>
          <div className="slider-nav-btns">
            <button
              type="button"
              className="slider-nav-btn"
              onClick={handlePrev}
              aria-label="Previous product"
            >
              ‹
            </button>
            <button
              type="button"
              className="slider-nav-btn"
              onClick={handleNext}
              aria-label="Next product"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="slider-progress-track">
        <div
          key={currentIndex}
          className={`slider-progress-bar ${isPaused ? 'is-paused' : ''}`}
        />
      </div>

      <div className="hero-product-card" key={current.id}>
        <div className="hp-media-box">
          <div className="hp-badges-overlay">
            <span className="hp-code-pill">
              <span className="hash">#</span>
              {current.id}
            </span>
            <span className="hp-quote-tag">Request Quote</span>
          </div>
          <img
            src={current.image}
            alt={current.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '12px',
            }}
          />
        </div>

        <div className="hp-info-box">
          <div className="hp-title-row">
            <span className="hp-code-label">
              Category: <strong>{current.category}</strong>
            </span>
            {current.moq && (
              <span className="hp-moq-chip">MOQ: {current.moq}</span>
            )}
          </div>

          <h3 className="hp-name">
            <a
              href={`/products/${current.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/products/${current.slug}`);
              }}
            >
              {current.name}
            </a>
          </h3>

          <div className="hp-specs-row">
            {current.specs.slice(0, 4).map(([k, v], idx) => (
              <span key={idx} className="hp-spec-chip">
                <span className="k">{k}:</span> {v}
              </span>
            ))}
          </div>

          <div className="hp-actions" style={{ gap: '8px' }}>
            <button
              type="button"
              className="btn btn-primary hp-btn-details"
              onClick={() => openQuoteModal(current.name)}
            >
              <Icon name="document" size={14} />
              <span>Get Factory Quote</span>
            </button>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noreferrer"
              className="hp-btn-wa"
              title="Inquire on WhatsApp"
            >
              <Icon name="chat" size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="slider-dots">
        {featuredProducts.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Jump to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="slider-trust-bar">
        <span>
          <Icon name="check" size={13} /> ±0.02mm Drawing Tolerance
        </span>
        <span>
          <Icon name="factory" size={13} /> Coimbatore Workshop
        </span>
      </div>
    </div>
  );
};
