export async function onRequestGet(context) {
  const { request, env } = context;
  const session = await getSession(request, env);
  if (!session) return unauthorized();

  const birthdays = await env.DB.prepare(
    'SELECT * FROM birthdays WHERE user_id = ? ORDER BY substr(date,6) ASC'
  ).bind(session.user_id).all();

  return json({ success: true, birthdays: birthdays.results });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const session = await getSession(request, env);
  if (!session) return unauthorized();

  const { name, date, relationship, reminder_days = 7 } = await request.json();
  if (!name || !date || !relationship) return json({ error: 'Missing fields' }, 400);

  const id = crypto.randomUUID();
  const year = date.split('-')[0] !== '0000' ? parseInt(date.split('-')[0]) : null;

  await env.DB.prepare(
    'INSERT INTO birthdays (id, user_id, name, date, year, relationship, reminder_days) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, session.user_id, name, date, year, relationship, reminder_days).run();

  return json({ success: true, id });
}

async function getSession(request, env) {
  const cookie = request.headers.get('Cookie');
  const token = cookie?.match(/session=([^;]+)/)?.[1];
  if (!token) return null;
  return await env.DB.prepare(
    'SELECT user_id FROM sessions WHERE token = ? AND expires_at > datetime("now")'
  ).bind(token).first();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function unauthorized() {
  return json({ error: 'Unauthorized' }, 401);
}
