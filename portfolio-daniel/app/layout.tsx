import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Background from "./components/Background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
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
    <html lang="cs" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-space-grotesk), sans-serif", isolation: "isolate" }}>
        <Background />
        {children}
      </body>
    </html>
  );
}
