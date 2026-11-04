"use client";

import { useEffect, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [read, setRead] = useState(0);

  // how far down the page you are, as a live readout
  useEffect(() => {
    const on = () => setRead(Math.round((scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100));
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-l">
        <a href="#main" className="mark" aria-label="VK, back to top">VK</a>
        <span className="meta muted" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <ThinkingOrb state="breathing" size={20} theme="dark" /> {String(read).padStart(2, "0")}% read
        </span>
      </div>
      <button className="burger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="nav-list">
        {isOpen ? "Close" : "Menu"}
      </button>
      <ul id="nav-list" className={isOpen ? "open" : ""}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
          </li>
        ))}
        <li aria-hidden="true"><span className="dot" style={{ display: "block" }} /></li>
      </ul>
    </nav>
  );
}
