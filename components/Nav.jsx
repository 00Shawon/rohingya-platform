import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const { isBangla } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    {
      name: isBangla ? "সময়রেখা" : "Timeline",
      href: "/#timeline",
    },
    {
      name: isBangla ? "মানচিত্র" : "Map",
      href: "/#map",
    },
    {
      name: isBangla ? "কণ্ঠস্বর" : "Voices",
      href: "/#voices",
    },
    {
      name: isBangla ? "ডিজিটাল অ্যাক্সেস" : "Digital Access",
      href: "/#digital",
    },
    {
      name: isBangla ? "সম্পর্কে" : "About",
      href: "/about",
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav ${menuOpen ? "nav-menu-open" : ""}`}>
        {/* Brand */}
        <Link
          href="/"
          className="nav-brand"
          onClick={closeMenu}
        >
          Witnessing <span>Rohingya</span>
        </Link>

        {/* Desktop navigation */}
        <ul className="nav-links">
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Link href={link.href}>
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="nav-mobile-toggle"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-line ${menuOpen ? "active" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "active" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "active" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="mobile-nav-inner">

              <div className="mobile-nav-label">
                <span />
                {isBangla ? "নেভিগেশন" : "NAVIGATION"}
              </div>

              <div className="mobile-nav-links">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                    >
                      <span className="mobile-nav-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="mobile-nav-name">
                        {link.name}
                      </span>

                      <span className="mobile-nav-arrow">
                        ↗
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <span>
                  Witnessing Rohingya
                </span>

                <span>
                  {isBangla
                    ? "ডিজিটাল গবেষণা প্ল্যাটফর্ম"
                    : "DIGITAL RESEARCH PLATFORM"}
                </span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}