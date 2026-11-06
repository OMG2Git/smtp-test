"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setMsg("Please wait...");
    const res = await fetch(`/api/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Error");
    if (mode === "forgot") return setMsg(data.message);
    localStorage.setItem("user", email);
    router.push("/dashboard");
  }

  const input = { display: "block", width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" };

  return (
    <form onSubmit={submit}>
      <h2>{mode === "login" ? "Login" : mode === "signup" ? "Sign Up" : "Forgot Password"}</h2>
      <input style={input} type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      {mode !== "forgot" && (
        <input style={input} type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      )}
      <button style={{ padding: "8px 16px" }}>
        {mode === "login" ? "Login" : mode === "signup" ? "Sign Up" : "Reset password"}
      </button>
      <p style={{ color: "#b00" }}>{msg}</p>
      <p>
        {mode !== "login" && <a href="#" onClick={() => { setMode("login"); setMsg(""); }}>Login </a>}
        {mode !== "signup" && <a href="#" onClick={() => { setMode("signup"); setMsg(""); }}>Sign up </a>}
        {mode !== "forgot" && <a href="#" onClick={() => { setMode("forgot"); setMsg(""); }}>Forgot password?</a>}
      </p>
    </form>
  );
}
