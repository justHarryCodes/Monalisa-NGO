import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mona Lisa Smile Indigents Foundation | Empowering Communities in Nigeria",
    template: "%s | MLSI Foundation",
  },
  description:
    "The Mona Lisa Smile Indigents Foundation (MLSI) is a Nigerian NGO dedicated to empowering indigent children and disadvantaged communities through education, welfare relief, and community care programs in Abuja, Nigeria.",
  keywords: [
    "NGO Nigeria", "Abuja charity", "indigent children", "education support Nigeria",
    "welfare relief Abuja", "community care", "donate Nigeria", "volunteer Abuja",
    "Mona Lisa Smile Foundation", "MLSI Foundation",
  ],
  authors: [{ name: "MLSI Foundation" }],
  creator: "Mona Lisa Smile Indigents Foundation",
  openGraph: {
    type: "website",
    locale: "en_NG",
    title: "Mona Lisa Smile Indigents Foundation",
    description: "Empowering indigent children and disadvantaged communities in Abuja, Nigeria.",
    siteName: "MLSI Foundation",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "MLSI Foundation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mona Lisa Smile Indigents Foundation",
    description: "Empowering indigent children and disadvantaged communities in Abuja, Nigeria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#1F2937] antialiased">
        <AuthProvider>
          {/* Navbar and Footer check the route themselves and return null when not needed */}
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
