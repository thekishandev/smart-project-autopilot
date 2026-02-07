import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

// Display font: Bold, technical, distinctive
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body font: Modern, clean, readable
const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Smart Project Autopilot | AI Mission Control",
  description:
    "Your AI-powered command center for project management. Chat naturally to navigate sprints, track velocity, and orchestrate your team.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} ${outfit.variable} font-body antialiased`}
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Scanline overlay for that cyberpunk feel */}
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,255,247,0.03) 0px, rgba(0,255,247,0.03) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 2px",
          }}
        />
        {children}
      </body>
    </html>
  );
}
