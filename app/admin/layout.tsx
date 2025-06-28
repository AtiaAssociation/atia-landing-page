import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SessionProviderWrapper from "@/components/providers/SessionProviderWrapper";
// Import custom admin header/footer if available, else fallback
import { Header as AdminHeader } from "@/components/layout/Header";
import { Footer as AdminFooter } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin | ATIA",
  description: "Espace d'administration ATIA",
};

export default function AdminLayout({
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
          <AdminHeader adminMode />
          {children}
          <AdminFooter adminMode />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
