import { readUsers } from "@/lib/users";

export async function POST(req) {
  const { email, password } = await req.json();
  const user = readUsers().find((u) => u.email === email && u.password === password);
  if (!user) return Response.json({ error: "Invalid email or password" }, { status: 401 });
  return Response.json({ ok: true });
}
