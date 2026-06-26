import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { HiOutlineMoon, HiOutlineSun, HiMenu, HiX } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';
import Logo from './Logo';
import styles from '../styles/components/Navbar.module.css';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance Animation
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.8,
        delay: 1.4, // Starts last for the final "reveal"
        ease: "back.out(1.2)" // The macOS "Settle" effect
      }
    );
  }, []);

  // Mobile Menu & Backdrop Logic
  useEffect(() => {
    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" });
      gsap.to(backdropRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.4 });
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", opacity: 0, duration: 0.5, ease: "power4.in" });
      gsap.to(backdropRef.current, { opacity: 0, pointerEvents: "none", duration: 0.4 });
    }
  }, [menuOpen]);

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "GUIDE", path: "/guide" },
    { name: "COMMUNITY", path: "/community" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <>
      <header className={`${styles.mainHeader} ${scrolled ? styles.isScrolled : ''}`} ref={headerRef}>
        <nav className={styles.navContainer}>
          {/* Logo on the left */}
          <Link to="/" className={styles.logoLink}><Logo /></Link>

          <div className={styles.navRight}>
            {/* Desktop Links */}
            <div className={styles.desktopLinks}>
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path} className={styles.navLink}>{item.name}</Link>
              ))}
              <button className={styles.langPill}>English <FaChevronDown size={10} /></button>
              <button className={styles.downloadBtn}>DOWNLOAD<div className={styles.btnUnderline}></div></button>
            </div>

            {/* Mobile Actions: Order -> Theme -> Lang -> Menu */}
            <div className={styles.mobileActions}>
              <button className={styles.iconBtn} onClick={toggleTheme}>
                {theme === 'light' ? <HiOutlineMoon size={22} /> : <HiOutlineSun size={22} />}
              </button>
              <button className={styles.langPillMobile}>English <FaChevronDown size={10} /></button>
              <button className={styles.hamburger} onClick={() => setMenuOpen(true)}><HiMenu size={28} /></button>
            </div>

            {/* Desktop Theme Toggle */}
            <button className={`${styles.iconBtn} ${styles.desktopOnly}`} onClick={toggleTheme}>
              {theme === 'light' ? <HiOutlineMoon size={20} /> : <HiOutlineSun size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Dimmed Backdrop */}
      <div className={styles.menuBackdrop} ref={backdropRef} onClick={() => setMenuOpen(false)} />

      {/* Floating Glassy Mobile Menu (75% width) */}
      <div className={styles.mobileOverlay} ref={mobileMenuRef}>
        <div className={styles.overlayHeader}>
          <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
            <HiX size={32} />
          </button>
        </div>

        <div className={styles.overlayLinks}>
          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} className={styles.overlayLink} onClick={() => setMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
          <button className={styles.mobileDownloadMain}>DOWNLOAD</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;