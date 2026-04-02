export async function onRequest(context) {
  const { request, env } = context;
  const cookie = request.headers.get('Cookie');
  const token = cookie?.match(/session=([^;]+)/)?.[1];
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const session = await env.DB.prepare(
    'SELECT u.id, u.name, u.email, u.avatar FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > datetime("now")'
  ).bind(token).first();

  if (!session) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, user: session }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
