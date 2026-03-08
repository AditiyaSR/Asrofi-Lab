import { PrismaClient, ProjectStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@asrofi.lab' },
    update: {
      password: hashedPassword, // Update password on existing user
    },
    create: {
      email: 'admin@asrofi.lab',
      password: hashedPassword,
      name: 'Admin Asrofi',
      role: 'admin',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create global settings
  const settings = await prisma.globalSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Asrofi Laboratorium',
      heroTitle: 'Innovating Sustainable Biocomposite Materials',
      heroSubtitle: 'Pioneering research in eco-friendly material science for a greener future',
      aboutText: 'Asrofi Laboratorium is dedicated to the research and development of sustainable biocomposite materials. Our work focuses on creating innovative solutions that bridge the gap between industrial applications and environmental responsibility.',
    },
  });
  console.log('✅ Created global settings');

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.upsert({
      where: { id: 'adit' },
      update: {},
      create: {
        id: 'adit',
        name: 'Adit',
        role: 'Lead Researcher',
        institution: 'Universitas Jember (UNEJ)',
        bio: 'Berfokus pada pengembangan material biokomposit berkelanjutan dan integrasi CAD dalam desain material.',
        order: 1,
        isActive: true,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 'sarah' },
      update: {},
      create: {
        id: 'sarah',
        name: 'Sarah',
        role: 'Research Assistant',
        institution: 'Universitas Jember (UNEJ)',
        bio: 'Specializing in polymer chemistry and material characterization techniques.',
        order: 2,
        isActive: true,
      },
    }),
    prisma.teamMember.upsert({
      where: { id: 'budi' },
      update: {},
      create: {
        id: 'budi',
        name: 'Budi',
        role: 'Material Scientist',
        institution: 'Universitas Jember (UNEJ)',
        bio: 'Expert in sustainable material development and environmental impact assessment.',
        order: 3,
        isActive: true,
      },
    }),
  ]);
  console.log('✅ Created team members:', teamMembers.length);

  // Create research projects
  const projects = await Promise.all([
    prisma.researchProject.upsert({
      where: { id: 'pva-mahoni' },
      update: {},
      create: {
        id: 'pva-mahoni',
        title: 'Pembuatan dan Karakterisasi Film Biokomposit dari Polyvinyl Alcohol (PVA) dan Serbuk Kayu Mahoni',
        abstract: 'Research focused on developing biocomposite films using PVA matrix reinforced with mahogany wood powder. The study aims to create sustainable packaging materials with enhanced mechanical properties and biodegradability.',
        status: ProjectStatus.ONGOING,
        date: new Date('2024-01-15'),
        order: 1,
      },
    }),
    prisma.researchProject.upsert({
      where: { id: 'cellulose-nanofiber' },
      update: {},
      create: {
        id: 'cellulose-nanofiber',
        title: 'Extraction and Application of Cellulose Nanofibers from Agricultural Waste',
        abstract: 'This project explores the extraction of cellulose nanofibers from various agricultural waste products and their application in biocomposite materials for industrial use.',
        status: ProjectStatus.ONGOING,
        date: new Date('2024-03-01'),
        order: 2,
      },
    }),
    prisma.researchProject.upsert({
      where: { id: 'bio-plastic' },
      update: {},
      create: {
        id: 'bio-plastic',
        title: 'Development of Biodegradable Plastic from Cassava Starch',
        abstract: 'A comprehensive study on creating fully biodegradable plastic alternatives using cassava starch as the primary raw material, with focus on mechanical properties and degradation rates.',
        status: ProjectStatus.COMPLETED,
        date: new Date('2023-06-20'),
        order: 3,
      },
    }),
  ]);
  console.log('✅ Created research projects:', projects.length);

  // Create publications
  const publications = await Promise.all([
    prisma.publication.upsert({
      where: { id: 'pub-1' },
      update: {},
      create: {
        id: 'pub-1',
        title: 'Mechanical Properties of PVA-Based Biocomposite Films Reinforced with Natural Fibers',
        authors: 'Adit, Sarah, Budi',
        journalName: 'Journal of Sustainable Materials',
        publicationDate: new Date('2024-02-10'),
        doiLink: 'https://doi.org/10.1234/jsm.2024.001',
        abstract: 'This study investigates the mechanical properties of polyvinyl alcohol (PVA) based biocomposite films reinforced with various natural fibers.',
        order: 1,
      },
    }),
    prisma.publication.upsert({
      where: { id: 'pub-2' },
      update: {},
      create: {
        id: 'pub-2',
        title: 'Sustainable Packaging Solutions: A Review of Biocomposite Materials',
        authors: 'Adit, Budi',
        journalName: 'Environmental Science & Technology',
        publicationDate: new Date('2023-11-25'),
        doiLink: 'https://doi.org/10.5678/est.2023.045',
        abstract: 'A comprehensive review of recent developments in biocomposite materials for sustainable packaging applications.',
        order: 2,
      },
    }),
  ]);
  console.log('✅ Created publications:', publications.length);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
