import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import hljs from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";

export function renderGuide(markdown) {
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
  const html = marked.parse(markdown, { gfm: true });
  const headings = [...html.matchAll(/<h([23]) id="([^"]+)">(.*?)<\/h\1>/g)];
  const sections = headings.filter(([, level]) => level === "2").map(([, , id, title]) => ({
    id, title: title.replace(/<[^>]*>/g, ""),
  }));
  const groups = [];
  for (const [, level, id, title] of headings) {
    if (level === "2") groups.push({ id, title, children: [] });
    else groups.at(-1)?.children.push({ id, title });
  }
  const contents = `<nav aria-label="Table of contents" class="guide-contents"><h2 id="contents">On this page</h2><ul>${groups.map(({ id, title, children }) => `<li class="toc-section"><a href="#${id}">${title}</a>${children.length ? `<ul>${children.map(child => `<li><a href="#${child.id}">${child.title}</a></li>`).join("")}</ul>` : ""}</li>`).join("")}</ul></nav>`;
  return { html: contents + html, sections };
}

export async function generate() {
  const template = await fs.readFile(new URL("./page.template.tsx.txt", import.meta.url), "utf8");
  const markdown = await fs.readFile(new URL("../README.md", import.meta.url), "utf8");
  const { html, sections } = renderGuide(markdown);
  // JSON strings preserve backslashes, backticks, and literal ${...} in examples.
  const output = template
    .replace("GUIDE_HTML", () => JSON.stringify(html))
    .replace("GUIDE_SECTIONS", () => JSON.stringify(sections));
  await fs.writeFile(new URL("../site/src/app/page.tsx", import.meta.url), output);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generate().then(() => console.log("Generated guide and navigation.")).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
