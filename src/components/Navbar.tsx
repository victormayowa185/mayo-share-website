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

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance Animation (Desktop)
  useEffect(() => {
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
    );
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.5, ease: "expo.out" });
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.5, ease: "expo.in" });
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
          {/* LEFT: Logo */}
          <Link to="/" className={styles.logoLink}>
            <Logo />
          </Link>

          {/* RIGHT: Desktop Nav */}
          <div className={styles.navRight}>
            <div className={styles.desktopLinks}>
              {menuItems.map((item) => (
                <Link key={item.name} to={item.path} className={styles.navLink}>
                  {item.name}
                </Link>
              ))}
              
              {/* Language Pill */}
              <button className={styles.langPill}>
                English <FaChevronDown size={10} />
              </button>

              <button className={styles.downloadBtn}>
                DOWNLOAD
                <div className={styles.btnUnderline}></div>
              </button>
            </div>

            {/* Mobile Actions (Visible only on small screens) */}
            <div className={styles.mobileActions}>
              <button className={styles.iconBtn} onClick={toggleTheme}>
                {theme === 'light' ? <HiOutlineMoon size={22} /> : <HiOutlineSun size={22} />}
              </button>
              
              <button className={styles.langPillMobile}>
                English <FaChevronDown size={10} />
              </button>

              <button className={styles.hamburger} onClick={() => setMenuOpen(true)}>
                <HiMenu size={28} />
              </button>
            </div>

            {/* Desktop Theme Toggle */}
            <button className={`${styles.iconBtn} ${styles.desktopOnly}`} onClick={toggleTheme}>
              {theme === 'light' ? <HiOutlineMoon size={20} /> : <HiOutlineSun size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div className={styles.mobileOverlay} ref={mobileMenuRef}>
        <div className={styles.overlayHeader}>
          <Logo />
          <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
            <HiX size={30} />
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