This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: repomix.md, node_modules, dist, .git
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
eslint.config.js
index.html
package.json
public/mayo.png
README.md
src/App.css
src/App.tsx
src/assets/images/dark-img1.png
src/assets/images/dark-img2.png
src/assets/images/light-img1.png
src/assets/images/light-img2.png
src/components/Footer.tsx
src/components/icon/protection.tsx
src/components/icon/speed.tsx
src/components/icon/wifi.tsx
src/components/Logo.tsx
src/components/Navbar.tsx
src/i18n.ts
src/index.css
src/main.tsx
src/pages/Guide.tsx
src/pages/Home.tsx
src/styles/components/Footer.module.css
src/styles/components/Logo.module.css
src/styles/components/Navbar.module.css
src/styles/pages/Guide.module.css
src/styles/pages/Home.module.css
src/styles/theme.css
src/themeInit.ts
vite.config.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/pages/Guide.tsx">
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/pages/Guide.module.css';

const FULL_STEPS = [
  { id: 1, title: 'Open the App', description: 'Launch MAYO Share on your phone. On your laptop, open your browser and go to share.mayo.app.' },
  { id: 2, title: 'Choose Method', description: 'Tap Send on your phone. Choose Receiver Method (app-to-app) or Browser Method.' },
  { id: 3, title: 'Connect', description: 'Scan the QR code on your laptop screen, or tap the device name.' },
  { id: 4, title: 'Select & Send', description: 'Pick photos, videos, or documents. Hit Send – the transfer starts instantly.' },
  { id: 5, title: 'Done', description: 'On the laptop, accept the transfer. Files land in your Downloads folder.' },
];

gsap.registerPlugin(ScrollTrigger);

const GuidePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Entrance (Badge, then Title)
      gsap.fromTo(".animate-header > *", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power4.out",
          delay: 0.2 
        }
      );

      // 2. Sidebar Slide-in
      gsap.fromTo(sidebarRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );

      // 3. Card Revel (as you scroll)
      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(step,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.2)", // The Apple "Settle" effect
            scrollTrigger: {
              trigger: step,
              start: "top 88%", // Triggers when the card is near bottom of screen
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.guidePage} ref={containerRef}>
      <div className={styles.guideContainer}>
        
        {/* ─── LEFT COLUMN ─── */}
        <div className={styles.mainContent}>
          <div className={`${styles.guideHeader} animate-header`} ref={headerRef}>
            <span className={styles.guideBadge}>Guide</span>
            <h1 className={styles.guideTitle}>Share files in <span className={styles.guideAccent}>5 simple steps</span></h1>
          </div>

          <div className={styles.stepsWrapper}>
            {FULL_STEPS.map((step, index) => (
              <div 
                key={step.id} 
                className={styles.stepCard} 
                ref={el => { stepRefs.current[index] = el; }}
              >
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <span className={styles.stepNumber}>0{step.id}</span>
                </div>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className={styles.sidebar} ref={sidebarRef}>
          <div className={styles.jumpCard}>
            <div className={styles.jumpNavTitle}>Jump to Step</div>
            <div className={styles.jumpList}>
              {FULL_STEPS.map((step, index) => (
                <div key={step.id} className={styles.jumpItem} onClick={() => scrollToStep(index)}>
                  <span className={styles.jumpItemNumber}>0{step.id}</span>
                  <span className={styles.jumpItemText}>{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <h4>💡 Pro Tip</h4>
            <p>Use <strong>Browser Method</strong> to send to any laptop without installing anything!</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuidePage;
</file>

<file path="src/styles/pages/Guide.module.css">
.guidePage {
  padding: 140px 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.guideContainer {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.mainContent {
  flex: 0 0 68%;
}

/* ── Sidebar ── */
.sidebar {
  flex: 0 0 32%;
  position: sticky;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  opacity: 0; /* Handled by GSAP */
}

/* ── Jump To Step Container ── */
.jumpCard {
  background: var(--bg-color);
  border: 1px solid rgba(124, 62, 255, 0.1);
  border-radius: 16px;
  position: relative;
  padding-top: 48px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

[data-theme='dark'] .jumpCard {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.05);
}

.jumpNavTitle {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--primary-color);
  color: #fff;
  padding: 8px 20px;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 0 0 12px 0;
  box-shadow: 4px 4px 15px rgba(124, 62, 255, 0.2);
}

.jumpItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(124, 62, 255, 0.05);
}

.jumpItem:hover {
  background: rgba(124, 62, 255, 0.04);
  padding-left: 25px; /* Subtle slide effect on hover */
}

.jumpItemNumber {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--primary-color);
  background: rgba(124, 62, 255, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Step Cards (Apple Style Reveal) ── */
.stepsWrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.stepCard {
  position: relative;
  border-left: 4px solid var(--primary-color);
  padding: 24px 0 24px 32px;
  background: rgba(124, 62, 255, 0.02);
  border-radius: 0 20px 20px 0;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0; /* GSAP will animate this to 1 */
  will-change: transform, opacity;
}

.stepCard:hover {
  border-left-width: 8px;
  background: rgba(124, 62, 255, 0.05);
  transform: translateX(10px); /* Smooth slide on hover */
}

.stepContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stepTitle {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.5px;
}

.stepNumber {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--primary-color);
  opacity: 0.08; /* Large ghost number behind */
  position: absolute;
  right: 20px;
  top: 10px;
}

.stepDescription {
  font-size: 1.1rem;
  color: var(--text-sub);
  line-height: 1.6;
  max-width: 600px;
}

/* ── Typography ── */
.guideBadge {
  display: inline-block;
  background: rgba(124, 62, 255, 0.1);
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 5px 16px;
  border-radius: 30px;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.guideTitle {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.1;
  margin-bottom: 50px;
}

.guideAccent { color: var(--primary-color); }

.sidebarCard {
  padding: 24px;
  background: rgba(124, 62, 255, 0.04);
  border-radius: 16px;
  border: 1px solid rgba(124, 62, 255, 0.08);
}

@media (max-width: 900px) {
  .guideContainer { flex-direction: column; }
  .mainContent, .sidebar { flex: 0 0 100%; width: 100%; }
  .guideTitle { font-size: 2.2rem; }
}
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
repomix-output.xml
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
</file>

<file path="README.md">
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
</file>

<file path="src/App.css">
*{
  font-family: mulish;
}
</file>

<file path="src/components/icon/wifi.tsx">
"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface WifiIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WifiIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const WIFI_LEVELS = [
  { d: "M12 20h.01", initialOpacity: 1, delay: 0 },
  { d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
  { d: "M5 12.859a10 10 0 0 1 14 0", initialOpacity: 1, delay: 0.2 },
  { d: "M2 8.82a15 15 0 0 1 20 0", initialOpacity: 1, delay: 0.3 },
];

const WifiIcon = forwardRef<WifiIconHandle, WifiIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        },
        stopAnimation: () => controls.start("fadeIn"),
      };
    });

    // Auto‑start loop if requested
    useEffect(() => {
      if (loop) {
        const run = async () => {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        };
        run();
        intervalRef.current = setInterval(run, 1500);
        return () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }, [loop, controls]);

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (!loop && !isControlledRef.current) {
          await controls.start("fadeOut");
          controls.start("fadeIn");
        }
        onMouseEnter?.(e);
      },
      [controls, onMouseEnter, loop]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!loop && !isControlledRef.current) {
          controls.start("fadeIn");
        }
        onMouseLeave?.(e);
      },
      [controls, onMouseLeave, loop]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {WIFI_LEVELS.map((level, index) => (
            <motion.path
              animate={controls}
              d={level.d}
              initial={{ opacity: level.initialOpacity }}
              key={index}
              variants={{
                fadeOut: {
                  opacity: index === 0 ? 1 : 0,
                  transition: { duration: 0.2 },
                },
                fadeIn: {
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: level.delay,
                  },
                },
              }}
            />
          ))}
        </svg>
      </div>
    );
  }
);

WifiIcon.displayName = "WifiIcon";

export { WifiIcon };
</file>

<file path="src/components/Logo.tsx">
import React from 'react';
import styles from '../styles/components/Logo.module.css';

const Logo: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img 
        src="/mayo.png" 
        alt="MAYO" 
        className={styles.image} 
      />
      <div className={styles.textContainer}>
        <span className={styles.mayo}>MAYO</span>
        <span className={styles.share}>Share</span>
      </div>
    </div>
  );
};

export default Logo;
</file>

<file path="src/i18n.ts">
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// For the website, we detect the browser language automatically
const detectSystemLang = (): string => {
  const nav = window.navigator;
  const lang = (nav.languages && nav.languages[0]) || nav.language;
  return lang?.split("-")[0] || "en";
};

export async function initI18n() {
  const savedLang = localStorage.getItem("mayo-lang") || detectSystemLang();

  await i18next.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          home: "HOME",
          guide: "GUIDE",
          community: "COMMUNITY",
          contact: "CONTACT",
          download: "DOWNLOAD"
        }
      }
      // You can add more languages here (fr, es, yo, etc.) 
      // by importing your JSON files later
    },
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
}

export default i18next;
</file>

<file path="src/index.css">
*{
  font-family: mulish;
}
</file>

