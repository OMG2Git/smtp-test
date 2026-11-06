import { readUsers, writeUsers } from "@/lib/users";

export async function POST(req) {
  const { email, password } = await req.json();
  const users = readUsers();
  if (users.find((u) => u.email === email))
    return Response.json({ error: "Email already registered" }, { status: 400 });
  users.push({ email, password });
  writeUsers(users);
  return Response.json({ ok: true });
}
