import React, { useState, useMemo, useEffect } from 'react';
import { products, categories, company, Product } from '../data/ksgData';
import { Icon } from '../components/Icon';
import { ShapeGridBackground } from '../components/ShapeGridBackground';

interface ProductsPageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

const getCategoryIcon = (category: string) => {
  if (category.includes('Chipper')) return 'blade';
  if (category.includes('Shredder Knives')) return 'gear';
  if (category.includes('Tools')) return 'hammer';
  if (category.includes('Machine')) return 'factory';
  if (category.includes('Grinder')) return 'disc';
  if (category.includes('Granulator')) return 'gear';
  return 'grass';
};

export const ProductsPage: React.FC<ProductsPageProps> = ({
  navigate,
  openQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(18);

  // Subcategories for the current selected category
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const subs = new Set<string>();
    products
      .filter((p) => p.category === selectedCategory && p.subCategory)
      .forEach((p) => {
        if (p.subCategory) subs.add(p.subCategory);
      });
    return Array.from(subs);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedSubCategory('All');
    setVisibleCount(18);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubCategory !== 'All') {
      list = list.filter((p) => p.subCategory === selectedSubCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
          p.specs.some(([k, v]) =>
            k.toLowerCase().includes(q) || v.toLowerCase().includes(q)
          )
        );
      });
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'code') {
      list.sort((a, b) => a.id.localeCompare(b.id));
    }

    return list;
  }, [selectedCategory, selectedSubCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <main>
      {/* 1. Page Hero */}
      <section className="page-hero products-page-hero matched-page-hero">
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
                <span>Products &amp; Services</span>
              </div>
              <span className="eyebrow">What We Offer</span>
              <h1>Products &amp; Services</h1>
              <p>
                A wide and exclusive range of industrial cutting tools, blades
                and shredding machinery, manufactured and supplied from
                Coimbatore.
              </p>
              <div className="page-hero-pills">
                <span className="page-hero-pill">
                  <Icon name="gear" size={13} /> ±0.02mm CNC Tolerance
                </span>
                <span className="page-hero-pill">
                  <Icon name="shield" size={13} /> HRC 58–62 Hardened Steel
                </span>
                <span className="page-hero-pill">
                  <Icon name="factory" size={13} /> Coimbatore Works Direct
                </span>
              </div>
            </div>

            <div className="page-hero-aside">
              <div className="hero-capability-card">
                <div className="capability-card-head">
                  <span className="capability-badge">
                    <Icon name="gear" size={13} /> Factory Capabilities
                  </span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Verified Mfr
                  </span>
                </div>
                <div className="capability-title">
                  Precision Tooling &amp; Supply Desk
                </div>
                <div className="capability-items-grid">
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="blade" size={13} /> 29+ Industrial Lines
                    </div>
                    <p className="capability-item-desc">
                      Chipper knives, tools &amp; dies, shredders, grinder blades
                      &amp; VMC
                    </p>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="shield" size={13} /> High-Alloy Steels
                    </div>
                    <p className="capability-item-desc">
                      Vacuum hardened D2, HCHCr, High Carbon &amp; SS304
                    </p>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="wrench" size={13} /> Custom Machining
                    </div>
                    <p className="capability-item-desc">
                      CNC profiling to customer drawing &amp; ±0.02mm tolerance
                    </p>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="truck" size={13} /> All-India Logistics
                    </div>
                    <p className="capability-item-desc">
                      Safe palletised road transport directly from Coimbatore
                    </p>
                  </div>
                </div>
                <div className="capability-actions">
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Hi%20K.S.G.%20Tools%2C%20I%20would%20like%20a%20quote%20for%20your%20industrial%20products.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-hero-wa"
                  >
                    <Icon name="chat" size={15} /> WhatsApp RFQ
                  </a>
                  <a
                    href={`tel:${company.phoneLink}`}
                    className="btn-capability-call"
                  >
                    <Icon name="phone" size={15} /> Call Works
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Section */}
      <section className="section products-catalog-section">
        <div className="container">
          <div className="products-catalog-heading">
            <span className="eyebrow">Verified Industrial Product Catalog</span>
            <h2>Products &amp; Industrial Services</h2>
            <p>
              Direct from manufacturer in Coimbatore · {products.length} Products
              &amp; Services available · Custom sizes &amp; grades manufactured to
              order
            </p>
          </div>
          <div
            className="home-catalog-tabs-wrap"
            role="region"
            aria-label="Filter products by category"
          >
            <div className="home-catalog-tabs">
              <button
                type="button"
                className={`cat-tab ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
                aria-pressed={selectedCategory === 'All'}
              >
                <Icon name="gear" size={15} />
                <span>All Products</span>
                <span className="home-catalog-tab-count">{products.length}</span>
              </button>
              {categories.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`cat-tab ${selectedCategory === c.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(c.name)}
                  aria-pressed={selectedCategory === c.name}
                >
                  <Icon name={getCategoryIcon(c.name)} size={15} />
                  <span>{c.name}</span>
                  <span className="home-catalog-tab-count">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="home-catalog-toolbar">
            <label className="home-catalog-search">
              <Icon name="zoom" size={17} />
              <input
                type="search"
                placeholder="Search by product name, category, material or specifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </label>

            <div className="home-catalog-sort">
              <label htmlFor="products-catalog-sort-select">Sort by:</label>
              <select
                id="products-catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Order</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="code">Product Code</option>
              </select>
            </div>

            <a
              href="/KSG-Tools-Product-Catalogue.pdf"
              download="KSG-Tools-Product-Catalogue.pdf"
              className="home-catalog-download"
              title="Download Complete Product Catalogue (PDF)"
            >
              <Icon name="download" size={15} />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="home-catalog-summary">
            <div className="home-catalog-summary-copy">
              <span className="home-catalog-summary-label">
                <Icon name="gear" size={14} />
                {selectedCategory === 'All' ? 'All' : selectedCategory}
                {selectedSubCategory !== 'All' ? ` · ${selectedSubCategory}` : ''}
              </span>
              <p>
                {selectedCategory === 'All' &&
                selectedSubCategory === 'All' &&
                !searchQuery.trim()
                  ? 'Explore our complete range of precision chipper knives, press tool dies, shredding machinery, industrial grinder blades, and VMC job work from Coimbatore.'
                  : `Showing ${filteredProducts.length} products${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}${selectedSubCategory !== 'All' ? ` (${selectedSubCategory})` : ''}${searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}.`}
              </p>
              {(selectedCategory !== 'All' ||
                selectedSubCategory !== 'All' ||
                searchQuery.trim()) && (
                <button
                  type="button"
                  className="home-catalog-reset"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubCategory('All');
                    setSearchQuery('');
                    setVisibleCount(18);
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
            <div className="home-catalog-summary-count">
              <strong>{filteredProducts.length}</strong>
              <span>Items shown</span>
            </div>
          </div>

          {/* Subcategories (if any) */}
          {availableSubCategories.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center',
                margin: '0 0 24px 0',
                padding: '12px 16px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                Subcategories:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubCategory('All')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: selectedSubCategory === 'All' ? 'var(--machinery-orange)' : '#cbd5e1',
                  background: selectedSubCategory === 'All' ? 'var(--machinery-orange)' : '#ffffff',
                  color: selectedSubCategory === 'All' ? '#ffffff' : '#475569',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                All ({products.filter((p) => p.category === selectedCategory).length})
              </button>
              {availableSubCategories.map((sub) => {
                const count = products.filter(
                  (p) => p.category === selectedCategory && p.subCategory === sub
                ).length;
                const isSelected = selectedSubCategory === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubCategory(sub)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--machinery-orange)' : '#cbd5e1',
                      background: isSelected ? 'var(--machinery-orange)' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#475569',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {sub} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '8px' }}>
                No matching industrial tools found
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
                Try searching with different terms or reset your category filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSubCategory('All');
                  setSearchQuery('');
                  setVisibleCount(18);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {displayedProducts.map((p) => {
                return (
                  <article
                    key={p.id}
                    className="product-card product-card-catalog animated-product-card"
                  >
                    <div className="product-catalog-media">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                      />
                      <span className="product-catalog-quote-badge">
                        Custom Quote
                      </span>
                    </div>

                    <div className="product-catalog-body">
                      <div className="product-catalog-meta">
                        <span className="product-catalog-category">
                          {p.category}
                        </span>
                        {p.moq && (
                          <span className="product-catalog-moq">
                            MOQ: {p.moq}
                          </span>
                        )}
                      </div>

                      <h3 className="product-catalog-title">
                        <a
                          href={`/products/${p.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/products/${p.slug}`);
                          }}
                        >
                          {p.name}
                        </a>
                      </h3>

                      <div className="product-catalog-specs">
                        {p.specs.slice(0, 2).map(([k, v], idx) => (
                          <div key={idx} className="spec-row">
                            <span className="spec-k">{k}:</span>
                            <span className="spec-v">{v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="product-catalog-availability">
                        <span aria-hidden="true" />
                        Factory Quote on Request
                      </div>

                      <div className="product-catalog-actions">
                        <a
                          href={`/products/${p.slug}`}
                          className="product-catalog-view"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/products/${p.slug}`);
                          }}
                        >
                          View Specs
                        </a>
                        <button
                          type="button"
                          className="product-catalog-quote"
                          onClick={() => openQuoteModal(p.name)}
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Show More Pagination */}
          {filteredProducts.length > displayedProducts.length && (
            <div className="catalog-show-more-wrap">
              <p className="catalog-show-more-note">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </p>
              <button
                type="button"
                className="catalog-show-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 18)}
              >
                <span>Load More Products ({filteredProducts.length - displayedProducts.length} Remaining)</span>
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          )}
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
