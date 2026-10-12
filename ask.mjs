import Perplexity from '@perplexity-ai/perplexity_ai';

const pregunta = process.argv.slice(2).join(' ');
if (!pregunta) {
  console.error('Uso: node ask.mjs "tu pregunta"');
  process.exit(1);
}

// Lee la clave de PERPLEXITY_API_KEY
const client = new Perplexity();

const res = await client.chat.completions.create({
  model: 'sonar',
  messages: [{ role: 'user', content: pregunta }],
});

console.log(res.choices[0].message.content);

if (res.citations?.length) {
  console.log('\nFuentes:');
  res.citations.forEach((url, i) => console.log(`[${i + 1}] ${url}`));
}
