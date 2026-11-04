"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Morph from "./Morph";

// Page-wide motion: smooth scrolling, a curtain between sections, magnetic buttons,
// entrances, and the guide's line for each section.
export default function Runtime() {
  const [curtain, setCurtain] = useState<{ label: string; phase: "" | "on" | "off" }>({ label: "", phase: "" });
  const busy = useRef(false);

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = still ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    let raf = 0;
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
    if (lenis) raf = requestAnimationFrame(loop);

    // nav links: curtain up with the section's name, jump, curtain away
    const go = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-nav]");
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      if (still || busy.current) { el.scrollIntoView(); return; }
      busy.current = true;
      setCurtain({ label: a.dataset.label || "Vatsla Khurana", phase: "on" });
      setTimeout(() => {
        if (lenis) lenis.scrollTo(el, { immediate: true, offset: id === "#main" ? 0 : -72 });
        else el.scrollIntoView();
        setCurtain((c) => ({ ...c, phase: "off" }));
        setTimeout(() => { setCurtain({ label: "", phase: "" }); busy.current = false; }, 650);
      }, 780);
    };
    document.addEventListener("click", go);

    // buttons lean toward the pointer
    const lean = (e: PointerEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".btn, .hero-social a, .doc .arrow");
      document.querySelectorAll<HTMLElement>("[data-leaning]").forEach((x) => { if (x !== b) { x.style.translate = ""; delete x.dataset.leaning; } });
      if (!b || still) return;
      const r = b.getBoundingClientRect();
      b.dataset.leaning = "1";
      b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 8}px ${((e.clientY - r.top) / r.height - 0.5) * 6}px`;
    };
    addEventListener("pointermove", lean, { passive: true });

    // entrances, once
    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), reveal.unobserve(e.target))),
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-stagger], .reveal").forEach((s) => reveal.observe(s));

    // the guide's line and the current nav item follow the section in the middle of the screen
    const sections = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        if (el.dataset.say) dispatchEvent(new CustomEvent("guide", { detail: el.dataset.say }));
        document.querySelectorAll(".nav ul a").forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${el.id}`)));
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("section[data-say]").forEach((s) => sections.observe(s));

    return () => {
      cancelAnimationFrame(raf); lenis?.destroy();
      document.removeEventListener("click", go); removeEventListener("pointermove", lean);
      reveal.disconnect(); sections.disconnect();
    };
  }, []);

  return (
    <div className={`curtain ${curtain.phase}`} aria-hidden="true">
      {curtain.label && <Morph key={curtain.label} text={curtain.label} grow={false} />}
    </div>
  );
}
