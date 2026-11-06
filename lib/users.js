import fs from "fs";
import path from "path";

// Locally: ./users.json. On Vercel the project dir is read-only, so use /tmp (temporary!).
const FILE = process.env.VERCEL
  ? "/tmp/users.json"
  : path.join(process.cwd(), "users.json");

export function readUsers() {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch { return []; }
}
export function writeUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}
