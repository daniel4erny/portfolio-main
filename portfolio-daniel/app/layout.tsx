import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SceneBackground from "./components/SceneBackground";

// one family; the wdth axis carries the hierarchy instead of a second face
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const description =
  "Daniel Černý, developer from Prague. Web apps in Next.js and TypeScript, backends in Python and Go, and cybersecurity competitions.";

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
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" style={{ isolation: "isolate" }}>
        <SceneBackground />
        {children}
      </body>
    </html>
  );
}
