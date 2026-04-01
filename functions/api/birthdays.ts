interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  const url = new URL(context.request.url);
  const userId = url.searchParams.get('userId');
  
  const result = await context.env.DB.prepare(
    'SELECT * FROM birthdays WHERE user_id = ? ORDER BY date'
  ).bind(userId).all();
  
  return Response.json(result.results);
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { userId, name, date, year, relationship, reminderDays } = await context.request.json();
    const id = crypto.randomUUID();
    
    await context.env.DB.prepare(
      'INSERT INTO birthdays (id, user_id, name, date, year, relationship, reminder_days) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, userId, name, date, year, relationship, reminderDays || 7).run();
    
    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
