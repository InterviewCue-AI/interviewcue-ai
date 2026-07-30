import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'scripts', 'article_keywords_data.py');
const contentDirs = [
  join(root, 'src', 'content', 'blog'),
  join(root, 'src', 'content', 'guides'),
];

if (!existsSync(registryPath)) {
  console.error('Missing scripts/article_keywords_data.py');
  process.exit(1);
}

const registry = readFileSync(registryPath, 'utf8');
const registryEntries = new Map(
  [...registry.matchAll(/['"]([a-z0-9][a-z0-9-]*)['"]\s*:\s*\[([\s\S]*?)\]/g)].map((match) => {
    const keywords = [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map((keywordMatch) =>
      keywordMatch[1].trim(),
    );
    return [match[1], keywords];
  }),
);

const registeredSlugs = new Set(registryEntries.keys());

const contentSlugs = contentDirs.flatMap((dir) => {
  if (!existsSync(dir)) return [];

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
    .map((entry) => basename(entry.name).replace(/\.(md|mdx)$/, ''));
});

const missing = contentSlugs.filter((slug) => !registeredSlugs.has(slug));
const invalidKeywordCounts = [...registryEntries.entries()].filter(([, keywords]) => {
  return keywords.length < 5 || keywords.length > 15;
});

if (missing.length > 0) {
  console.error('Missing keyword registry entries:');
  for (const slug of missing) console.error(`- ${slug}`);
  process.exit(1);
}

if (invalidKeywordCounts.length > 0) {
  console.error('Keyword registry entries must contain 5-15 keywords:');
  for (const [slug, keywords] of invalidKeywordCounts) {
    console.error(`- ${slug}: ${keywords.length} keywords`);
  }
  process.exit(1);
}

console.log(`Keyword registry OK: ${contentSlugs.length} content files registered with 5-15 keywords each.`);
