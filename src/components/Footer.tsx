import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "../styles/components/Footer.module.css";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const portfolioUrl = "https://victormayowa.dev";

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    // Apple-style bottom-to-top luxury entrance
    gsap.fromTo(footerRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        delay: 1.5, // Starts after Hero text
        ease: "power4.out" 
      }
    );
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.left}>
        <span>© 2026 MAYO Share · </span>
        <button
          className={styles.linkBtn}
          onClick={() => openExternal("https://github.com/victormayowa185/mayo-share/blob/main/LICENSE")}
        >
          View License
        </button>
      </div>

      <div className={styles.right}>
        <span>A Product from </span>
        <button
          className={styles.linkBtn}
          onClick={() => openExternal(portfolioUrl)}
        >
          MAYO X
        </button>
      </div>
    </footer>
  );
};

export default Footer;