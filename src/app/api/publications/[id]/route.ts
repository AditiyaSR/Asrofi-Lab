import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET single publication
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const publication = await db.publication.findUnique({
      where: { id },
    });
    if (!publication) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json(publication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publication' },
      { status: 500 }
    );
  }
}

// PUT update publication
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const publication = await db.publication.update({
      where: { id },
      data: {
        title: data.title,
        authors: data.authors,
        journalName: data.journalName,
        publicationDate: data.publicationDate ? new Date(data.publicationDate) : undefined,
        doiLink: data.doiLink,
        coverImage: data.coverImage,
        abstract: data.abstract,
        order: data.order,
      },
    });
    return NextResponse.json(publication);
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { error: 'Failed to update publication' },
      { status: 500 }
    );
  }
}

// DELETE publication
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.publication.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { error: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}
