import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { isBangla } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  const stagger = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const text = {
    title: isBangla
      ? "সম্পর্কে — Witnessing Rohingya"
      : "About — Witnessing Rohingya",

    heroKicker: isBangla
      ? "ডিজিটাল গবেষণা প্ল্যাটফর্ম"
      : "DIGITAL RESEARCH PLATFORM",

    heroTitle: isBangla
      ? "যোগাযোগ, প্রতিনিধিত্ব ও ডিজিটাল অ্যাক্সেস"
      : "Communication, Representation & Digital Access",

    heroIntro: isBangla
      ? "Witnessing Rohingya একটি digital documentation project, যার মাধ্যমে displacement, community communication, media representation এবং information access-এর সম্পর্ক অনুসন্ধানের প্রাথমিক কাজ করা হয়েছে।"
      : "Witnessing Rohingya is a digital documentation project that begins to examine the relationship between displacement, community communication, media representation, and access to information.",

    explore: isBangla ? "প্ল্যাটফর্ম দেখুন" : "Explore the Platform",
    sourcesLink: isBangla ? "উৎস দেখুন" : "View Sources",

    overviewLabel: isBangla ? "প্ল্যাটফর্ম" : "THE PLATFORM",
    overviewTitle: isBangla
      ? "একটি যোগাযোগ-কেন্দ্রিক ডিজিটাল নথি"
      : "A Communication-Centered Digital Record",

    overviewLead: isBangla
      ? "এই প্ল্যাটফর্মের কেন্দ্রে রয়েছে একটি যোগাযোগ-ভিত্তিক প্রশ্ন: displaced communities-এর অভিজ্ঞতা ডিজিটাল মাধ্যমে কীভাবে নথিবদ্ধ, উপস্থাপিত এবং অ্যাক্সেসযোগ্য হয়?"
      : "At the center of this platform is a communication question: how are the experiences of displaced communities documented, represented, and made accessible through digital media?",

    overviewBody1: isBangla
      ? "ইন্টারেক্টিভ timeline, geospatial mapping, published testimonies এবং bilingual navigation ব্যবহার করে একটি দীর্ঘমেয়াদি displacement history-কে accessible digital form-এ সংগঠিত করা হয়েছে।"
      : "Interactive timelines, geospatial mapping, published testimonies, and bilingual navigation are used to organize a long-term displacement history into an accessible digital form.",

    overviewBody2: isBangla
      ? "কাজটির আরেকটি গুরুত্বপূর্ণ দিক digital access। তথ্য তৈরি করা যেমন গুরুত্বপূর্ণ, সেই তথ্য যাদের জন্য তৈরি—তারা সেটি কতটা সহজে ব্যবহার করতে পারে, platform design-এ সেই প্রশ্নও বিবেচনা করা হয়েছে।"
      : "Another central concern is digital access. Beyond producing information, the project also considers how easily the people for whom that information matters can actually access and use it.",

    focusLabel: isBangla ? "গবেষণার ফোকাস" : "RESEARCH FOCUS",
    focusTitle: isBangla
      ? "যোগাযোগের কয়েকটি আন্তঃসংযুক্ত প্রশ্ন"
      : "A Set of Interconnected Communication Questions",

    methodology: isBangla ? "পদ্ধতি" : "METHODOLOGY",
    methodologyTitle: isBangla
      ? "কীভাবে প্ল্যাটফর্মটি তৈরি হয়েছে"
      : "How the Platform Was Built",

    methodologyIntro: isBangla
      ? "বর্তমান platform একটি secondary-source digital documentation project। বিভিন্ন প্রামাণ্য উৎসকে একটি coherent digital structure-এর মধ্যে সংগঠিত করার পাশাপাশি information access এবং representation-এর বিষয়গুলো design-এর অংশ করা হয়েছে।"
      : "The current platform is a secondary-source digital documentation project. Alongside organizing documentary materials into a coherent digital structure, questions of information access and representation have been treated as part of the design process.",

    researchContext: isBangla
      ? "গবেষণা দিকনির্দেশ"
      : "RESEARCH DIRECTION",

    researchTitle: isBangla
      ? "Community Communication, Digital Storytelling & Representation"
      : "Community Communication, Digital Storytelling & Representation",

    researchBody1: isBangla
      ? "আমার আগ্রহ community communication, digital storytelling, media representation, digital access এবং participatory media-এর সংযোগস্থলে। বিশেষভাবে জানতে আগ্রহী, digital media কীভাবে communities-এর lived experiences, perspectives এবং priorities প্রকাশের সুযোগ তৈরি করে।"
      : "My research interests lie at the intersection of community communication, digital storytelling, media representation, digital access, and participatory media. I am particularly interested in how digital media can create space for communities to communicate their lived experiences, perspectives, and priorities.",

    researchBody2: isBangla
      ? "Witnessing Rohingya এই আগ্রহের একটি digital pre-work। পরবর্তী গবেষণায় community-based এবং participatory approaches ব্যবহার করে published documentation-এর বাইরে মানুষের নিজেদের narratives এবং communication practices আরও সরাসরি অনুসন্ধান করার আগ্রহ রয়েছে।"
      : "Witnessing Rohingya is a digital pre-work for this broader research direction. Future work may extend beyond published documentation through community-based and participatory approaches to examine people's own narratives and communication practices more directly.",

    researcherLabel: isBangla
      ? "গবেষক"
      : "RESEARCHER",

    researcherTitle: isBangla
      ? "স্ম. মেহেদী হাসান শাওন"
      : "Sm. Mehedi Hassan Shawon",

    researcherRole: isBangla
      ? "Mass Communication & Journalism · Digital Platform Development"
      : "Mass Communication & Journalism · Digital Platform Development",

    researcherUniversity: isBangla
      ? "খুলনা বিশ্ববিদ্যালয়, বাংলাদেশ"
      : "Khulna University, Bangladesh",

    researcherBody1: isBangla
      ? "আমি যোগাযোগ গবেষণা ও digital platform development-এর সংযোগস্থলে কাজ করি। আমার undergraduate research social media privacy নিয়ে ছিল; পরবর্তীতে digital storytelling, geospatial mapping, data visualization এবং displacement-related communication projects-এর মাধ্যমে research interests আরও বিস্তৃত করেছি।"
      : "I work at the intersection of communication research and digital platform development. My undergraduate research examined social media privacy, followed by work in digital storytelling, geospatial mapping, data visualization, and communication projects related to displacement.",

    researcherBody2: isBangla
      ? "সুন্দরবন Climate Displacement Platform এবং Witnessing Rohingya-এর মতো project-এর মাধ্যমে digital environments-কে শুধু presentation layer হিসেবে নয়, বরং research questions, access, representation এবং communication-এর অংশ হিসেবে দেখতে শুরু করেছি।"
      : "Through projects such as the Sundarbans Climate Displacement Platform and Witnessing Rohingya, I have increasingly approached digital environments not simply as presentation layers, but as part of the questions of access, representation, and communication themselves.",

    researchDirection: isBangla
      ? "গ্র্যাজুয়েট গবেষণার দিক"
      : "GRADUATE RESEARCH DIRECTION",

    researchDirectionText: isBangla
      ? "Community communication · Digital storytelling · Media representation · Digital access · Participatory media"
      : "Community communication · Digital storytelling · Media representation · Digital access · Participatory media",

    sourcesTitle: isBangla
      ? "তথ্যের উৎস ও স্বীকৃতি"
      : "Data Sources & Attribution",

    sourcesIntro: isBangla
      ? "প্ল্যাটফর্মে ব্যবহৃত documentary materials এবং supporting datasets-এর প্রধান উৎসসমূহ।"
      : "Primary documentary and supporting data sources used across the platform.",

    contact: isBangla ? "যোগাযোগ" : "CONTACT",
    portfolio: isBangla ? "পোর্টফোলিও" : "Portfolio",
    sundarbans: isBangla
      ? "সুন্দরবন প্ল্যাটফর্ম"
      : "Sundarbans Platform",

    home: isBangla ? "হোম" : "Home",

    builtBy: isBangla
      ? "তৈরি করেছেন স্ম. মেহেদী হাসান শাওন · খুলনা, বাংলাদেশ"
      : "Built by Sm. Mehedi Hassan Shawon · Khulna, Bangladesh",
  };

  const focusItems = [
    {
      no: "01",
      title: isBangla ? "কমিউনিটি যোগাযোগ" : "Community Communication",
      desc: isBangla
        ? "মানুষ কীভাবে নিজেদের অভিজ্ঞতা, সমস্যা ও অগ্রাধিকার প্রকাশ করে এবং mediated communication সেই process-কে কীভাবে প্রভাবিত করে।"
        : "How communities communicate experiences, needs, and priorities, and how mediated environments shape that process.",
    },
    {
      no: "02",
      title: isBangla ? "ডিজিটাল গল্প বলা" : "Digital Storytelling",
      desc: isBangla
        ? "Timeline, map, testimony এবং visual narrative ব্যবহার করে complex social experiences কীভাবে উপস্থাপন করা যায়।"
        : "How timelines, maps, testimonies, and visual narratives can communicate complex social experiences.",
    },
    {
      no: "03",
      title: isBangla ? "মিডিয়া প্রতিনিধিত্ব" : "Media Representation",
      desc: isBangla
        ? "কোন voice দৃশ্যমান হয়, কোন perspective কম দৃশ্যমান থাকে এবং digital representation কীভাবে সেই সম্পর্ককে গঠন করে।"
        : "How digital representation shapes whose voices become visible, and whose perspectives remain less visible.",
    },
    {
      no: "04",
      title: isBangla ? "ডিজিটাল অ্যাক্সেস" : "Digital Access",
      desc: isBangla
        ? "Information তৈরি হওয়ার পাশাপাশি সেই information বাস্তবে কারা এবং কীভাবে ব্যবহার করতে পারে।"
        : "How information can be accessed and used by the people for whom it is intended.",
    },
  ];

  const methods = [
    {
      no: "01",
      title: isBangla ? "ভূ-স্থানিক উপাত্ত" : "Geospatial Data",
      desc: isBangla
        ? "ক্যাম্পের অবস্থান, জনসংখ্যা এবং displacement-related data UNHCR Operational Data Portal এবং IOM Displacement Tracking Matrix থেকে।"
        : "Camp locations, population figures, and displacement-related data from the UNHCR Operational Data Portal and IOM Displacement Tracking Matrix.",
    },
    {
      no: "02",
      title: isBangla ? "প্রকাশিত সাক্ষ্য" : "Published Testimonies",
      desc: isBangla
        ? "UNHCR, Human Rights Watch এবং UNICEF-এর published materials থেকে testimony এবং contextual information সংগৃহীত।"
        : "Testimonies and contextual information drawn from published UNHCR, Human Rights Watch, and UNICEF materials.",
    },
    {
      no: "03",
      title: isBangla ? "ডিজিটাল অ্যাক্সেস" : "Digital Access",
      desc: isBangla
        ? "Kutupalong এলাকায় personal device-based connectivity testing এবং digital inclusion সম্পর্কিত secondary evidence।"
        : "Personal device-based connectivity testing around Kutupalong alongside secondary evidence on digital inclusion.",
    },
    {
      no: "04",
      title: isBangla ? "সময়রেখা সংকলন" : "Timeline Compilation",
      desc: isBangla
        ? "UN Fact-Finding Mission, Amnesty International এবং ICJ documentation-এর ভিত্তিতে chronological record।"
        : "A chronological record compiled from UN Fact-Finding Mission, Amnesty International, and ICJ documentation.",
    },
  ];

  const sourceList = [
    "UNHCR Bangladesh Operational Data Portal (2024)",
    "IOM Displacement Tracking Matrix — Bangladesh (2024)",
    "UN Fact-Finding Mission on Myanmar — Final Report (2018)",
    'Human Rights Watch — "Massacre by the River" and related documentation (2017–2022)',
    "Amnesty International — Myanmar Reports (2016–2023)",
    "UNICEF Bangladesh — Education in Emergencies Report (2023)",
    "IRC Mobile Technology Survey — Cox's Bazar (2023)",
    "IOM Digital Inclusion Survey — Bangladesh (2023)",
    "BBS ICT Household Survey (2023)",
    "World Bank Digital Development Indicators — Bangladesh (2024)",
    "International Court of Justice — Gambia v. Myanmar proceedings (2019–present)",
  ];

  return (
    <>
      <Head>
        <title>{text.title}</title>
        <meta
          name="description"
          content="Witnessing Rohingya — a digital documentation project exploring communication, representation, and digital access."
        />
      </Head>

      <Nav />

      <main className="about-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="about-hero">
          <div className="about-hero-grid" />

          <div className="about-hero-inner">

            <motion.div
              className="about-breadcrumb"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/">WITNESSING ROHINGYA</Link>
              <span>/</span>
              <span>ABOUT</span>
            </motion.div>

            <motion.div
              className="about-hero-kicker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <span />
              {text.heroKicker}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.18,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {text.heroTitle}
            </motion.h1>

            <motion.p
              className="about-hero-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7 }}
            >
              {text.heroIntro}
            </motion.p>

            <motion.div
              className="about-hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.7 }}
            >
              <Link href="/#voices" className="about-button about-button-primary">
                {text.explore}
                <span>↗</span>
              </Link>

              <a href="#sources" className="about-button about-button-ghost">
                {text.sourcesLink}
                <span>↓</span>
              </a>
            </motion.div>

            <motion.div
              className="about-hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              <div>
                <span>FOCUS</span>
                <strong>COMMUNICATION</strong>
              </div>

              <div>
                <span>MEDIUM</span>
                <strong>DIGITAL DOCUMENTATION</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>COX&apos;S BAZAR, BANGLADESH</strong>
              </div>
            </motion.div>

          </div>
        </section>


        {/* =================================================
            PAGE BODY
        ================================================= */}

        <section className="about-body">
          <div className="about-layout">

            {/* Sticky page index */}
            <aside className="about-side-index">
              <div className="side-index-label">
                INDEX
              </div>

              <a href="#overview">01</a>
              <a href="#focus">02</a>
              <a href="#methodology">03</a>
              <a href="#research">04</a>
              <a href="#researcher">05</a>
              <a href="#sources">06</a>
            </aside>


            <div className="about-main">

              {/* =================================================
                  OVERVIEW
              ================================================= */}

              <motion.section
                id="overview"
                className="about-section about-overview"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="about-section-kicker">
                  <span className="section-rule" />
                  {text.overviewLabel}
                </div>

                <div className="about-section-heading">
                  <h2>
                    {text.overviewTitle}
                  </h2>

                  <span>01 / 06</span>
                </div>

                <div className="about-rule" />

                <p className="about-lead">
                  {text.overviewLead}
                </p>

                <div className="about-copy-grid">
                  <p>{text.overviewBody1}</p>
                  <p>{text.overviewBody2}</p>
                </div>
              </motion.section>


              {/* =================================================
                  RESEARCH FOCUS
              ================================================= */}

              <motion.section
                id="focus"
                className="about-section"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="about-section-kicker">
                  <span className="section-rule" />
                  {text.focusLabel}
                </div>

                <div className="about-section-heading">
                  <h2>{text.focusTitle}</h2>
                  <span>02 / 06</span>
                </div>

                <div className="focus-grid">
                  {focusItems.map((item) => (
                    <motion.article
                      className="focus-card"
                      key={item.no}
                      whileHover={{ y: -5 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="focus-card-top">
                        <span>{item.no}</span>
                        <i />
                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.desc}</p>

                      <div className="focus-card-bottom">
                        <span />
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>


              {/* =================================================
                  METHODOLOGY
              ================================================= */}

              <motion.section
                id="methodology"
                className="about-section methodology-section"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="methodology-panel">

                  <div className="methodology-head">
                    <div>
                      <div className="about-section-kicker light">
                        <span className="section-rule" />
                        {text.methodology}
                      </div>

                      <h2>{text.methodologyTitle}</h2>

                      <p>
                        {text.methodologyIntro}
                      </p>
                    </div>

                    <span className="methodology-code">
                      03 / 06
                    </span>
                  </div>

                  <div className="method-grid">
                    {methods.map((item) => (
                      <div className="method-item" key={item.no}>
                        <div className="method-item-no">
                          {item.no}
                        </div>

                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="methodology-note">
                    <span>
                      METHODOLOGICAL POSITION
                    </span>

                    <p>
                      {isBangla
                        ? "বর্তমান প্ল্যাটফর্মে সরাসরি camp resident interviews পরিচালনা করা হয়নি। Community testimonies published sources থেকে নেওয়া হয়েছে।"
                        : "No direct interviews with camp residents have been conducted for the current platform. Community testimonies are drawn from published sources."}
                    </p>
                  </div>

                </div>
              </motion.section>


              {/* =================================================
                  RESEARCH
              ================================================= */}

              <motion.section
                id="research"
                className="about-section research-section"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="about-section-kicker blue">
                  <span className="section-rule" />
                  {text.researchContext}
                </div>

                <div className="about-section-heading">
                  <h2>{text.researchTitle}</h2>
                  <span>04 / 06</span>
                </div>

                <div className="about-rule" />

                <div className="research-content">

                  <p className="about-lead">
                    {text.researchBody1}
                  </p>

                  <p>
                    {text.researchBody2}
                  </p>

                </div>

                <div className="research-direction">
                  <div className="research-direction-label">
                    {text.researchDirection}
                  </div>

                  <div className="research-tags">
                    {text.researchDirectionText
                      .split(" · ")
                      .map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                  </div>
                </div>
              </motion.section>


              {/* =================================================
                  RESEARCHER
              ================================================= */}

              <motion.section
                id="researcher"
                className="about-section"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="researcher-card">

                  <div className="researcher-top">
                    <span>{text.researcherLabel}</span>
                    <small>05 / 06</small>
                  </div>

                  <div className="researcher-identity">

                    <div className="researcher-monogram">
                      MS
                    </div>

                    <div>
                      <h2>{text.researcherTitle}</h2>

                      <p>{text.researcherRole}</p>

                      <span>{text.researcherUniversity}</span>
                    </div>

                  </div>

                  <div className="researcher-rule" />

                  <div className="researcher-copy">
                    <p>{text.researcherBody1}</p>
                    <p>{text.researcherBody2}</p>
                  </div>

                  <div className="researcher-direction">
                    <span>{text.researchDirection}</span>
                    <p>{text.researchDirectionText}</p>
                  </div>

                  <div className="researcher-links">
                    <a href="mailto:mehedishawon121@gmail.com">
                      {text.contact}
                      <strong>mehedishawon121@gmail.com</strong>
                    </a>

                    <a
                      href="https://shawon-academic-portfolio.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {text.portfolio}
                      <strong>
                        shawon-academic-portfolio.vercel.app ↗
                      </strong>
                    </a>

                    <a
                      href="https://sundorban.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {text.sundarbans}
                      <strong>
                        sundorban.vercel.app ↗
                      </strong>
                    </a>
                  </div>

                  <div className="researcher-accent" />

                </div>
              </motion.section>


              {/* =================================================
                  SOURCES
              ================================================= */}

              <motion.section
                id="sources"
                className="about-section sources-section"
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
              >
                <div className="about-section-kicker">
                  <span className="section-rule" />
                  {text.sourcesTitle}
                </div>

                <div className="about-section-heading">
                  <h2>
                    {isBangla ? "উৎসসমূহ" : "Source Archive"}
                  </h2>

                  <span>06 / 06</span>
                </div>

                <p className="sources-intro">
                  {text.sourcesIntro}
                </p>

                <div className="source-list">
                  {sourceList.map((source, i) => (
                    <div className="source-item" key={source}>
                      <span className="source-no">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="source-text">
                        {source}
                      </span>

                      <span className="source-arrow">↗</span>
                    </div>
                  ))}
                </div>
              </motion.section>

            </div>
          </div>
        </section>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="about-footer">

          <div className="about-footer-inner">

            <div className="footer-brand">
              Witnessing <span>Rohingya</span>
            </div>

            <div className="footer-links">
              <Link href="/">{text.home}</Link>

              <Link href="/#timeline">
                {isBangla ? "সময়রেখা" : "Timeline"}
              </Link>

              <Link href="/#voices">
                {isBangla ? "কণ্ঠস্বর" : "Voices"}
              </Link>

              <a
                href="https://sundorban.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                {text.sundarbans}
              </a>

              <a href="mailto:mehedishawon121@gmail.com">
                {text.contact}
              </a>
            </div>

            <div className="footer-credit">
              {text.builtBy}
            </div>

          </div>
        </footer>

      </main>
    </>
  );
}