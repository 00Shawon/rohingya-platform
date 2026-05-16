import Head from 'next/head'
import Nav from '../components/Nav'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { isBangla } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const text = {
    title: isBangla ? 'সম্পর্কে — Witnessing Rohingya' : 'About — Witnessing Rohingya',
    aboutPlatform: isBangla ? 'এই প্ল্যাটফর্ম সম্পর্কে' : 'About This Platform',
    whyDocument: isBangla ? 'আমরা কেন নথিবদ্ধ করি' : 'Why We Document',
    intro: isBangla 
      ? 'রোহিঙ্গা সংকট বিশ্বের সবচেয়ে বেশি নথিবদ্ধ মানবিক পরিস্থিতির মধ্যে একটি — এবং তবুও এর কেন্দ্রে থাকা সম্প্রদায়গুলো ডিজিটাল সিস্টেমগুলোতে সবচেয়ে কম প্রতিনিধিত্বশীল রয়ে গেছে যা তাদের সেবা করার দাবি করে।' 
      : 'The Rohingya crisis is among the most documented humanitarian situations in the world — and yet the communities at its center remain among the least represented in the digital systems that claim to serve them.',
    mission: isBangla ? 'লক্ষ্য' : 'Mission',
    purposeTitle: isBangla ? 'প্ল্যাটফর্মের উদ্দেশ্য' : 'Platform Purpose',
    purpose1: isBangla 
      ? 'এই প্ল্যাটফর্মটি একটি সম্প্রদায়-কেন্দ্রিক ডিজিটাল নথিকরণ উদ্যোগ। এর উদ্দেশ্য আন্তর্জাতিক দর্শকদের জন্য রোহিঙ্গা সংকটের প্রতিনিধিত্ব করা নয় — এর কোনো অভাব নেই — বরং এমন একটি ডিজিটাল অবকাঠামো তৈরি করা যা বিস্থাপন উপাত্ত, সম্প্রদায়ের সাক্ষ্য এবং গবেষণার ফলাফলগুলোকে সেইসব মানুষের কাছে অ্যাক্সেসযোগ্য করে তোলে যারা এর দ্বারা সবচেয়ে বেশি প্রভাবিত।' 
      : 'This platform is a community-centered digital documentation initiative. Its purpose is not to represent the Rohingya crisis for international audiences — there is no shortage of that — but to build a digital infrastructure that makes displacement data, community testimony, and research findings accessible to the people most affected by them.',
    purpose2: isBangla 
      ? 'প্ল্যাটফর্মটি লো-ব্যান্ডউইথ অ্যাক্সেস, দ্বিভাষিক নেভিগেশন (বাংলা এবং ইংরেজি) এবং সম্প্রদায়ের ব্যবহারযোগ্যতার জন্য ডিজাইন করা হয়েছে। এগুলো কেবল প্রযুক্তিগত চিন্তা নয়। এগুলো গবেষণার সিদ্ধান্ত — সরাসরি এই পর্যবেক্ষণ থেকে এসেছে যে বেশিরভাগ ডিজিটাল সাহায্য অবকাঠামো দাতা এবং নীতিনির্ধারকদের জন্য তৈরি করা হয়েছে, সেইসব মানুষের জন্য নয় যাদের সেবা করার দাবি করা হয়।' 
      : 'The platform is designed for low-bandwidth access, bilingual navigation (Bangla and English), and community usability. These are not technical afterthoughts. They are research decisions — following directly from the observation that most digital aid infrastructure is built for donors and policymakers, not for the people it claims to serve.',
    purpose3: isBangla 
      ? 'এই পদ্ধতিটি সুন্দরবন জলবায়ু বিস্থাপন প্ল্যাটফর্মের মাধ্যমে উন্নত কাজের একটি ধারাবাহিকতা — যেখানে একটি ভিন্ন প্রেক্ষাপটে একই প্রশ্ন উঠেছিল: আপনি কীভাবে এমন একটি ডিজিটাল সিস্টেম তৈরি করবেন যা গাবুরার একজন জেলে আসলে ব্যবহার করতে পারে?' 
      : 'This approach extends work developed through the Sundarbans Climate Displacement Platform — where the same question arose in a different context: how do you build a digital system that a fisherman in Gabura can actually use?',
    methodology: isBangla ? 'পদ্ধতি' : 'Methodology',
    methodTitle: isBangla ? 'কীভাবে এই প্ল্যাটফর্মটি তৈরি করা হয়েছে' : 'How This Platform Was Built',
    researchContext: isBangla ? 'গবেষণা প্রেক্ষাপট' : 'Research Context',
    peacebuildingTitle: isBangla ? 'জিওপোর্টাল এবং শান্তি বিনির্মাণ' : 'Geoportals and Peacebuilding',
    peacebuilding1: isBangla 
      ? 'এই প্ল্যাটফর্মটি নগর শান্তি বিনির্মাণ জিওপোর্টাল গবেষণা থেকে পদ্ধতিগত অনুপ্রেরণা গ্রহণ করে — যা বিস্থাপন এবং সংঘাতের পরে সম্প্রদায়গুলো কীভাবে পুনরুদ্ধার করে, পুনর্গঠন করে এবং অর্থ তৈরি করে তা নথিবদ্ধ করার জন্য ভূ-অবস্থানযুক্ত ডিজিটাল আর্কাইভ ব্যবহারের অনুশীলন।' 
      : 'This platform draws methodological inspiration from urban peacebuilding geoportal research — the practice of using geolocated digital archives to document how communities recover, rebuild, and construct meaning after displacement and conflict.',
    peacebuilding2: isBangla 
      ? 'যেখানে বিদ্যমান জিওপোর্টাল গবেষণা সংঘাত-পরবর্তী নগর পুনর্গঠনের ওপর দৃষ্টি নিবদ্ধ করেছে — ফিলিপাইনের মারাউই সিটির মতো স্থানগুলোর শারীরিক ও প্রতীকী রূপান্তর নথিবদ্ধ করেছে — এই প্ল্যাটফর্মটি একই কাঠামো জোরপূর্বক বিস্থাপনের প্রেক্ষাপটে প্রয়োগ করে। কক্সবাজার সংঘাত-পরবর্তী নয়। এটি চলমান বিস্থাপন। ক্যাম্পগুলো সাময়িক নয়। অনেক বাসিন্দা সেখানে কয়েক দশক ধরে আছেন।' 
      : "Where existing geoportal research has focused on post-conflict urban reconstruction — documenting the physical and symbolic transformation of sites like Marawi City in the Philippines — this platform applies the same framework to a forced displacement context. Cox's Bazar is not post-conflict. It is ongoing displacement. The camps are not temporary. Many residents have been there for decades.",
    peacebuilding3: isBangla 
      ? 'এই প্রেক্ষাপটে শান্তি বিনির্মাণ কেমন দেখায় তা আলাদা: এটি সেই কমিউনিটি স্কুল যা সরকারি স্বীকৃতি ছাড়াই কাজ করে, একটি বাঁশের আশ্রয়ে বজায় রাখা সাংস্কৃতিক অনুষ্ঠান, সেই প্রবীণ ব্যক্তি যিনি শিশুদের এমন একটি গ্রামের ভূগোল শেখান যা তারা কখনও দেখেনি। এই প্ল্যাটফর্ম বিস্থাপনের পরিসংখ্যানগত রেকর্ডের পাশাপাশি সেই দৈনন্দিন কাজগুলোকে নথিবদ্ধ করার চেষ্টা করে।' 
      : 'What peacebuilding looks like in this context is different: it is the community school that operates without government recognition, the cultural ceremony maintained in a bamboo shelter, the elder who teaches children the geography of a village they have never seen. This platform attempts to document those everyday acts alongside the statistical record of displacement.',
    platformResearcher: isBangla ? 'প্ল্যাটফর্ম গবেষক' : 'Platform Researcher',
    researcherDesc1: isBangla 
      ? 'আমি বাংলাদেশের খুলনার একজন যোগাযোগ গবেষক এবং ডিজিটাল প্ল্যাটফর্ম ডেভেলপার। আমার গবেষণা ডিজিটাল শাসন, সম্প্রদায় প্রতিনিধিত্ব এবং প্রান্তিক জনগোষ্ঠীর জন্য প্ল্যাটফর্ম ডিজাইনের সংযোগস্থলে অবস্থিত। আমার স্নাতক থিসিস বাংলাদেশী বিশ্ববিদ্যালয়ের শিক্ষার্থীদের মধ্যে ফেসবুকের প্রাইভেসি প্যারাডক্স পরীক্ষা করেছে — দেখা গেছে যে প্ল্যাটফর্ম ডিজাইন, ব্যবহারকারীর আচরণ নয়, কাঠামোগত নিরাপত্তা ব্যর্থতা তৈরি করেছে। তারপর থেকে আমি একদল প্ল্যাটফর্ম তৈরি করেছি যা ডিজাইন সিদ্ধান্তগুলোকে গবেষণার প্রশ্ন হিসেবে বিবেচনা করে।' 
      : 'I am a communication researcher and digital platform developer from Khulna, Bangladesh. My research sits at the intersection of digital governance, community representation, and platform design for marginalized communities. My undergraduate thesis examined the privacy paradox on Facebook among Bangladeshi university students — finding that platform design, not user behaviour, produced structural security failures. Since then I have built a series of platforms that treat design decisions as research questions.',
    researcherDesc2: isBangla 
      ? 'সুন্দরবন জলবায়ু বিস্থাপন প্ল্যাটফর্ম (sundorban.vercel.app) ভূ-স্থানিক ভিজ্যুয়ালাইজেশন এবং কমিউনিটি ফিল্ড ইন্টারভিউয়ের মাধ্যমে বাংলাদেশের ম্যানগ্রোভ ডেল্টায় জলবায়ু-প্ররোচিত বিস্থাপন নথিবদ্ধ করে। এই রোহিঙ্গা নথিকরণ প্ল্যাটফর্ম সেই পদ্ধতিটিকে জোরপূর্বক বিস্থাপনের দিকে প্রসারিত করে।' 
      : 'The Sundarbans Climate Displacement Platform (sundorban.vercel.app) documents climate-induced displacement in Bangladesh\'s mangrove delta through geospatial visualization and community field interviews. This Rohingya documentation platform extends that methodology to forced displacement.',
    sourcesTitle: isBangla ? 'তথ্যের উৎস ও স্বীকৃতি' : 'Data Sources & Attribution',
    sourcesSub: isBangla ? 'উৎসসমূহ' : 'Sources',
    home: isBangla ? 'হোম' : 'Home',
    contact: isBangla ? 'যোগাযোগ' : 'Contact',
    builtBy: isBangla ? 'তৈরি করেছেন স্ম. মেহেদী হাসান শাওন · খুলনা, বাংলাদেশ · ২০২৫' : 'Built by Sm. Mehedi Hassan Shawon · Khulna, Bangladesh · 2025'
  };

  const methods = [
    { 
      title: isBangla ? 'ভূ-স্থানিক উপাত্ত' : 'Geospatial Data', 
      desc: isBangla 
        ? 'ক্যাম্পের অবস্থান, জনসংখ্যার পরিসংখ্যান এবং বিস্থাপন জোনগুলো ইউএনএইচসিআর অপারেশনাল ডেটা পোর্টাল এবং আইওএম বিস্থাপন ট্র্যাকিং ম্যাট্রিক্স থেকে নেওয়া হয়েছে।' 
        : 'Camp locations, population figures, and displacement zones drawn from UNHCR Operational Data Portal and IOM Displacement Tracking Matrix.' 
    },
    { 
      title: isBangla ? 'কমিউনিটি সাক্ষ্য' : 'Community Testimony', 
      desc: isBangla 
        ? 'প্রকাশিত ইউএনএইচসিআর সাক্ষ্য আর্কাইভ, হিউম্যান রাইটস ওয়াচ ইন্টারভিউ ডকুমেন্টেশন এবং ইউনিসেফ শিক্ষা রিপোর্ট থেকে নেওয়া কণ্ঠস্বর।' 
        : 'Voices drawn from published UNHCR testimony archives, Human Rights Watch interview documentation, and UNICEF education reports.' 
    },
    { 
      title: isBangla ? 'ডিজিটাল অ্যাক্সেস গবেষণা' : 'Digital Access Research', 
      desc: isBangla 
        ? 'কুতুপালং এলাকায় ব্যক্তিগতভাবে পরিচালিত সংযোগ পরিমাপ (2G সংযোগ পরীক্ষা)। আইআরসি এবং আইওএম ডিজিটাল অন্তর্ভুক্তি জরিপ থেকে সেকেন্ডারি ডেটা।' 
        : 'Connectivity measurements conducted personally at Kutupalong area (2G connection testing). Secondary data from IRC and IOM digital inclusion surveys.' 
    },
    { 
      title: isBangla ? 'সময়রেখা সংকলন' : 'Timeline Compilation', 
      desc: isBangla 
        ? 'জাতিসংঘের ফ্যাক্ট-ফাইন্ডিং মিশন রিপোর্ট, অ্যামনেস্টি ইন্টারন্যাশনাল ডকুমেন্টেশন এবং আইসিজে মামলার রেকর্ড থেকে সংকলিত সংকটের কালানুক্রম।' 
        : 'Crisis chronology compiled from UN Fact-Finding Mission reports, Amnesty International documentation, and ICJ case records.' 
    },
  ];

  const sourceList = [
    'UNHCR Bangladesh Operational Data Portal (2024)',
    'IOM Displacement Tracking Matrix — Bangladesh (2024)',
    'UN Fact-Finding Mission on Myanmar — Final Report (2018)',
    'Human Rights Watch — "Massacre by the River" and related documentation (2017–2022)',
    'Amnesty International — Myanmar Reports (2016–2023)',
    'UNICEF Bangladesh — Education in Emergencies Report (2023)',
    'IRC Mobile Technology Survey — Cox\'s Bazar (2023)',
    'IOM Digital Inclusion Survey — Bangladesh (2023)',
    'BBS ICT Household Survey (2023)',
    'World Bank Digital Development Indicators — Bangladesh (2024)',
    'International Court of Justice — Gambia v. Myanmar proceedings (2019–present)',
  ];

  return (
    <>
      <Head>
        <title>{text.title}</title>
      </Head>
      <Nav />

      <div style={{ paddingTop: '60px', background: 'var(--paper)', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ background: 'var(--ink)', padding: '5rem 2rem 4rem' }}>
          <motion.div 
            style={{ maxWidth: '800px', margin: '0 auto' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#c0392b' }} />
              {text.aboutPlatform}
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              {text.whyDocument}
            </h1>
            <p style={{ color: '#8899aa', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '600px' }}>
              {text.intro}
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '5rem 2rem' }}>

          {/* Mission */}
          <motion.div style={{ marginBottom: '4rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', marginBottom: '0.75rem' }}>{text.mission}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>{text.purposeTitle}</h2>
            <p style={{ color: '#555', lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>{text.purpose1}</p>
            <p style={{ color: '#555', lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>{text.purpose2}</p>
            <p style={{ color: '#555', lineHeight: '1.9', fontSize: '0.95rem' }}>{text.purpose3}</p>
          </motion.div>

          {/* Methodology */}
          <motion.div 
            style={{ marginBottom: '4rem', padding: '2.5rem', background: '#f9f5ee', border: '1px solid #d4c9b8', borderLeft: '4px solid #c0392b' }}
            variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', marginBottom: '0.75rem' }}>{text.methodology}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{text.methodTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {methods.map((item, i) => (
                <div key={i}>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#777', lineHeight: '1.7' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Research Context */}
          <motion.div style={{ marginBottom: '4rem' }} variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1a3a5c', marginBottom: '0.75rem' }}>{text.researchContext}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>{text.peacebuildingTitle}</h2>
            <p style={{ color: '#555', lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>{text.peacebuilding1}</p>
            <p style={{ color: '#555', lineHeight: '1.9', marginBottom: '1rem', fontSize: '0.95rem' }}>{text.peacebuilding2}</p>
            <p style={{ color: '#555', lineHeight: '1.9', fontSize: '0.95rem' }}>{text.peacebuilding3}</p>
          </motion.div>

          {/* Researcher */}
          <motion.div 
            style={{ marginBottom: '4rem', background: 'var(--ink)', padding: '2.5rem', borderTop: '3px solid #c0392b' }}
            variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}
          >
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c0392b', marginBottom: '1rem' }}>{text.platformResearcher}</div>
            <div style={{ fontSize: '1.3rem', fontFamily: 'Playfair Display, serif', color: 'white', fontWeight: '700', marginBottom: '0.3rem' }}>{isBangla ? 'স্ম. মেহেদী হাসান শাওন' : 'Sm. Mehedi Hassan Shawon'}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#666', marginBottom: '1.5rem' }}>{isBangla ? 'গণযোগাযোগ ও সাংবাদিকতা · খুলনা বিশ্ববিদ্যালয়, বাংলাদেশ' : 'Mass Communication & Journalism · Khulna University, Bangladesh'}</div>
            <p style={{ color: '#8899aa', fontSize: '0.88rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{text.researcherDesc1}</p>
            <p style={{ color: '#8899aa', fontSize: '0.88rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>{text.researcherDesc2}</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <a href="mailto:mehedishawon121@gmail.com" style={{ color: '#c0392b', fontFamily: 'monospace', fontSize: '0.8rem', textDecoration: 'none' }}>mehedishawon121@gmail.com</a>
              <a href="https://shawon-academic-portfolio.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#8899aa', fontFamily: 'monospace', fontSize: '0.8rem', textDecoration: 'none' }}>{isBangla ? 'পোর্টফোলিও →' : 'Portfolio →'}</a>
              <a href="https://sundorban.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#8899aa', fontFamily: 'monospace', fontSize: '0.8rem', textDecoration: 'none' }}>{isBangla ? 'সুন্দরবন প্ল্যাটফর্ম →' : 'Sundarbans Platform →'}</a>
            </div>
          </motion.div>

          {/* Sources */}
          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>{text.sourcesTitle}</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>{text.sourcesSub}</h2>
            {sourceList.map((source, i) => (
              <div key={i} style={{ fontSize: '0.82rem', color: '#666', fontFamily: 'monospace', padding: '0.5rem 0', borderBottom: '1px solid #eee', display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: '#c0392b' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{source}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <footer className="footer">
        <div className="footer-brand">Witnessing Rohingya</div>
        <div className="footer-links">
          <Link href="/">{text.home}</Link>
          <a href="https://sundorban.vercel.app" target="_blank" rel="noreferrer">{isBangla ? 'সুন্দরবন প্ল্যাটফর্ম' : 'Sundarbans Platform'}</a>
          <a href="mailto:mehedishawon121@gmail.com">{text.contact}</a>
        </div>
        <div className="footer-credit">
          {text.builtBy}
        </div>
      </footer>
    </>
  )
}
