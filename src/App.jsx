import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CALENDLY_URL = 'https://calendly.com/startupsling/30-min-meeting';

// Animation helpers
function FadeIn({ children, className = '', delay = 0, y = 30 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: 0.12 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth scroll handler
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── HEADER ─────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: 'Problem', id: 'problem' },
    { label: 'Services', id: 'services' },
    { label: 'Perspective', id: 'perspective' },
    { label: 'Difference', id: 'difference' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--color-ivory)]/95 backdrop-blur-md border-b border-[var(--color-sand)]/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-sans text-lg md:text-xl tracking-[0.2em] font-semibold text-[var(--color-charcoal)] hover:opacity-70 transition-opacity"
        >
          | ORDO
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-[13px] tracking-[0.15em] uppercase text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2.5 text-[12px] tracking-[0.18em] uppercase font-semibold border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-all duration-300"
          >
            Book a Discovery Call
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-[1.5px] bg-[var(--color-charcoal)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-[var(--color-charcoal)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--color-ivory)] border-b border-[var(--color-sand)]/60 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollTo(item.id); setMobileOpen(false); }}
                  className="text-[13px] tracking-[0.15em] uppercase text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-[12px] tracking-[0.18em] uppercase font-semibold border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-all duration-300 text-center"
              >
                Book a Discovery Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── HERO ───────────────────────────────────────────
