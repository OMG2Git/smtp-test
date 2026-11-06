export const metadata = { title: "SMTP Check" };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", maxWidth: 360, margin: "60px auto", padding: "0 16px" }}>
        {children}
      </body>
    </html>
  );
}
