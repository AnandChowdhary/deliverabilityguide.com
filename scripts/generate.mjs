import { promises as fs } from "fs";
import hljs from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";

const marked = new Marked(
  gfmHeadingId(),
  markedSmartypants(),
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

(async () => {
  const template = await fs.readFile("../site/src/app/template.tsx", "utf-8");
  let markdown = await fs.readFile("../README.md", "utf-8");
  // Remove first line
  markdown = markdown.substring(markdown.indexOf("\n") + 1);
  // Remove license section
  const licenseLine = "## 📄 License";
  markdown = markdown.substring(0, markdown.indexOf(licenseLine));
  // Replace "- [x] " with "✅ "
  markdown = markdown.replaceAll("- [x] ", "- ");

  const html = marked.parse(markdown, { gfm: true });
  const output = template.replace(
    "<!-- content -->",
    html.replace(/`/g, "\\`")
  );
  await fs.writeFile("../site/src/app/page.tsx", output);
})()
  .then(() => console.log("Completed!"))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
