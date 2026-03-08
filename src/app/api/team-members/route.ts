import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all team members (public)
export async function GET() {
  try {
    const members = await db.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST create team member (admin)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const member = await db.teamMember.create({
      data: {
        name: data.name,
        role: data.role,
        institution: data.institution,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
        linkedinUrl: data.linkedinUrl,
        googleScholar: data.googleScholar,
        order: data.order || 0,
        isActive: data.isActive ?? true,
      },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}
