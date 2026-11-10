import React from 'react';
import { videos, company } from '../data/ksgData';
import { Icon } from '../components/Icon';
import { VideoPlayer } from '../components/VideoPlayer';

interface VideosPageProps {
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({
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
                <span>Video Demos</span>
              </div>
              <span className="eyebrow">Machine &amp; Knife Videos</span>
              <h1>Watch Our Machines in Real-Time Action</h1>
              <p>
                Direct operational trials from our Coimbatore workshop — witness the raw cutting power, high torque precision, and durability of our industrial shredders and knives.
              </p>
              <div className="page-hero-pills">
                <span className="page-hero-pill">
                  <Icon name="video" size={13} /> High-Torque Dual Shafts
                </span>
                <span className="page-hero-pill">
                  <Icon name="blade" size={13} /> D2 Hardened Steel Knives
                </span>
                <span className="page-hero-pill">
                  <Icon name="factory" size={13} /> Coimbatore Trials
                </span>
              </div>
            </div>

            <div className="page-hero-aside">
              <div className="hero-capability-card">
                <div className="capability-card-head">
                  <span className="capability-badge">
                    <Icon name="video" size={13} /> Live Trials
                  </span>
                  <span className="capability-verified">
                    <Icon name="check" size={13} /> Verified Demos
                  </span>
                </div>
                <div className="capability-title">Custom Material Trial Runs</div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 16px 0' }}>
                  Send us your scrap sample material (plastic, coconut husk, tyres, metal) to test cutting performance on our machines.
                </p>
                <div className="capability-actions">
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Hello%20KSG%20Tools%2C%20I%20want%20to%20request%20a%20material%20trial%20run%20for%20shredding.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Icon name="chat" size={15} /> WhatsApp Trial Request
                  </a>
                  <a
                    href={`tel:${company.phoneLink}`}
                    className="btn-hero-call"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Icon name="phone" size={14} /> Call: {company.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Gallery */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="videos-showcase-grid">
            {videos.map((vid) => (
              <VideoPlayer
                key={vid.id}
                video={vid}
                openQuoteModal={openQuoteModal}
              />
            ))}
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
