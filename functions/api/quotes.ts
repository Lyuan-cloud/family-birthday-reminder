interface Env {
  DB: D1Database;
}

export async function onRequestGet(context: { env: Env }) {
  const result = await context.env.DB.prepare(
    'SELECT * FROM quotes ORDER BY created_at DESC LIMIT 50'
  ).all();
  
  return Response.json(result.results);
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { userId, content, author } = await context.request.json();
    const id = crypto.randomUUID();
    
    await context.env.DB.prepare(
      'INSERT INTO quotes (id, user_id, content, author) VALUES (?, ?, ?, ?)'
    ).bind(id, userId, content, author).run();
    
    return Response.json({ success: true, id });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
