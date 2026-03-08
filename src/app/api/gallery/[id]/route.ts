import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

// UPDATE gallery image
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    const authCookie = req.headers.get('cookie')?.includes('auth-token');
    
    if (!session && !authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const image = await db.gallery.update({
      where: { id: params.id },
      data: {
        imageUrl: json.imageUrl,
        caption: json.caption,
        order: json.order,
        isActive: json.isActive,
      },
    });
    return NextResponse.json(image);
  } catch (error) {
    console.error('Failed to update gallery image:', error);
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
  }
}

// DELETE gallery image
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    const authCookie = req.headers.get('cookie')?.includes('auth-token');
    
    if (!session && !authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await db.gallery.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete gallery image:', error);
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
