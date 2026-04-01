import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM birthdays WHERE user_id = ? ORDER BY date');
  const birthdays = stmt.all(userId);
  return NextResponse.json(birthdays);
}

export async function POST(req: NextRequest) {
  try {
    const { userId, name, date, year, relationship, reminderDays } = await req.json();
    const db = getDb();
    const id = randomUUID();
    
    const stmt = db.prepare('INSERT INTO birthdays (id, user_id, name, date, year, relationship, reminder_days) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(id, userId, name, date, year, relationship, reminderDays || 7);
    
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
