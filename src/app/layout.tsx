import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Runtime from "@/components/Runtime";
import Swarm from "@/components/Swarm";
import Guide from "@/components/Guide";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz", "wdth"] });

// Tech faces for the letter flips, cut down to the alphabet so they weigh a few KB.
const TECH = "https://fonts.googleapis.com/css2?family=Doto:wght@800&family=Major+Mono+Display&family=Orbitron:wght@800&family=Silkscreen:wght@700&family=VT323&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz%26";

export const metadata: Metadata = {
  title: "Vatsla Khurana | Product Manager",
  description: "Product Manager portfolio — building products at the intersection of user empathy and business impact.",
  keywords: ["product manager", "portfolio", "PM", "product management"],
};

// Before paint: js flag, the saved time budget, whether the loader already played this session.
const boot = `try{var d=document.documentElement;d.classList.add('js');d.dataset.depth=localStorage.getItem('depth')||'full';if(sessionStorage.getItem('seen'))d.classList.add('seen','ready');}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bricolage.variable} data-depth="full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={TECH} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        {children}
        <Runtime />
        <Swarm />
        <Guide />
      </body>
    </html>
  );
}
