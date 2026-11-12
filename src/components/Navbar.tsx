import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products & Services', href: '/products' },
    { label: 'Manufacturing Area', href: '/photos' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const catalogueHref = '/KSG-Tools-Product-Catalogue.pdf';
  const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    'Hello KSG Tools, I would like to get a quotation and factsheet details.'
  )}`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    navigate(href);
  };

  const handleQuoteClick = () => {
    closeMobileMenu();
    openQuoteModal();
  };

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <>
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
              className="phone-pill"
              href={`tel:${company.phoneLink}`}
              title={`Call K.S.G. Tools direct: ${company.phone}`}
            >
              <Icon name="phone" size={14} />
              <span className="phone-pill-text">{company.phone}</span>
            </a>

            <button
              type="button"
              className="btn btn-primary nav-quote-btn"
              onClick={handleQuoteClick}
            >
              <Icon name="document" size={13} />
              <span className="btn-text-full">Request a Quote</span>
            </button>

            <a
              className="btn btn-primary nav-download-btn"
              href={catalogueHref}
              download="KSG-Tools-Product-Catalogue.pdf"
            >
              <Icon name="download" size={13} />
              <span className="btn-text-full">Download Catalogue</span>
            </a>
          </div>

          {/* Mobile sidebar controls: burger + quick quote pill (styled via CSS on small screens) */}
          <div className="mobile-nav-controls">
            <button
              type="button"
              className="btn btn-primary mobile-nav-quote"
              onClick={handleQuoteClick}
            >
              <Icon name="document" size={14} />
              <span>Request Quote</span>
            </button>

            <button
              type="button"
              className="burger"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar / Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="nav-backdrop"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <div
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation menu"
          >
            <div className="mobile-drawer-head">
              <div className="mobile-drawer-brand">
                <span className="brand-mark small">K</span>
                <span className="mobile-drawer-name">K.S.G. Tools</span>
              </div>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <ul className="mobile-drawer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive(link.href) ? 'active' : ''}
                    onClick={(e) => handleLinkClick(link.href, e)}
                  >
                    <span>{link.label}</span>
                    <Icon name="arrowRight" size={16} className="arrow" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-cta">
              <button
                type="button"
                className="btn btn-primary mobile-cta-quote"
                onClick={handleQuoteClick}
              >
                <Icon name="document" size={16} />
                <span>Request a Quote</span>
              </button>
              <a
                className="btn btn-outline mobile-cta-download"
                href={catalogueHref}
                download="KSG-Tools-Product-Catalogue.pdf"
              >
                <Icon name="download" size={16} />
                <span>Download Catalogue</span>
              </a>
              <a
                className="btn btn-wa mobile-cta-wa"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="chat" size={16} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};
