"use client";
import { useEffect } from "react";

// Page-wide behaviour in one place: chapter palettes, reveals, fitted type, guide lines.
export default function Runtime() {
  useEffect(() => {
    const html = document.documentElement;

    // Fit [data-fit] text to its container width, never wrapping.
    const fit = () =>
      document.querySelectorAll<HTMLElement>("[data-fit]").forEach((el) => {
        if (!el.offsetParent) return;
        el.style.fontSize = "100px";
        const w = el.parentElement!.clientWidth;
        el.style.fontSize = `${Math.floor((100 * w) / el.scrollWidth * 0.995)}px`;
      });
    fit();
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);
    const late = setTimeout(fit, 900);
    addEventListener("resize", fit);
    addEventListener("depth", () => requestAnimationFrame(fit));

    // Chapter = the section crossing the middle of the screen. Its palette takes the whole page.
    const chapters = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          html.dataset.chapter = el.dataset.chapter;
          if (el.dataset.say) dispatchEvent(new CustomEvent("guide", { detail: el.dataset.say }));
          document.querySelectorAll(".nav a[href^='/#']").forEach((a) =>
            a.setAttribute("aria-current", String(a.getAttribute("href") === `/#${el.id}`)),
          );
        }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-chapter]").forEach((s) => chapters.observe(s));

    // Nav sits on the photo as white type, then becomes a plain bar on the page's own ground.
    const hero = document.querySelector(".hero");
    const overHero = new IntersectionObserver(([e]) => html.classList.toggle("over-hero", e.isIntersecting), { rootMargin: "0px 0px -94% 0px" });
    if (hero) overHero.observe(hero);

    // Entrances, once per block.
    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), reveal.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((s) => reveal.observe(s));

    return () => {
      removeEventListener("resize", fit);
      clearTimeout(late);
      document.fonts?.removeEventListener("loadingdone", fit);
      chapters.disconnect();
      overHero.disconnect();
      reveal.disconnect();
    };
  }, []);
  return null;
}
