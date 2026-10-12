import Perplexity from "@perplexity-ai/perplexity_ai";

const input =
  process.argv.slice(2).join(" ") ||
  "What are the latest developments in AI inference hardware?";

const client = new Perplexity();

// "medium" includes web_search and fetch_url plus Perplexity's own system
// prompt; passing instructions or model here would override those defaults.
// Lighter and faster: "low". Deeper: "high" or "xhigh" (slower and more expensive).
const response = await client.responses.create({
  preset: "medium",
  input,
});

if (response.status === "completed") {
  console.log(response.output_text);

  // [web:N] markers refer to search result ids. The same URL can come back under
  // several ids, so index by id and list only the ones the answer cites.
  const byId = new Map();
  for (const item of response.output) {
    if (item.type !== "search_results") continue;
    for (const r of item.results) byId.set(r.id, r);
  }
  const cited = [
    ...new Set([...response.output_text.matchAll(/\[web:(\d+)\]/g)].map((m) => Number(m[1]))),
  ];
  if (cited.length > 0) {
    console.log("\nFuentes:");
    for (const id of cited) {
      const r = byId.get(id);
      console.log(
        r
          ? `[web:${id}] ${r.title}${r.date ? ` (${r.date})` : ""}\n    ${r.url}`
          : `[web:${id}] (no aparece en los resultados de búsqueda)`
      );
    }
  }
} else {
  const err = response.error;
  console.error(
    `Respuesta no completada: status=${response.status}` +
      (err ? ` error=${err.code ?? err.type ?? ""} ${err.message}` : "")
  );
  process.exit(1);
}
