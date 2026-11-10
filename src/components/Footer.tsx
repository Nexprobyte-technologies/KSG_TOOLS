import React from 'react';
import { Icon } from './Icon';
import { company, factsheet } from '../data/ksgData';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <img
                className="brand-logo-image"
                src="/hero/logo.png"
                alt="K.S.G. Tools"
              />
            </div>
            <p className="footer-about">
              Established as a Proprietorship firm in the year {company.estd}, K.S.G. Tools is a leading manufacturer, wholesaler, trader and retailer of industrial cutting tools and recycling machinery from {company.city}.
            </p>
            <div className="footer-trust-tags">
              <span className="footer-tag">
                <Icon name="check" size={14} /> GST: <strong>{company.gst}</strong>
              </span>
              <span className="footer-tag">
                <Icon name="factory" size={14} /> <strong>{company.years}+ Years</strong> Experience
              </span>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/" onClick={(e) => handleLinkClick('/', e)}>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick('/about', e)}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" onClick={(e) => handleLinkClick('/products', e)}>
                  Products &amp; Services
                </a>
              </li>
              <li>
                <a href="/photos" onClick={(e) => handleLinkClick('/photos', e)}>
                  Manufacturing Area
                </a>
              </li>
              <li>
                <a href="/videos" onClick={(e) => handleLinkClick('/videos', e)}>
                  Video Demos
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLinkClick('/contact', e)}>
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/KSG-Tools-Product-Catalogue.pdf"
                  download="KSG-Tools-Product-Catalogue.pdf"
                  style={{ color: 'var(--machinery-orange)', fontWeight: 700 }}
                  title="Download complete verified product catalogue PDF"
                >
                  📥 Download Catalogue (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Corporate Credentials</h4>
            <ul>
              <li>
                GST Identification: <strong>{company.gst}</strong>
              </li>
              <li>Nature of Business: {factsheet.natureOfBusiness}</li>
              <li>Firm Status: {factsheet.legalStatus}</li>
              <li>CEO / Proprietor: {factsheet.ceo}</li>
              <li>Operational Base: {company.city}, Tamil Nadu</li>
            </ul>
          </div>

          <div>
            <h4>Works &amp; Enquiries</h4>
            <ul>
              <li>
                <a
                  href={company.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: 'var(--machinery-orange)',
                    textDecoration: 'none',
                    fontWeight: 700,
                  }}
                  title="Open exact workshop location in Google Maps"
                >
                  📍 {company.shortAddress} ↗
                </a>
              </li>
              <li>
                <a href={`tel:${company.phoneLink}`} title={`Call ${company.phone}`}>
                  📞 {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} title={`Email ${company.email}`}>
                  ✉️ {company.email}
                </a>
              </li>
            </ul>
            <p className="note">Workshop Hours: Mon - Sat · 9:00 AM to 7:00 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 K.S.G. Tools. All rights reserved.</span>
          <span>
            Precision Tooling &amp; Recycling Blade Manufacturer · {company.city}
          </span>
        </div>
      </div>
    </footer>
  );
};
