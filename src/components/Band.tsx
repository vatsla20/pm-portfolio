import { credits } from "@/data/site";

// The flock: one film and three photographs, unequal widths, one shared motif across the site.
export default function Band() {
  return (
<div className="band">
      <figure style={{ "--g": 5 } as React.CSSProperties}>
        <video autoPlay muted loop playsInline poster="/img/flock-film-poster.jpg" aria-label="A flock of starlings turning over a marsh at dusk">
          <source src="/img/flock-loop.webm" type="video/webm" />
          <source src="/img/flock-loop.mp4" type="video/mp4" />
        </video>
        <figcaption>Seven neighbours</figcaption>
      </figure>
      {[["/img/flock-4.jpg", 2], ["/img/flock-3.jpg", 3], ["/img/flock-6.jpg", 2]].map(([src, g]) => (
        <figure key={src} style={{ "--g": g } as React.CSSProperties}>
          <img src={src as string} srcSet={`${(src as string).replace(".jpg", "-900.jpg")} 900w, ${src} 1600w`} sizes="(max-width: 720px) 64vw, 40vw" alt={credits.find((c) => c.file === src)?.title ?? ""} width={1200} height={900} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
