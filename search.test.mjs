import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeResults, webSearch } from './search.mjs';

const page = (url) => ({ title: url, url, snippet: '' });

test('mergeResults dedupes flat results by URL, keeping first rank', () => {
  const out = mergeResults([page('a'), page('b'), page('a')]);
  assert.deepEqual(out.map((r) => r.url), ['a', 'b']);
});

test('mergeResults flattens per-query lists from multi-query responses', () => {
  const out = mergeResults([[page('a'), page('b')], [page('b'), page('c')]]);
  assert.deepEqual(out.map((r) => r.url), ['a', 'b', 'c']);
});

test('webSearch sends params unchanged and returns merged results', async () => {
  let sent;
  const client = { search: { create: async (p) => { sent = p; return { id: 'x', results: [page('a'), page('a')] }; } } };
  const res = await webSearch(['q1', 'q2'], { max_results: 3 }, client);
  assert.deepEqual(sent, { query: ['q1', 'q2'], max_results: 3 });
  assert.equal(res.results.length, 1);
});

test('webSearch rejects more than 5 queries', async () => {
  await assert.rejects(webSearch(['1', '2', '3', '4', '5', '6'], {}, {}), RangeError);
});
