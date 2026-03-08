'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  siteName?: string | null;
}

export default function Footer({ siteName }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-[#1D7018]/30 pt-16 pb-8 mt-auto">
      {/* Top decorative element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 bg-white dark:bg-black rounded-full flex items-center justify-center border-2 border-[#1D7018]/30 shadow-lg"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="rounded-full"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ x: 5 }}
            >
              <Image
                src="/logo.png"
                alt="Asrofi Lab Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {siteName || 'Asrofi Laboratorium'}
              </span>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">
              Dedicated to advancing sustainable biocomposite materials research
              for a greener and more sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {['Research', 'Team', 'Publications', 'Contact'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5, color: '#39FF14' }}
                    className="text-gray-600 dark:text-gray-500 hover:text-[#1D7018] dark:hover:text-[#39FF14] transition-colors text-sm"
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-center gap-3 text-gray-600 dark:text-gray-500 text-sm"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#1D7018]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#1D7018]" />
                </div>
                <span>Universitas Jember, Indonesia</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3 text-gray-600 dark:text-gray-500 text-sm"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#1D7018]/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#1D7018]" />
                </div>
                <a href="mailto:contact@asrofi.lab" className="hover:text-[#39FF14] transition-colors">
                  contact@asrofi.lab
                </a>
              </motion.li>
            </ul>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center
                         text-gray-500 hover:text-[#39FF14] hover:bg-[#39FF14]/10 transition-colors"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center
                         text-gray-500 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-600 text-sm">
              © {currentYear} {siteName || 'Asrofi Laboratorium'}. {t.footer.allRightsReserved}
            </p>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-600 text-sm">
              <span>{t.footer.poweredBy}</span>
              <motion.span 
                className="text-[#1D7018] font-medium"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ♻ Sustainable Innovation
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
