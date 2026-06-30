import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/pages/Guide.module.css';

// Placeholder images (keeping them in case, but we won't use them)
const step1Img = 'https://placehold.co/400x300/7C3EFF/FFFFFF?text=Step+1';
const step2Img = 'https://placehold.co/400x300/7C3EFF/FFFFFF?text=Step+2';
const step3Img = 'https://placehold.co/400x300/7C3EFF/FFFFFF?text=Step+3';
const step4Img = 'https://placehold.co/400x300/7C3EFF/FFFFFF?text=Step+4';
const step5Img = 'https://placehold.co/400x300/7C3EFF/FFFFFF?text=Step+5';

const STEPS = [
  { id: 1, title: 'Open the App' },
  { id: 2, title: 'Choose Method' },
  { id: 3, title: 'Connect' },
  { id: 4, title: 'Select & Send' },
  { id: 5, title: 'Done' },
];

const FULL_STEPS = [
  { 
    id: 1, 
    title: 'Open the App', 
    description: 'Launch MAYO Share on your phone. On your laptop, open your browser and go to share.mayo.app.' 
  },
  { 
    id: 2, 
    title: 'Choose Method', 
    description: 'Tap Send on your phone. Choose Receiver Method (app-to-app) or Browser Method.' 
  },
  { 
    id: 3, 
    title: 'Connect', 
    description: 'Scan the QR code on your laptop screen, or tap the device name.' 
  },
  { 
    id: 4, 
    title: 'Select & Send', 
    description: 'Pick photos, videos, or documents. Hit Send – the transfer starts instantly.' 
  },
  { 
    id: 5, 
    title: 'Done', 
    description: 'On the laptop, accept the transfer. Files land in your Downloads folder.' 
  },
];

gsap.registerPlugin(ScrollTrigger);

const GuidePage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.guidePage}>
      <div className={styles.guideContainer}>
        
        {/* ─── LEFT COLUMN ─── */}
        <div className={styles.mainContent}>
          <div className={styles.guideHeader} ref={headerRef}>
            <span className={styles.guideBadge}>Guide</span>
            <h1 className={styles.guideTitle}>Share files in <span className={styles.guideAccent}>5 simple steps</span></h1>
          </div>

          <div className={styles.stepsWrapper}>
            {FULL_STEPS.map((step, index) => (
              <div 
                key={step.id} 
                className={styles.stepCard} 
                ref={el => { stepRefs.current[index] = el; }}  // 👈 FIXED: returns void
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
        <div className={styles.sidebar}>
          <div className={styles.jumpCard}>
            <div className={styles.jumpNavTitle}>Jump to Step</div>
            <div className={styles.jumpList}>
              {STEPS.map((step, index) => (
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