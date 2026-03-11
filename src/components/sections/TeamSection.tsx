'use client';

import { motion } from 'framer-motion';
import { Linkedin, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  institution: string;
  bio: string;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  googleScholar?: string | null;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="team" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1D7018 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-[#1D7018]/10 text-[#1D7018] text-sm font-medium mb-4"
        >
          {t.team.titleHighlight}
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t.team.title}{' '}
          <span className="text-[#1D7018]">{t.team.titleHighlight}</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {t.team.subtitle}
        </p>
      </motion.div>

      {/* Team grid with floating cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            whileHover={{ 
              y: -15, 
              rotateY: 5,
              rotateX: 5,
              scale: 1.02,
            }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative group"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
              style={{ background: 'linear-gradient(135deg, #39FF14, #1D7018, transparent)' }}
            />
            
            {/* Card */}
            <div
              className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl
                         rounded-3xl p-6 border border-white/40 dark:border-[#1D7018]/20
                         group-hover:border-[#39FF14]/50 transition-all duration-500 h-full
                         shadow-xl group-hover:shadow-2xl group-hover:shadow-[#1D7018]/30"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1D7018] to-[#39FF14]
                             flex items-center justify-center text-white text-2xl font-bold
                             mx-auto ring-4 ring-white dark:ring-gray-800 shadow-lg"
                >
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    member.name.charAt(0).toUpperCase()
                  )}
                </motion.div>
                {/* Status indicator */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 right-1/2 transform translate-x-8 w-5 h-5
                             bg-[#39FF14] rounded-full border-3 border-white dark:border-gray-900
                             shadow-lg shadow-[#39FF14]/50"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#1D7018] dark:group-hover:text-[#39FF14] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#1D7018] dark:text-[#39FF14] font-medium mb-1">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">{member.institution}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                {member.linkedinUrl && (
                  <motion.a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center
                             text-gray-500 hover:text-[#0077B5] hover:bg-[#0077B5]/10 transition-colors"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                )}
                {member.googleScholar && (
                  <motion.a
                    href={member.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center
                             text-gray-500 hover:text-[#1D7018] hover:bg-[#1D7018]/10 transition-colors"
                  >
                    <BookOpen size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
