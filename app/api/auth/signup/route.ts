import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = randomUUID();

    const stmt = db.prepare('INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)');
    stmt.run(userId, email, name, hashedPassword);

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
