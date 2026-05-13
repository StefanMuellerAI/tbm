import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TBM-Rechner – Tokenbudget für Vibe Coding kalkulieren",
  description:
    "Der Tokenbudget-Modell-Rechner (TBM) von Stefan Müller schätzt das Tokenbudget und die Kosten für Vibe-Coding-Projekte – auf Basis von Komplexität, Integrationen, Qualität, Legacy-Anteil und Modellqualität.",
  metadataBase: new URL("https://tbm.stefanai.de"),
  openGraph: {
    title: "TBM-Rechner – Tokenbudget für Vibe Coding",
    description:
      "Schätzen Sie das Tokenbudget Ihres KI-Coding-Projekts nach dem Modell aus iX 6/2026.",
    type: "website",
    locale: "de_DE",
  },
  authors: [{ name: "Stefan Müller", url: "https://stefanai.de" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
