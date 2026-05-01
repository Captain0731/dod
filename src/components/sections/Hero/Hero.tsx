"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Hero.scss";

// ── SVG Icons (Restored) ──────────────────────────────────────────────────────
const IconLotus = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4C14 4 16.5 8.5 14 14C11.5 8.5 14 4 14 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 8 10 4 14C8 18 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 20 10 24 14C20 18 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 14C14 14 10 20 14 24C18 20 14 14 14 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHands = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M10 18V9C10 8.4 10.4 8 11 8C11.6 8 12 8.4 12 9V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M12 11C12 10.4 12.4 10 13 10C13.6 10 14 10.4 14 11V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M14 11.5C14 10.9 14.4 10.5 15 10.5C15.6 10.5 16 10.9 16 11.5V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 12C16 11.4 16.4 11 17 11C17.6 11 18 11.4 18 12V18C18 21 15.5 23 13 23C10 23 8 21 8 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconArch = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M5 24V12L14 5L23 12V24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 24V18C10 15.8 11.8 14 14 14C16.2 14 18 15.8 18 18V24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="5" y1="24" x2="23" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconGem = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4C14 4 18 10 14 14C10 10 14 4 14 4Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 24C14 24 10 18 14 14C18 18 14 24 14 24Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 14C4 14 10 10 14 14C10 18 4 14 4 14Z" stroke="currentColor" strokeWidth="1.2" />
    <path d="M24 14C24 14 18 18 14 14C18 10 24 14 24 14Z" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="14" cy="14" r="2" fill="currentColor" />
  </svg>
);

const IconThread = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 4V8M14 20V24M4 14H8M20 14H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M7 7L10 10M18 18L21 21M21 7L18 10M10 18L7 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const features: (FeatureItem & { highlight?: boolean })[] = [
  { icon: <IconLotus />, title: "Heritage Storytelling", desc: "Rooted in history, crafted for today." },
  { icon: <IconHands />, title: "Handcrafted Luxury", desc: "Made by artisans, cherished for life." },
  { icon: <IconArch />, title: "Museum Editorial Feel", desc: "Timeless pieces with a story to hold." },
  { icon: <IconGem />, title: "Premium Ethnic Identity", desc: "Elegant. Authentic. Unapologetically ours." },
  { icon: <IconThread />, title: "Emotional Connection", desc: "More than fashion, it's an inheritance." },
];

// ── Slides Data ──────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    image: "/assets/hero/hero_1.png",
    badge: "The Future of Craft",
    heading: "A place to display your <span>Heritage.</span>",
    description: "Where centuries old traditions meet contemporary craftsmanship. Handcrafted for the modern world.",
    primaryCTA: "Explore Collection",
    secondaryCTA: "Our Story"
  },
  {
    id: 2,
    image: "/assets/hero/hero_2.png",
    badge: "Artisan Excellence",
    heading: "Elegance in Every <span>Thread.</span>",
    description: "Discover the intricate details of hand-woven luxury. Each piece tells a story of passion and precision.",
    primaryCTA: "View Details",
    secondaryCTA: "Philosophy"
  },
  {
    id: 3,
    image: "/assets/hero/hero_3.png",
    badge: "Premium Identity",
    heading: "Redefining <span>Luxury</span> Fashion.",
    description: "Unapologetically authentic. Timeless pieces designed to empower your unique style and heritage.",
    primaryCTA: "Shop Now",
    secondaryCTA: "Watch Film"
  }
];

