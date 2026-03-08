import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET single research project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.researchProject.findUnique({
      where: { id },
    });
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching research project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research project' },
      { status: 500 }
    );
  }
}

// PUT update research project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const project = await db.researchProject.update({
      where: { id },
      data: {
        title: data.title,
        abstract: data.abstract,
        coverImage: data.coverImage,
        status: data.status,
        date: data.date ? new Date(data.date) : undefined,
        order: data.order,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating research project:', error);
    return NextResponse.json(
      { error: 'Failed to update research project' },
      { status: 500 }
    );
  }
}

// DELETE research project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.researchProject.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting research project:', error);
    return NextResponse.json(
      { error: 'Failed to delete research project' },
      { status: 500 }
    );
  }
}
