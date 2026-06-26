import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TbSend } from 'react-icons/tb';
import { MdLock, MdWifiOff, MdSpeed, MdDevicesOther } from 'react-icons/md';
import styles from '../styles/pages/Home.module.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const FEATURES = [
  {
    side: 'left' as const,
    icon: <MdLock size={32} />,
    title: 'Secured',
    description: 'End-to-end encryption on every transfer. Your files go directly between devices — no cloud, no interception.',
  },
  {
    side: 'right' as const,
    icon: <MdWifiOff size={32} />,
    title: 'No Internet Required',
    description: 'Works entirely on your local network. No Wi-Fi? We create a hotspot. Zero dependency on the cloud.',
  },
  {
    side: 'left' as const,
    icon: <MdSpeed size={32} />,
    title: 'Blazing Fast',
    description: 'Transfer at full local network speeds — up to 1Gbps. Move entire folders in seconds, not minutes.',
  },
  {
    side: 'right' as const,
    icon: <MdDevicesOther size={32} />,
    title: 'Cross Platform',
    description: 'macOS, Windows, Linux — all talking to each other seamlessly. One app, every device.',
  },
];

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
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className={styles.features}>
      <div className={styles.featuresHeading}>
        <p className={styles.featuresEyebrow}>Why MAYO Share</p>
        <h2 className={styles.featuresTitle}>Built different.</h2>
      </div>

      <svg
        className={styles.zigzagSvg}
        viewBox="0 0 750 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 150 80 C 200 80, 480 80, 600 300 C 720 520, 200 520, 150 700 C 100 880, 480 880, 600 1000"
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
        {FEATURES.map((feature, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className={`${styles.cardRow} ${feature.side === 'right' ? styles.cardRowRight : ''}`}
          >
            <div className={styles.card}>
              <div className={styles.cardIcon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---- Updated FAQ Section with left-bar slide-out animation ----
const FAQSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(el => el !== null);

    items.forEach((item) => {
      if (!item) return;

      gsap.fromTo(item,
        {
          x: -100,   // start hidden behind the left bar
          opacity: 0,
        },
        {
          x: 0,      // slide to natural position
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // triggers when the item nears the viewport bottom
            toggleActions: "play none none none",
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