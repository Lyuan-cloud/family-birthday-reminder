export async function onRequestPut(context) {
  const { request, env, params } = context;
  const session = await getSession(request, env);
  if (!session) return unauthorized();

  const { name, date, relationship, reminder_days = 7 } = await request.json();
  const id = params.id;

  await env.DB.prepare(
    'UPDATE birthdays SET name=?, date=?, relationship=?, reminder_days=? WHERE id=? AND user_id=?'
  ).bind(name, date, relationship, reminder_days, id, session.user_id).run();

  return json({ success: true });
}

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  const session = await getSession(request, env);
  if (!session) return unauthorized();

  await env.DB.prepare(
    'DELETE FROM birthdays WHERE id = ? AND user_id = ?'
  ).bind(params.id, session.user_id).run();

  return json({ success: true });
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
