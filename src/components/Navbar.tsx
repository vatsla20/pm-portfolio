"use client";

import { useEffect, useRef, useState } from "react";
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
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => {
      const p = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
      setRead(Math.round(p * 100));
      if (bar.current) bar.current.style.scale = `${p} 1`;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <nav className="nav" aria-label="Main">
      <div className="wrap nav-in">
        <div className="nav-l">
          <a href="#main" className="mark" data-nav aria-label="VK, back to top">VK</a>
          <span className="read" aria-hidden="true"><ThinkingOrb state="breathing" size={20} theme="light" /> {String(read).padStart(2, "0")}% read</span>
        </div>
        <button className="btn burger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="nav-list">
          {isOpen ? "Close" : "Menu"}
        </button>
        <ul id="nav-list" className={isOpen ? "open" : ""}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} data-nav data-label={item.label} onClick={() => setIsOpen(false)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-progress" ref={bar} aria-hidden="true" />
    </nav>
  );
}
