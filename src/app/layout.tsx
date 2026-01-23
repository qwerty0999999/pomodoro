'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRef, useEffect } from "react";
import { useSettingsStore } from "@/store/settingsStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { settings, loadSettings } = useSettingsStore();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      loadSettings();
      hasLoadedRef.current = true;
    }
  }, [loadSettings]);

  return (
    <html lang="en" className={settings.theme === 'light' ? 'light' : ''}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          settings.theme === 'light'
            ? 'bg-white text-black'
            : 'bg-slate-900 text-white'
        }`}
      >
        {children}
      </body>
    </html>
  );
}
