import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all publications (public)
export async function GET() {
  try {
    const publications = await db.publication.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

// POST create publication (admin)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const publication = await db.publication.create({
      data: {
        title: data.title,
        authors: data.authors,
        journalName: data.journalName,
        publicationDate: data.publicationDate ? new Date(data.publicationDate) : new Date(),
        doiLink: data.doiLink,
        coverImage: data.coverImage,
        abstract: data.abstract,
        order: data.order || 0,
      },
    });
    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json(
      { error: 'Failed to create publication' },
      { status: 500 }
    );
  }
}