<file path="src/main.tsx">
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initI18n } from "./i18n";
import "./styles/theme.css"; // Ensure this matches your filename
import { initTheme } from './themeInit';

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

initTheme();
const root = ReactDOM.createRoot(container);

// Initialize i18n before rendering the app
initI18n().then(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});
</file>

<file path="src/themeInit.ts">
export function initTheme() {
  const saved = localStorage.getItem("theme-mode") || "system";
  applyTheme(saved as any);
}

export function applyTheme(mode: "system" | "light" | "dark") {
  let themeToApply = mode;
  if (mode === "system") {
    themeToApply = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", themeToApply);
  localStorage.setItem("theme-mode", mode);
}

export function getTheme(): "system" | "light" | "dark" {
  return (localStorage.getItem("theme-mode") as any) || "system";
}
</file>

<file path="vite.config.js">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
</file>

<file path="index.html">
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/mayo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MAYO Share</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>
</file>

<file path="package.json">
{
  "name": "mayo-share-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "i18next": "^26.3.2",
    "lucide-animated": "^1.0.4",
    "motion": "^12.42.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-i18next": "^17.0.8",
    "react-icons": "^5.6.0",
    "react-router-dom": "^7.18.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "eslint": "^10.5.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.6.0",
    "vite": "^8.1.0"
  }
}
</file>

<file path="src/components/icon/protection.tsx">
"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface ShieldCheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ShieldCheckIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const ShieldCheckIcon = forwardRef<ShieldCheckIconHandle, ShieldCheckIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    // Auto‑start loop if requested
    useEffect(() => {
      if (loop) {
        const run = () => {
          controls.start("animate").then(() => {
            timeoutRef.current = setTimeout(run, 2000);
          });
        };
        run();
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      }
    }, [loop, controls]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("animate");
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("normal");
      }
      onMouseLeave?.(e);
    };

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <motion.path
            animate={controls}
            d="m9 12 2 2 4-4"
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

ShieldCheckIcon.displayName = "ShieldCheckIcon";

export { ShieldCheckIcon };
</file>

<file path="src/components/icon/speed.tsx">
"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

export interface SpeedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SpeedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  loop?: boolean;
}

const PATH_VARIANTS: Variants = {
  normal: {
    rotate: -45, // resting position (low speed)
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  animate: {
    // revving pattern: left → right → settle → higher → return
    rotate: [-25, 20, 20, 20, -45],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      times: [0, 0.3, 0.5, 0.8, 1],
    },
  },
};

const SpeedIcon = forwardRef<SpeedIconHandle, SpeedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, loop = false, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    useEffect(() => {
      if (loop) {
        const run = () => {
          controls.start("animate").then(() => {
            timeoutRef.current = setTimeout(run, 1200); // delay between loops
          });
        };
        run();
        return () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      }
    }, [loop, controls]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("animate");
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!loop && !isControlledRef.current) {
        controls.start("normal");
      }
      onMouseLeave?.(e);
    };

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static speedometer background */}
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />

          {/* Animated needle group – pivot at the base (12,14) */}
          <motion.g
            animate={controls}
            initial="normal"
            variants={PATH_VARIANTS}
            style={{
              transformOrigin: '12px 14px', // needle base
            }}
          >
            <path d="m12 14 4-4" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

SpeedIcon.displayName = "SpeedIcon";

export { SpeedIcon };
</file>

