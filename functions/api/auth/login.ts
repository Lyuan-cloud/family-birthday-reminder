interface Env {
  DB: D1Database;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { email, password } = await context.request.json();
    const result = await context.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();

    if (!result) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const bcrypt = await import('bcryptjs');
    const valid = await bcrypt.compare(password, result.password as string);
    
    if (!valid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return Response.json({ success: true, userId: result.id, name: result.name });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
