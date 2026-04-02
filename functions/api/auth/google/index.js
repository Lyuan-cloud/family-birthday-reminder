export async function onRequest(context) {
  const { env } = context;
  const clientId = env.GOOGLE_CLIENT_ID;
  const baseUrl = env.BASE_URL || 'https://familybirthdayreminder.shop';
  const redirectUri = `${baseUrl}/api/auth/google/callback`;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  return Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`, 
    302
  );
}
