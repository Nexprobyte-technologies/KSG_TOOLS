import React from 'react';
import { products, company, Product } from '../data/ksgData';
import { Icon } from '../components/Icon';
import { ShapeGridBackground } from '../components/ShapeGridBackground';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  navigate,
  openQuoteModal,
}) => {
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--ink-soft)', margin: '16px 0 24px' }}>
          The requested product could not be found in our current manufacturing catalog.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/products')}
        >
          Back to Catalog
        </button>
      </main>
    );
  }

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  const waText = encodeURIComponent(
    `Hi K.S.G. Tools, I want to request a quote for ${product.name} (Code #${product.id}).`
  );

  return (
    <main>
      <section className="page-hero product-detail-hero">
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
                <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/products');
                  }}
                >
                  Products
                </a>
                <span className="bc-sep">/</span>
                <span>{product.name}</span>
              </div>
              <span className="eyebrow">Precision Tooling</span>
              <h1>{product.name}</h1>
              <p>
                Engineered and manufactured by K.S.G. Tools, Coimbatore using
                wear-resistant tool steels with precision ground edges.
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
              <div className="hero-capability-card product-detail-summary">
                <div className="capability-card-head">
                  <span className="capability-badge">{product.category}</span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Genuine Spec
                  </span>
                </div>
                <div className="detail-hero-price-row">
                  <strong>Custom Quote on Request</strong>
                  {product.moq && <span>MOQ: {product.moq}</span>}
                </div>
                <div className="capability-items-grid">
                  <div className="capability-item">
                    <span className="capability-item-title">Category</span>
                    <span className="capability-item-desc">{product.category}</span>
                  </div>
                  <div className="capability-item">
                    <span className="capability-item-title">Dispatch Mode</span>
                    <span className="capability-item-desc">
                      Palletized by Road from Coimbatore
                    </span>
                  </div>
                </div>
                <div className="capability-actions">
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${waText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-hero-wa"
                  >
                    <Icon name="chat" size={15} /> WhatsApp Enquiry
                  </a>
                  <a href={`tel:${company.phoneLink}`} className="btn-hero-call">
                    <Icon name="phone" size={14} /> Call Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section product-detail-section">
        <div className="container">
          <div className="product-detail-layout">
            <div className="product-detail-main">
              <div className="detail-gallery">
                <span className="detail-gallery-category">{product.category}</span>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="eager"
                />
                <span className="detail-gallery-origin">Coimbatore Made</span>
              </div>

              <div className="detail-video">
                <div>
                  <span className="detail-video-kicker">Chipper Knives</span>
                  <h3>Live Machine Operation Trials</h3>
                  <p>
                    Watch our heavy-duty shredders and industrial knives running
                    in real workshop trials.
                  </p>
                </div>
                <a
                  href="/videos"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/videos');
                  }}
                  className="btn btn-outline-dark"
                >
                  Watch Videos <Icon name="arrowRight" size={15} />
                </a>
              </div>

              <div className="detail-card product-detail-specifications">
                <div className="detail-card-head">
                  <span className="eyebrow">Technical Parameters</span>
                  <h2>Verified Technical Specifications</h2>
                </div>
                <div className="detail-spec-table-wrap">
                  <table className="detail-spec-table">
                    <tbody>
                      <tr>
                        <th>Product Name</th>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <th>Category</th>
                        <td>{product.category} {product.subCategory ? `(${product.subCategory})` : ''}</td>
                      </tr>
                      {product.specs.map(([key, val], idx) => (
                        <tr key={idx}>
                          <th>{key}</th>
                          <td>{val}</td>
                        </tr>
                      ))}
                      {product.moq && (
                        <tr>
                          <th>Minimum Order Quantity (MOQ)</th>
                          <td>{product.moq}</td>
                        </tr>
                      )}
                      <tr>
                        <th>Supply Origin</th>
                        <td>Sivanandhapuram, Saravanampatti, Coimbatore - 641035</td>
                      </tr>
                      <tr>
                        <th>Machining Tolerance</th>
                        <td>±0.02mm CNC Accuracy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="detail-card product-detail-description">
                <div className="detail-card-head">
                  <span className="eyebrow">Engineering Fitment</span>
                  <h2>Product Description &amp; Engineering Fitment</h2>
                </div>
                <p>{product.desc}</p>
                <p>
                  K.S.G. Tools is a dedicated manufacturer based in Coimbatore,
                  Tamil Nadu. Every blade is engineered with specialized bevel
                  angles, custom bolt hole pitches, and selected tool steels
                  (D2 / HCHCr / High Carbon / SS304) to match your machine
                  specifications and maximize production uptime.
                </p>
                <ul className="product-detail-benefits">
                  <li>D2 / HCHCr High-Wear Tool Steels</li>
                  <li>Optical Edge Hardness Checked</li>
                  <li>Custom Sampling to Customer Drawing</li>
                  <li>Direct Factory Value from Coimbatore</li>
                </ul>
              </div>
            </div>

            <aside className="product-detail-side">
              <div className="detail-pricecard">
                <span className="detail-pricecard-label">Direct Manufacturer</span>
                <h2>Coimbatore</h2>
                <strong>Direct Factory Quote</strong>
                <p>Custom dimensions, hole pitch &amp; material grades</p>
                {product.moq && <p>Minimum order quantity: {product.moq}</p>}
                <button
                  type="button"
                  className="btn btn-primary w100"
                  onClick={() => openQuoteModal(product.name)}
                >
                  Request Official RFQ
                </button>
                <a
                  href={`https://wa.me/${company.whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-wa w100"
                >
                  <Icon name="chat" size={16} /> Instant WhatsApp Quote
                </a>
                <a href={`tel:${company.phoneLink}`} className="btn btn-dark w100">
                  <Icon name="phone" size={15} /> Call Sales: {company.phone}
                </a>
                <small>
                  Direct manufacturer supply. Safe road transport dispatch
                  across India.
                </small>
              </div>

              {relatedProducts.length > 0 && (
                <div className="detail-card related-title">
                  <h2>Related Tooling &amp; Spares</h2>
                  <div className="related-list">
                    {relatedProducts.map((p) => (
                      <a
                        key={p.id}
                        href={`/products/${p.slug}`}
                        className="related-card"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/products/${p.slug}`);
                        }}
                      >
                        <img
                          className="related-card-image"
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                        />
                        <span className="related-card-content">
                          <span className="related-card-name">{p.name}</span>
                          <span className="related-card-category">{p.category}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
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
              onClick={() => openQuoteModal(product.name)}
            >
              Request a Quote
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
