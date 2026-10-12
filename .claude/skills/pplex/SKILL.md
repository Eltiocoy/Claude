---
name: pplex
description: Research a question on the live web with Perplexity's Agent API and return a cited answer. Use when the user types /pplex, or asks to "search with Perplexity" or "pplex" something.
argument-hint: "[-p fast|low|medium|high|xhigh] <pregunta>"
---

# pplex

Run `research.mjs` from the repository root and relay its answer with its sources.

Arguments: $ARGUMENTS

## Steps

1. If the arguments are empty, ask the user what to search for and stop.
2. Check the key without printing it: `test -n "$PERPLEXITY_API_KEY"`. If it is missing, tell the user to add `PERPLEXITY_API_KEY` as an environment variable (in a cloud session: the environment settings, then a new session). Never ask them to paste the key into the chat, and stop.
3. If the arguments start with `-p <preset>` or `--preset <preset>`, pass that flag through; everything after it is the question. Default preset is `medium`.
4. Run, with the question as ONE single-quoted shell argument (replace each `'` inside it with `'\''`) so nothing in it is interpreted by the shell:

   ```sh
   node --no-warnings research.mjs [-p <preset>] '<question>'
   ```

   `medium` takes 30 to 60 seconds and `high` about 2 minutes, so use a timeout of at least 300000 ms.
5. Reply in the user's language:
   - The answer, keeping its `[web:N]` / `[N]` citation markers.
   - The **Fuentes** list exactly as printed (title, date, URL).
   - One line naming the preset used.
   Do not add facts that are not in the output. If a figure is a vendor claim or a projection, say so as the answer does.

## Failures

- Exit code 1 with `Preset no válido`: show the valid presets and stop.
- `401`: the key is invalid or was rotated; the user must update it in the environment settings.
- `429`: rate limited; the SDK already retried twice. Tell the user to wait and try again.
- `Connection error` in a cloud session: `api.perplexity.ai` must be in Allowed domains and `NODE_USE_ENV_PROXY=1` must be set in the environment.

Each run is billed to the user's Perplexity account.
