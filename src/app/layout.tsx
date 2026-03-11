import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/effects/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asrofi Laboratorium - Biocomposite Materials Research",
  description: "Pioneering research in eco-friendly biocomposite material science for a greener future",
  keywords: ["biocomposite", "sustainable materials", "research", "laboratory", "Asrofi", "UNEJ"],
  authors: [{ name: "Asrofi Laboratorium" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Asrofi Laboratorium",
    description: "Biocomposite Materials Research Laboratory",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden w-full`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster />
            <CustomCursor />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
