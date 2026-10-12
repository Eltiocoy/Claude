import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import Perplexity from '@perplexity-ai/perplexity_ai';

// The API documents a flat results[] array, but for multi-query requests it can
// return one list per query. Accept both, then drop repeated URLs keeping rank order.
export function mergeResults(results) {
  const seen = new Set();
  const merged = [];
  for (const r of (results ?? []).flat()) {
    if (!r?.url || seen.has(r.url)) continue;
    seen.add(r.url);
    merged.push(r);
  }
  return merged;
}

// query: string or up to 5 strings. options are passed through to POST /search
// (max_results, country, search_domain_filter, search_recency_filter, ...).
// The SDK retries 429 and 5xx twice by default, honoring Retry-After.
export async function webSearch(query, options = {}, client = new Perplexity()) {
  const queries = Array.isArray(query) ? query : [query];
  if (queries.length === 0 || queries.length > 5) {
    throw new RangeError('query must be one string or 1 to 5 strings');
  }
  const res = await client.search.create({ query, ...options });
  return { id: res.id, results: mergeResults(res.results) };
}

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      max: { type: 'string' },
      country: { type: 'string' },
      domain: { type: 'string', multiple: true },
      recency: { type: 'string' },
      json: { type: 'boolean' },
    },
  });
  if (positionals.length === 0) {
    console.error('Uso: node search.mjs "consulta" ["consulta 2" ...] [--max N] [--country US] [--domain nature.com] [--recency week] [--json]');
    process.exit(1);
  }

  const options = {};
  if (values.max) options.max_results = Number(values.max);
  if (values.country) options.country = values.country;
  if (values.domain) options.search_domain_filter = values.domain;
  if (values.recency) options.search_recency_filter = values.recency;

  try {
    const query = positionals.length === 1 ? positionals[0] : positionals;
    const { results } = await webSearch(query, options);
    if (values.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }
    results.forEach((r, i) => {
      console.log(`[${i + 1}] ${r.title}\n    ${r.url}${r.date ? `  (${r.date})` : ''}`);
    });
  } catch (err) {
    if (err instanceof Perplexity.APIError && err.status) {
      console.error(`Perplexity API ${err.status}: ${err.message}`);
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
