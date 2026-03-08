import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

// GET all gallery images
export async function GET() {
  try {
    const images = await db.gallery.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

// POST new gallery image
export async function POST(req: Request) {
  try {
    // Basic auth check
    const session = await getServerSession();
    // For manual custom auth fallback if NextAuth is skipped
    const authCookie = req.headers.get('cookie')?.includes('auth-token');
    
    if (!session && !authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const image = await db.gallery.create({
      data: {
        imageUrl: json.imageUrl,
        caption: json.caption || null,
        order: json.order || 0,
        isActive: json.isActive ?? true,
      },
    });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Failed to create gallery image:', error);
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
