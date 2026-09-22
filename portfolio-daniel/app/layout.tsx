import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Background from "./components/Background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Daniel Černý — software developer and cybersecurity engineer in Prague. Next.js and TypeScript on the front, Python/FastAPI and Go on the back, Linux in between.";

export const metadata: Metadata = {
  title: {
    default: "Daniel Černý — Developer & Cybersecurity",
    template: "%s — Daniel Černý",
  },
  description,
  keywords: [
    "Daniel Černý",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Go",
    "Linux",
    "cybersecurity",
    "Prague",
  ],
  authors: [{ name: "Daniel Černý", url: "https://github.com/daniel4erny" }],
  openGraph: {
    title: "Daniel Černý — Developer & Cybersecurity",
    description,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Daniel Černý", description },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" style={{ isolation: "isolate" }}>
        <Background />
        {children}
      </body>
    </html>
  );
}
