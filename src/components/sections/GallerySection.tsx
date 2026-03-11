'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop', alt: 'Lab research activity' },
  { id: 2, src: 'https://images.unsplash.com/photo-1581093458791-9d42e34b4e8b?w=400&h=300&fit=crop', alt: 'Laboratory equipment' },
  { id: 3, src: 'https://images.unsplash.com/photo-1576086213369-97a36d092e1e?w=400&h=300&fit=crop', alt: 'Material testing' },
  { id: 4, src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop', alt: 'Sample preparation' },
  { id: 5, src: 'https://images.unsplash.com/photo-1564047link452072-de3458791-9d42e34b4e8b?w=400&h=300&fit=crop', alt: 'Team collaboration' },
  { id: 6, src: 'https://images.unsplash.com/photo-1532094349884-543bc11b2348?w=400&h=300&fit=crop', alt: 'Lab analysis' },
];

// Fallback images if Unsplash URLs don't work
const fallbackImages = [
  { id: 1, color: '#1D7018', alt: 'Lab Activity 1' },
  { id: 2, color: '#2E8B57', alt: 'Lab Activity 2' },
  { id: 3, color: '#39FF14', alt: 'Lab Activity 3' },
  { id: 4, color: '#1D7018', alt: 'Lab Activity 4' },
  { id: 5, color: '#2E8B57', alt: 'Lab Activity 5' },
  { id: 6, color: '#39FF14', alt: 'Lab Activity 6' },
];

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string | null;
}

export default function GallerySection({ images = [] }: { images?: GalleryImage[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-black/50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.gallery.titleHighlight}{' '}
            <span className="text-[#1D7018]">{t.gallery.title}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.length > 0 ? (
            images.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  zIndex: 10,
                  transition: { duration: 0.5, ease: 'easeOut' }
                }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-[#39FF14]/20 shadow-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.imageUrl} alt={img.caption || 'Gallery Image'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#1D7018]/90 via-[#1D7018]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                >
                  <p className="text-white text-lg font-medium leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.caption || 'Asrofi Lab Documentation'}</p>
                </motion.div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 50px rgba(57, 255, 20, 0.3)`,
                  }}
                />
              </motion.div>
            ))
          ) : (
            fallbackImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 2,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
              >
                {/* Placeholder with gradient */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${img.color}40, ${img.color}80)` 
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/30 flex items-center justify-center"
                  >
                    <span className="text-white/60 text-xl md:text-2xl font-bold">🔬</span>
                  </motion.div>
                </div>
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                >
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </motion.div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `inset 0 0 30px ${img.color}50`,
                  }}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 70%)' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
}
