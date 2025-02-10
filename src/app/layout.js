"use client";

import ClientWrapper from "./ClientWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Define public routes that don't require redirection
    const isPublicRoute = pathname === '/signup' || pathname === '/verify';
    
    // If trying to access a protected route, redirect to signup
    if (!isPublicRoute) {
      router.push('/signup');
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}