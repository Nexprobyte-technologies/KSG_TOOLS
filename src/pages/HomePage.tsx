import React, { useState, useMemo } from 'react';
import {
  products,
  categories,
  company,
  factsheet,
  featuredSlugs,
  videos,
  Product,
} from '../data/ksgData';
import { Icon } from '../components/Icon';
import { VideoPlayer } from '../components/VideoPlayer';

interface HomePageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  navigate,
  openQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Home default without search or category filter: display featured products
    if (selectedCategory === 'All' && !searchQuery.trim() && sortBy === 'featured') {
      const slugMap = new Map(products.map((p) => [p.slug, p]));
      const featuredList = featuredSlugs
        .map((slug) => slugMap.get(slug))
        .filter((p): p is Product => !!p);
      return featuredList;
    }

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
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
  }, [selectedCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <main>
      {/* 1. Hero Section */}
      <section id="home" className="hero" aria-label="Hero Introduction">
        <div className="hero-bg-media" aria-hidden="true">
          <img
            alt="K.S.G. Tools FEELER VMP-45A Precision CNC Machining Center"
            decoding="async"
            className="hero-bg-img"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              color: 'transparent',
              objectFit: 'cover',
            }}
            src="/infrastructure/feeler-vmp-45a-machining-center.webp"
          />
          <div className="hero-overlay" />
        </div>

        <div className="container hero-layout-centered">
          <div className="hero-content-centered">
            <span className="hero-badge">
              <Icon name="factory" size={14} /> Estd. 2009 · Industrial Tool
              Manufacturer · Coimbatore
            </span>
            <h1>
              Industrial Cutting Tools, Shredder Knives &amp; VMC Machining by{' '}
              <span className="accent">K.S.G. Tools</span>
            </h1>
            <p className="lead">
              Coimbatore-based direct manufacturer of high-wear Chipper Knives,
              Shredder Blades, Granulator Cutters, Precision Tools &amp; Dies, and
              4-Axis CNC VMC Machining.
            </p>

            <div className="hero-stats">
              <div className="stat-card">
                <div className="val">{company.years}+</div>
                <div className="label">Years Manufacturing Hub</div>
              </div>
              <div className="stat-card">
                <div className="val">{products.length}+</div>
                <div className="label">Product &amp; Service Lines</div>
              </div>
              <div className="stat-card">
                <div className="val">±0.02mm</div>
                <div className="label">Machining Precision</div>
              </div>
              <div className="stat-card">
                <div className="val">100%</div>
                <div className="label">Direct Factory Supply</div>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="btn btn-primary hero-btn-primary"
                href="/products"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/products');
                }}
              >
                <Icon name="blade" size={16} /> Explore Products
              </a>
              <a
                className="btn btn-outline hero-btn-outline"
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                }}
              >
                <Icon name="gear" size={16} /> Request a Quote
              </a>
            </div>

            <div className="hero-feature-tags">
              <span className="hero-tag-item">
                <Icon name="check" size={13} /> D2 &amp; HCHCr High-Grade Tool
                Steels
              </span>
              <span className="hero-tag-item">
                <Icon name="gear" size={13} /> 4-Axis CNC VMC &amp; Custom
                Sampling
              </span>
              <span className="hero-tag-item">
                <Icon name="truck" size={13} /> All-India Road Dispatch
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Featured Product Catalog */}
      <section
        id="shredder-knives"
        className="section section-alt catalog-section home-catalog-section"
      >
        <div className="container">
          <div id="catalog-products-anchor" />

          <div className="section-head center home-catalog-head">
            <span className="eyebrow">Featured Products &amp; Services</span>
            <h2>Precision Industrial Tools &amp; Machinery</h2>
            <p className="sub">
              Manufacturer of Double Shaft Shredder Knives, Chipper Blades,
              Press Tool Dies &amp; Industrial Shredders in Coimbatore.
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
                onClick={() => {
                  setSelectedCategory('All');
                  setVisibleCount(6);
                }}
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
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setVisibleCount(6);
                  }}
                  aria-pressed={selectedCategory === c.name}
                >
                  <Icon
                    name={
                      c.name.includes('Chipper')
                        ? 'blade'
                        : c.name.includes('Shredder Knives')
                          ? 'gear'
                          : c.name.includes('Tools')
                            ? 'hammer'
                            : c.name.includes('Machine')
                              ? 'factory'
                              : c.name.includes('Grinder')
                                ? 'disc'
                                : c.name.includes('Granulator')
                                  ? 'gear'
                                  : 'grass'
                    }
                    size={15}
                  />
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
              <label htmlFor="home-catalog-sort-select">Sort by:</label>
              <select
                id="home-catalog-sort-select"
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
              </span>
              <p>
                {selectedCategory === 'All'
                  ? 'Explore our complete range of precision chipper knives, press tool dies, shredding machinery, industrial grinder blades, and VMC job work from Coimbatore.'
                  : `Explore our ${selectedCategory.toLowerCase()} range, manufactured with precision at our Coimbatore workshop.`}
              </p>
            </div>
            <div className="home-catalog-summary-count">
              <strong>{displayedProducts.length}</strong>
              <span>Items shown</span>
            </div>
          </div>

          {/* Products Grid */}
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

          {filteredProducts.length > displayedProducts.length && (
            <div className="catalog-show-more-wrap">
              <p className="catalog-show-more-note">
                Showing {displayedProducts.length} of {filteredProducts.length}{' '}
                products
              </p>
              <button
                type="button"
                className="catalog-show-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 12)}
              >
                <span>Load More Products ({filteredProducts.length - displayedProducts.length} Remaining)</span>
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                navigate('/products');
              }}
              style={{
                color: 'var(--machinery-orange)',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              View Full 83+ Product Catalog with Advanced Search →
            </a>
          </div>
        </div>
      </section>

      {/* 3. 5-Stage Precision Manufacturing Process */}
      <section id="process" className="section process-section" aria-label="Manufacturing Process">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Technical Workflow</span>
            <h2>Our 5-Stage Precision Manufacturing Process</h2>
            <p className="sub">
              From raw alloy billet to finished high-wear blade: how K.S.G. Tools
              ensures exceptional longevity, sharp cut quality, and zero-defect
              fitment.
            </p>
          </div>

          <div className="process-flow-grid">
            <div className="process-card">
              <div className="process-card-top">
                <span className="process-num">01</span>
                <div className="process-icon-wrap" aria-hidden="true">
                  <Icon name="gear" size={20} />
                </div>
              </div>
              <span className="process-tag">Engineering Drawing</span>
              <h3 className="process-title">Tool Profiling &amp; Sampling</h3>
              <p className="process-desc">
                We analyze client component drawings, sample blades, or
                machinery specifications to engineer exact knife profiles with
                ±0.02mm tolerances.
              </p>
              <div className="process-connector" aria-hidden="true">
                <span className="connector-dot" />
              </div>
            </div>

            <div className="process-card">
              <div className="process-card-top">
                <span className="process-num">02</span>
                <div className="process-icon-wrap" aria-hidden="true">
                  <Icon name="blade" size={20} />
                </div>
              </div>
              <span className="process-tag">Metallurgy Grade</span>
              <h3 className="process-title">Certified Tool Steel Selection</h3>
              <p className="process-desc">
                Rigorous material selection utilizing premium D2 (AISI D2), HCHCr
                (High Carbon High Chromium), High Carbon Steel, or SS304 to
                match the cutting application.
              </p>
              <div className="process-connector" aria-hidden="true">
                <span className="connector-dot" />
              </div>
            </div>

            <div className="process-card">
              <div className="process-card-top">
                <span className="process-num">03</span>
                <div className="process-icon-wrap" aria-hidden="true">
                  <Icon name="wrench" size={20} />
                </div>
              </div>
              <span className="process-tag">Precision Milling</span>
              <h3 className="process-title">4-Axis CNC VMC Machining</h3>
              <p className="process-desc">
                Heavy-duty CNC milling executed on rigid FEELER VMP-45A and
                VMP-40A vertical machining centers for exacting bolt patterns
                and bevel angles.
              </p>
              <div className="process-connector" aria-hidden="true">
                <span className="connector-dot" />
              </div>
            </div>

            <div className="process-card">
              <div className="process-card-top">
                <span className="process-num">04</span>
                <div className="process-icon-wrap" aria-hidden="true">
                  <Icon name="shield" size={20} />
                </div>
              </div>
              <span className="process-tag">Hardening &amp; Tempering</span>
              <h3 className="process-title">Controlled Heat Treatment</h3>
              <p className="process-desc">
                Precisely controlled thermal hardening and multi-stage
                tempering to achieve peak Rockwell hardness without edge
                brittleness under shock loads.
              </p>
              <div className="process-connector" aria-hidden="true">
                <span className="connector-dot" />
              </div>
            </div>

            <div className="process-card">
              <div className="process-card-top">
                <span className="process-num">05</span>
                <div className="process-icon-wrap" aria-hidden="true">
                  <Icon name="truck" size={20} />
                </div>
              </div>
              <span className="process-tag">QC &amp; Safe Transport</span>
              <h3 className="process-title">
                Precision Edge Grinding &amp; Dispatch
              </h3>
              <p className="process-desc">
                Ultra-sharp precision surface grinding, dimensional optical
                verification, protective anti-rust coating, and palletized road
                dispatch across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quality Materials & QA Protocol */}
      <section className="section section-alt quality-materials-section" aria-label="Materials and Quality Standards">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Engineered For Longevity</span>
            <h2>Tool Steels, Quality Inspection &amp; Industries</h2>
            <p className="sub">
              We use verified metallurgical grades and rigorous workshop
              inspection to ensure your cutting equipment runs with minimal
              downtime and maximum shear efficiency.
            </p>
          </div>

          <div className="qm-split-grid">
            <div className="qm-col">
              <div className="qm-col-head">
                <span className="qm-icon-wrap" aria-hidden="true">
                  <Icon name="blade" size={20} />
                </span>
                <div>
                  <span className="qm-col-tag">Certified Metallurgy</span>
                  <h3 className="qm-col-title">High-Grade Tool Steels</h3>
                </div>
              </div>

              <div className="qm-items-list">
                <div className="qm-item-card">
                  <div className="qm-item-top">
                    <strong className="qm-grade-name">D2 Tool Steel</strong>
                    <span className="qm-grade-badge">High Wear Resistance</span>
                  </div>
                  <div className="qm-grade-full">
                    AISI D2 / 1.2379 Cold Work Steel
                  </div>
                  <p className="qm-grade-desc">
                    Exceptional wear resistance and edge retention. Ideal for
                    plastic granulators, abrasive polymer regrind, and
                    recycling shredders.
                  </p>
                </div>

                <div className="qm-item-card">
                  <div className="qm-item-top">
                    <strong className="qm-grade-name">HCHCr Steel</strong>
                    <span className="qm-grade-badge">
                      Heavy Impact Toughness
                    </span>
                  </div>
                  <div className="qm-grade-full">
                    High Carbon High Chromium Alloy
                  </div>
                  <p className="qm-grade-desc">
                    High compressive strength and tough shear resistance for
                    heavy-duty timber chippers, wood processing, and metal
                    shredder blocks.
                  </p>
                </div>

                <div className="qm-item-card">
                  <div className="qm-item-top">
                    <strong className="qm-grade-name">High Carbon Steel</strong>
                    <span className="qm-grade-badge">High Resilience</span>
                  </div>
                  <div className="qm-grade-full">
                    Special Hardened Carbon Tool Steel
                  </div>
                  <p className="qm-grade-desc">
                    Engineered for agricultural biomass, chaff cutting, and
                    recycling applications requiring shock absorbency and
                    resharpenability.
                  </p>
                </div>

                <div className="qm-item-card">
                  <div className="qm-item-top">
                    <strong className="qm-grade-name">Stainless Steel SS304</strong>
                    <span className="qm-grade-badge">Corrosion Resistant</span>
                  </div>
                  <div className="qm-grade-full">
                    Austenitic Stainless Steel
                  </div>
                  <p className="qm-grade-desc">
                    High corrosion resistance for agricultural coir shredders,
                    food-grade chopping knives, and wet-granulation
                    environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="qm-col">
              <div className="qm-col-head">
                <span className="qm-icon-wrap emerald" aria-hidden="true">
                  <Icon name="shield" size={20} />
                </span>
                <div>
                  <span className="qm-col-tag">Precision Engineering</span>
                  <h3 className="qm-col-title">Quality Assurance Protocol</h3>
                </div>
              </div>

              <div className="qm-items-list">
                <div className="qm-qc-card">
                  <div className="qm-qc-icon" aria-hidden="true">
                    <Icon name="check" size={18} />
                  </div>
                  <div>
                    <h4 className="qm-qc-title">±0.02mm Dimensional Accuracy</h4>
                    <p className="qm-qc-desc">
                      Rigid tolerance inspection ensures precision alignment in
                      dual-shaft shredder shafts and die sets.
                    </p>
                  </div>
                </div>

                <div className="qm-qc-card">
                  <div className="qm-qc-icon" aria-hidden="true">
                    <Icon name="shield" size={18} />
                  </div>
                  <div>
                    <h4 className="qm-qc-title">Rockwell Hardness Verification</h4>
                    <p className="qm-qc-desc">
                      Controlled thermal hardening checked to ensure maximum
                      edge life without brittleness under shock.
                    </p>
                  </div>
                </div>

                <div className="qm-qc-card">
                  <div className="qm-qc-icon" aria-hidden="true">
                    <Icon name="blade" size={18} />
                  </div>
                  <div>
                    <h4 className="qm-qc-title">Optical Edge &amp; Bevel Inspection</h4>
                    <p className="qm-qc-desc">
                      Every cutting edge is ground to exact OEM bevel angles
                      for clean shearing and low motor load.
                    </p>
                  </div>
                </div>

                <div className="qm-qc-card">
                  <div className="qm-qc-icon" aria-hidden="true">
                    <Icon name="truck" size={18} />
                  </div>
                  <div>
                    <h4 className="qm-qc-title">100% Direct Factory Dispatch</h4>
                    <p className="qm-qc-desc">
                      Final rust-preventive packaging and secure palletized
                      road dispatch directly from Coimbatore.
                    </p>
                  </div>
                </div>
              </div>

              <div className="industries-box">
                <h4 className="industries-box-title">Industries We Serve Across India</h4>
                <div className="industries-chips-grid">
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">Plastic &amp; Polymer Recycling</strong>
                      <span className="ind-sub">Granulators &amp; Shredders</span>
                    </div>
                  </div>
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">Wood &amp; Biomass Chipping</strong>
                      <span className="ind-sub">Wood Chipper Blades</span>
                    </div>
                  </div>
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">Scrap Metal Processing</strong>
                      <span className="ind-sub">Double Shaft Shredders</span>
                    </div>
                  </div>
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">Agricultural Biomass &amp; Coir</strong>
                      <span className="ind-sub">Chaff &amp; Husk Cutters</span>
                    </div>
                  </div>
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">Foundry &amp; Press Tooling</strong>
                      <span className="ind-sub">Dies &amp; Moulds</span>
                    </div>
                  </div>
                  <div className="industry-chip">
                    <span className="ind-dot" aria-hidden="true" />
                    <div>
                      <strong className="ind-name">CNC Machining Center Job Work</strong>
                      <span className="ind-sub">4-Axis Milling</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stats Band */}
      <section className="stats-band" aria-label="Company statistics">
        <div className="container">
          <div className="stat">
            <div className="val">{company.estd}</div>
            <div className="label">Established Year</div>
          </div>
          <div className="stat">
            <div className="val">{products.length}+</div>
            <div className="label">Products &amp; Services</div>
          </div>
          <div className="stat">
            <div className="val">{company.years}+</div>
            <div className="label">Years Manufacturing Hub</div>
          </div>
          <div className="stat">
            <div className="val">100%</div>
            <div className="label">Quality Tested &amp; Direct Dispatch</div>
          </div>
        </div>
      </section>

      {/* 6. Milestone Section */}
      <section id="services" className="section section-alt milestone-section" aria-label="Our Services">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Manufacturing &amp; Supply</span>
            <h2>Industrial Services &amp; Capabilities</h2>
            <p className="sub">
              From single blade sampling to full machine tooling setups, K.S.G.
              Tools delivers end-to-end tooling expertise from our Coimbatore
              workshop.
            </p>
          </div>

          <div className="milestone-grid">
            <div className="ms-col">
              <div className="milestone-card">
                <div className="ms-head">
                  <span className="ms-num">01</span>
                  <div className="ms-ico" aria-hidden="true">
                    <Icon name="gear" size={22} />
                  </div>
                </div>
                <span className="ms-tag">In-house production</span>
                <h3>Precision Tool Manufacturer</h3>
                <p>
                  Direct manufacturing of shredder knives, granulator blades,
                  chipper knives and custom dies engineered to fit your
                  machinery OEM specs.
                </p>
              </div>

              <div className="milestone-card">
                <div className="ms-head">
                  <span className="ms-num">02</span>
                  <div className="ms-ico" aria-hidden="true">
                    <Icon name="factory" size={22} />
                  </div>
                </div>
                <span className="ms-tag">Bulk &amp; OEM supply</span>
                <h3>Wholesale &amp; Volume Supply</h3>
                <p>
                  Bulk and wholesale supply with direct factory value,
                  consistent metallurgical stock and dependable dispatch
                  schedules for recycling plants.
                </p>
              </div>
            </div>

            <div className="ms-col">
              <div className="milestone-card">
                <div className="ms-head">
                  <span className="ms-num">03</span>
                  <div className="ms-ico" aria-hidden="true">
                    <Icon name="wrench" size={22} />
                  </div>
                </div>
                <span className="ms-tag">±0.02mm Tolerance</span>
                <h3>4-Axis VMC Machining &amp; Job Work</h3>
                <p>
                  Precision CNC vertical machining center job work with
                  material, custom component profiling, drilling, and precision
                  slotting to drawing.
                </p>
              </div>

              <div className="milestone-card">
                <div className="ms-head">
                  <span className="ms-num">04</span>
                  <div className="ms-ico" aria-hidden="true">
                    <Icon name="knife" size={22} />
                  </div>
                </div>
                <span className="ms-tag">Custom profiling</span>
                <h3>Custom Sampling &amp; Resharpening</h3>
                <p>
                  Rapid sampling from worn blades or CAD drawings, and
                  specialized industrial blade regrinding to OEM edge sharpness
                  and bevel angles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Videos Showcase */}
      <section id="videos" className="section section-videos-showcase">
        <div className="container">
          <div className="section-head center">
            <div className="video-live-badge">
              <span className="live-dot" />
              <span className="live-text">Live Machine &amp; Knife Demonstrations</span>
            </div>
            <h2>Watch Our Machines in Real-Time Action</h2>
            <p className="sub">
              Direct operational trials from our Coimbatore workshop — witness
              the raw cutting power, high torque precision, and durability of our
              industrial shredders and knives.
            </p>
          </div>

          <div className="videos-showcase-grid">
            {videos.map((vid) => (
              <VideoPlayer
                key={vid.id}
                video={vid}
                openQuoteModal={openQuoteModal}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <a
              href="/videos"
              onClick={(e) => {
                e.preventDefault();
                navigate('/videos');
              }}
              style={{
                color: 'var(--machinery-orange)',
                fontWeight: 700,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Explore All Machine Operational Demos →
            </a>
          </div>
        </div>
      </section>

      {/* 8. Factsheet Section */}
      <section id="factsheet" className="section factsheet-section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Corporate Credentials</span>
            <h2>Company Factsheet</h2>
            <p className="sub">
              Verified statutory information, operational credentials, and
              commercial profile of K.S.G. Tools.
            </p>
          </div>

          <div className="factsheet-trust-bar">
            <div className="trust-pill">
              <span className="trust-pill-icon">
                <Icon name="badge" size={16} />
              </span>
              <span>
                Estd. <strong>{company.estd}</strong> ({company.years}+ Years of
                Excellence)
              </span>
            </div>
            <div className="trust-pill">
              <span className="trust-pill-icon">
                <Icon name="pin" size={16} />
              </span>
              <span>
                Based in <strong>{company.city}, Tamil Nadu</strong>
              </span>
            </div>
            <div className="trust-pill">
              <span className="trust-pill-icon">
                <Icon name="check" size={16} />
              </span>
              <span>
                GST Registered: <strong>{company.gst}</strong>
              </span>
            </div>
            <div className="trust-pill">
              <span className="trust-pill-icon">
                <Icon name="shield" size={16} />
              </span>
              <span>Direct Manufacturer</span>
            </div>
          </div>

          <div className="factsheet-bento">
            {/* Box 1: Company Profile */}
            <div className="fact-box highlight">
              <div className="fact-box-header">
                <div className="fact-icon-wrap">
                  <Icon name="users" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Leadership &amp; Entity</span>
                  <h3 className="fact-box-title">Company Profile</h3>
                </div>
              </div>

              <div className="fact-row-list">
                <div className="fact-item">
                  <span className="fact-label">Company CEO</span>
                  <strong className="fact-val">{factsheet.ceo}</strong>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Legal Status of Firm</span>
                  <strong className="fact-val">{factsheet.legalStatus}</strong>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Total Number of Employees</span>
                  <strong className="fact-val">{factsheet.employees}</strong>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Operating Headquarters</span>
                  <strong className="fact-val">
                    {company.city}, Tamil Nadu, India
                  </strong>
                </div>
              </div>
            </div>

            {/* Box 2: GST Identification */}
            <div className="fact-box gst-highlight gst-factsheet-card">
              <div className="fact-box-header">
                <div className="fact-icon-wrap emerald">
                  <Icon name="document" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Tax &amp; Legal Compliance</span>
                  <span className="gst-verified-badge">
                    <Icon name="check" size={12} /> Active &amp; Verified
                  </span>
                  <h3 className="fact-box-title">GST Identification</h3>
                </div>
              </div>

              <div className="gst-number-box">
                <span className="fact-label">GSTIN / Tax ID</span>
                <strong className="fact-val highlight-val">{company.gst}</strong>
              </div>

              <div className="fact-row-list gst-factsheet-details">
                <div className="fact-item">
                  <span className="fact-label">GST Registration Date</span>
                  <strong className="fact-val">
                    {factsheet.gstRegYear} (Regular Taxpayer)
                  </strong>
                </div>
                <div className="fact-item">
                  <span className="fact-label">B2B Tax Invoicing</span>
                  <strong className="fact-val green-text">
                    100% Tax Compliant GST Invoices
                  </strong>
                </div>
              </div>
            </div>

            {/* Box 3: Nature of Business */}
            <div className="fact-box">
              <div className="fact-box-header">
                <div className="fact-icon-wrap">
                  <Icon name="factory" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Industry Scope</span>
                  <h3 className="fact-box-title">Nature of Business</h3>
                </div>
              </div>

              <div className="primary-nature-banner">
                <span className="nature-badge-primary">
                  <Icon name="blade" size={16} /> Primary: {factsheet.natureOfBusiness}
                </span>
              </div>

              <div className="fact-label" style={{ marginBottom: 8, marginTop: 14 }}>
                Operational Verticals
              </div>
              <div className="fact-chip-container">
                {factsheet.additionalBusiness.map((biz, idx) => (
                  <span key={idx} className="fact-chip">
                    <Icon name="check" size={12} className="chip-icon" />
                    {biz}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 4: Bankers */}
            <div className="fact-box">
              <div className="fact-box-header">
                <div className="fact-icon-wrap">
                  <Icon name="building" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Financial Partners</span>
                  <h3 className="fact-box-title">Bankers</h3>
                </div>
              </div>

              <div className="bank-list">
                {factsheet.bankers.map((bank, idx) => (
                  <div key={idx} className="bank-card">
                    <div className="bank-icon-dot">{idx + 1}</div>
                    <div className="bank-info">
                      <span className="bank-name">{bank}</span>
                      <span className="bank-type">Authorized Commercial Banking</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="fact-sub-note">
                Secure institutional accounts for RTGS, NEFT, IMPS, and corporate transfers.
              </p>
            </div>

            {/* Box 5: Accepted Payment Modes */}
            <div className="fact-box">
              <div className="fact-box-header">
                <div className="fact-icon-wrap">
                  <Icon name="money" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Commercial Terms</span>
                  <h3 className="fact-box-title">Accepted Payment Modes</h3>
                </div>
              </div>

              <div className="payment-modes-grid">
                {factsheet.paymentModes.map((mode, idx) => (
                  <div key={idx} className="payment-mode-pill">
                    <span className="payment-dot" />
                    <span>{mode}</span>
                  </div>
                ))}
              </div>
              <p className="fact-sub-note">
                Flexible payment channels for corporate procurement, wholesale, and retail orders.
              </p>
            </div>

            {/* Box 6: Shipment & Delivery */}
            <div className="fact-box">
              <div className="fact-box-header">
                <div className="fact-icon-wrap">
                  <Icon name="truck" size={20} />
                </div>
                <div>
                  <span className="fact-box-tag">Supply Chain</span>
                  <h3 className="fact-box-title">Shipment &amp; Delivery</h3>
                </div>
              </div>

              <div className="shipment-badge-box">
                <div className="shipment-primary">
                  <Icon name="truck" size={24} />
                  <div>
                    <span className="shipment-title">Mode: {factsheet.shipmentMode}</span>
                    <span className="shipment-sub">Surface freight &amp; secure road transport</span>
                  </div>
                </div>
              </div>

              <div className="fact-row-list" style={{ marginTop: 12 }}>
                <div className="fact-item">
                  <span className="fact-label">Dispatch Location</span>
                  <span className="fact-val">{company.city}, Tamil Nadu</span>
                </div>
                <div className="fact-item">
                  <span className="fact-label">Delivery Range</span>
                  <span className="fact-val">Tamil Nadu &amp; Pan-India Dispatch</span>
                </div>
              </div>
            </div>
          </div>

          <div className="factsheet-footer-banner">
            <div className="footer-banner-text">
              <h4>Need Quotation, GST Invoicing or Supplier Onboarding?</h4>
              <p>
                Our team provides instant proforma invoices, GST compliance
                certificates, and fast delivery timelines.
              </p>
            </div>
            <div className="footer-banner-actions">
              <a href={`tel:${company.phoneLink}`} className="btn-banner-primary">
                <Icon name="phone" size={16} /> Call {company.phone}
              </a>
              <a
                href={`https://wa.me/${company.whatsapp}?text=Hello%20KSG%20Tools,%20I%20would%20like%20to%20get%20a%20quotation%20and%20factsheet%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-banner-secondary"
              >
                <Icon name="chat" size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Location & Workshop Section */}
      <section className="section section-alt location-section" id="location-map">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">
              <Icon name="pin" size={14} /> Factory &amp; Workshop Map
            </span>
            <h2>Our Exact Location on Google Maps</h2>
            <p className="sub">
              Visit our workshop &amp; manufacturing unit near Prozone Mall,
              Saravanampatti, Coimbatore.
            </p>
          </div>

          <div className="location-box-card">
            <div className="location-info-row">
              <div className="location-info-cell">
                <div className="location-icon-badge">
                  <Icon name="factory" size={20} />
                </div>
                <div className="location-text">
                  <span className="location-sub-label">
                    Manufacturing Unit &amp; Office
                  </span>
                  <strong className="location-title">{company.name}</strong>
                  <p className="location-address">{company.address}</p>
                </div>
              </div>

              <div className="location-buttons-row">
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-directions-hero"
                  title="Open live Google Maps app for turn-by-turn directions"
                >
                  <Icon name="pin" size={16} /> Open in Google Maps ↗
                </a>
                <a
                  href={`tel:${company.phoneLink}`}
                  className="btn btn-outline-dark btn-call-hero"
                  title="Call our workshop"
                >
                  <Icon name="phone" size={16} /> Call: {company.phone}
                </a>
              </div>
            </div>

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

            <div className="location-meta-chips">
              <div className="meta-chip">
                <Icon name="gear" size={14} />
                <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
              </div>
              <div className="meta-chip">
                <Icon name="check" size={14} />
                <span>Direct Customer Pickup &amp; Site Visits Welcome</span>
              </div>
              <div className="meta-chip">
                <Icon name="truck" size={14} />
                <span>Pan-India Safe Cargo Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA Band */}
      <section className="cta-band" aria-label="Call to action">
        <div className="container">
          <h2 style={{ color: '#ffffff', fontWeight: 800 }}>
            Looking for Shredder Knives or Blades?
          </h2>
          <p style={{ color: '#e2e8f0' }}>
            Get competitive quotes and timely delivery for your industrial
            cutting requirements.
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
