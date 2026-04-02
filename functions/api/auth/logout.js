export async function onRequest(context) {
  const { request, env } = context;
  const cookie = request.headers.get('Cookie');
  const token = cookie?.match(/session=([^;]+)/)?.[1];
  
  if (token) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  }
  
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login',
      'Set-Cookie': 'session=; Path=/; HttpOnly; Secure; Max-Age=0',
    },
  });
}
