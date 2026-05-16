import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav'
import { useLanguage } from '../context/LanguageContext'
import { stats, timeline, camps, voices, digitalAccessData } from '../data'

// Dynamic import for map (no SSR)
const DisplacementMap = dynamic(() => import('../components/DisplacementMap'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0e8', color: '#999', fontFamily: 'monospace', fontSize: '0.8rem' }}>
      Loading map…
    </div>
  )
})

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

function AnimatedBar({ value, unit, inView }) {
  const [width, setWidth] = useState(0)
  const maxVal = unit === 'sec' ? 30 : 100

  useEffect(() => {
    if (inView) {
      setTimeout(() => setWidth((value / maxVal) * 100), 300)
    }
  }, [inView, value, maxVal])

  return (
    <div className="access-bar-track">
      <div className="access-bar-fill" style={{ width: `${width}%` }} />
    </div>
  )
}

export default function Home() {
  const { isBangla, toggleLanguage } = useLanguage();
  const digitalRef = useRef(null)
  const [digitalInView, setDigitalInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setDigitalInView(true)
    }, { threshold: 0.2 })
    if (digitalRef.current) observer.observe(digitalRef.current)
    return () => observer.disconnect()
  }, [])

  const text = {
    heroLabel: isBangla ? 'ডিজিটাল সাক্ষ্য প্রকল্প — রোহিঙ্গা বিস্থাপন' : 'Digital Witnessing Project — Rohingya Displacement',
    heroTitle1: isBangla ? 'বিশ্বের বৃহত্তম' : 'The World\'s Largest',
    heroTitle2: isBangla ? 'শরণার্থী সংকট' : 'Refugee Settlement',
    heroTitle3: isBangla ? 'নথিভুক্ত' : 'Documented',
    heroDesc: isBangla
      ? 'কক্সবাজার, বাংলাদেশ। ১০ লাখেরও বেশি রোহিঙ্গা শরণার্থী। এই প্ল্যাটফর্ম তাদের বাস্তুচ্যুতি, তাদের কণ্ঠস্বর এবং তাদের টিকে থাকার গল্প নথিভুক্ত করে।'
      : 'Cox\'s Bazar, Bangladesh. Over one million Rohingya refugees. This platform documents their displacement, their voices, and their everyday acts of survival and peacebuilding — through geospatial data, community testimony, and digital research.',
    mapTitle: isBangla ? 'বিস্থাপন মানচিত্র' : 'Displacement Geography',
    voicesTitle: isBangla ? 'কণ্ঠস্বর' : 'Community Voices',
    timelineTitle: isBangla ? 'সংকটের ইতিহাস' : 'History of the Crisis',
    exploreMap: isBangla ? 'মানচিত্র দেখুন' : 'Explore Map',
    viewTimeline: isBangla ? 'সময়রেখা দেখুন' : 'View Timeline',
    byNumbers: isBangla ? 'পরিসংখ্যান' : 'By the Numbers',
    scaleTitle: isBangla ? 'বিস্থাপনের মাত্রা' : 'The Scale of Displacement',
    historyTitle: isBangla ? '১৯৭৮ থেকে আজ পর্যন্ত' : 'From 1978 to Today',
    historyDesc: isBangla ? 'রোহিঙ্গা সংকট ২০১৭ সালে শুরু হয়নি। এটি কয়েক দশকের পদ্ধতিগত বর্জন, রাষ্ট্রহীনতা এবং সহিংসতার চরম পরিণতি — একটি সম্পূর্ণ জনগোষ্ঠীকে তাদের জন্মভূমি থেকে মুছে ফেলার এক ধীর প্রক্রিয়া।' : 'The Rohingya crisis did not begin in 2017. It is the culmination of decades of systematic exclusion, statelessness, and violence — a slow erasure of an entire people from their homeland.',
    dataSources: isBangla ? 'তথ্যের উৎস' : 'Data Sources',
    coxBazarTitle: isBangla ? 'কক্সবাজার — শরণার্থী বসতি' : 'Cox\'s Bazar — Refugee Settlements',
    mapDesc: isBangla ? 'বিস্থাপনের ভূগোল অন্বেষণ করুন। প্রতিটি শিবির, তাদের জনসংখ্যা, উপলব্ধ পরিষেবা এবং বাসিন্দাদের মুখোমুখি চ্যালেঞ্জগুলো সম্পর্কে জানতে প্রতিটি মার্কার ক্লিক করুন।' : 'Explore the geography of displacement. Click each marker to learn about individual camps, their populations, available services, and the challenges faced by residents.',
    testimony: isBangla ? 'সাক্ষ্য' : 'Testimony',
    voicesDesc: isBangla ? 'এই বিবরণগুলো প্রকাশিত ইউএনএইচসিআর সাক্ষ্য আর্কাইভ, হিউম্যান রাইটস ওয়াচ সাক্ষাৎকার এবং ইউনিসেফ রিপোর্ট থেকে নেওয়া হয়েছে। মূল নথিতে অনুরোধ করা হলে নাম পরিবর্তন করা হয়েছে। সমস্ত বিবরণ যাচাইকৃত এবং উৎস নির্দেশিত।' : 'These accounts are drawn from published UNHCR testimony archives, Human Rights Watch interviews, and UNICEF reports. Names have been changed where requested by the original documentation. All accounts are verified and sourced.',
    researchFinding: isBangla ? 'গবেষণার ফলাফল' : 'Research Finding',
    digitalGap: isBangla ? 'ডিজিটাল অ্যাক্সেস গ্যাপ' : 'The Digital Access Gap',
    digitalDesc: isBangla ? 'এই গবেষণা ২০২৪ সালের নভেম্বর থেকে ২০২৫ সালের জানুয়ারি পর্যন্ত উখিয়া ও টেকনাফ উপজেলায় পরিচালিত হয়েছে।' : 'Research conducted November 2024–January 2025 in Ukhia and Teknaf sub-districts.',
    methodology: isBangla ? 'গবেষণা পদ্ধতি' : 'Research Methodology',
    methodologyDesc: isBangla ? 'উখিয়া ও টেকনাফ উপজেলার ফিল্ড ভিটের মাধ্যমে তথ্য সংগ্রহ করা হয়েছে (নভেম্বর ২০২৪ - জানুয়ারি ২০২৫)।' : 'Data collected through field visits to Ukhia and Teknaf sub-districts (November 2024–January 2025).',
    keyFinding: isBangla ? 'মূল ফলাফল' : 'KEY FINDING',
    aboutTitle: isBangla ? 'এই প্রকল্প সম্পর্কে' : 'About This Project',
    platformResearcher: isBangla ? 'প্ল্যাটফর্ম গবেষক' : 'Platform Researcher',
    researchInterests: isBangla ? 'গবেষণার আগ্রহ: জলবায়ু-ঝুঁকিপূর্ণ অঞ্চলে ডিজিটাল শাসন, প্রান্তিক জনগোষ্ঠীর জন্য প্ল্যাটফর্ম ডিজাইন এবং বিস্থাপনের ভূ-স্থানিক নথিভুক্তকরণ।' : 'Research interests: digital governance in climate-vulnerable regions, platform design for marginalized communities, and geospatial documentation of displacement.',
  }

  return (
    <>
      <Head>
        <title>Witnessing Rohingya — Digital Displacement Documentation</title>
      </Head>

      <Nav />

      {/* LANGUAGE TOGGLE */}
      <div style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        zIndex: 999, display: 'flex', gap: '0.5rem'
      }}>
        <button
          onClick={() => toggleLanguage(false)}
          style={{
            padding: '0.5rem 0.9rem',
            background: !isBangla ? '#c0392b' : '#fff',
            color: !isBangla ? '#fff' : '#333',
            border: '1px solid #c0392b',
            fontFamily: 'monospace', fontSize: '0.72rem',
            cursor: 'pointer', letterSpacing: '0.05em'
          }}>EN</button>
        <button
          onClick={() => toggleLanguage(true)}
          style={{
            padding: '0.5rem 0.9rem',
            background: isBangla ? '#c0392b' : '#fff',
            color: isBangla ? '#fff' : '#333',
            border: '1px solid #c0392b',
            fontFamily: 'monospace', fontSize: '0.72rem',
            cursor: 'pointer'
          }}>বাং</button>
      </div>

      {/* HERO */}
      <section className="hero">
        <motion.div className="hero-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} />
        <div className="hero-accent" />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="hero-label">{text.heroLabel}</div>
            <h1 className="hero-title">
              {text.heroTitle1}<br />
              <motion.em initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{text.heroTitle2}</motion.em><br />
              {text.heroTitle3}
            </h1>
            <p className="hero-desc">{text.heroDesc}</p>
            <div className="hero-cta">
              <a href="#map" className="btn-primary">{text.exploreMap}</a>
              <a href="#timeline" className="btn-outline">{text.viewTimeline}</a>
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
              <motion.div className="hero-stat-item" key={i} variants={fadeInUp}>
                <div className="hero-stat-num">{s.number}</div>
                <div className="hero-stat-label">{isBangla ? s.labelBn : s.label}</div>
                {s.sublabel && <div style={{ fontSize: '0.65rem', color: '#555', fontFamily: 'monospace', marginTop: '0.15rem' }}>{isBangla ? s.sublabelBn : s.sublabel}</div>}
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
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)', textAlign: 'center'
          }}
        >
          <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: '#555', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>SCROLL</div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #555, transparent)', margin: '0 auto' }} 
          />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bg section-full">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <motion.div className="section-label" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.byNumbers}</motion.div>
          <motion.h2 className="section-title" style={{ color: 'white', marginBottom: '2.5rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.scaleTitle}</motion.h2>
          <motion.div 
            className="stats-grid"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {stats.map((s, i) => (
              <motion.div className="stat-card" key={i} variants={fadeInUp} whileHover={{ y: -5 }}>
                <div className="stat-number">{s.number}</div>
                <div className="stat-label">{isBangla ? s.labelBn : s.label}</div>
                {s.sublabel && <div className="stat-sublabel">{isBangla ? s.sublabelBn : s.sublabel}</div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="section-full timeline-bg">
        <div className="section" style={{ paddingTop: '0', paddingBottom: '0' }}>
          <motion.div className="section-label" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.timelineTitle}</motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.historyTitle}</motion.h2>
          <motion.p className="section-desc" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {text.historyDesc}
          </motion.p>
          <motion.div 
            className="timeline"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {timeline.map((item, i) => (
              <motion.div className="timeline-item" key={i} variants={fadeInUp}>
                <div className="timeline-dot" style={{ background: item.color }} />
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-title">{isBangla ? item.titleBn : item.title}</div>
                <div className="timeline-desc">{isBangla ? item.descriptionBn : item.description}</div>
                <span className="timeline-casualties">{isBangla ? item.casualtiesBn : item.casualties}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="research-note" style={{ marginTop: '3rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div className="research-note-label">{text.dataSources}</div>
            <p>{isBangla ? 'ইউএনএইচসিআর বাংলাদেশ রিপোর্ট (১৯৯১–২০২৪), মিয়ানমার বিষয়ক জাতিসংঘ ফ্যাক্ট-ফাইন্ডিং মিশন (২০১৮), হিউম্যান রাইটস ওয়াচ নথিপত্র এবং অ্যামনেস্টি ইন্টারন্যাশনাল ফিল্ড রিপোর্ট থেকে সংকলিত।' : 'Timeline data compiled from UNHCR Bangladesh Reports (1991–2024), UN Fact-Finding Mission on Myanmar (2018), Human Rights Watch documentation, and Amnesty International field reports.'}</p>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="section-label" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.mapTitle}</motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.coxBazarTitle}</motion.h2>
          <motion.p className="section-desc" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {text.mapDesc}
          </motion.p>

          {/* Camp population bar */}
          <motion.div 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: '#eee', marginBottom: '1.5rem', border: '1px solid #eee' }}
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {camps.map(camp => (
              <motion.div key={camp.id} style={{ background: 'white', padding: '1rem' }} variants={fadeInUp}>
                <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#999', marginBottom: '0.3rem' }}>{isBangla ? camp.nameBn : camp.name}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: '700', color: '#c0392b' }}>
                  {camp.population.toLocaleString()}
                </div>
                <div style={{ height: '3px', background: '#eee', marginTop: '0.4rem' }}>
                  <div style={{ height: '100%', background: camp.id === 5 ? '#0284c7' : '#c0392b', width: `${(camp.population / 630000) * 100}%`, transition: 'width 1s ease' }} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="map-container" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <DisplacementMap />
          </motion.div>

          <div style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#999', textAlign: 'right' }}>
            {isBangla ? 'উৎস: ইউএনএইচসিআর বাংলাদেশ অপারেশনাল আপডেট ২০২৪ · আইওএম বিস্থাপন ট্র্যাকিং ম্যাট্রিক্স ২০২৪' : 'Data: UNHCR Bangladesh Operational Update 2024 · IOM Displacement Tracking Matrix 2024'}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section id="voices" style={{ padding: '6rem 2rem', background: 'var(--paper-dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div className="section-label" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.voicesTitle}</motion.div>
          <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.testimony}</motion.h2>
          <motion.p className="section-desc" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {text.voicesDesc}
          </motion.p>
          <motion.div 
            className="voices-grid"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {voices.map(v => (
              <motion.div className="voice-card" key={v.id} variants={fadeInUp}>
                <span className="voice-quote-mark">"</span>
                <p className="voice-quote">{isBangla ? v.quoteBn : v.quote}</p>
                <div className="voice-attribution">
                  <span className="voice-name">{isBangla ? v.nameBn : v.name}</span>
                  <span>{isBangla ? v.campBn : v.camp} · {isBangla ? 'আগমন' : 'Arrived'} {v.year}</span>
                  <span>{isBangla ? v.contextBn : v.context}</span>
                  <span className="voice-source">{isBangla ? 'উৎস' : 'Source'}: {v.source}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* COMMUNITY GALLERY */}
          <div style={{ marginTop: '5rem' }}>
            <motion.div className="section-label" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{isBangla ? 'আলোকচিত্র নথি' : 'Photo Documentation'}</motion.div>
            <motion.h2 className="section-title" variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{isBangla ? 'কমিউনিটি গ্যালারি' : 'Community Gallery'}</motion.h2>
            <motion.div 
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {[
                { src: '/images/community/community-1.webp', alt: 'Community 1' },
                { src: '/images/community/community-2.webp', alt: 'Community 2' },
                { src: '/images/community/community-3.webp', alt: 'Community 3' },
                { src: '/images/community/community-4.jpg', alt: 'Community 4' },
              ].map((img, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  style={{ overflow: 'hidden', borderRadius: '4px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* DIGITAL ACCESS RESEARCH */}
      <section id="digital" ref={digitalRef} className="section-full digital-bg">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
          <motion.div className="section-label" style={{ color: '#c0392b' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>{text.researchFinding}</motion.div>
          <motion.h2 className="section-title" style={{ color: 'white', marginBottom: '0.75rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {text.digitalGap}
          </motion.h2>
          <motion.p style={{ color: '#8899aa', maxWidth: '600px', lineHeight: '1.8', marginBottom: '3rem', fontSize: '1rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {isBangla ? digitalAccessData.descriptionBn : digitalAccessData.description}. {isBangla ? 'সহায়তা বিতরণের জন্য ডিজাইন করা ডিজিটাল সিস্টেমগুলো সেই সম্প্রদায়গুলোতে পৌঁছাতে ব্যর্থ হচ্ছে যাদের জন্য এগুলো তৈরি করা হয়েছে।' : 'Digital systems designed for aid delivery fail to reach the communities they intend to serve.'}
          </motion.p>

          <div className="digital-grid">
            <motion.div 
              className="access-bars"
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {digitalAccessData.findings.map((f, i) => (
                <motion.div className="access-item" key={i} variants={fadeInUp}>
                  <div className="access-label">
                    <span>{isBangla ? f.metricBn : f.metric}</span>
                    <span>{f.value}{f.unit}</span>
                  </div>
                  <AnimatedBar value={f.value} unit={f.unit} inView={digitalInView} />
                  <div className="access-context">{isBangla ? f.contextBn : f.context}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '3px solid #c0392b', padding: '2rem' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'white', fontWeight: '700', marginBottom: '1rem' }}>
                  {text.methodology}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#8899aa', lineHeight: '1.8', marginBottom: '1rem' }}>
                  {text.methodologyDesc} {isBangla ? 'কুতুপালং বসতি কমপ্লেক্সের ভেতরে এবং আশেপাশে একাধিক স্থানে ব্যক্তিগত ডিভাইসে সংযোগ পরীক্ষা করা হয়েছে।' : 'Connectivity measured via personal device testing at multiple locations within and around the Kutupalong settlement complex.'}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#556', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{isBangla ? 'তথ্যের উৎস' : 'DATA SOURCES'}</div>
                  {(isBangla ? digitalAccessData.sourcesBn : digitalAccessData.sources).map((s, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: '#667', marginBottom: '0.3rem', fontFamily: 'monospace' }}>• {s}</div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(192,57,43,0.15)', borderLeft: '3px solid #c0392b' }}>
                  <div style={{ fontSize: '0.85rem', color: '#c0392b', fontFamily: 'monospace', marginBottom: '0.3rem' }}>{text.keyFinding}</div>
                  <div style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6' }}>
                    {isBangla ? 'ইউএনএইচসিআর রিফিউজি পোর্টাল — যা শিবিরের বাসিন্দাদের জন্য প্রাথমিক ডিজিটাল সম্পদ — একটি স্ট্যান্ডার্ড 2G সংযোগে লোড হতে ২২+ সেকেন্ড সময় নেয়। ঘূর্ণিঝড়ের সতর্কতার সময় তথ্যপ্রার্থী একটি পরিবারের জন্য এটি কেবল একটি পরিষেবা ব্যবধান নয়, এটি একটি প্রশাসনিক ব্যর্থতা।' : 'The UNHCR refugee portal — the primary digital resource for camp residents — takes 22+ seconds to load on a standard 2G connection. For a family seeking information during a cyclone warning, this is not a service gap. It is a governance failure.'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT RESEARCH */}
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <div className="section-label">{text.aboutTitle}</div>
              <h2 className="section-title">{isBangla ? 'গবেষণা প্ল্যাটফর্ম' : 'Research Platform'}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {isBangla ? 'এই প্ল্যাটফর্মটি একটি সম্প্রদায়-কেন্দ্রিক ডিজিটাল নথিকরণ উদ্যোগ যা বাংলাদেশের কক্সবাজারে রোহিঙ্গা বিস্থাপন এবং দৈনন্দিন শান্তি বিনির্মাণ পরীক্ষা করে।' : "This platform is a community-centered digital documentation initiative examining Rohingya displacement and everyday peacebuilding in Cox's Bazar, Bangladesh."}
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {isBangla ? 'প্ল্যাটফর্মটি যোগাযোগ গবেষণা, ডিজিটাল হিউম্যানিটিজ এবং শান্তি অধ্যয়নের সংযোগস্থলে অবস্থিত।' : 'The platform sits at the intersection of communication research, digital humanities, and peace studies.'}
              </p>
              <div className="research-note">
                <div className="research-note-label">{isBangla ? 'পদ্ধতিগত নোট' : 'Methodological Note'}</div>
                <p>{isBangla ? 'সমস্ত কমিউনিটি সাক্ষ্য প্রকাশিত ইউএনএইচসিআর, এইচআরডব্লিউ এবং ইউনিসেফ উৎস থেকে নেওয়া হয়েছে। এই পর্যায়ে শিবিরের বাসিন্দাদের সাথে কোনো সরাসরি ফিল্ড ইন্টারভিউ করা হয়নি।' : 'All community testimonies are drawn from published UNHCR, HRW, and UNICEF sources. No direct field interviews have been conducted with camp residents for this platform in its current stage.'}</p>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', padding: '2rem' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                  {text.platformResearcher}
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--ink)', marginBottom: '0.25rem' }}>
                  {isBangla ? 'স্ম. মেহেদী হাসান শাওন' : 'Sm. Mehedi Hassan Shawon'}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
                  {isBangla ? 'গণযোগাযোগ ও সাংবাদিকতা / ডিজিটাল প্ল্যাটফর্ম ডেভেলপমেন্ট' : 'Mass Communication & Journalism / Digital Platform Development'}<br />
                  {isBangla ? 'খুলনা বিশ্ববিদ্যালয়, বাংলাদেশ' : 'Khulna University, Bangladesh'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  {text.researchInterests} {isBangla ? 'সংশ্লিষ্ট কাজের মধ্যে রয়েছে সুন্দরবন জলবায়ু বিস্থাপন প্ল্যাটফর্ম (sundorban.vercel.app)।' : 'Related work includes the Sundarbans Climate Displacement Platform (sundorban.vercel.app).'}
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#999', marginBottom: '0.5rem' }}>{isBangla ? 'যোগাযোগ' : 'CONTACT'}</div>
                  <a href="mailto:mehedishawon121@gmail.com" style={{ color: 'var(--red)', fontFamily: 'monospace', fontSize: '0.8rem', textDecoration: 'none' }}>
                    mehedishawon121@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">Witnessing Rohingya</div>
        <p className="footer-desc">
          {isBangla ? 'রোহিঙ্গা বিস্থাপন গবেষণার জন্য একটি ডিজিটাল নথিকরণ প্ল্যাটফর্ম। ভূ-স্থানিক উপাত্ত এবং সম্প্রদায়ের কণ্ঠস্বর দিয়ে তৈরি।' : 'A digital documentation platform for Rohingya displacement research. Built with geospatial data, community voices, and a commitment to representation over extraction.'}
        </p>
        <div className="footer-links">
          <a href="#timeline">{isBangla ? 'সময়রেখা' : 'Timeline'}</a>
          <a href="#map">{isBangla ? 'মানচিত্র' : 'Map'}</a>
          <a href="#voices">{isBangla ? 'কণ্ঠস্বর' : 'Voices'}</a>
          <a href="#digital">{isBangla ? 'ডিজিটাল অ্যাক্সেস' : 'Digital Access'}</a>
          <a href="https://sundorban.vercel.app" target="_blank" rel="noreferrer">{isBangla ? 'সুন্দরবন প্ল্যাটফর্ম' : 'Sundarbans Platform'}</a>
          <a href="mailto:mehedishawon121@gmail.com">{isBangla ? 'যোগাযোগ' : 'Contact'}</a>
        </div>
        <div className="footer-credit">
          {isBangla ? 'তথ্যের উৎস: ইউএনএইচসিআর বাংলাদেশ · আইওএম বিস্থাপন ট্র্যাকিং ম্যাট্রিক্স · মিয়ানমার বিষয়ক জাতিসংঘ ফ্যাক্ট-ফাইন্ডিং মিশন · হিউম্যান রাইটস ওয়াচ · অ্যামনেস্টি ইন্টারন্যাশনাল · ইউনিসেফ বাংলাদেশ' : 'Data sources: UNHCR Bangladesh · IOM Displacement Tracking Matrix · UN Fact-Finding Mission on Myanmar · Human Rights Watch · Amnesty International · UNICEF Bangladesh'}<br />
          {isBangla ? 'তৈরি করেছেন স্ম. মেহেদী হাসান শাওন · প্ল্যাটফর্ম সংস্করণ ১.০ · ২০২৫' : 'Built by Sm. Mehedi Hassan Shawon · Platform Version 1.0 · 2025'}
        </div>
      </footer>
    </>
  )
}
