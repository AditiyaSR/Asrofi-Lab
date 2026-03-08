import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import GallerySection from '@/components/sections/GallerySection';
import ResearchSection from '@/components/sections/ResearchSection';
import TeamSection from '@/components/sections/TeamSection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import Footer from '@/components/sections/Footer';
import ParticleBackgroundClient from '@/components/effects/ParticleBackgroundClient';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const [settings, members, projects, publications, gallery] = await Promise.all([
      db.globalSettings.findFirst(),
      db.teamMember.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
      db.researchProject.findMany({
        orderBy: { order: 'asc' },
      }),
      db.publication.findMany({
        orderBy: { order: 'asc' },
      }),
      db.gallery.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      }),
    ]);

    return {
      settings,
      members,
      projects,
      publications,
      gallery,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      settings: null,
      members: [],
      projects: [],
      publications: [],
      gallery: [],
    };
  }
}

export default async function Home() {
  const { settings, members, projects, publications, gallery } = await getData();

  return (
    <main className="min-h-screen flex flex-col">
      {/* WebGL Particle Background */}
      <ParticleBackgroundClient />

      {/* Navigation */}
      <Navigation siteName={settings?.siteName} />

      {/* Hero Section */}
      <HeroSection
        heroTitle={settings?.heroTitle}
        heroSubtitle={settings?.heroSubtitle}
      />

      {/* Lab Gallery Section */}
      <GallerySection images={gallery} />

      {/* Research Projects Section */}
      <ResearchSection projects={projects} />

      {/* Team Section */}
      <TeamSection members={members} />

      {/* Publications Section */}
      <PublicationsSection publications={publications} />

      {/* Footer */}
      <Footer siteName={settings?.siteName} />
    </main>
  );
}
