import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Runtime from "@/components/Runtime";
import Swarm from "@/components/Swarm";
import Guide from "@/components/Guide";
import Clock from "@/components/Clock";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: "Vatsla Khurana | Product Manager",
  description: "Product Manager portfolio — building products at the intersection of user empathy and business impact.",
  keywords: ["product manager", "portfolio", "PM", "product management"],
};

// Before paint: js flag, the saved time budget, whether the loader already played this session.
const boot = `try{var d=document.documentElement;d.classList.add('js');d.dataset.depth=localStorage.getItem('depth')||'full';if(sessionStorage.getItem('seen'))d.classList.add('seen','ready');}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable} data-depth="full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div className="screen">
          <Navbar />
          {children}
        </div>
        <div className="frame-bar" aria-hidden="true">
          <span>Vatsla Khurana</span>
          <span><Clock /> · Bengaluru</span>
          <span>Open to PM roles</span>
        </div>
        <Runtime />
        <Swarm />
        <Guide />
      </body>
    </html>
  );
}
