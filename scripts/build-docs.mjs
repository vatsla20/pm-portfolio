// Converts the Splitwise case-study .md files to styled .html matching the
// existing /public/documents look. Run: node scripts/build-docs.mjs
// ponytail: handles the markdown subset these docs actually use (headings,
// tables, bold, blockquote, lists, hr, inline code). Add a real md lib only
// if the docs start using nested lists, images, or links.
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const DIR = "public/documents/splitwise";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, "<em>$1</em>");

function mdToHtml(md) {
  const lines = md.split("\n");
  const out = [];
  let i = 0;
  const flushTable = (rows) => {
    const cells = (r) => r.slice(1, -1).split("|").map((c) => c.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2); // skip the |---| separator
    out.push("<table><thead><tr>");
    head.forEach((h) => out.push(`<th>${inline(h)}</th>`));
    out.push("</tr></thead><tbody>");
    body.forEach((r) => {
      out.push("<tr>");
      cells(r).forEach((c) => out.push(`<td>${inline(c)}</td>`));
      out.push("</tr>");
    });
    out.push("</tbody></table>");
  };
  while (i < lines.length) {
    const line = lines[i];
    if (/^\|.*\|$/.test(line) && /^\|[-:| ]+\|$/.test(lines[i + 1] || "")) {
      const rows = [];
      while (i < lines.length && /^\|.*\|$/.test(lines[i])) rows.push(lines[i++]);
      flushTable(rows);
      continue;
    }
    if (/^---+$/.test(line)) { out.push("<hr>"); i++; continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { const n = h[1].length; out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      out.push("<ul>");
      while (i < lines.length && /^[-*]\s+/.test(lines[i]))
        out.push(`<li>${inline(lines[i++].replace(/^[-*]\s+/, ""))}</li>`);
      out.push("</ul>");
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      out.push("<ol>");
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]))
        out.push(`<li>${inline(lines[i++].replace(/^\d+\.\s+/, ""))}</li>`);
      out.push("</ol>");
      continue;
    }
    if (line.trim() === "") { i++; continue; }
    out.push(`<p>${inline(line)}</p>`);
    i++;
  }
  return out.join("\n");
}

const page = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; line-height:1.6; color:#333; background:#fafafa; padding:20px; }
.container { max-width:820px; margin:0 auto; background:#fff; padding:48px; box-shadow:0 2px 8px rgba(0,0,0,0.1); border-radius:8px; }
h1 { font-size:2.2rem; margin-bottom:1rem; color:#1a1a1a; line-height:1.2; }
h2 { font-size:1.5rem; margin-top:2.2rem; margin-bottom:0.8rem; color:#2c3e50; border-bottom:2px solid #3498db; padding-bottom:0.4rem; }
h3 { font-size:1.15rem; margin-top:1.5rem; margin-bottom:0.6rem; color:#34495e; }
h4 { font-size:1rem; margin-top:1.2rem; margin-bottom:0.4rem; color:#34495e; }
p { margin:0.7rem 0; }
ul, ol { margin:0.7rem 0 0.7rem 1.4rem; }
li { margin:0.3rem 0; }
blockquote { border-left:4px solid #3498db; background:#f1f6fb; padding:0.8rem 1rem; margin:1rem 0; color:#444; border-radius:0 4px 4px 0; }
code { background:#f4f4f4; padding:0.1rem 0.4rem; border-radius:3px; font-size:0.9em; color:#c7254e; }
table { border-collapse:collapse; width:100%; margin:1rem 0; font-size:0.92rem; }
th, td { border:1px solid #e0e0e0; padding:0.5rem 0.7rem; text-align:left; vertical-align:top; }
th { background:#f7f9fb; font-weight:600; }
tr:nth-child(even) td { background:#fafbfc; }
hr { border:none; border-top:1px solid #e8e8e8; margin:2rem 0; }
</style>
</head>
<body>
<div class="container">
${body}
</div>
</body>
</html>`;

for (const f of readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const md = readFileSync(join(DIR, f), "utf8");
  const title = (md.match(/^#\s+(.*)$/m) || [, basename(f, ".md")])[1];
  const html = page(title, mdToHtml(md));
  const outName = f.replace(/\.md$/, ".html");
  writeFileSync(join(DIR, outName), html);
  console.log("wrote", outName);
}
