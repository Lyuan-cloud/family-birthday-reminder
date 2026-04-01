import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET() {
  const stmt = db.prepare('SELECT * FROM quotes ORDER BY created_at DESC LIMIT 50');
  const quotes = stmt.all();
  return NextResponse.json(quotes);
}

export async function POST(req: NextRequest) {
  try {
    const { userId, content, author } = await req.json();
    const id = randomUUID();
    
    const stmt = db.prepare('INSERT INTO quotes (id, user_id, content, author) VALUES (?, ?, ?, ?)');
    stmt.run(id, userId, content, author);
    
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
