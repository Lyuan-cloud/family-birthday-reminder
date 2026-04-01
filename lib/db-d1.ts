// Cloudflare D1 数据库适配层
// 用于 Cloudflare Pages Functions

export interface Env {
  DB: D1Database;
}

export async function getDb(env: Env) {
  return env.DB;
}
