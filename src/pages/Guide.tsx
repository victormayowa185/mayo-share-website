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