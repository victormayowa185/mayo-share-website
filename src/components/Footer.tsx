import React from "react";
import styles from "../styles/components/Footer.module.css";

const Footer: React.FC = () => {
  const portfolioUrl = "https://victormayowa.dev";

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className={styles.footer}>
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
        <span>Built by</span>
        <button
          className={styles.linkBtn}
          onClick={() => openExternal(portfolioUrl)}
        >
          VICTOR MAYOWA
        </button>
      </div>
    </footer>
  );
};

export default Footer;