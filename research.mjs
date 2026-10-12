import Perplexity from "@perplexity-ai/perplexity_ai";

const input =
  process.argv.slice(2).join(" ") ||
  "What are the latest developments in AI inference hardware?";

const client = new Perplexity();

const response = await client.responses.create({
  model: "openai/gpt-5.6-terra",
  input,
  tools: [{ type: "web_search" }],
  instructions:
    "You have access to a web_search tool. Use it for questions about current events, news, or recent developments.",
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
