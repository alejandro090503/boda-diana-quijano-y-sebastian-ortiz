import type { Metadata } from "next";
import { Pinyon_Script, Jost, Cormorant } from "next/font/google";
import "./globals.css";
import { FECHA_PUNTEADA, FECHA_LARGA } from "./_data/fecha";

// Caligrafía copperplate para los nombres (idéntica a la referencia del cliente)
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

// Serif elegante para textos de datos/cuerpo (nombres, hora, frases, botones)
const serif = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// Sans fino solo para eyebrows/labels en mayúsculas espaciadas
const sans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boda-sebastian-y-diana.vercel.app"),
  title: `Sebastián & Diana — ${FECHA_PUNTEADA}`,
  description:
    `Con el amor de nuestras familias, Sebastián y Diana los invitan a celebrar su boda. ${FECHA_LARGA}, Mérida, Yucatán.`,
  openGraph: {
    title: "Sebastián & Diana — Nuestra Boda",
    description: `${FECHA_LARGA} · Mérida, Yucatán`,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${script.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
