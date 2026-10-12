import { parseArgs } from "node:util";
import Perplexity from "@perplexity-ai/perplexity_ai";

// Presets bundle model, tools and Perplexity's own system prompt; passing
// instructions or model here would override those defaults.
// Faster: "fast", "low". Deeper: "high", "xhigh" (slower and more expensive).
const PRESETS = ["fast", "low", "medium", "high", "xhigh"];

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { preset: { type: "string", short: "p", default: "medium" } },
});
if (!PRESETS.includes(values.preset)) {
  console.error(`Preset no válido: "${values.preset}". Usa uno de: ${PRESETS.join(", ")}`);
  process.exit(1);
}

const input =
  positionals.join(" ") || "What are the latest developments in AI inference hardware?";

const client = new Perplexity();

const response = await client.responses.create({
  preset: values.preset,
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
  // Most presets cite as [web:N]; "fast" uses plain [N]. Plain [N] only counts
  // when N is a result id, since brackets can also appear in ordinary text.
  const cited = [
    ...new Set(
      [...response.output_text.matchAll(/\[(web:)?(\d+)\]/g)]
        .filter((m) => m[1] || byId.has(Number(m[2])))
        .map((m) => Number(m[2]))
    ),
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
