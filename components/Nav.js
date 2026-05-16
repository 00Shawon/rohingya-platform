import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

export default function Nav() {
  const { isBangla } = useLanguage();

  const links = [
    { name: isBangla ? 'সময়রেখা' : 'Timeline', href: '#timeline' },
    { name: isBangla ? 'মানচিত্র' : 'Map', href: '#map' },
    { name: isBangla ? 'কণ্ঠস্বর' : 'Voices', href: '#voices' },
    { name: isBangla ? 'ডিজিটাল অ্যাক্সেস' : 'Digital Access', href: '#digital' },
    { name: isBangla ? 'সম্পর্কে' : 'About', href: '/about', isLink: true },
  ];

  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">
        Witnessing <span>Rohingya</span>
      </Link>
      <ul className="nav-links">
        {links.map((link, i) => (
          <motion.li 
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            {link.isLink ? (
              <Link href={link.href}>{link.name}</Link>
            ) : (
              <a href={link.href}>{link.name}</a>
            )}
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}
