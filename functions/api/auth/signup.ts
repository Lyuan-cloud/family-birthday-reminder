interface Env {
  DB: D1Database;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { email, name, password } = await context.request.json();
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    await context.env.DB.prepare(
      'INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)'
    ).bind(userId, email, name, hashedPassword).run();

    return Response.json({ success: true, userId });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
