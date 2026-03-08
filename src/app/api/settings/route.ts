import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET global settings (public)
export async function GET() {
  try {
    let settings = await db.globalSettings.findFirst();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await db.globalSettings.create({
        data: {
          siteName: 'Asrofi Laboratorium',
          heroTitle: 'Innovating Sustainable Biocomposite Materials',
          heroSubtitle: 'Pioneering research in eco-friendly material science for a greener future',
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT update global settings (admin)
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    let settings = await db.globalSettings.findFirst();
    
    if (!settings) {
      settings = await db.globalSettings.create({
        data: {
          siteName: data.siteName,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          logoUrl: data.logoUrl,
          aboutText: data.aboutText,
        },
      });
    } else {
      settings = await db.globalSettings.update({
        where: { id: settings.id },
        data: {
          siteName: data.siteName,
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          logoUrl: data.logoUrl,
          aboutText: data.aboutText,
        },
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
