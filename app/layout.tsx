import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata for the application
export const metadata: Metadata = {
  title: {
    default: "Familia Vet and Care",
    template: "%s | Familia Vet and Care", // Page title template
  },
  description: "A modern Next.js application with atomic design structure",
  keywords: ["nextjs", "react", "typescript", "atomic design"],
  authors: [{ name: "Familia Vet and Care Team" }],
  creator: "Familia Vet and Care",
  publisher: "Familia Vet and Care",
  icons: {
    icon: [
      { url: "/small-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/small-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/small-icon.png"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://familia-vet.com",
    siteName: "Familia Vet and Care",
    title: "Familia Vet and Care",
    description: "A modern Next.js application with atomic design structure",
  },
  twitter: {
    card: "summary_large_image",
    title: "Familia Vet and Care",
    description: "A modern Next.js application with atomic design structure",
    creator: "@lemonapp",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
