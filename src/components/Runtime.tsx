"use client";
import { useEffect } from "react";

// Page-wide behaviour: fitted display type, entrances, the guide's line per section, the current nav item.
export default function Runtime() {
  useEffect(() => {
    const fit = () =>
      document.querySelectorAll<HTMLElement>("[data-fit]").forEach((el) => {
        el.style.fontSize = "100px";
        const w = el.parentElement!.clientWidth;
        el.style.fontSize = `${Math.floor(((100 * w) / el.scrollWidth) * 0.995)}px`;
      });
    fit();
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);
    addEventListener("resize", fit);

    const reveal = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), reveal.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((s) => reveal.observe(s));

    const sections = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.dataset.say) dispatchEvent(new CustomEvent("guide", { detail: el.dataset.say }));
          document.querySelectorAll(".nav ul a").forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === `#${el.id}`)));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("section[data-say]").forEach((s) => sections.observe(s));

    return () => { removeEventListener("resize", fit); reveal.disconnect(); sections.disconnect(); };
  }, []);
  return null;
}
