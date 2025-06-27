import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
// Import custom auth header/footer if available, else fallback
import { Header as AuthHeader } from "@/components/layout/Header";
import { Footer as AuthFooter } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Authentification | ATIA",
  description: "Connexion à l'espace ATIA",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <AuthHeader authMode />
          {children}
          <AuthFooter authMode />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
