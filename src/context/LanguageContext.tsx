'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Language = 'id' | 'en';

interface Translations {
  nav: {
    research: string;
    team: string;
    publications: string;
  };
  hero: {
    title: string;
    titleHighlight1: string;
    titleHighlight2: string;
    subtitle: string;
    exploreResearch: string;
    meetOurTeam: string;
    scrollDown: string;
  };
  team: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  research: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    ongoing: string;
    completed: string;
    readMore: string;
    scrollExplore: string;
  };
  publications: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    authors: string;
    doiLink: string;
  };
  footer: {
    quickLinks: string;
    contact: string;
    poweredBy: string;
    allRightsReserved: string;
  };
  gallery: {
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      research: 'Riset',
      team: 'Tim',
      publications: 'Publikasi',
    },
    hero: {
      title: 'Material Biokomposit Berkelanjutan',
      titleHighlight1: 'Menginovasi',
      titleHighlight2: 'Berkelanjutan',
      subtitle: 'Pelopor penelitian material ramah lingkungan untuk masa depan yang lebih hijau',
      exploreResearch: 'Jelajahi Riset',
      meetOurTeam: 'Tim Kami',
      scrollDown: 'Gulir ke bawah',
    },
    team: {
      title: 'Tim Riset',
      titleHighlight: 'Kami',
      subtitle: 'Ilmuwan dan peneliti yang berdedikasi dalam mengembangkan material biokomposit berkelanjutan',
    },
    research: {
      title: 'Proyek',
      titleHighlight: 'Riset',
      subtitle: 'Inisiatif penelitian yang sedang berlangsung dan telah selesai dalam pengembangan material biokomposit',
      ongoing: 'BERLANGSUNG',
      completed: 'SELESAI',
      readMore: 'Baca Selengkapnya',
      scrollExplore: 'Gulir untuk menjelajahi',
    },
    publications: {
      title: 'Publikasi',
      titleHighlight: 'Terbaru',
      subtitle: 'Makalah penelitian dan kontribusi ilmiah yang ditinjau sejawat dari tim kami',
      authors: 'Penulis',
      doiLink: 'Tautan DOI',
    },
    footer: {
      quickLinks: 'Tautan Cepat',
      contact: 'Kontak',
      poweredBy: 'Ditenagai oleh',
      allRightsReserved: 'Hak cipta dilindungi.',
    },
    gallery: {
      title: 'Galeri',
      titleHighlight: 'Lab',
      subtitle: 'Momen dan kegiatan di laboratorium kami',
    },
  },
  en: {
    nav: {
      research: 'Research',
      team: 'Team',
      publications: 'Publications',
    },
    hero: {
      title: 'Sustainable Biocomposite Materials',
      titleHighlight1: 'Innovating',
      titleHighlight2: 'Sustainable',
      subtitle: 'Pioneering research in eco-friendly material science for a greener future',
      exploreResearch: 'Explore Research',
      meetOurTeam: 'Meet Our Team',
      scrollDown: 'Scroll down',
    },
    team: {
      title: 'Research',
      titleHighlight: 'Team',
      subtitle: 'Dedicated scientists and researchers driving innovation in sustainable biocomposite materials',
    },
    research: {
      title: 'Research',
      titleHighlight: 'Projects',
      subtitle: 'Ongoing and completed research initiatives in biocomposite material development',
      ongoing: 'ONGOING',
      completed: 'COMPLETED',
      readMore: 'Read More',
      scrollExplore: 'Scroll to explore',
    },
    publications: {
      title: 'Recent',
      titleHighlight: 'Publications',
      subtitle: 'Peer-reviewed research papers and scientific contributions from our team',
      authors: 'Authors',
      doiLink: 'DOI Link',
    },
    footer: {
      quickLinks: 'Quick Links',
      contact: 'Contact',
      poweredBy: 'Powered by',
      allRightsReserved: 'All rights reserved.',
    },
    gallery: {
      title: 'Lab',
      titleHighlight: 'Gallery',
      subtitle: 'Moments and activities in our laboratory',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
