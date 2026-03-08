'use client';

import { motion } from 'framer-motion';
import { ExternalLink, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Publication {
  id: string;
  title: string;
  authors: string;
  journalName: string;
  publicationDate: string;
  doiLink?: string | null;
  abstract?: string | null;
}

interface PublicationsSectionProps {
  publications: Publication[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="publications" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
          {t.publications.titleHighlight}
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t.publications.title}{' '}
          <span className="text-[#1D7018]">{t.publications.titleHighlight}</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {t.publications.subtitle}
        </p>
      </motion.div>

      {/* Publications grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
      >
        {publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02, 
              y: -5,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"
              style={{ background: 'linear-gradient(135deg, #1D7018, #39FF14)' }}
            />
            
            <div
              className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                         rounded-2xl p-6 border border-gray-200 dark:border-[#1D7018]/30
                         group-hover:border-[#39FF14]/50 transition-all duration-300 h-full"
            >
              {/* Journal badge */}
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-full bg-[#1D7018]/10 flex items-center justify-center"
                >
                  <FileText className="w-5 h-5 text-[#1D7018]" />
                </motion.div>
                <span className="text-[#1D7018] dark:text-[#39FF14] text-sm font-medium">{pub.journalName}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1D7018] dark:group-hover:text-[#39FF14] transition-colors line-clamp-2">
                {pub.title}
              </h3>

              {/* Authors */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                <span className="text-gray-500 dark:text-gray-500">{t.publications.authors}: </span>
                {pub.authors}
              </p>

              {/* Abstract preview */}
              {pub.abstract && (
                <p className="text-gray-500 dark:text-gray-500 text-sm line-clamp-2 mb-4">
                  {pub.abstract}
                </p>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-sm">
                  <Calendar size={14} />
                  <span>
                    {new Date(pub.publicationDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>

                {pub.doiLink && (
                  <motion.a
                    href={pub.doiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-[#1D7018] dark:text-[#39FF14] text-sm font-medium
                               hover:text-[#39FF14] transition-colors"
                  >
                    {t.publications.doiLink} <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state */}
      {publications.length === 0 && (
        <div className="text-center py-16 text-gray-500 dark:text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No publications available</p>
        </div>
      )}
    </section>
  );
}
