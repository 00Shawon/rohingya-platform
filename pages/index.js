import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { useLanguage } from "../context/LanguageContext";
import { camps, digitalAccessData, stats, timeline, voices } from "../data";

// Dynamic import for map (no SSR)
const DisplacementMap = dynamic(() => import("../components/DisplacementMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f0e8",
        color: "#999",
        fontFamily: "monospace",
        fontSize: "0.8rem",
      }}
    >
      Loading map…
    </div>
  ),
});

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

function AnimatedBar({ value, unit, inView }) {
  const [width, setWidth] = useState(0);
  const maxVal = unit === "sec" ? 30 : 100;

  useEffect(() => {
    if (inView) {
      setTimeout(() => setWidth((value / maxVal) * 100), 300);
    }
  }, [inView, value, maxVal]);

  return (
    <div className="access-bar-track">
      <div className="access-bar-fill" style={{ width: `${width}%` }} />
    </div>
  );
}

export default function Home() {
  const { isBangla, toggleLanguage } = useLanguage();
  const digitalRef = useRef(null);
  const [digitalInView, setDigitalInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDigitalInView(true);
      },
      { threshold: 0.2 },
    );
    if (digitalRef.current) observer.observe(digitalRef.current);
    return () => observer.disconnect();
  }, []);

  const text = {
    heroLabel: isBangla
      ? "ডিজিটাল সাক্ষ্য প্রকল্প — রোহিঙ্গা বিস্থাপন"
      : "Digital Witnessing Project — Rohingya Displacement",
    heroTitle1: isBangla ? "বিশ্বের বৃহত্তম" : "The World's Largest",
    heroTitle2: isBangla ? "শরণার্থী সংকট" : "Refugee Settlement",
    heroTitle3: isBangla ? "নথিভুক্ত" : "Documented",
    heroDesc: isBangla
      ? "কক্সবাজার, বাংলাদেশ। ১০ লাখেরও বেশি রোহিঙ্গা শরণার্থী। এই প্ল্যাটফর্ম তাদের বাস্তুচ্যুতি, তাদের কণ্ঠস্বর এবং তাদের টিকে থাকার গল্প নথিভুক্ত করে।"
      : "Cox's Bazar, Bangladesh. Over one million Rohingya refugees. This platform documents their displacement, their voices, and their everyday acts of survival and peacebuilding — through geospatial data, community testimony, and digital research.",
    mapTitle: isBangla ? "বিস্থাপন মানচিত্র" : "Displacement Geography",
    voicesTitle: isBangla ? "কণ্ঠস্বর" : "Community Voices",
    timelineTitle: isBangla ? "সংকটের ইতিহাস" : "History of the Crisis",
    exploreMap: isBangla ? "মানচিত্র দেখুন" : "Explore Map",
    viewTimeline: isBangla ? "সময়রেখা দেখুন" : "View Timeline",
    byNumbers: isBangla ? "পরিসংখ্যান" : "By the Numbers",
    scaleTitle: isBangla ? "বিস্থাপনের মাত্রা" : "The Scale of Displacement",
    historyTitle: isBangla ? "১৯৭৮ থেকে আজ পর্যন্ত" : "From 1978 to Today",
    historyDesc: isBangla
      ? "রোহিঙ্গা সংকট ২০১৭ সালে শুরু হয়নি। এটি কয়েক দশকের পদ্ধতিগত বর্জন, রাষ্ট্রহীনতা এবং সহিংসতার চরম পরিণতি — একটি সম্পূর্ণ জনগোষ্ঠীকে তাদের জন্মভূমি থেকে মুছে ফেলার এক ধীর প্রক্রিয়া।"
      : "The Rohingya crisis did not begin in 2017. It is the culmination of decades of systematic exclusion, statelessness, and violence — a slow erasure of an entire people from their homeland.",
    dataSources: isBangla ? "তথ্যের উৎস" : "Data Sources",
    coxBazarTitle: isBangla
      ? "কক্সবাজার — শরণার্থী বসতি"
      : "Cox's Bazar — Refugee Settlements",
    mapDesc: isBangla
      ? "বিস্থাপনের ভূগোল অন্বেষণ করুন। প্রতিটি শিবির, তাদের জনসংখ্যা, উপলব্ধ পরিষেবা এবং বাসিন্দাদের মুখোমুখি চ্যালেঞ্জগুলো সম্পর্কে জানতে প্রতিটি মার্কার ক্লিক করুন।"
      : "Explore the geography of displacement. Click each marker to learn about individual camps, their populations, available services, and the challenges faced by residents.",
    testimony: isBangla ? "সাক্ষ্য" : "Testimony",
    voicesDesc: isBangla
      ? "এই বিবরণগুলো প্রকাশিত ইউএনএইচসিআর সাক্ষ্য আর্কাইভ, হিউম্যান রাইটস ওয়াচ সাক্ষাৎকার এবং ইউনিসেফ রিপোর্ট থেকে নেওয়া হয়েছে। মূল নথিতে অনুরোধ করা হলে নাম পরিবর্তন করা হয়েছে। সমস্ত বিবরণ যাচাইকৃত এবং উৎস নির্দেশিত।"
      : "These accounts are drawn from published UNHCR testimony archives, Human Rights Watch interviews, and UNICEF reports. Names have been changed where requested by the original documentation. All accounts are verified and sourced.",
    researchFinding: isBangla ? "গবেষণার ফলাফল" : "Research Finding",
    digitalGap: isBangla ? "ডিজিটাল অ্যাক্সেস গ্যাপ" : "The Digital Access Gap",
    digitalDesc: isBangla
      ? "এই গবেষণা ২০২৪ সালের নভেম্বর থেকে ২০২৫ সালের জানুয়ারি পর্যন্ত উখিয়া ও টেকনাফ উপজেলায় পরিচালিত হয়েছে।"
      : "Research conducted November 2024–January 2025 in Ukhia and Teknaf sub-districts.",
    methodology: isBangla ? "গবেষণা পদ্ধতি" : "Research Methodology",
    methodologyDesc: isBangla
      ? "উখিয়া ও টেকনাফ উপজেলার ফিল্ড ভিটের মাধ্যমে তথ্য সংগ্রহ করা হয়েছে (নভেম্বর ২০২৪ - জানুয়ারি ২০২৫)।"
      : "Data collected through field visits to Ukhia and Teknaf sub-districts (November 2024–January 2025).",
    keyFinding: isBangla ? "মূল ফলাফল" : "KEY FINDING",
    aboutTitle: isBangla ? "এই প্রকল্প সম্পর্কে" : "About This Project",
    platformResearcher: isBangla ? "প্ল্যাটফর্ম গবেষক" : "Platform Researcher",
    researchInterests: isBangla
      ? "গবেষণার আগ্রহ: জলবায়ু-ঝুঁকিপূর্ণ অঞ্চলে ডিজিটাল শাসন, প্রান্তিক জনগোষ্ঠীর জন্য প্ল্যাটফর্ম ডিজাইন এবং বিস্থাপনের ভূ-স্থানিক নথিভুক্তকরণ।"
      : "Research interests: digital governance in climate-vulnerable regions, platform design for marginalized communities, and geospatial documentation of displacement.",
  };

  return (
    <>
      <Head>
        <title>Witnessing Rohingya — Digital Displacement Documentation</title>
      </Head>

      <Nav />

      {/* LANGUAGE TOGGLE */}
      <div
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          zIndex: 999,
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => toggleLanguage(false)}
          style={{
            padding: "0.5rem 0.9rem",
            background: !isBangla ? "#c0392b" : "#fff",
            color: !isBangla ? "#fff" : "#333",
            border: "1px solid #c0392b",
            fontFamily: "monospace",
            fontSize: "0.72rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          EN
        </button>
        <button
          onClick={() => toggleLanguage(true)}
          style={{
            padding: "0.5rem 0.9rem",
            background: isBangla ? "#c0392b" : "#fff",
            color: isBangla ? "#fff" : "#333",
            border: "1px solid #c0392b",
            fontFamily: "monospace",
            fontSize: "0.72rem",
            cursor: "pointer",
          }}
        >
          বাং
        </button>
      </div>

      {/* HERO */}
      <section className="hero">
        <motion.div
          className="hero-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="hero-accent" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-label">{text.heroLabel}</div>
            <h1 className="hero-title">
              {text.heroTitle1}
              <br />
              <motion.em
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {text.heroTitle2}
              </motion.em>
              <br />
              {text.heroTitle3}
            </h1>
            <p className="hero-desc">{text.heroDesc}</p>
            <div className="hero-cta">
              <a href="#map" className="btn-primary">
                {text.exploreMap}
              </a>
              <a href="#timeline" className="btn-outline">
                {text.viewTimeline}
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-stats-panel"
            variants={stagger}
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
          >
            {stats.slice(0, 5).map((s, i) => (
              <motion.div
                className="hero-stat-item"
                key={i}
                variants={fadeInUp}
              >
                <div className="hero-stat-num">{s.number}</div>
                <div className="hero-stat-label">
                  {isBangla ? s.labelBn : s.label}
                </div>
                {s.sublabel && (
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "#555",
                      fontFamily: "monospace",
                      marginTop: "0.15rem",
                    }}
                  >
                    {isBangla ? s.sublabelBn : s.sublabel}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "#555",
              letterSpacing: "0.15em",
              marginBottom: "0.5rem",
            }}
          >
            SCROLL
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #555, transparent)",
              margin: "0 auto",
            }}
          />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bg section-full">
        <div className="stats-section">
          {/* Header */}
          <motion.div
            className="stats-header"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="stats-kicker">
              <span className="stats-kicker-line" />
              <span>{text.byNumbers}</span>
            </div>

            <div className="stats-heading-row">
              <h2 className="stats-title">{text.scaleTitle}</h2>

              <span className="stats-heading-mark">01 — 04</span>
            </div>

            <div className="stats-header-rule" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="stats-grid-premium"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {stats.map((s, i) => {
              const numberText = String(s.number);
              const numberLength = numberText.replace(/[^\d]/g, "").length;

              return (
                <motion.article
                  className="stat-card-premium"
                  key={i}
                  variants={fadeInUp}
                  whileHover={{
                    y: -8,
                    transition: {
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                >
                  {/* top metadata */}
                  <div className="stat-card-top">
                    <span className="stat-card-id">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="stat-card-type">DATA POINT</span>
                  </div>

                  {/* number */}
                  <div className="stat-number-area">
                    <span
                      className={`stat-number ${
                        numberLength >= 7 ? "stat-number-long" : ""
                      }`}
                    >
                      {s.number}
                    </span>
                  </div>

                  {/* label */}
                  <div className="stat-content">
                    <div className="stat-label">
                      {isBangla ? s.labelBn : s.label}
                    </div>

                    {s.sublabel && (
                      <div className="stat-sublabel">
                        {isBangla ? s.sublabelBn : s.sublabel}
                      </div>
                    )}
                  </div>

                  {/* footer */}
                  <div className="stat-card-footer">
                    <span className="stat-footer-line" />

                    <span className="stat-footer-mark">/</span>
                  </div>

                  {/* hover glow */}
                  <div className="stat-card-glow" />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="section-full timeline-bg">
        <div className="section timeline-section">
          {/* Section Header */}
          <motion.div
            className="timeline-header"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="timeline-kicker">
              <span className="timeline-kicker-line" />
              {text.timelineTitle}
            </div>

            <h2 className="section-title">{text.historyTitle}</h2>

            <p className="section-desc timeline-intro">{text.historyDesc}</p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="timeline timeline-modern"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {timeline.map((item, i) => (
              <motion.article
                className={`timeline-item timeline-item-${i % 2 === 0 ? "left" : "right"}`}
                key={i}
                variants={fadeInUp}
              >
                {/* Year */}
                <div className="timeline-year-wrap">
                  <span className="timeline-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="timeline-year">{item.year}</span>
                </div>

                {/* Central marker */}
                <div className="timeline-marker">
                  <span
                    className="timeline-dot"
                    style={{ background: item.color }}
                  />
                </div>

                {/* Content */}
                <div className="timeline-card">
                  <div className="timeline-card-top">
                    <span
                      className="timeline-event-line"
                      style={{ background: item.color }}
                    />

                    <span className="timeline-event-number">
                      EVENT {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="timeline-title">
                    {isBangla ? item.titleBn : item.title}
                  </h3>

                  <p className="timeline-desc">
                    {isBangla ? item.descriptionBn : item.description}
                  </p>

                  <div className="timeline-meta">
                    <span className="timeline-casualties">
                      {isBangla ? item.casualtiesBn : item.casualties}
                    </span>

                    <span className="timeline-arrow">→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Source Note */}
          <motion.div
            className="research-note timeline-source"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="research-note-icon">◈</div>

            <div>
              <div className="research-note-label">{text.dataSources}</div>

              <p>
                {isBangla
                  ? "ইউএনএইচসিআর বাংলাদেশ রিপোর্ট (১৯৯১–২০২৪), মিয়ানমার বিষয়ক জাতিসংঘ ফ্যাক্ট-ফাইন্ডিং মিশন (২০১৮), হিউম্যান রাইটস ওয়াচ নথিপত্র এবং অ্যামনেস্টি ইন্টারন্যাশনাল ফিল্ড রিপোর্ট থেকে সংকলিত।"
                  : "Timeline data compiled from UNHCR Bangladesh Reports (1991–2024), UN Fact-Finding Mission on Myanmar (2018), Human Rights Watch documentation, and Amnesty International field reports."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            className="section-label"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {text.mapTitle}
          </motion.div>
          <motion.h2
            className="section-title"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {text.coxBazarTitle}
          </motion.h2>
          <motion.p
            className="section-desc"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {text.mapDesc}
          </motion.p>

          {/* Camp population bar */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1px",
              background: "#eee",
              marginBottom: "1.5rem",
              border: "1px solid #eee",
            }}
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {camps.map((camp) => (
              <motion.div
                key={camp.id}
                style={{ background: "white", padding: "1rem" }}
                variants={fadeInUp}
              >
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    color: "#999",
                    marginBottom: "0.3rem",
                  }}
                >
                  {isBangla ? camp.nameBn : camp.name}
                </div>
                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#c0392b",
                  }}
                >
                  {camp.population.toLocaleString()}
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "#eee",
                    marginTop: "0.4rem",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: camp.id === 5 ? "#0284c7" : "#c0392b",
                      width: `${(camp.population / 630000) * 100}%`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="map-container"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <DisplacementMap />
          </motion.div>

          <div
            style={{
              marginTop: "1rem",
              fontFamily: "monospace",
              fontSize: "0.72rem",
              color: "#999",
              textAlign: "right",
            }}
          >
            {isBangla
              ? "উৎস: ইউএনএইচসিআর বাংলাদেশ অপারেশনাল আপডেট ২০২৪ · আইওএম বিস্থাপন ট্র্যাকিং ম্যাট্রিক্স ২০২৪"
              : "Data: UNHCR Bangladesh Operational Update 2024 · IOM Displacement Tracking Matrix 2024"}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" className="voices-section">
        <div className="voices-container">
          {/* =====================================================
        HEADER
        ===================================================== */}

          <motion.div
            className="voices-header"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="voices-kicker">
              <span className="voices-kicker-line" />
              <span>{text.voicesTitle}</span>
            </div>

            <div className="voices-heading-row">
              <div>
                <h2 className="voices-title">{text.testimony}</h2>

                <p className="voices-intro">{text.voicesDesc}</p>
              </div>

              <div className="voices-index">
                <span>03</span>
                <small>ORAL HISTORY</small>
              </div>
            </div>

            <div className="voices-header-rule" />
          </motion.div>

          {/* =====================================================
        TESTIMONIES
        ===================================================== */}

          <motion.div
            className="voices-grid-premium"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {voices.map((v, i) => (
              <motion.article
                className={`voice-card-premium voice-card-${i + 1}`}
                key={v.id}
                variants={fadeInUp}
              >
                {/* Card top */}
                <div className="voice-card-top">
                  <span className="voice-card-number">
                    TESTIMONY / {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="voice-card-mark">“</span>
                </div>

                {/* Quote */}
                <div className="voice-quote-wrap">
                  <span className="voice-quote-mark">“</span>

                  <p className="voice-quote">
                    {isBangla ? v.quoteBn : v.quote}
                  </p>
                </div>

                {/* Attribution */}
                <div className="voice-attribution-premium">
                  <div className="voice-person">
                    <div className="voice-name">
                      {isBangla ? v.nameBn : v.name}
                    </div>

                    <div className="voice-location">
                      {isBangla ? v.campBn : v.camp}
                      <span>·</span>
                      {isBangla ? "আগমন" : "Arrived"} {v.year}
                    </div>
                  </div>

                  <div className="voice-context">
                    {isBangla ? v.contextBn : v.context}
                  </div>
                </div>

                {/* Source */}
                <div className="voice-source-row">
                  <span className="voice-source-label">
                    {isBangla ? "উৎস" : "SOURCE"}
                  </span>

                  <span className="voice-source-name">{v.source}</span>
                </div>

                {/* Accent */}
                <div className="voice-card-accent" />
              </motion.article>
            ))}
          </motion.div>

          {/* =====================================================
        PHOTO DOCUMENTATION
        ===================================================== */}

          <div className="community-gallery">
            <motion.div
              className="gallery-header"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div>
                <div className="voices-kicker gallery-kicker">
                  <span className="voices-kicker-line" />

                  <span>
                    {isBangla ? "আলোকচিত্র নথি" : "PHOTO DOCUMENTATION"}
                  </span>
                </div>

                <h2 className="gallery-title">
                  {isBangla ? "কমিউনিটি গ্যালারি" : "Community Gallery"}
                </h2>
              </div>

              <span className="gallery-count">04 IMAGES</span>
            </motion.div>

            <motion.div
              className="gallery-grid-premium"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {[
                {
                  src: "/images/community/community-1.webp",
                  alt: "Community 1",
                  label: "01",
                },
                {
                  src: "/images/community/community-2.webp",
                  alt: "Community 2",
                  label: "02",
                },
                {
                  src: "/images/community/community-3.webp",
                  alt: "Community 3",
                  label: "03",
                },
                {
                  src: "/images/community/community-4.jpg",
                  alt: "Community 4",
                  label: "04",
                },
              ].map((img, i) => (
                <motion.figure
                  className={`gallery-item gallery-item-${i + 1}`}
                  key={i}
                  variants={fadeInUp}
                >
                  <div className="gallery-image-wrap">
                    <img src={img.src} alt={img.alt} />

                    <div className="gallery-overlay" />

                    <div className="gallery-number">{img.label}</div>

                    <div className="gallery-view">VIEW</div>
                  </div>
                </motion.figure>
              ))}
            </motion.div>
          </div>

          {/* Bottom statement */}
          <motion.div
            className="voices-bottom-note"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="voices-bottom-line" />

            <span>
              {isBangla
                ? "নথির কেন্দ্রে রয়েছে মানুষের নিজস্ব কণ্ঠ"
                : "AT THE CENTER OF THE RECORD IS THE HUMAN VOICE"}
            </span>
          </motion.div>
        </div>
      </section>

      {/* DIGITAL ACCESS RESEARCH */}
      <section
        id="digital"
        ref={digitalRef}
        className="section-full digital-bg"
      >
        <div className="digital-section">
          {/* Header */}
          <motion.div
            className="digital-header"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="digital-kicker">
              <span className="digital-kicker-line" />
              <span>{text.researchFinding}</span>
            </div>

            <div className="digital-heading-row">
              <div>
                <h2 className="digital-title">{text.digitalGap}</h2>

                <p className="digital-intro">
                  {isBangla
                    ? digitalAccessData.descriptionBn
                    : digitalAccessData.description}{" "}
                  {isBangla
                    ? "সহায়তা বিতরণের জন্য ডিজাইন করা ডিজিটাল সিস্টেমগুলো সেই সম্প্রদায়গুলোতে পৌঁছাতে ব্যর্থ হচ্ছে যাদের জন্য এগুলো তৈরি করা হয়েছে।"
                    : "Digital systems designed for aid delivery fail to reach the communities they intend to serve."}
                </p>
              </div>

              <div className="digital-index">
                <span>04</span>
                <small>ACCESS / 2024</small>
              </div>
            </div>

            <div className="digital-header-rule" />
          </motion.div>

          {/* Main grid */}
          <div className="digital-grid-premium">
            {/* LEFT — Measurements */}
            <motion.div
              className="access-panel"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="access-panel-heading">
                <div>
                  <span className="panel-label">DIGITAL ACCESS</span>

                  <h3>Connectivity measurements</h3>
                </div>

                <span className="panel-code">/ 01</span>
              </div>

              <div className="access-bars-premium">
                {digitalAccessData.findings.map((f, i) => (
                  <motion.div
                    className="access-item-premium"
                    key={i}
                    variants={fadeInUp}
                  >
                    <div className="access-item-top">
                      <div className="access-label-premium">
                        {isBangla ? f.metricBn : f.metric}
                      </div>

                      <div className="access-value">
                        <strong>{f.value}</strong>
                        <span>{f.unit}</span>
                      </div>
                    </div>

                    <div className="access-track-wrap">
                      <AnimatedBar
                        value={f.value}
                        unit={f.unit}
                        inView={digitalInView}
                      />
                    </div>

                    <div className="access-context-premium">
                      {isBangla ? f.contextBn : f.context}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Methodology */}
            <motion.aside
              className="digital-sidebar"
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="method-card">
                <div className="method-top">
                  <span className="panel-label">{text.methodology}</span>

                  <span className="method-symbol">◇</span>
                </div>

                <h3>{text.methodologyDesc}</h3>

                <p className="method-description">
                  {isBangla
                    ? "কুতুপালং বসতি কমপ্লেক্সের ভেতরে এবং আশেপাশে একাধিক স্থানে ব্যক্তিগত ডিভাইসে সংযোগ পরীক্ষা করা হয়েছে।"
                    : "Connectivity measured via personal device testing at multiple locations within and around the Kutupalong settlement complex."}
                </p>

                <div className="method-divider" />

                {/* Sources */}
                <div className="sources-block">
                  <div className="sources-heading">
                    {isBangla ? "তথ্যের উৎস" : "DATA SOURCES"}
                  </div>

                  {(isBangla
                    ? digitalAccessData.sourcesBn
                    : digitalAccessData.sources
                  ).map((s, i) => (
                    <div className="source-row" key={i}>
                      <span className="source-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key finding */}
              <div className="key-finding">
                <div className="key-finding-top">
                  <span className="key-finding-label">{text.keyFinding}</span>

                  <span className="key-finding-mark">!</span>
                </div>

                <p>
                  {isBangla
                    ? "ইউএনএইচসিআর রিফিউজি পোর্টাল — যা শিবিরের বাসিন্দাদের জন্য প্রাথমিক ডিজিটাল সম্পদ — একটি স্ট্যান্ডার্ড 2G সংযোগে লোড হতে ২২+ সেকেন্ড সময় নেয়। ঘূর্ণিঝড়ের সতর্কতার সময় তথ্যপ্রার্থী একটি পরিবারের জন্য এটি কেবল একটি পরিষেবা ব্যবধান নয়, এটি একটি প্রশাসনিক ব্যর্থতা।"
                    : "The UNHCR refugee portal — the primary digital resource for camp residents — takes 22+ seconds to load on a standard 2G connection. For a family seeking information during a cyclone warning, this is not a service gap. It is a governance failure."}
                </p>

                <div className="finding-footer">
                  <span>FIELD OBSERVATION</span>
                  <span>2G / KUTUPALONG</span>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* Bottom note */}
          <motion.div
            className="digital-bottom-note"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <span className="bottom-note-line" />

            <span>DIGITAL ACCESS IS PART OF INFORMATION ACCESS</span>
          </motion.div>
        </div>
      </section>

      {/* ABOUT RESEARCH */}
   <section className="about-platform-section">
  <div className="about-platform-container">

    <div className="about-platform-grid">

      {/* ==================================================
          LEFT — COMMUNICATION RESEARCH
          ================================================== */}

      <motion.div
        className="about-platform-main"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >

        <div className="about-platform-kicker">
          <span className="about-platform-line" />
          <span>
            {isBangla
              ? "গবেষণা আগ্রহ"
              : "COMMUNICATION RESEARCH"}
          </span>
        </div>

        <div className="about-heading-row">
          <h2 className="about-platform-title">
            {isBangla
              ? "যোগাযোগ ও ডিজিটাল মিডিয়া"
              : "Communication & Digital Media"}
          </h2>

          <span className="about-platform-index">
            05 / 06
          </span>
        </div>


        <div className="about-platform-rule" />


        <div className="about-platform-copy">

          <p className="about-lead">
            {isBangla
              ? "এই প্ল্যাটফর্মটি আমার যোগাযোগ গবেষণার একটি প্রাথমিক digital foundation। এর মাধ্যমে আমি অনুসন্ধান করছি—displaced communities-এর অভিজ্ঞতা কীভাবে ডিজিটাল মাধ্যমে নথিবদ্ধ, উপস্থাপিত এবং অ্যাক্সেসযোগ্য হয়, এবং communication technologies সেই process-কে কীভাবে প্রভাবিত করে।"
              : "This platform serves as an initial digital foundation for my communication research. It explores how the experiences of displaced communities are documented, represented, and made accessible through digital media, and how communication technologies shape that process."}
          </p>

          <p>
            {isBangla
              ? "আমার গবেষণা আগ্রহ community communication, digital storytelling, media representation, digital access এবং participatory communication-এর সংযোগস্থলে। বিশেষভাবে আগ্রহী digital media কীভাবে communities-এর lived experiences, perspectives এবং priorities প্রকাশের সুযোগ তৈরি করে—এবং একইসঙ্গে কোন voices দৃশ্যমান বা অদৃশ্য হয়ে যায়।"
              : "My research interests lie at the intersection of community communication, digital storytelling, media representation, digital access, and participatory communication. I am particularly interested in how digital media can create space for communities to communicate their lived experiences, perspectives, and priorities, while also examining whose voices become visible or remain absent in mediated representation."}
          </p>

          <p>
            {isBangla
              ? "Witnessing Rohingya-তে সেই প্রশ্নগুলোকে একটি বাস্তব digital environment-এ কাজের মাধ্যমে পরীক্ষা করেছি—interactive timelines, geospatial mapping, published testimonies এবং low-bandwidth design ব্যবহার করে।"
              : "In Witnessing Rohingya, I have begun working through these questions in a practical digital environment using interactive timelines, geospatial mapping, published testimonies, and low-bandwidth design."}
          </p>

        </div>


        {/* Methodological note */}
        <div className="method-note-premium">

          <div className="method-note-top">
            <span className="method-note-label">
              {isBangla
                ? "পদ্ধতিগত অবস্থান"
                : "METHODOLOGICAL POSITION"}
            </span>

            <span className="method-note-symbol">
              ◇
            </span>
          </div>

          <p>
            {isBangla
              ? "বর্তমান প্ল্যাটফর্মটি secondary-source documentation-এর ওপর ভিত্তি করে তৈরি। কমিউনিটি সাক্ষ্য প্রকাশিত UNHCR, Human Rights Watch এবং UNICEF materials থেকে সংগৃহীত; এই পর্যায়ে শিবিরের বাসিন্দাদের সঙ্গে কোনো direct field interview পরিচালনা করা হয়নি। ভবিষ্যৎ গবেষণায় community-based এবং participatory methods ব্যবহার করে primary perspectives আরও সরাসরি অনুসন্ধানের আগ্রহ রয়েছে।"
              : "The current platform is based on secondary-source documentation. Community testimonies are drawn from published UNHCR, Human Rights Watch, and UNICEF materials; no direct field interviews with camp residents have been conducted for the platform at this stage. Future research may extend this work through community-based and participatory methods to examine primary perspectives more directly."}
          </p>

          <div className="method-note-footer">
            <span>
              {isBangla ? "CURRENT STAGE" : "CURRENT STAGE"}
            </span>

            <span>
              {isBangla
                ? "DIGITAL / SECONDARY RESEARCH"
                : "DIGITAL / SECONDARY RESEARCH"}
            </span>
          </div>

        </div>

      </motion.div>


      {/* ==================================================
          RIGHT — RESEARCHER DOSSIER
          ================================================== */}

      <motion.aside
        className="researcher-dossier"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >

        <div className="dossier-top">

          <span className="dossier-label">
            {isBangla
              ? "গবেষক প্রোফাইল"
              : "RESEARCHER PROFILE"}
          </span>

          <span className="dossier-code">
            COMM / 01
          </span>

        </div>


        <div className="dossier-identity">

          <div className="dossier-avatar">
            MS
          </div>

          <div>
            <h3>
              {isBangla
                ? "স্ম. মেহেদী হাসান শাওন"
                : "Sm. Mehedi Hassan Shawon"}
            </h3>

            <p>
              {isBangla
                ? "Mass Communication & Journalism / Digital Media"
                : "Mass Communication & Journalism / Digital Media"}
            </p>

            <span>
              {isBangla
                ? "খুলনা বিশ্ববিদ্যালয়, বাংলাদেশ"
                : "Khulna University, Bangladesh"}
            </span>
          </div>

        </div>


        <div className="dossier-divider" />


        {/* Research Direction */}
        <div className="dossier-section">

          <div className="dossier-section-label">
            {isBangla
              ? "গবেষণা দিকনির্দেশ"
              : "RESEARCH DIRECTION"}
          </div>

          <p>
            {isBangla
              ? "Community communication · Digital storytelling · Media representation · Digital access · Participatory media"
              : "Community communication · Digital storytelling · Media representation · Digital access · Participatory media"}
          </p>

        </div>


        <div className="dossier-divider" />


        {/* Academic Background */}
        <div className="dossier-section">

          <div className="dossier-section-label">
            {isBangla
              ? "একাডেমিক ভিত্তি"
              : "ACADEMIC FOUNDATION"}
          </div>

          <p>
            {isBangla
              ? "স্নাতক গবেষণায় social media privacy নিয়ে কাজ করার পর digital storytelling, geospatial mapping, data visualization এবং displacement-related communication projects-এর মাধ্যমে research interest আরও বিস্তৃত করেছি।"
              : "My undergraduate research examined social media privacy, followed by work in digital storytelling, geospatial mapping, data visualization, and communication projects related to displacement."}
          </p>

        </div>


        <div className="dossier-divider" />


        {/* Related Work */}
        <div className="dossier-section">

          <div className="dossier-section-label">
            {isBangla
              ? "সম্পর্কিত কাজ"
              : "RELATED WORK"}
          </div>

          <a
            href="https://sundorban.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="related-work-link"
          >
            {isBangla
              ? "Sundarbans Climate Displacement Platform →"
              : "Sundarbans Climate Displacement Platform →"}
          </a>

        </div>


        <div className="dossier-divider" />


        {/* UNM Direction */}
        <div className="dossier-section">

          <div className="dossier-section-label">
            {isBangla
              ? "গ্র্যাজুয়েট গবেষণার লক্ষ্য"
              : "GRADUATE RESEARCH DIRECTION"}
          </div>

          <p>
            {isBangla
              ? "যোগাযোগ, সংস্কৃতি ও পরিবর্তনের সম্পর্ককে আরও গভীরভাবে অধ্যয়ন করে community-centered এবং digital-media research-কে methodological training-এর মাধ্যমে এগিয়ে নেওয়া।"
              : "To deepen my study of the relationship between communication, culture, and change, while developing stronger theoretical and methodological foundations for community-centered and digital-media research."}
          </p>

        </div>


        {/* Contact */}
        <div className="dossier-contact">

          <div>
            <span className="dossier-contact-label">
              {isBangla ? "যোগাযোগ" : "CONTACT"}
            </span>

            <a href="mailto:mehedishawon121@gmail.com">
              mehedishawon121@gmail.com
            </a>
          </div>

          <span className="dossier-arrow">
            ↗
          </span>

        </div>


        <div className="dossier-accent" />

      </motion.aside>

    </div>


    {/* ==================================================
        BOTTOM STATEMENT
        ================================================== */}

    <motion.div
      className="about-platform-bottom"
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      <span />

      <p>
        {isBangla
          ? "ডিজিটাল প্ল্যাটফর্মটি গবেষণার চূড়ান্ত ফল নয়; এটি ভবিষ্যৎ communication research-এর একটি প্রাথমিক ভিত্তি।"
          : "The digital platform is not presented as a finished research outcome, but as a foundation for further communication research."}
      </p>
    </motion.div>

  </div>
</section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">Witnessing Rohingya</div>
        <p className="footer-desc">
          {isBangla
            ? "রোহিঙ্গা বিস্থাপন গবেষণার জন্য একটি ডিজিটাল নথিকরণ প্ল্যাটফর্ম। ভূ-স্থানিক উপাত্ত এবং সম্প্রদায়ের কণ্ঠস্বর দিয়ে তৈরি।"
            : "A digital documentation platform for Rohingya displacement research. Built with geospatial data, community voices, and a commitment to representation over extraction."}
        </p>
        <div className="footer-links">
          <a href="#timeline">{isBangla ? "সময়রেখা" : "Timeline"}</a>
          <a href="#map">{isBangla ? "মানচিত্র" : "Map"}</a>
          <a href="#voices">{isBangla ? "কণ্ঠস্বর" : "Voices"}</a>
          <a href="#digital">
            {isBangla ? "ডিজিটাল অ্যাক্সেস" : "Digital Access"}
          </a>
          <a
            href="https://sundorban.vercel.app"
            target="_blank"
            rel="noreferrer"
          >
            {isBangla ? "সুন্দরবন প্ল্যাটফর্ম" : "Sundarbans Platform"}
          </a>
          <a href="mailto:mehedishawon121@gmail.com">
            {isBangla ? "যোগাযোগ" : "Contact"}
          </a>
        </div>
        <div className="footer-credit">
          {isBangla
            ? "তথ্যের উৎস: ইউএনএইচসিআর বাংলাদেশ · আইওএম বিস্থাপন ট্র্যাকিং ম্যাট্রিক্স · মিয়ানমার বিষয়ক জাতিসংঘ ফ্যাক্ট-ফাইন্ডিং মিশন · হিউম্যান রাইটস ওয়াচ · অ্যামনেস্টি ইন্টারন্যাশনাল · ইউনিসেফ বাংলাদেশ"
            : "Data sources: UNHCR Bangladesh · IOM Displacement Tracking Matrix · UN Fact-Finding Mission on Myanmar · Human Rights Watch · Amnesty International · UNICEF Bangladesh"}
          <br />
          {isBangla
            ? "তৈরি করেছেন স্ম. মেহেদী হাসান শাওন · প্ল্যাটফর্ম সংস্করণ ১.০ · ২০২৫"
            : "Built by Sm. Mehedi Hassan Shawon · Platform Version 1.0 · 2025"}
        </div>
      </footer>
    </>
  );
}
