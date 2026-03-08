import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all research projects (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const where = status ? { status: status as 'ONGOING' | 'COMPLETED' } : {};
    
    const projects = await db.researchProject.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching research projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research projects' },
      { status: 500 }
    );
  }
}

// POST create research project (admin)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const project = await db.researchProject.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        coverImage: data.coverImage,
        status: data.status || 'ONGOING',
        date: data.date ? new Date(data.date) : new Date(),
        order: data.order || 0,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating research project:', error);
    return NextResponse.json(
      { error: 'Failed to create research project' },
      { status: 500 }
    );
  }
}
