"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { gsap } from "gsap";
import "./Hero.scss";

// ─── SVG Icons (Minimal Luxury Line Style) ────────────────────────────────────
const IconLotus = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4C14 4 16.5 8.5 14 14C11.5 8.5 14 4 14 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 8 10 4 14C8 18 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 20 10 24 14C20 18 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 10 20 14 24C18 20 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHands = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 18V9C10 8.4 10.4 8 11 8C11.6 8 12 8.4 12 9V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 11C12 10.4 12.4 10 13 10C13.6 10 14 10.4 14 11V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M14 11.5C14 10.9 14.4 10.5 15 10.5C15.6 10.5 16 10.9 16 11.5V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 12C16 11.4 16.4 11 17 11C17.6 11 18 11.4 18 12V18C18 21 15.5 23 13 23C10 23 8 21 8 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconArch = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 24V12L14 5L23 12V24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 24V18C10 15.8 11.8 14 14 14C16.2 14 18 15.8 18 18V24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconGem = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4C14 4 18 10 14 14C10 10 14 4 14 4Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 24C14 24 10 18 14 14C18 18 14 24 14 24Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 14C4 14 10 10 14 14C10 18 4 14 4 14Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M24 14C24 14 18 18 14 14C18 10 24 14 24 14Z" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="14" cy="14" r="2" fill="currentColor" />
  </svg>
);

const IconThread = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 4V8M14 20V24M4 14H8M20 14H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7 7L10 10M18 18L21 21M21 7L18 10M10 18L7 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconPlay = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="0.8" />
    <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const features: FeatureItem[] = [
  { icon: <IconLotus />, title: "Heritage Storytelling", desc: "Rooted in history, crafted for today." },
  { icon: <IconHands />, title: "Handcrafted Luxury", desc: "Made by artisans, cherished for life." },
  { icon: <IconArch />, title: "Museum Editorial Feel", desc: "Timeless pieces with a story to hold." },
  { icon: <IconGem />, title: "Premium Ethnic Identity", desc: "Elegant. Authentic. Unapologetically ours." },
  { icon: <IconThread />, title: "Emotional Connection", desc: "More than fashion, it's an inheritance." },
];

const heroCards = [
  { id: "embroidery", src: "/assets/hero/h2.png", alt: "Artisan hand embroidery" },
  { id: "architecture", src: "/assets/hero/h3.png", alt: "Ornate heritage architecture" },
  { id: "model", src: "/assets/hero/h1.png", alt: "Luxury heritage sari fashion" },
  { id: "weaving", src: "/assets/hero/h4.png", alt: "Traditional loom weaving" },
  { id: "textile", src: "/assets/hero/h5.png", alt: "Handcrafted textile carving" },
];

// ─── Framer Variants ──────────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const featureFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" },
  }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// Hero Component
// ═══════════════════════════════════════════════════════════════════════════════
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  // ── Professional Cinematic Animations ──
  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>(".hero__card");

    // 1. Refined Entrance: Fan out from center
    gsap.set(cards, {
      opacity: 0,
      scale: 0.9,
      y: 40,
      transformOrigin: "center bottom"
    });

    const tl = gsap.timeline({
      delay: 0.8,
      defaults: { ease: "power4.out", duration: 1.6 }
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: {
        each: 0.1,
        from: "center" // Fan out from the middle card
      }
    });

    // 2. Subtle Mouse Parallax (High-end feel)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(cards, {
        x: (i) => (i - 2) * (xPos * 0.2), // Differential movement for depth
        y: (i) => (i - 2) * (yPos * 0.1),
        duration: 2,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="hero" aria-label="Designs of Dreams — Heritage">

      {/* ── Background Layers ── */}
      <div className="hero__bg-pattern" aria-hidden="true" />
      <div className="hero__bg-grain" aria-hidden="true" />
      <div className="hero__bg-glow" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* MAIN GRID                                                          */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="hero__container">

        {/* ── LEFT: Content ── */}
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Breadcrumb */}
          <motion.p className="hero__label" variants={fadeUp}>
            <span className="hero__label-dot" />
            OUR LEGACY&nbsp;/&nbsp;AAPDO VARSO
          </motion.p>

          {/* Headline */}
          <motion.h1 className="hero__headline" variants={fadeUp}>
            A place to{" "}
            <br />
            display your
            <br />
            <em className="hero__headline-accent">Heritage.</em>
          </motion.h1>

          {/* Ornament */}
          <motion.div className="hero__ornament" variants={fadeUp} aria-hidden="true">
            <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
              <path d="M0 12 H45 M75 12 H120" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              <path d="M60 4 L64 12 L60 20 L56 12 L60 4Z" fill="currentColor" opacity="0.8" />
              <path d="M52 12 C52 12 55 10 60 10 C65 10 68 12 68 12 C68 12 65 14 60 14 C55 14 52 12 52 12Z" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Subheading */}
          <motion.p className="hero__subheading" variants={fadeUp}>
            Handcrafted art to drape and wear.
          </motion.p>

          {/* Description */}
          <motion.p className="hero__description" variants={fadeUp}>
            Where centuries old traditions meet
            <br />
            contemporary craftsmanship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero__cta" variants={fadeUp}>
            <motion.button
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Collection
              <span className="hero__btn-arrow">→</span>
            </motion.button>

            <motion.button
              className="hero__btn hero__btn--outline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="hero__btn-play"><IconPlay /></span>
              Our Story
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Layered Image Cards ── */}
        <div className="hero__cards" ref={cardsRef}>
          {heroCards.map((card) => (
            <div
              key={card.id}
              className={`hero__card hero__card--${card.id}`}
            >
              <img src={card.src} alt={card.alt} loading="eager" />
              <div className="hero__card-sheen" />
              {card.id === "model" && (
                <div className="hero__card-label">
                  <span className="hero__card-label-id">INV. #2024-DOD</span>
                  <span className="hero__card-label-name">Heritage Silk Series</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* FEATURE STRIP                                                      */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="hero__features-container">
        <motion.div
          className="hero__features"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((f, i) => (
            <React.Fragment key={f.title}>
              <motion.div
                className="hero__feature"
                custom={i}
                variants={featureFade}
              >
                <span className="hero__feature-icon">{f.icon}</span>
                <div className="hero__feature-content">
                  <h3 className="hero__feature-title">{f.title}</h3>
                  <p className="hero__feature-desc">{f.desc}</p>
                </div>
              </motion.div>
              {i < features.length - 1 && <div className="hero__feature-divider" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* QUOTE BAND                                                         */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="hero__quote-band">
        <div className="hero__quote-inner">
          <motion.blockquote
            className="hero__quote"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <em>
              &ldquo;We don&rsquo;t just create clothing, we preserve traditions.&rdquo;
              <br />
              Every thread carries a story. Every piece carries a legacy.
            </em>
          </motion.blockquote>

          <div className="hero__brand-sig">
            <div className="hero__brand-emblem">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1" />
                <path d="M12 26V14L18 10L24 14V26" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                <path d="M15 26V21H21V26" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="hero__brand-lines">
              <span>ROOTED IN CULTURE.</span>
              <span>CRAFTED FOR GENERATIONS.</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;