'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Atom, Leaf, Settings } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  logoUrl?: string | null;
}

export default function HeroSection({ heroTitle, heroSubtitle, logoUrl }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(29, 112, 24, 0.4) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Hexagon pattern */}
        <svg
          className="absolute w-full h-full opacity-5 dark:opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="hexagons"
              width="10"
              height="17.32"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <polygon
                points="5,0 10,2.89 10,8.66 5,11.55 0,8.66 0,2.89"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
                className="text-[#1D7018]"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Floating icons with more organic motion */}
      <motion.div
        className="absolute top-1/4 left-[15%] text-[#1D7018]/15 dark:text-[#39FF14]/20 backdrop-blur-sm p-4 rounded-full border border-[#1D7018]/10"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          rotate: [0, 90, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ boxShadow: '0 0 40px rgba(57, 255, 20, 0.1)' }}
      >
        <Atom size={90} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-[10%] text-[#39FF14]/20 dark:text-[#39FF14]/20 backdrop-blur-sm p-6 rounded-full border border-[#39FF14]/10"
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
          rotate: [0, -45, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ boxShadow: '0 0 50px rgba(29, 112, 24, 0.2)' }}
      >
        <Leaf size={110} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[20%] text-[#1D7018]/15 dark:text-[#1D7018]/30 backdrop-blur-sm p-4 rounded-full"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Settings size={70} />
      </motion.div>
      
      {/* Additional Biocomposite Element */}
      <motion.div
        className="absolute bottom-1/3 left-[20%] text-[#2E8B57]/15 dark:text-[#39FF14]/15"
        animate={{
          y: [0, 30, 0],
          rotate: [0, 180],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto
                      bg-white/30 dark:bg-black/20 backdrop-blur-xl rounded-3xl p-8 md:p-12
                      border border-white/20 dark:border-[#39FF14]/10 shadow-2xl">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              filter: [
                'drop-shadow(0 0 20px rgba(57, 255, 20, 0.3))',
                'drop-shadow(0 0 40px rgba(57, 255, 20, 0.5))',
                'drop-shadow(0 0 20px rgba(57, 255, 20, 0.3))'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Image
              src={logoUrl || "/logo.png"}
              alt="Asrofi Lab Logo"
              width={180}
              height={180}
              className="drop-shadow-2xl"
              priority
              unoptimized={!!logoUrl}
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          {heroTitle || (
            <>
              <motion.span 
                className="text-[#1D7018] inline-block"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t.hero.titleHighlight1}
              </motion.span>{' '}
              {t.hero.title}{' '}
              <motion.span 
                className="text-[#39FF14] inline-block"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {t.hero.titleHighlight2}
              </motion.span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          {heroSubtitle || t.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="#research"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(57, 255, 20, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#1D7018] to-[#2E8B57] text-white rounded-xl font-semibold text-lg
                     hover:from-[#2E8B57] hover:to-[#1D7018] transition-all duration-500
                     shadow-lg shadow-[#1D7018]/30"
          >
            {t.hero.exploreResearch}
          </motion.a>
          <motion.a
            href="#team"
            whileHover={{ scale: 1.05, borderColor: '#39FF14' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent text-gray-900 dark:text-white rounded-xl font-semibold text-lg
                     border-2 border-[#1D7018] hover:border-[#39FF14]
                     hover:bg-[#1D7018]/10 dark:hover:bg-[#1D7018]/20 transition-all duration-300"
          >
            {t.hero.meetOurTeam}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t.hero.scrollDown}</span>
          <ChevronDown className="text-[#39FF14] w-8 h-8 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
