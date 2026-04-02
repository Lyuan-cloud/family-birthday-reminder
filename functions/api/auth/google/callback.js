export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const baseUrl = env.BASE_URL || 'https://familybirthdayreminder.shop';

  if (!code) {
    return Response.redirect(`${baseUrl}/login?error=no_code`, 302);
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return Response.redirect(`${baseUrl}/login?error=token_failed`, 302);
    }

    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const userInfo = await userRes.json();
    const { email, name, picture, id: googleId } = userInfo;

    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();

    let userId;
    if (existing) {
      userId = existing.id;
      await env.DB.prepare(
        'UPDATE users SET name = ?, google_id = ?, avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(name, googleId, picture, userId).run();
    } else {
      const result = await env.DB.prepare(
        'INSERT INTO users (email, name, google_id, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
      ).bind(email, name, googleId, picture).run();
      userId = result.meta.last_row_id;
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
      'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(sessionToken, userId, expiresAt).run();

    return new Response(null, {
      status: 302,
      headers: {
        Location: `${baseUrl}/dashboard`,
        'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
      },
    });

  } catch (err) {
    return Response.redirect(`${baseUrl}/login?error=oauth_failed`, 302);
  }
}
