import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fcc-aniversario.vercel.app";

export const viewport: Viewport = {
  themeColor: "#06192D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "22 Años | Filadelfia Cuerpo de Cristo",
  description:
    "Celebremos juntos 22 años de respaldo y fidelidad de Dios. Confirma tu asistencia aquí.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE_URL,
    siteName: "CAM • Filadelfia Cuerpo de Cristo",
    title: "✦ 22 Años | Filadelfia Cuerpo de Cristo",
    description:
      "Te invitamos a conmemorar con nosotros esta fecha especial. Toca aquí para reservar tu lugar.",
  },
  twitter: {
    card: "summary_large_image",
    title: "✦ 22 Años | Filadelfia Cuerpo de Cristo",
    description:
      "Te invitamos a conmemorar con nosotros esta fecha especial. Toca aquí para reservar tu lugar.",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="h-dvh w-screen overflow-hidden bg-[#06192D] text-slate-100 antialiased selection:bg-[#D4AF37] selection:text-[#06192D]">
        {children}
      </body>
    </html>
  );
}