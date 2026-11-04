import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Runtime from "@/components/Runtime";
import Swarm from "@/components/Swarm";
import Guide from "@/components/Guide";
import { person } from "@/data/site";

const schibsted = Schibsted_Grotesk({ variable: "--font-schibsted", subsets: ["latin"], weight: ["400", "600", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://vatsla-khurana.vercel.app"),
  title: "Vatsla Khurana, product manager for AI and platforms",
  description: person.line,
  alternates: { canonical: "/" },
  openGraph: { title: "Vatsla Khurana", description: person.line, images: ["/img/flock-1.jpg"] },
};

// Runs before paint: js flag, the saved time budget, and whether the loader already played this session.
const boot = `try{var d=document.documentElement;d.classList.add('js');d.dataset.depth=localStorage.getItem('depth')||'60';if(sessionStorage.getItem('seen'))d.classList.add('seen');if(location.pathname==='/')d.classList.add('over-hero');}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={schibsted.variable} data-depth="60" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        {children}
        <Runtime />
        <Swarm />
        <Guide />
      </body>
    </html>
  );
}
