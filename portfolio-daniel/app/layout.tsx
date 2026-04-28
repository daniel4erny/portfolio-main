import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Background from "./components/Background";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Daniel Černý",
  description: "Web Development & Cybersecurity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${exo2.variable} h-full antialiased`}>
      <head>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-exo2), sans-serif" }}>
        <Background />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
