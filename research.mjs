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

  // Each web_search call adds a search_results item; the same URL can appear in several.
  const sources = new Map();
  for (const item of response.output) {
    if (item.type !== "search_results") continue;
    for (const r of item.results) {
      if (!sources.has(r.url)) sources.set(r.url, r);
    }
  }
  if (sources.size > 0) {
    console.log("\nFuentes:");
    for (const r of sources.values()) {
      console.log(`[web:${r.id}] ${r.title}${r.date ? ` (${r.date})` : ""}\n    ${r.url}`);
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
