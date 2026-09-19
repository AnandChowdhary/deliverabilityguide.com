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
