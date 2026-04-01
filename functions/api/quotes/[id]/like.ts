interface Env {
  DB: D1Database;
}

export async function onRequestPost(context: { request: Request; env: Env; params: { id: string } }) {
  try {
    await context.env.DB.prepare(
      'UPDATE quotes SET likes = likes + 1 WHERE id = ?'
    ).bind(context.params.id).run();
    
    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
