import React from 'react';
import { company, factsheet, whyUs } from '../data/ksgData';
import { Icon } from '../components/Icon';

interface AboutPageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  navigate,
  openQuoteModal,
}) => {
  return (
    <main>
      {/* 1. Page Hero */}
      <section className="page-hero">
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
                <span>About K.S.G. Tools</span>
              </div>
              <span className="eyebrow">Our Heritage &amp; Expertise</span>
              <h1>About K.S.G. Tools</h1>
              <p>
                Pioneering precision industrial cutting tools, heavy-duty
                shredder knives, wood chipper blades, and advanced 4-Axis VMC
                tooling in Coimbatore since 2009.
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
              <div className="hero-capability-card">
                <div className="capability-card-head">
                  <span className="capability-badge">
                    <Icon name="factory" size={13} /> Coimbatore Works
                  </span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Estd. {company.estd}
                  </span>
                </div>
                <div className="capability-title">Manufacturing Credentials</div>
                <div className="capability-items-grid">
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="gear" size={13} /> {company.years}+ Years Experience
                    </div>
                    <div className="capability-item-desc">
                      Supplying recycling, paper, timber &amp; foundry industries
                    </div>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="gear" size={13} /> Founder &amp; CEO
                    </div>
                    <div className="capability-item-desc">
                      Mr. {factsheet.ceo} — Proprietorship Firm
                    </div>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="pin" size={13} /> Workshop Location
                    </div>
                    <div className="capability-item-desc">
                      Saravanampatti, Coimbatore — Industrial Hub
                    </div>
                  </div>
                  <div className="capability-item">
                    <div className="capability-item-title">
                      <Icon name="shield" size={13} /> GST Registered
                    </div>
                    <div className="capability-item-desc">
                      GSTIN: {company.gst} · 100% Tax Compliant
                    </div>
                  </div>
                </div>

                <div className="capability-actions">
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Hi%20K.S.G.%20Tools%2C%20I%20want%20to%20learn%20more%20about%20your%20manufacturing%20unit%20in%20Coimbatore.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-hero-wa"
                  >
                    <Icon name="chat" size={14} /> Connect With Works
                  </a>
                  <a href={`tel:${company.phoneLink}`} className="btn-hero-call">
                    <Icon name="phone" size={13} /> Call {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Story & Pillars Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="eyebrow">About K.S.G. Tools</span>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, marginTop: '10px', lineHeight: 1.25 }}>
                Precision Cutting Tool &amp; Recycling Machinery Manufacturer Since {company.estd}
              </h2>
              <p style={{ marginTop: '20px', color: 'var(--ink-soft)' }}>
                Established as a <strong>Proprietorship firm in the year {company.estd}</strong> by <strong>{factsheet.ceo} (Proprietor &amp; CEO)</strong>, &ldquo;<strong>K.S.G. Tools</strong>&rdquo; has evolved into one of South India&apos;s most reliable manufacturers, wholesalers, traders, and retailers of high-grade industrial cutting tools, shredder knives, chipper blades, and precision machine dies.
              </p>
              <p style={{ color: 'var(--ink-soft)' }}>
                Operating from our specialized engineering facility in Saravanampatti, Coimbatore (Tamil Nadu), we serve recycling plants, paper and pulp processors, timber mills, foundries, and agricultural operations with toolings engineered for extreme mechanical resilience, extended sharpen life, and exact OEM machine fitments.
              </p>
              <p style={{ color: 'var(--ink-soft)' }}>
                From custom sampling from a customer&apos;s worn-out cutter to high-volume CNC machining batches on our 4-axis VMC machining centers, we uphold strict dimensional tolerance, certified metallurgical standards, and responsive direct-to-works communication.
              </p>

              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openQuoteModal()}
                >
                  <Icon name="document" size={15} /> Request Factory Quote
                </button>
                <a
                  href="/KSG-Tools-Product-Catalogue.pdf"
                  download="KSG-Tools-Product-Catalogue.pdf"
                  className="btn btn-outline"
                >
                  <Icon name="download" size={15} /> Download Catalogue PDF
                </a>
              </div>
            </div>

            <div className="about-media">
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img
                  src="/infrastructure/feeler-vmp-45a-machining-center.jpg"
                  alt="FEELER VMP-45A Machining Center at KSG Tools"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'linear-gradient(to top, rgba(9, 14, 23, 0.9) 0%, transparent 100%)',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                >
                  FEELER VMP-45A Precision 4-Axis Vertical Machining Center
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars */}
          <div style={{ marginTop: '70px' }}>
            <div className="section-head center" style={{ marginBottom: '36px' }}>
              <span className="eyebrow">Engineering Excellence</span>
              <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 800 }}>
                The 4 Pillars of K.S.G. Tools Manufacturing
              </h3>
              <p className="sub" style={{ maxWidth: '680px', margin: '8px auto 0' }}>
                Every knife, blade, and die set manufactured in our facility is anchored by these core technical advantages.
              </p>
            </div>

            <div className="pillars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon name="blade" size={22} />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
                  Premium Certified Tool Steels
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                  We work with AISI D2 (1.2379), HCHCr (D3), EN-31, High Speed Steel (M2/HSS), and Hardox steel grades selected specifically to resist premature abrasive edge breakdown.
                </p>
              </div>

              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon name="gear" size={22} />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
                  4-Axis CNC VMC Machining
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                  In-house FEELER VMP-45A and VMP-40A vertical machining centers equipped with 4th-axis rotary indexing for complex cutter profiles, precision hex bores, and knife pockets.
                </p>
              </div>

              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon name="wrench" size={22} />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
                  Precision Toolroom &amp; Grinding
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                  Equipped with digital readout (DRO) turret milling machines, CAD/CAM programming stations, and universal tool &amp; cutter grinders achieving micron-level edge sharpness.
                </p>
              </div>

              <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon name="shield" size={22} />
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.35 }}>
                  Strict 100% Quality Inspection
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                  Every blade undergoes dimensional tolerance verification, hardness indentation testing, and dynamic rotor balancing before dispatch from our Coimbatore plant.
                </p>
              </div>
            </div>
          </div>

          {/* Industries Powered by Our Tooling */}
          <div style={{ marginTop: '70px' }}>
            <div className="section-head center" style={{ marginBottom: '36px' }}>
              <span className="eyebrow">Application Sectors</span>
              <h3 style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', fontWeight: 800 }}>
                Industries Powered by Our Tooling
              </h3>
              <p className="sub" style={{ maxWidth: '680px', margin: '8px auto 0' }}>
                Our industrial knives and precision fixtures serve demanding heavy-duty recycling and manufacturing operations across India.
              </p>
            </div>

            <div className="industries-grid">
              <div className="industry-card">
                <div className="industry-num-badge">1</div>
                <div className="industry-card-body">
                  <h4>Plastic &amp; Polymer Recycling</h4>
                  <p>High-wear granulator knives, rotary rotor blades, and bed knives for crushing HDPE, PP, PVC, and PET bottles.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">2</div>
                <div className="industry-card-body">
                  <h4>Wood Chipping &amp; Timber Processing</h4>
                  <p>2-slot and multi-hole wood chipper knives, veneer slicers, and debarking blades for paper mills and sawmills.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">3</div>
                <div className="industry-card-body">
                  <h4>Tyre &amp; Rubber Shredding</h4>
                  <p>Heavy-duty dual shaft shredder cutters engineered to tear through tough steel-belted radial tyres without jamming.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">4</div>
                <div className="industry-card-body">
                  <h4>Metal &amp; E-Waste Shredding</h4>
                  <p>Shock-resistant alloy cutters for electronic waste, aluminium scrap, and industrial barrel shredding.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">5</div>
                <div className="industry-card-body">
                  <h4>Agricultural &amp; Chaff Cutting</h4>
                  <p>Rectangular and curved chaff cutter blades providing clean fodder cutting with prolonged cutting life.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">6</div>
                <div className="industry-card-body">
                  <h4>Press Tools &amp; Die Manufacturing</h4>
                  <p>PDC moulds, automotive stamping dies, aluminium pattern tooling, and precision contract VMC job work.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">7</div>
                <div className="industry-card-body">
                  <h4>Paper, Pulp &amp; Packaging</h4>
                  <p>Precision paper slitter knives, corrugated board carton slitters, guillotine blades, and paper core cutting knives.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">8</div>
                <div className="industry-card-body">
                  <h4>Textile &amp; Synthetic Fiber Recycling</h4>
                  <p>High-speed fabric shredder blades, carpet shearing cutters, and rotary shear knives for synthetic textile waste.</p>
                </div>
              </div>

              <div className="industry-card">
                <div className="industry-num-badge">9</div>
                <div className="industry-card-body">
                  <h4>Automotive &amp; Heavy Engineering</h4>
                  <p>Automotive forming dies, casting pattern moulds, industrial fixtures, and high-precision CNC VMC contract components.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div style={{ marginTop: '70px', background: 'var(--steel-white, #f4f6f8)', borderRadius: '16px', padding: '36px 30px' }}>
            <span className="eyebrow">Direct Value</span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginTop: '6px' }}>
              Why Clients Rely On K.S.G. Tools
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
              {whyUs.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#ffffff',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(242, 140, 40, 0.15)',
                      color: 'var(--machinery-orange)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Band */}
      <section className="stats-band" aria-label="Company statistics">
        <div className="container">
          <div className="stat">
            <div className="val">{company.estd}</div>
            <div className="label">Established Year</div>
          </div>
          <div className="stat">
            <div className="val">83+</div>
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