// ── Framer Motion Variants ───────────────────────────────────────────────────
const contentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1.0] as any // Casting as any to bypass strict cubic-bezier array check if needed, or use string
    }
  })
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatRef1 = useRef<HTMLDivElement>(null);
  const floatRef2 = useRef<HTMLDivElement>(null);

  // ── GSAP Floating Animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (floatRef1.current) {
        gsap.to(floatRef1.current, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true
        });
      }

      if (floatRef2.current) {
        gsap.to(floatRef2.current, {
          x: "random(-60, 60)",
          y: "random(-60, 60)",
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true
        });
      }

      // Floating effect for the content - subtle and high FPS
      gsap.to(".hero__content", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true
      });
    }, containerRef);

    // Parallax effect on mouse move with optimization
    let xPos = 0;
    let yPos = 0;
    let animationFrameId: number;

    const updateParallax = () => {
      gsap.to(".hero__image-wrapper", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto"
      });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    const handleMouseMove = (e: MouseEvent) => {
      xPos = (e.clientX / window.innerWidth - 0.5) * 30;
      yPos = (e.clientY / window.innerHeight - 0.5) * 30;
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="hero">
      {/* Background Layers */}
      <div ref={floatRef1} className="hero__float" style={{ top: "10%", left: "5%" }} />
      <div ref={floatRef2} className="hero__float" style={{ bottom: "10%", right: "5%" }} />

      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        navigation={{
          prevEl: ".hero__nav-btn--prev",
          nextEl: ".hero__nav-btn--next",
        }}
        pagination={{
          el: ".hero__pagination",
          clickable: true,
        }}
        className="hero__swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero__slide">
            {({ isActive }) => (
              <>
                {/* Background Image with Zoom effect */}
                <div className="hero__image-wrapper">
                  <motion.img
                    src={slide.image}
                    alt={slide.badge}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: isActive ? 1.05 : 1.2 }}
                    transition={{ duration: 10, ease: "linear" }}
                  />
                </div>

                {/* Dark Overlay */}
                <div className="hero__overlay" />

                {/* Content */}
                <div className="hero__content">
                  <AnimatePresence>
                    {isActive && (
                      <>
                        <motion.span
                          className="hero__badge"
                          variants={contentVariants}
                          custom={0}
                          initial="hidden"
                          animate="visible"
                        >
                          {slide.badge}
                        </motion.span>

                        <motion.h1
                          className="hero__heading"
                          variants={contentVariants}
                          custom={1}
                          initial="hidden"
                          animate="visible"
                          dangerouslySetInnerHTML={{ __html: slide.heading }}
                        />

                        <motion.p
                          className="hero__description"
                          variants={contentVariants}
                          custom={2}
                          initial="hidden"
                          animate="visible"
                        >
                          {slide.description}
                        </motion.p>

                        <motion.div
                          className="hero__actions"
                          variants={contentVariants}
                          custom={3}
                          initial="hidden"
                          animate="visible"
                        >
                          <button className="hero__btn hero__btn--primary">
                            {slide.primaryCTA}
                            <ArrowRight size={18} />
                          </button>
                          <button className="hero__btn hero__btn--secondary">
                            {slide.secondaryCTA}
                            {slide.secondaryCTA.toLowerCase().includes("film") || slide.secondaryCTA.toLowerCase().includes("story") ? <Play size={18} /> : null}
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <button className="hero__nav-btn hero__nav-btn--prev">
          <ChevronLeft size={24} />
        </button>
        <button className="hero__nav-btn hero__nav-btn--next">
          <ChevronRight size={24} />
        </button>

        {/* Custom Pagination */}
        <div className="hero__pagination" />
      </Swiper>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* FEATURE STRIP (Restored)                                            */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="hero__features-container">
        <motion.div
          className="hero__features"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {features.map((f, i) => (
            <React.Fragment key={f.title}>
              <div className={`hero__feature ${f.highlight ? "hero__feature--highlight" : ""}`}>
                <span className="hero__feature-icon">{f.icon}</span>
                <div className="hero__feature-content">
                  <h3 className="hero__feature-title">{f.title}</h3>
                  <p className="hero__feature-desc">{f.desc}</p>
                </div>
              </div>
              {i < features.length - 1 && <div className="hero__feature-divider" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* QUOTE BAND (Restored)                                               */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div className="hero__quote-band">
        <div className="hero__quote-inner">
          <motion.blockquote
            className="hero__quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
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