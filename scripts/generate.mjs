import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import hljs from "highlight.js";
import { Marked, Renderer } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";

export function renderGuide(markdown, { summaries = {}, requireSummaries = false } = {}) {
  const start = markdown.search(/^## /m);
  if (start < 0) throw new Error("Guide needs a level-two section heading");
  const license = markdown.indexOf("## 📄 License", start);
  markdown = markdown.slice(start, license < 0 ? undefined : license);
  const marked = new Marked(
    gfmHeadingId(),
    markedSmartypants(),
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        return hljs.highlight(code, {
          language: hljs.getLanguage(lang) ? lang : "plaintext",
        }).value;
      },
    }),
  );
  marked.use({ renderer: {
    listitem(item) {
      if (!item.task) return false;
      const text = Renderer.prototype.listitem.call(this, item);
      // Marked renders disabled checkboxes without names; use their visible task text.
      const label = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().replace(/&(?!(?:#\d+|#x[0-9a-f]+|[a-z]+);)/gi, "&amp;").replaceAll('"', "&quot;");
      return text.replace("<input ", `<input aria-label="${label}" `);
    },
  } });
  const html = marked.parse(markdown, { gfm: true })
    .replaceAll("<pre>", '<pre tabindex="0">')
    .replaceAll("<table>", '<table tabindex="0">');
  const headings = [...html.matchAll(/<h([2-6]) id="([^"]+)">(.*?)<\/h\1>/g)];
  const sections = headings.filter(([, level]) => level === "2").map(([, , id, title]) => ({
    id, title: title.replace(/<[^>]*>/g, ""),
  }));
  let chapterId;
  const outline = [];
  const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const readerHtml = headings.map((match, index) => {
    const [heading, level, id, title] = match;
    if (level === "2") chapterId = id;
    outline.push({ id, title: title.replace(/<[^>]*>/g, ""), level: Number(level), chapterId });
    let body = html.slice(match.index + heading.length, headings[index + 1]?.index ?? html.length);
    // Keep legacy alias anchors reachable in either reading mode.
    const aliases = [];
    body = body.replace(/<span id="[^"]+"><\/span>/g, alias => { aliases.push(alias); return ""; });
    const existingSummary = body.match(/^\s*<blockquote>\s*<p><strong>tl;dr:<\/strong>\s*([\s\S]*?)<\/p>\s*<\/blockquote>/i);
    const summary = existingSummary ? `<p>${existingSummary[1]}</p>` : summaries[id] ? `<p>${escape(summaries[id])}</p>` : "";
    if (!summary && requireSummaries) throw new Error(`Missing reader summary for #${id}`);
    return `<section class="guide-section" data-section="${id}" data-depth="${level}">
<h${level} id="${id}" tabindex="-1"><a class="heading-anchor" href="#${id}">${title}</a></h${level}>
<div class="guide-summary">${summary}<button type="button" class="read-full-section" data-read-section="${id}" aria-label="Read full section: ${escape(title.replace(/<[^>]*>/g, ""))}">Read full section <span aria-hidden="true">→</span></button></div>
<div class="guide-detail">${body}</div>${aliases.join("")}</section>`;
  }).join("\n");
  return { html: readerHtml, sections, outline };

}

export async function generate() {
  const template = await fs.readFile(new URL("./page.template.tsx.txt", import.meta.url), "utf8");
  const markdown = await fs.readFile(new URL("../README.md", import.meta.url), "utf8");
  const summaries = JSON.parse(await fs.readFile(new URL("../site/src/data/guide-summaries.json", import.meta.url), "utf8"));
  const { html, sections, outline } = renderGuide(markdown, { summaries, requireSummaries: true });
  // JSON strings preserve backslashes, backticks, and literal ${...} in examples.
  const output = template
    .replace("GUIDE_HTML", () => JSON.stringify(html))
    .replace("GUIDE_SECTIONS", () => JSON.stringify(sections))
    .replace("GUIDE_OUTLINE", () => JSON.stringify(outline));
  await fs.writeFile(new URL("../site/src/app/page.tsx", import.meta.url), output);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generate().then(() => console.log("Generated guide and navigation.")).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
