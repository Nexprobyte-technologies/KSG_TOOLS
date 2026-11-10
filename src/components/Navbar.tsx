import React, { useState } from 'react';
import { Icon } from './Icon';
import { company } from '../data/ksgData';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  openQuoteModal: (productName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  openQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products & Services', href: '/products' },
    { label: 'Manufacturing Area', href: '/photos' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(href);
  };

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <header className="navbar" role="banner">
      <div className="container">
        <a
          className="brand"
          aria-label="K.S.G. Tools Home"
          href="/"
          onClick={(e) => handleLinkClick('/', e)}
        >
          <img
            className="brand-logo-image"
            src="/hero/logo.png"
            alt="K.S.G. Tools"
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className={isActive(link.href) ? 'active' : ''}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta">
          <a
            href={`tel:${company.phoneLink}`}
            className="phone-pill"
            title={`Call K.S.G. Tools direct: ${company.phone}`}
          >
            <Icon name="phone" size={14} />
            <span className="phone-pill-text">{company.phone}</span>
          </a>

          <button
            type="button"
            className="btn btn-primary nav-quote-btn"
            title="Request a Factory Quote"
            onClick={() => openQuoteModal()}
          >
            <Icon name="document" size={13} />
            <span>Request Quote</span>
          </button>

          <a
            href="/KSG-Tools-Product-Catalogue.pdf"
            download="KSG-Tools-Product-Catalogue.pdf"
            className="btn btn-primary nav-catalog-btn"
          >
            <Icon name="download" size={13} />
            <span>Catalogue</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--navy, #172334)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 16px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e)}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color: isActive(link.href)
                      ? 'var(--machinery-orange, #f28c28)'
                      : '#ffffff',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: isActive(link.href)
                      ? 'rgba(242, 140, 40, 0.15)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href={`tel:${company.phoneLink}`}
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
              }}
            >
              <Icon name="phone" size={16} />
              <span>Call: {company.phone}</span>
            </a>
            <button
              type="button"
              className="btn btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
              }}
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
            >
              <Icon name="document" size={16} />
              <span>Request Factory Quote</span>
            </button>
            <a
              href="/KSG-Tools-Product-Catalogue.pdf"
              download="KSG-Tools-Product-Catalogue.pdf"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              <Icon name="download" size={16} />
              <span>Download Catalogue</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