function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-[var(--color-sand)]/40" />
        <div className="absolute top-0 left-[50%] w-[1px] h-full bg-[var(--color-sand)]/30" />
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-[var(--color-sand)]/40" />
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-[var(--color-sand)]/30" />
        <div className="absolute top-[70%] left-0 w-full h-[1px] bg-[var(--color-sand)]/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-28 md:pt-32 pb-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-end">
          {/* Main headline area */}
          <div className="md:col-span-7 lg:col-span-8">
            <FadeIn>
              <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-8">
                Strategic Operational Architecture
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="font-serif text-[clamp(2.8rem,6.5vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--color-charcoal)] mb-8">
                Scale demands<br />
                <span className="text-[var(--color-taupe)]">structure.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-[var(--color-charcoal-muted)] leading-relaxed max-w-xl mb-10 font-light">
                ORDO builds operational architecture for growth-stage Indian food and
                FMCG brands — turning ambition into institutional systems that hold under pressure.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[var(--color-charcoal)] text-[var(--color-ivory)] text-[12px] tracking-[0.18em] uppercase font-semibold hover:bg-[var(--color-charcoal-light)] transition-all duration-300"
                >
                  Book a Discovery Call
                </a>
                <button
                  onClick={() => scrollTo('problem')}
                  className="px-8 py-3.5 border border-[var(--color-sand)] text-[var(--color-charcoal-muted)] text-[12px] tracking-[0.18em] uppercase font-semibold hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)] transition-all duration-300"
                >
                  Explore ORDO
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Metrics block */}
          <div className="md:col-span-5 lg:col-span-4">
            <FadeIn delay={0.5}>
              <div className="border border-[var(--color-sand)] p-8 md:p-10 bg-[var(--color-cream)]/50">
                <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-warm-gray)] font-medium mb-8">
                  The Reality
                </p>
                <div className="space-y-6">
                  {[
                    { stat: '72%', desc: 'of food brands scale revenue before systems' },
                    { stat: '3x', desc: 'compliance cost when built reactively' },
                    { stat: '1 in 4', desc: 'scale failures trace to operational gaps' },
                  ].map((item, i) => (
                    <div key={i} className="border-t border-[var(--color-sand)]/70 pt-5">
                      <p className="font-serif text-3xl text-[var(--color-charcoal)] mb-1">{item.stat}</p>
                      <p className="text-[13px] text-[var(--color-charcoal-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Tagline bar */}
        <FadeIn delay={0.65} y={15}>
          <div className="mt-20 md:mt-28 pt-8 border-t border-[var(--color-sand)]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[12px] tracking-[0.3em] uppercase text-[var(--color-taupe)] font-medium">
              Where Standards Begin.
            </p>
            <p className="text-[13px] text-[var(--color-warm-gray)]">
              Operational maturity is built, not assumed.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── THE PROBLEM ────────────────────────────────────
function Problem() {
  return (
    <section id="problem" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            The Thesis
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-charcoal)] max-w-4xl mb-12">
            India doesn't have a food innovation problem.{' '}
            <span className="text-[var(--color-taupe)]">It has a systems problem.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 md:gap-20 mt-16">
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-[13px] tracking-[0.25em] uppercase text-[var(--color-charcoal)] font-semibold mb-6">
                What's visible
              </h3>
              <div className="space-y-4">
                {[
                  'Strong product with proven demand',
                  'Revenue momentum and growth traction',
                  'Brand recognition and customer loyalty',
                  'Ambition to scale nationally',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-taupe)] mt-2 shrink-0" />
                    <p className="text-[15px] text-[var(--color-charcoal-muted)] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <h3 className="text-[13px] tracking-[0.25em] uppercase text-[var(--color-charcoal)] font-semibold mb-6">
                What's underneath
              </h3>
              <div className="space-y-4">
                {[
                  'No production architecture beyond the founder\'s instinct',
                  'No documented SOP ecosystem — knowledge lives in memory',
                  'Compliance handled reactively, not systemically',
                  'The founder is the approval system, the quality check, the decision layer',
                  'Quality depends on experience, not systems',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-charcoal)] mt-2 shrink-0" />
                    <p className="text-[15px] text-[var(--color-charcoal-light)] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-20 pt-10 border-t border-[var(--color-sand)]/60">
            <p className="font-serif text-xl md:text-2xl text-[var(--color-charcoal)] leading-relaxed max-w-3xl italic">
              "Revenue growth is visible. Operational maturity is not. And scale will test whichever one you haven't built."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── WHAT ORDO BUILDS ───────────────────────────────
function Services() {
  const services = [
    {
      title: 'Production Discipline',
      desc: 'Structured manufacturing protocols that eliminate dependence on individual expertise and ensure consistent output at every scale.',
    },
    {
      title: 'Documentation Ecosystems',
      desc: 'Living SOP systems where institutional knowledge is captured, version-controlled, and accessible — not locked in memory.',
    },
    {
      title: 'Compliance Architecture',
      desc: 'Proactive regulatory frameworks built into operations — so compliance becomes a system, not a scramble before audits.',
    },
    {
      title: 'Scale Readiness',
      desc: 'Operational diagnostics and structural preparation so your systems can absorb 3x growth without 3x chaos.',
    },
    {
      title: 'Operational Visibility',
      desc: 'Measurement systems and dashboards that surface what matters — giving leadership clarity without requiring their presence on the floor.',
    },
    {
      title: 'Institutional Control',
      desc: 'Decision architectures and governance layers that let the business run on systems, not on the founder\'s constant intervention.',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-36 bg-[var(--color-cream)]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            Capabilities
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-charcoal)] max-w-3xl mb-16">
            What ORDO builds.
          </h2>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-sand)]/50">
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <div className="bg-[var(--color-ivory)] p-8 md:p-10 h-full group hover:bg-[var(--color-cream)]/80 transition-colors duration-500">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-taupe)] font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-xl md:text-[1.4rem] text-[var(--color-charcoal)] mt-4 mb-4 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[14px] text-[var(--color-charcoal-muted)] leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.2}>
          <div className="mt-16 text-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[12px] tracking-[0.18em] uppercase font-semibold hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-all duration-300"
            >
              Discuss Your Operations
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── WHY GROWTH BREAKS ──────────────────────────────
function WhyGrowthBreaks() {
  const markers = [
    { label: 'Predictable Output', desc: 'Production delivers consistently regardless of who is on the floor.' },
    { label: 'Audit-Ready Compliance', desc: 'Regulatory readiness is embedded, not assembled under pressure.' },
    { label: 'Vendor Standardisation', desc: 'Supply chain relationships governed by systems, not personal rapport.' },
    { label: 'Quality Consistency', desc: 'Every batch meets specification because the system enforces it.' },
    { label: 'Founder Independence', desc: 'Operations run on architecture, not on one person\'s availability.' },
  ];

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            The Insight
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-charcoal)] max-w-4xl mb-6">
            Valuations don't break because of bad marketing.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.015em] text-[var(--color-taupe)] max-w-4xl mb-16">
            They break because operations can't support scale.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-3xl">
            <p className="text-base text-[var(--color-charcoal-muted)] leading-relaxed mb-12 font-light">
              Operational scale isn't about working harder. It's about building systems
              that perform predictably — regardless of volume, pressure, or personnel changes.
              These are the markers.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="space-y-0">
          {markers.map((marker, i) => (
            <StaggerItem key={i}>
              <div className="border-t border-[var(--color-sand)]/70 py-7 md:py-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start group">
                <div className="md:col-span-1">
                  <span className="text-[11px] tracking-[0.2em] text-[var(--color-taupe)] font-medium">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-[15px] md:text-base font-semibold text-[var(--color-charcoal)] tracking-wide">
                    {marker.label}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-[14px] text-[var(--color-charcoal-muted)] leading-relaxed font-light">
                    {marker.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="border-t border-[var(--color-sand)]/70" />
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── WHO ORDO WORKS WITH ────────────────────────────
function Audience() {
  const audiences = [
    {
      title: 'Growth-Stage Food Brands',
      desc: 'Doing ₹1Cr–₹20Cr, with strong product-market fit but systems that haven\'t caught up with demand.',
    },
    {
      title: 'FMCG Businesses Preparing to Scale',
      desc: 'Entering new channels, geographies, or retail partnerships — and needing operations that can absorb the complexity.',
    },
    {
      title: 'Founder-Led Businesses',
      desc: 'Moving beyond informal, instinct-driven operations toward documented, delegable, institutional systems.',
    },
    {
      title: 'Investors Assessing Readiness',
      desc: 'Evaluating operational maturity as a dimension of risk — because growth without structure is fragile growth.',
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[var(--color-cream)]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            Who We Work With
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-charcoal)] max-w-3xl mb-16">
            Built for businesses where ambition has outpaced architecture.
          </h2>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 gap-8">
          {audiences.map((a, i) => (
            <StaggerItem key={i}>
              <div className="border border-[var(--color-sand)]/70 p-8 md:p-10 bg-[var(--color-ivory)] hover:border-[var(--color-taupe)]/50 transition-colors duration-500">
                <h3 className="font-serif text-lg md:text-xl text-[var(--color-charcoal)] mb-3">
                  {a.title}
                </h3>
                <p className="text-[14px] text-[var(--color-charcoal-muted)] leading-relaxed font-light">
                  {a.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── ORDO POINT OF VIEW ─────────────────────────────
function PointOfView() {
  const insights = [
    {
      text: 'Festive demand doesn\'t create operational problems. It reveals them.',
      context: 'Peak seasons expose every system gap you chose to defer.',
    },
    {
      text: 'Compliance under pressure is the real test. Not compliance under calm.',
      context: 'When audit timelines compress, only embedded systems survive.',
    },
    {
      text: 'Innovation without institutional readiness creates risk, not advantage.',
      context: 'New SKUs and channels multiply complexity. Without architecture, they multiply chaos.',
    },
    {
      text: 'Transparency gaps don\'t stay internal. They become reputational exposure.',
      context: 'In the age of scrutiny, undocumented operations are a liability.',
    },
    {
      text: 'People problems quietly become system problems.',
      context: 'When one person leaves and a process breaks, that was never a people problem.',
    },
    {
      text: 'Operational failures begin as alignment failures.',
      context: 'Misaligned teams don\'t just underperform. They build conflicting systems.',
    },
  ];

  return (
    <section id="perspective" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            Point of View
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-charcoal)] max-w-3xl mb-16">
            Convictions that shape our work.
          </h2>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 gap-px bg-[var(--color-sand)]/40">
          {insights.map((insight, i) => (
            <StaggerItem key={i}>
              <div className="bg-[var(--color-ivory)] p-8 md:p-10 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-[var(--color-sand)] font-serif text-4xl leading-none select-none">"</span>
                  <p className="font-serif text-lg md:text-xl text-[var(--color-charcoal)] leading-snug pt-1">
                    {insight.text}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--color-charcoal-muted)] leading-relaxed font-light ml-10">
                  {insight.context}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── THE ORDO DIFFERENCE ────────────────────────────
function Difference() {
  return (
    <section id="difference" className="py-24 md:py-36 bg-[var(--color-charcoal)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-6">
            The Difference
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ivory)] max-w-4xl mb-8">
            This is not generic consulting.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base md:text-lg text-[var(--color-warm-gray)] leading-relaxed max-w-2xl mb-16 font-light">
            ORDO works at the intersection of systems, standards, compliance,
            and operational architecture. We don't advise from the outside.
            We build the infrastructure that makes scale structurally possible.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { word: 'Systems', desc: 'We design the operational backbone — not strategy decks, but living systems.' },
            { word: 'Standards', desc: 'We embed quality and consistency into process architecture, not checklists.' },
            { word: 'Compliance', desc: 'We build regulatory readiness into operations so it\u2019s never a fire drill.' },
            { word: 'Scale', desc: 'We prepare businesses to absorb growth — structurally, not just aspirationally.' },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="border-t border-[var(--color-charcoal-muted)]/40 pt-6">
                <h3 className="font-serif text-2xl text-[var(--color-ivory)] mb-3">{item.word}</h3>
                <p className="text-[13px] text-[var(--color-warm-gray)] leading-relaxed font-light">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.3}>
          <div className="mt-20 pt-10 border-t border-[var(--color-charcoal-muted)]/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="font-serif text-xl md:text-2xl text-[var(--color-ivory)] italic max-w-2xl leading-relaxed">
                "We don't fix operations. We architect them."
              </p>
              <span className="text-[12px] tracking-[0.3em] uppercase text-[var(--color-warm-gray)] font-medium">
                | ORDO
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CTA SECTION ────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <p className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase text-[var(--color-warm-gray)] font-medium mb-8">
            Begin
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-charcoal)] max-w-3xl mx-auto mb-6">
            Build for scale before scale tests you.
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-base md:text-lg text-[var(--color-charcoal-muted)] leading-relaxed max-w-xl mx-auto mb-12 font-light">
            A discovery call to understand where your operations are — and what
            it would take to make them institutional.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[var(--color-charcoal)] text-[var(--color-ivory)] text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[var(--color-charcoal-light)] transition-all duration-300"
          >
            Book a Discovery Call
          </a>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mt-8 text-[13px] text-[var(--color-warm-gray)]">
            30-minute conversation. No obligations. No pitch decks.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[var(--color-sand)]/60 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="font-sans text-lg tracking-[0.2em] font-semibold text-[var(--color-charcoal)] mb-3">
              | ORDO
            </p>
            <p className="text-[13px] tracking-[0.15em] uppercase text-[var(--color-taupe)] font-medium mb-6">
              Where Standards Begin.
            </p>
            <p className="text-[14px] text-[var(--color-charcoal-muted)] font-light">
              Strategic operational architecture for growth-stage<br />
              Indian food and FMCG brands.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-warm-gray)] font-medium mb-5">
              Navigate
            </p>
            <div className="space-y-3">
              {[
                { label: 'The Problem', id: 'problem' },
                { label: 'Services', id: 'services' },
                { label: 'Perspective', id: 'perspective' },
                { label: 'Difference', id: 'difference' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="block text-[14px] text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors font-light"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-warm-gray)] font-medium mb-5">
              Connect
            </p>
            <div className="space-y-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[14px] text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors font-light"
              >
                Book a Discovery Call
              </a>
              <a
                href="mailto:hello@ordostudio.com"
                className="block text-[14px] text-[var(--color-charcoal-muted)] hover:text-[var(--color-charcoal)] transition-colors font-light"
              >
                hello@ordostudio.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-sand)]/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[12px] text-[var(--color-warm-gray)]">
            © {new Date().getFullYear()} ORDO. All rights reserved.
          </p>
          <p className="text-[12px] text-[var(--color-taupe)]">
            Operational maturity is not optional.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)]">
      <Header />
      <Hero />
      <Problem />
      <Services />
      <WhyGrowthBreaks />
      <Audience />
      <PointOfView />
      <Difference />
      <CTA />
      <Footer />
    </div>
  );
}
