import test from 'node:test';
import assert from 'node:assert/strict';
import { renderGuide } from './generate.mjs';

test('navigation follows document headings and excludes license', () => {
  const { html, sections } = renderGuide('# Title\nIntro\n## Start here\n### DNS & mail\nContent\n## 📄 License\nLicense');
  assert.deepEqual(sections, [{ id: 'start-here', title: 'Start here' }]);
  assert.match(html, /href="#dns--mail"/);
  assert.doesNotMatch(html, /License|Intro/);
});

test('documents without a license retain their final section', () => {
  assert.match(renderGuide('## Last\nKeep me').html, /Keep me/);
  assert.throws(() => renderGuide('# Title'), /level-two/);
});

test('code examples survive serialization as a TSX string literal', () => {
  const { html } = renderGuide('## Code\n```\n${token} `quoted` \\n\n```');
  assert.equal(JSON.parse(JSON.stringify(html)), html);
  assert.match(html, /\$\{token\}/);
});

test('heading IDs stay stable across repeated builds', () => {
  const markdown = '## Repeated\n## Repeated\n';
  assert.deepEqual(renderGuide(markdown), renderGuide(markdown));
  assert.deepEqual(renderGuide(markdown).sections.map(s => s.id), ['repeated', 'repeated-1']);
});

test('reader navigation includes nested technical topics and preserves every heading', () => {
  const { html, outline } = renderGuide('## Mail\nIntro\n### Domain\n#### DNS\n##### SPF\nOne record');
  assert.deepEqual(outline.map(({ id, level, chapterId }) => ({ id, level, chapterId })), [
    { id: 'mail', level: 2, chapterId: 'mail' },
    { id: 'domain', level: 3, chapterId: 'mail' },
    { id: 'dns', level: 4, chapterId: 'mail' },
    { id: 'spf', level: 5, chapterId: 'mail' },
  ]);
  assert.equal([...html.matchAll(/id="spf"/g)].length, 1);
  assert.match(html, /data-section="spf"/);
  assert.match(html, /One record/);
});

test('existing author TLDRs take precedence over derived summaries', () => {
  const { html } = renderGuide('## Mail\n> **tl;dr:** Author says **start small**.\n\nDetailed advice.', {
    summaries: { mail: 'A stale summary.' }, requireSummaries: true,
  });
  assert.match(html, /class="guide-summary"><p>Author says <strong>start small<\/strong>/);
  assert.match(html, /class="guide-detail">[\s\S]*Detailed advice/);
  assert.doesNotMatch(html, /A stale summary/);
});

test('missing summaries fail production generation and plain-text summaries are escaped', () => {
  assert.throws(() => renderGuide('## Topic\nBody', { requireSummaries: true }), /Missing reader summary for #topic/);
  const { html } = renderGuide('## Topic\nBody', { summaries: { topic: 'Use <plain text> & keep it short.' } });
  assert.match(html, /Use &lt;plain text&gt; &amp; keep it short/);
});

test('legacy anchors remain outside detail panels so TLDR links still resolve', () => {
  const { html } = renderGuide('## Topic\nBody\n\n<span id="old-link"></span>');
  assert.match(html, /<\/div><span id="old-link"><\/span><\/section>/);
  assert.equal([...html.matchAll(/id="old-link"/g)].length, 1);
});

test('the complete book has one summary per section and no duplicate IDs', async () => {
  const { readFile } = await import('node:fs/promises');
  const markdown = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const summaries = JSON.parse(await readFile(new URL('../site/src/data/guide-summaries.json', import.meta.url), 'utf8'));
  const { html, outline } = renderGuide(markdown, { summaries, requireSummaries: true });
  assert.equal([...html.matchAll(/class="guide-summary"/g)].length, outline.length);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(outline.some(heading => heading.id === 'spf'));
  assert.ok(outline.some(heading => heading.id === 'mailboxes-1'));
  assert.match(html, /id="latest-technical-review"/);
});

test('checklist controls have accessible names matching visible task text', () => {
  const { html } = renderGuide('## Preflight\n- [ ] Verify **SPF** & DKIM\n- [x] Check "reply routing"\n- Ordinary item');
  assert.match(html, /<input aria-label="Verify SPF &amp; DKIM"[^>]*disabled[^>]*type="checkbox"/);
  assert.match(html, /<input aria-label="Check &quot;reply routing&quot;"[^>]*checked[^>]*disabled[^>]*type="checkbox"/);
  assert.equal([...html.matchAll(/<input aria-label=/g)].length, 2);
  assert.match(html, /<li>Ordinary item<\/li>/);
});

test('overflowing code and tables are reachable by keyboard', () => {
  const { html } = renderGuide('## Examples\n```text\nSPF configuration\n```\n\n| A | B |\n| --- | --- |\n| One | Two |');
  assert.match(html, /<pre tabindex="0"><code/);
  assert.match(html, /<table tabindex="0">/);
});
