"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) router.push("/"); else setUser(u);
  }, [router]);
  if (!user) return null;
  return (
    <div>
      <h2>Welcome, {user} 🎉</h2>
      <p>This is the dummy landing page.</p>
      <button onClick={() => { localStorage.removeItem("user"); router.push("/"); }}>Logout</button>
    </div>
  );
}
