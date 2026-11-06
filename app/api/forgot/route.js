import nodemailer from "nodemailer";
import { readUsers, writeUsers } from "@/lib/users";

export async function POST(req) {
  const { email } = await req.json();
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user) return Response.json({ error: "No account with that email" }, { status: 404 });

  const newPassword = Math.random().toString(36).slice(2, 10);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Your password has been reset",
      text: `Your password has been reset. Your new password is: ${newPassword}`,
    });
  } catch (err) {
    return Response.json({ error: "Email failed: " + err.message }, { status: 500 });
  }
  user.password = newPassword; // only update after email succeeded
  writeUsers(users);
  return Response.json({ message: "New password sent to your email." });
}
