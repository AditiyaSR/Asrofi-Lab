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
        {/* Premium Aurora Gradient Background */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-screen overflow-hidden pointer-events-none">
          <div 
            className="absolute -inset-[100%] opacity-50 animate-aurora"
            style={{
              backgroundImage: 'repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%), repeating-linear-gradient(100deg, #39FF14 10%, #1D7018 15%, transparent 20%, transparent 25%, #39FF14 30%)',
              backgroundSize: '200% 200%',
              filter: 'blur(60px)',
            }}
          />
        </div>

        {/* Gradient orbs (Biocomposite theme) */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 dark:opacity-20 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(57, 255, 20, 0.4) 0%, transparent 60%)',
            top: '-20%',
            right: '-10%',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-10 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(29, 112, 24, 0.5) 0%, transparent 70%)',
            bottom: '-10%',
            left: '-5%',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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

      {/* Main content - Ultra Glassmorphism */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full
                      bg-white/10 dark:bg-black/10 backdrop-blur-[40px] rounded-[3rem] p-10 md:p-16
                      border border-white/30 dark:border-[#39FF14]/20 shadow-[0_35px_60px_-15px_rgba(29,112,24,0.3)]
                      overflow-hidden noise">
        {/* Inner glow border */}
        <div className="absolute inset-0 rounded-[3rem] border-2 border-transparent" 
             style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.5), transparent, rgba(29,112,24,0.5)) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
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
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 tracking-tighter leading-tight"
          >
            {heroTitle ? (
              <span className="animate-text-reveal block">{heroTitle}</span>
            ) : (
              <>
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D7018] to-[#2E8B57] inline-block"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  {t.hero.titleHighlight1}
                </motion.span>{' '}
                {t.hero.title}{' '}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E8B57] to-[#39FF14] inline-block drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  {t.hero.titleHighlight2}
                </motion.span>
              </>
            )}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-14 max-w-3xl mx-auto font-medium"
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
