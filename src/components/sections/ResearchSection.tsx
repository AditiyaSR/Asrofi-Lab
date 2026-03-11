'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, ArrowRight, Beaker, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ResearchProject {
  id: string;
  title: string;
  abstract: string;
  coverImage?: string | null;
  status: string;
  date: string;
}

interface ResearchSectionProps {
  projects: ResearchProject[];
}

export default function ResearchSection({ projects }: ResearchSectionProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${Math.max(0, projects.length - 1) * 20}%`]);

  return (
    <section id="research" ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1D7018 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 rounded-full bg-[#1D7018]/10 text-[#1D7018] text-sm font-medium mb-4"
        >
          {t.research.titleHighlight}
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {t.research.title}{' '}
          <span className="text-[#39FF14]">{t.research.titleHighlight}</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {t.research.subtitle}
        </p>
      </motion.div>

      {/* Horizontal scroll timeline */}
      <div className="sticky top-0 h-[80vh] flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-8 px-8 md:px-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="flex-shrink-0 w-[350px] md:w-[400px] group"
            >
              <div
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl
                           rounded-3xl overflow-hidden border border-white/40 dark:border-[#1D7018]/20
                           group-hover:border-[#39FF14]/50 transition-all duration-700
                           shadow-xl group-hover:shadow-2xl group-hover:shadow-[#39FF14]/20 h-full"
              >
                {/* Cover image area */}
                <div className="h-48 bg-gradient-to-br from-[#1D7018]/20 to-[#39FF14]/10 relative overflow-hidden group-hover:from-[#1D7018]/30 group-hover:to-[#39FF14]/20 transition-colors duration-700">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <Beaker className="w-24 h-24 text-[#1D7018]/30 dark:text-[#39FF14]/30" />
                  </motion.div>
                  {/* Status badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2
                               ${project.status === 'ONGOING'
                                 ? 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/50'
                                 : 'bg-[#1D7018]/20 text-[#1D7018] dark:text-[#2E8B57] border border-[#1D7018]/50'}`}
                  >
                    {project.status === 'ONGOING' ? (
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-[#39FF14]"
                      />
                    ) : (
                      <CheckCircle size={14} />
                    )}
                    {project.status === 'ONGOING' ? t.research.ongoing : t.research.completed}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{new Date(project.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1D7018] dark:group-hover:text-[#39FF14] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                    {project.abstract}
                  </p>

                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-[#1D7018] dark:text-[#39FF14] text-sm font-medium
                               group-hover:gap-4 transition-all"
                  >
                    {t.research.readMore} <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="text-center py-16 text-gray-500 w-full">
              <Beaker className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No research projects available</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="text-center mt-8">
        <motion.div
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-500"
        >
          <span className="text-sm">{t.research.scrollExplore}</span>
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </section>
  );
}
