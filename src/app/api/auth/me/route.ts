import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const session = await db.session.findUnique({
      where: { sessionToken },
    });

    if (!session || session.expires < new Date()) {
      // Session expired, delete it
      if (session) {
        await db.session.delete({ where: { sessionToken } });
      }
      cookieStore.delete('admin_session');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await db.adminUser.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