<file path="src/App.tsx">
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import GuidePage from './pages/Guide';
import Footer from './components/Footer';
import './styles/theme.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme-mode') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="app-wrapper">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>  {/* 👈 WRAP with <Routes> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
</file>

<file path="src/components/Footer.tsx">
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
</file>

<file path="src/components/Navbar.tsx">
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
</file>

<file path="src/styles/components/Footer.module.css">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 24px;
  height: 28px;
  background: transparent;
  font-size: 0.75rem;
  color: var(--text-main);
  position: fixed;
  bottom: 10px;
  left: 0;
  right: 0;
  z-index: 40;
  pointer-events: none;
  opacity: 0;
  transform: translateY(50px);
  will-change: transform, opacity;
}

.left,
.right {
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
}

.linkBtn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  font-family: inherit;
}

.linkBtn:hover {
  color: var(--accent-hover);
  text-decoration: none;
}

/* ── Mobile fix: make footer static ── */
@media (max-width: 868px) {
  .footer {
    position: relative;      /* remove fixed positioning */
    bottom: auto;
    left: auto;
    right: auto;
    margin-top: 40px;        /* give some space above */
    pointer-events: auto;    /* enable clicks on entire footer */
  }
}

/* ── Very small screens: two columns side-by-side, each stacking vertically ── */
@media (max-width: 520px) {
  .footer {
    flex-direction: row;              /* keep side-by-side */
    justify-content: space-between;   /* left and right */
    align-items: stretch;             /* stretch to same height */
    height: auto;                     /* let height adjust */
    padding: 8px 16px;
    gap: 8px;
  }

  .left,
  .right {
    flex-direction: column;           /* stack content vertically */
    align-items: flex-start;          /* left-align text (optional) */
    gap: 2px;                         /* small gap between stacked items */
    width: auto;                      /* let content determine width */
    flex: 1;                          /* share space equally */
  }

  .linkBtn {
    font-size: 0.7rem;
    padding: 0;
  }

  /* Optional: centre both columns if you prefer */
  .left {
    align-items: flex-start;
  }
  .right {
    align-items: flex-end;            /* right-align the right column */
  }
}
</file>

<file path="src/styles/components/Logo.module.css">
.wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.image {
  height: 40px;
  width: auto;
}

.textContainer {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.mayo {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: var(--text-main);
}

.share {
  font-weight: 800;
  font-size: 20px;
  color: var(--text-sub);
  letter-spacing: 1.2px;
  text-transform: uppercase;
}
</file>

<file path="src/styles/theme.css">
/* Import Mulish Font */
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

:root {
  --primary-color: #7C3EFF;
   --bg-color-rgb: 255, 255, 255;
  --bg-color: #ffffff;
  --text-main: #1d1d1f;
  --text-sub: #6e6e73;
  /* Glass effect colors */
  --nav-bg: transparent;
  --nav-border: transparent;
  --nav-shadow: none;

  --transition-speed: 0.4s;
  --apple-curve: cubic-bezier(0.4, 0, 0.2, 1);

  --bg-statusbar: rgba(255, 255, 255, 0.8);
  --border: rgba(0, 0, 0, 0.1);
  --text-muted: #86868b;
  --accent: #7C3EFF;
  --accent-hover: #5a2bcc;

  --transition-speed: 0.4s;
  --apple-curve: cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme='dark'] {
  --bg-color-rgb: 5, 5, 5;
  --bg-color: #050505;
  --text-main: #f5f5f7;
  --text-sub: #a1a1a6;
  --border: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  /* Apply Mulish Everywhere */
  font-family: 'Mulish', sans-serif;
  transition: background-color var(--transition-speed) var(--apple-curve);
  -webkit-font-smoothing: antialiased;
}
</file>

<file path="src/pages/Home.tsx">
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TbSend } from 'react-icons/tb';
import { MdLock, MdWifiOff, MdSpeed, MdDevicesOther } from 'react-icons/md';
import { HiX } from 'react-icons/hi'; // 👈 For the close button
import { ShieldCheckIcon } from '../components/icon/protection';
import { WifiIcon } from '../components/icon/wifi';
import { SpeedIcon } from '../components/icon/speed';
import lightImg1 from '../assets/images/light-img1.png';
import darkImg1 from '../assets/images/dark-img1.png';
import lightImg2 from '../assets/images/light-img2.png';
import darkImg2 from '../assets/images/dark-img2.png';
import styles from '../styles/pages/Home.module.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const FEATURES = [
  {
    id: 'secured',
    icon: <ShieldCheckIcon size={52} loop={true} className={styles.animatedIconSvg} />,
    title: 'Secured',
    description: 'End-to-end encryption on every transfer. Your files go directly between devices — no cloud, no interception.',
    isAnimated: true,
  },
  {
    id: 'no-internet',
    icon: <WifiIcon size={52} loop={true} className={styles.animatedIconSvg} />,
    title: 'No Internet Required',
    description: 'Works entirely on your local network. No Wi-Fi? We create a hotspot. Zero dependency on the cloud.',
    isAnimated: true,
  },
  {
    id: 'fast',
    icon: <SpeedIcon size={52} loop={true} className={styles.animatedIconSvg} />,
    title: 'Blazing Fast',
    description: 'Transfer at full local network speeds — up to 1Gbps. Move entire folders in seconds, not minutes.',
    isAnimated: false,
  },
  {
    id: 'cross',
    icon: <MdDevicesOther size={32} />,
    title: 'Cross Platform',
    description: 'macOS, Windows, Linux — all talking to each other seamlessly. One app, every device.',
    isAnimated: false,
  },
];

// Helper to detect theme
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(newTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
};

const HeroSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }, []);

  return (
    <section className={styles.hero}>
      <h1 ref={headingRef} className={styles.heroHeading}>
        A more compatible way for{' '}
        <span className={styles.heroAccent}>file sharing</span>{' '}
        is here.
      </h1>
      <p ref={subRef} className={styles.heroSub}>
        Minimalist. Fast. Connection-first. Share anything with anyone nearby — no cables, no cloud, no limits.
      </p>
      <div ref={ctaRef} className={styles.ctaRow}>
        <button className={styles.ctaPrimary}>Download Free</button>
        <button className={styles.ctaSecondary}>See How It Works</button>
      </div>
    </section>
  );
};

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const planeIconRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScroll = useRef(0);
  const goingDown = useRef(true);
  const theme = useTheme();

  // 👇 State for the lightbox modal
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const plane = planeRef.current;
    const icon = planeIconRef.current;
    const path = pathRef.current;
    if (!section || !plane || !path || !icon) return;

    const ALIGN_OFFSET = 90;

    gsap.to(plane, {
      motionPath: {
        path: path,
        align: path,
        autoRotate: ALIGN_OFFSET,
        alignOrigin: [0.5, 0.5],
      },
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
        onUpdate: () => {
          const scrollY = window.scrollY;
          const nowGoingDown = scrollY >= lastScroll.current;
          lastScroll.current = scrollY;

          if (nowGoingDown !== goingDown.current) {
            goingDown.current = nowGoingDown;
            gsap.to(icon, {
              rotation: nowGoingDown ? 0 : 180,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        },
      },
    });

    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  const img1 = theme === 'dark' ? darkImg1 : lightImg1;
  const img2 = theme === 'dark' ? darkImg2 : lightImg2;

  return (
    <section ref={sectionRef} className={styles.features}>
      <div className={styles.featuresHeading}>
        <p className={styles.featuresEyebrow}>Why MAYO Share</p>
        <h2 className={styles.featuresTitle}>Built different.</h2>
      </div>

      <svg className={styles.zigzagSvg} viewBox="0 0 750 1000" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M 150 140 C 200 140, 480 140, 600 300 C 720 460, 200 460, 150 700 C 100 880, 480 880, 600 1000"
          fill="none"
          stroke="rgba(124, 62, 255, 0.12)"
          strokeWidth="2"
          strokeDasharray="8 10"
        />
      </svg>

      <div ref={planeRef} className={styles.plane}>
        <div ref={planeIconRef} className={styles.planeInner}>
          <TbSend size={60} color="#7C3EFF" />
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        {/* ROW 1: Secured – Left */}
        <div className={styles.featureLevel}>
          <div className={styles.leftCol} ref={el => cardRefs.current[0] = el}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={`${styles.cardIcon} ${FEATURES[0].isAnimated ? styles.cardIconAnimated : ''}`}>
                  {FEATURES[0].icon}
                </div>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardRight}>
                <h3 className={styles.cardTitle}>{FEATURES[0].title}</h3>
                <p className={styles.cardDesc}>{FEATURES[0].description}</p>
              </div>
            </div>
          </div>
          <div className={styles.rightCol} />
        </div>

        {/* ROW 2: Image (Left) | No Internet (Right) */}
        <div className={styles.featureLevel}>
          <div className={styles.leftCol} ref={el => cardRefs.current[1] = el}>
            <div className={styles.imageCard} onClick={() => setActiveImg(img1)}>
              <img src={img1} alt="Feature illustration" className={styles.cardImage} />
            </div>
          </div>
          <div className={styles.rightCol} ref={el => cardRefs.current[2] = el}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={`${styles.cardIcon} ${FEATURES[1].isAnimated ? styles.cardIconAnimated : ''}`}>
                  {FEATURES[1].icon}
                </div>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardRight}>
                <h3 className={styles.cardTitle}>{FEATURES[1].title}</h3>
                <p className={styles.cardDesc}>{FEATURES[1].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Blazing Fast (Left) | Image (Right) */}
        <div className={styles.featureLevel}>
          <div className={styles.leftCol} ref={el => cardRefs.current[3] = el}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={`${styles.cardIcon} ${FEATURES[2].isAnimated ? styles.cardIconAnimated : ''}`}>
                  {FEATURES[2].icon}
                </div>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardRight}>
                <h3 className={styles.cardTitle}>{FEATURES[2].title}</h3>
                <p className={styles.cardDesc}>{FEATURES[2].description}</p>
              </div>
            </div>
          </div>
          <div className={styles.rightCol} ref={el => cardRefs.current[4] = el}>
            <div className={styles.imageCard} onClick={() => setActiveImg(img2)}>
              <img src={img2} alt="Feature illustration" className={styles.cardImage} />
            </div>
          </div>
        </div>

        {/* ROW 4: Cross Platform – Right */}
        <div className={styles.featureLevel}>
          <div className={styles.leftCol} />
          <div className={styles.rightCol} ref={el => cardRefs.current[5] = el}>
            <div className={styles.card}>
              <div className={styles.cardLeft}>
                <div className={`${styles.cardIcon} ${FEATURES[3].isAnimated ? styles.cardIconAnimated : ''}`}>
                  {FEATURES[3].icon}
                </div>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardRight}>
                <h3 className={styles.cardTitle}>{FEATURES[3].title}</h3>
                <p className={styles.cardDesc}>{FEATURES[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MODAL / LIGHTBOX ─── */}
      {activeImg && (
        <div className={styles.modalOverlay} onClick={() => setActiveImg(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setActiveImg(null)}>
              <HiX size={32} />
            </button>
            <img src={activeImg} className={styles.modalImage} alt="Full view" />
          </div>
        </div>
      )}
    </section>
  );
};

const FAQSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(el => el !== null);

    items.forEach((item, index) => {
      gsap.fromTo(item,
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const faqs = [
    {
      q: 'Is it really free?',
      a: 'Yes, MAYO Share is 100% free and open source. There are no ads, no tracking, and no hidden costs.'
    },
    {
      q: 'Does it work over the internet?',
      a: 'No. MAYO Share uses your local Wi‑Fi network. Your data never leaves your local network.'
    },
    {
      q: 'Is it secure?',
      a: 'Yes. All transfers are encrypted using HTTPS. You can also enable PIN verification for extra security.'
    },
    {
      q: 'Where do files go?',
      a: 'Files are saved to your device\'s Downloads folder by default, but you can change this in the settings.'
    },
    {
      q: 'Which platforms are supported?',
      a: 'MAYO Share is available for Windows, macOS, Linux, Android, and iOS.'
    },
    {
      q: 'Do I need to create an account?',
      a: 'No. MAYO Share does not require any account or login. Just install and start sharing.'
    }
  ];

  return (
    <section className={styles.faqSection} ref={containerRef}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.faqItem}>
              <div
                ref={el => (itemsRef.current[i] = el)}
                className={styles.faqContentWrapper}
              >
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <FAQSection />
    <div className={styles.pageEndDivider} />
  </>
);

export default HomePage;
</file>

<file path="src/styles/components/Navbar.module.css">
.mainHeader {
  position: fixed;
  top: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: background 0.4s var(--apple-curve);
  background: transparent;

  /* APPLE INITIAL STATE: Pre-hide it in CSS */
  opacity: 0;
  transform: translateY(-120px);
  will-change: transform, opacity;
  -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}

.isScrolled {
  height: 50px;
 background: rgba(var(--bg-color-rgb, 255, 255, 255), 0.7); 
  backdrop-filter: blur(20px); /* Stronger blur for that premium macOS look */
  -webkit-backdrop-filter: blur(20px);
}

[data-theme='dark'] .isScrolled {
  background: rgba(10, 10, 10, 0.5);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2);
}

.navContainer {
  width: 100%;
  padding: 0 20px;
  /* Breathing room on the sides */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoLink {
  text-decoration: none;
}

.navRight {
  display: flex;
  align-items: center;
  gap: 25px;
}

.desktopLinks {
  display: flex;
  align-items: center;
  gap: 30px;
}

.navLink {
  text-decoration: none;
  color: var(--text-main);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.langPill,
.langPillMobile {
  background: transparent;
  border: none;
  color: var(--text-main);
  padding: 6px 14px;
  border-radius: 20px;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.downloadBtn {
  background: transparent;
  border: none;
  color: var(--primary-color);
  font-weight: 600;
  letter-spacing: 2.5px;
  font-size: 17px;
  cursor: pointer;
  position: relative;
  padding: 5px 0;
}

.btnUnderline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.5px;
  background-color: var(--primary-color);
  border-radius: 10px;
}

.iconBtn {
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.mobileActions {
  display: none;
}

.hamburger {
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
}

@media (max-width: 900px) {

  .desktopLinks,
  .desktopOnly {
    display: none;
  }

  .mobileActions {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}

/* --- Professional Glassy Mobile Menu --- */

/* Dimming background */
.menuBackdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1999;
  opacity: 0;
  pointer-events: none;
}

.mobileOverlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 55%;
  /* Aligned to right, 75% width */
  background: rgba(255, 255, 255, 0.95);
  /* Light Glass */
  border-radius: 0 0 0 30px;
  /* Rounded left corners */
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  z-index: 2000;
  transform: translateX(100%);
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-shadow: -15px 0 50px rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] .mobileOverlay {
  background: rgba(15, 15, 15, 0.7);
  /* Dark Glass */
  box-shadow: -15px 0 50px rgba(0, 0, 0, 0.5);
}

.overlayHeader {
  display: flex;
  justify-content: flex-end;
  /* Push close button to the right */
  margin-bottom: 40px;
}

.closeBtn {
  background: none;
  border: none;
  color: var(--text-main);
  cursor: pointer;
}

.overlayLinks {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.overlayLink {
  text-decoration: none;
  color: var(--text-main);
  font-size: 22px;
  font-weight: 900;
  /* Extra Bold like the reference */
  letter-spacing: -0.5px;
  transition: color 0.3s;
}

.overlayLink:hover {
  color: var(--primary-color);
}

.mobileDownloadMain {
  margin-top: 10px;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 40px;
  /* Fully pill-shaped like image */
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(124, 62, 255, 0.2);
}
</file>

<file path="src/styles/pages/Home.module.css">
/* ── Hero ─────────────────────────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
}

.heroHeading {
  font-size: 3.5rem;
  font-weight: 800;
  max-width: 860px;
  line-height: 1.1;
  letter-spacing: -1.5px;
  color: var(--text-main);
  opacity: 0;

  transform: translateY(60px);
}

.heroAccent {
  color: var(--primary-color);
}

.heroSub {
  margin-top: 28px;
  font-size: 1.2rem;
  color: var(--text-sub);
  max-width: 520px;
  line-height: 1.7;
  opacity: 0;
  transform: translateY(30px);
}

.ctaRow {
  margin-top: 44px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  opacity: 0;
  transform: translateY(20px);
}

.ctaPrimary {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Mulish', sans-serif;
  box-shadow: 0 8px 30px rgba(124, 62, 255, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ctaPrimary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 36px rgba(124, 62, 255, 0.4);
}

.ctaSecondary {
  background: transparent;
  color: var(--text-main);
  border: 2px solid var(--primary-color);
  padding: 16px 36px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Mulish', sans-serif;
  transition: border-color 0.2s ease;
}

.ctaSecondary:hover {
  border-color: rgba(124, 62, 255, 0.3);
}

/* ── Features ─────────────────────────────────────────────────── */
.features {
  position: relative;
  max-width: 850px;
  margin: 0 auto;
  padding: 1px 24px 160px;
  overflow: hidden;
}

.featuresHeading {
  text-align: center;
  margin-bottom: 100px;
}

.featuresEyebrow {
  color: var(--primary-color);
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.featuresTitle {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-main);
  margin-top: 12px;
  letter-spacing: -0.5px;
}

/* SVG zigzag track */
.zigzagSvg {
  position: absolute;
  top: 200px;
  left: 0;
  width: 100%;
  height: calc(100% - 200px);
  pointer-events: none;
  overflow: visible;
}

/* Flying plane */
.plane {
  position: absolute;
  top: 200px;
  left: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

/* Cards zigzag layout */
.cardsWrapper {
  display: flex;
  flex-direction: column;
  gap: 80px;
  position: relative;
  z-index: 2;
}

.cardRow {
  display: flex;
  justify-content: flex-start;
  opacity: 0;
}

.cardRowRight {
  justify-content: flex-end;
}

.card {
  width: 100%;
  max-width: 380px;
  /* slightly wider to fit icon + text */
  background: rgba(124, 62, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(124, 62, 255, 0.1);
  border-radius: 24px;
  padding: 30px 24px;
  box-shadow: 0 8px 40px rgba(124, 62, 255, 0.06);
  display: flex;
  align-items: center;
  gap: 0;
  /* we'll control spacing via padding */
}

.cardLeft {
  flex-shrink: 0;
  padding-right: 16px;
}

.cardIcon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(124, 62, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7C3EFF;
  /* remove margin-bottom */
}

.cardIconAnimated {
  background: transparent !important;
}

.cardDivider {
  width: 2px;
  height: 60px;
  background: rgba(124, 62, 255, 0.2);
  flex-shrink: 0;
  margin: 0 16px;
}

.cardRight {
  flex: 1;
  min-width: 0;
  /* prevents overflow */
}

.cardTitle {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 4px;
  /* reduce gap */
  letter-spacing: -0.3px;
}

.cardDesc {
  color: var(--text-sub);
  font-size: 0.95rem;
  /* slightly smaller to fit */
  line-height: 1.5;
  margin: 0;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 768px) {

  .cardRow,
  .cardRowRight {
    justify-content: center;
  }

  .zigzagSvg {
    display: none;
  }

  .plane {
    display: none;
  }
}

/* ── FAQ Section ──────────────────────────────────────────────── */
.faqSection {
  max-width: 850px;
  margin: 0 auto;
  padding: 60px 24px 20px;
}

.faqContainer {
  width: 100%;
}

.faqHeading {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 48px;
  letter-spacing: -0.5px;
}

.faqList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faqSection {
  max-width: 850px;
  margin: 0 auto;
  padding: 60px 24px 100px;
  /* Adjusted padding */
}

.faqItem {
  position: relative;
  /* Remove full border, add only left bar */
  border-left: 4px solid var(--primary-color);
  padding: 20px 0 20px 30px;
  margin-bottom: 24px;
  background: transparent;
  /* Cleaner look without the box */

  /* This ensures the text looks like it slides out from the bar */
  overflow: hidden;
}

.faqContentWrapper {
  /* This is what we will animate with GSAP */
  display: flex;
  flex-direction: column;
}

.faqQuestion {
  font-size: 1.3rem;
  /* Slightly larger */
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 8px;
  letter-spacing: -0.4px;
}

.faqAnswer {
  font-size: 1.05rem;
  color: var(--text-sub);
  line-height: 1.6;
  max-width: 700px;
}

.faqItem:hover {
  border-color: rgba(124, 62, 255, 0.25);
  box-shadow: 0 4px 20px rgba(124, 62, 255, 0.06);
}

.faqQuestion {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 6px;
  letter-spacing: -0.3px;
}

.faqAnswer {
  font-size: 1rem;
  color: var(--text-sub);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .faqSection {
    max-width: 90%;
    margin: 0 auto;
    padding: 40px 24px 80px;
  }


  .faqItem {
    padding: 18px 20px;
  }

  .faqQuestion {
    font-size: 1rem;
  }

  .faqAnswer {
    font-size: 0.95rem;
  }
}

.cardAnimatedIcon {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
}


/* ... keep your existing .card styles ... */

.iconOnlyCard {
  width: 100%;
  max-width: 300px;
  background: rgba(124, 62, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(124, 62, 255, 0.1);
  border-radius: 24px;
  padding: 30px;
  /* Generous padding for the icon */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 40px rgba(124, 62, 255, 0.06);
  color: var(--text-main);
  /* Ensure SVG stroke="currentColor" works */
}

/* Reduces the gap between the text card and its icon card */
.iconCardMargin {
  margin-top: -60px;
  /* Pull the icon card closer to the text card above it */
}

/* Ensure the animated SVGs use the theme colors correctly */
.iconOnlyCard svg {
  stroke: var(--text-main);
  filter: drop-shadow(0 0 8px rgba(124, 62, 255, 0.2));
}

@media (max-width: 768px) {
  .iconCardMargin {
    margin-top: -60px;
    /* Keep consistent on mobile */
  }
}


/* Container for each horizontal level (row) */
.featureLevel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 40px;
  position: relative;
  z-index: 2;
  min-height: 200px;
  /* ensures vertical space for each row */
}

/* Left and Right columns inside each row */
.leftCol,
.rightCol {
  width: 50%;
  display: flex;
}

.leftCol {
  justify-content: flex-start;
}

.rightCol {
  justify-content: flex-end;
}

/* Icon-only card style (must match text card width) */
.iconOnlyCard {
  width: 100%;
  max-width: 300px;
  background: rgba(124, 62, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(124, 62, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 40px rgba(124, 62, 255, 0.06);
}

.iconOnlyCard svg {
  color: var(--primary-color);
  filter: drop-shadow(0 0 8px rgba(124, 62, 255, 0.2));
}

/* Responsive: stack columns on mobile */
@media (max-width: 768px) {
  .featureLevel {
    flex-direction: column;
    gap: 20px;
  }

  .leftCol,
  .rightCol {
    width: 100%;
    justify-content: center;
  }
}


/* ── Image Cards ──────────────────────────────────────────────── */
.imageCard {
  width: 100%;
  max-width: 380px;
  background: transparent;
  border: 1px solid rgba(123, 62, 255, 0.25);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  overflow: hidden;
}

.cardImage {
  width: 100%;
  transform-origin: center;
  height: auto;
  transform: scale(1.19);
  border-radius: 20px;
  object-fit: cover;
  display: block;
}


/* ── Image Cards (clickable) ── */
.imageCard {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.imageCard:hover {
  transform: scale(1.02);
}

/* ── Modal / Lightbox ── */
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 40px;
  cursor: zoom-out;
  animation: fadeIn 0.3s ease-out;
}

.modalContent {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.modalImage {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 85vh;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  object-fit: contain;
  animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modalClose {
  position: absolute;
  top: -51px;
  right: 0;
  background: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  transition: transform 0.2s ease;
}

.modalClose:hover {
  transform: scale(1.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .modalContent {
    max-width: 95%;
  }

  .modalClose {
    top: -60px;
    right: 50%;
    transform: translateX(50%);
  }

  .modalClose:hover {
    transform: translateX(50%) scale(1.1);
  }
}
</file>

</files>
