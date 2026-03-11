'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Beaker, CheckCircle, ExternalLink } from 'lucide-react';
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

  return (
    <section id="research" className="py-24 relative overflow-hidden bg-white/5 dark:bg-black/20">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#39FF14]/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1D7018]/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-block px-4 py-1 rounded-full border border-[#39FF14]/30 bg-[#1D7018]/10 text-[#1D7018] dark:text-[#39FF14] text-sm font-medium mb-4 backdrop-blur-md"
          >
            {t.research.titleHighlight}
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-500 mb-6 tracking-tight">
            {t.research.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D7018] to-[#39FF14]">
              {t.research.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {t.research.subtitle}
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[350px]">
          {projects.map((project, index) => {
            // Determine Bento box sizes based on index
            const isFeatured = index === 0; // Large feature box
            const isWide = index === 3 || index === 6; // Wide box

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group cursor-pointer ${
                  isFeatured ? 'md:col-span-2 md:row-span-2' : 
                  isWide ? 'md:col-span-2 lg:col-span-2' : 
                  'md:col-span-1 lg:col-span-1'
                }`}
              >
                {/* 3D Perspective Tilt Container */}
                <div
                  className="w-full h-full bg-white/10 dark:bg-black/30 backdrop-blur-[30px]
                             rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10
                             transition-all duration-700 hover:border-[#39FF14]/40
                             shadow-2xl hover:shadow-[0_0_50px_rgba(57,255,20,0.15)] noise relative flex flex-col"
                >
                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#39FF14]/10 to-transparent pointer-events-none" />

                  {/* Cover image area */}
                  <div className={`relative overflow-hidden shrink-0 ${isFeatured ? 'h-1/2' : 'h-48'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1D7018]/30 to-[#39FF14]/10 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    >
                      <Beaker className="w-48 h-48 text-[#39FF14]/20" />
                    </motion.div>

                    {/* Status badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 backdrop-blur-md
                                 ${project.status === 'ONGOING'
                                   ? 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/50 shadow-[0_0_15px_rgba(57,255,20,0.3)]'
                                   : 'bg-[#1D7018]/30 text-white border border-[#1D7018]/50'}`}
                      >
                        {project.status === 'ONGOING' ? (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
                          </span>
                        ) : (
                          <CheckCircle size={14} />
                        )}
                        {project.status === 'ONGOING' ? t.research.ongoing : t.research.completed}
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow justify-between z-10">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-mono text-xs uppercase tracking-widest mb-4">
                        <Calendar size={14} />
                        <span>{new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}</span>
                      </div>

                      <h3 className={`font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#39FF14] group-hover:to-[#1D7018] transition-all duration-300
                                     ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>

                      {/* Only show abstract if it's featured or if there's room, otherwise line-clamp */}
                      <p className={`text-gray-600 dark:text-gray-300 font-medium ${isFeatured ? 'line-clamp-4 text-lg' : 'line-clamp-2 text-sm'}`}>
                        {project.abstract}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-[#1D7018] dark:text-[#39FF14] font-bold text-sm tracking-wide group/btn">
                      {isFeatured ? 'EXPLORE DEEP DIVE' : t.research.readMore}
                      <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Empty state */}
          {projects.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white/5 dark:bg-black/20 backdrop-blur-xl rounded-[3rem] border border-white/10 noise">
              <Beaker className="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-600 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Research Data Found</h3>
              <p className="text-gray-500">The laboratory is currently preparing new publications.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
