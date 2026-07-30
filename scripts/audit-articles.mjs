import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

const root = process.cwd();
const contentDirs = [
  join(root, 'src', 'content', 'blog'),
  join(root, 'src', 'content', 'guides'),
];
const registryPath = join(root, 'scripts', 'article_keywords_data.py');
const reportPath = join(root, 'docs', 'seo-article-audit.md');
const shouldWrite = process.argv.includes('--write');

const requiredFields = [
  'title',
  'description',
  'publishDate',
  'author',
  'category',
  'tags',
  'targetKeyword',
  'secondaryKeywords',
  'noindex',
];

const blogImageFields = ['ogImage', 'imageAlt', 'imagePrompt'];

function normalize(value = '') {
  return String(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

function includesKeyword(value, keyword) {
  return normalize(value).includes(normalize(keyword));
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '').trim();
}

function parseInlineArray(value = '') {
  const match = value.match(/^\[(.*)\]$/);
  if (!match) return [];
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((item) => item[1].trim());
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, rawValue] = pair;
    const trimmed = rawValue.trim();
    frontmatter[key] = trimmed.startsWith('[') ? parseInlineArray(trimmed) : stripQuotes(trimmed);
  }

  return frontmatter;
}

function getBody(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

function getFirstParagraph(body) {
  return (
    body
      .split(/\r?\n\s*\r?\n/)
      .map((block) => block.trim())
      .find((block) => block && !block.startsWith('#') && !block.startsWith('- ') && !/^\d+\./.test(block)) ||
    ''
  );
}

function getH2s(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
}

function wordCount(body) {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_[\]()`.-]/g, ' ')
    .match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g);
  return words?.length || 0;
}

function listContentFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listContentFiles(path);
    if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) return [path];
    return [];
  });
}

function loadRegistry() {
  if (!existsSync(registryPath)) return new Map();
  const registry = readFileSync(registryPath, 'utf8');
  return new Map(
    [...registry.matchAll(/['"]([a-z0-9][a-z0-9-]*)['"]\s*:\s*\[([\s\S]*?)\]/g)].map((match) => {
      const keywords = [...match[2].matchAll(/['"]([^'"]+)['"]/g)].map((keywordMatch) =>
        keywordMatch[1].trim(),
      );
      return [match[1], keywords];
    }),
  );
}

function dailyReportFor(date) {
  if (!date) return '';
  return join(root, 'docs', 'seo-daily-reports', `${date}.md`);
}

function relativePath(path) {
  return relative(root, path).replace(/\\/g, '/');
}

function auditFile(file, registry) {
  const source = readFileSync(file, 'utf8');
  const frontmatter = parseFrontmatter(source);
  const body = getBody(source);
  const slug = basename(file).replace(/\.(md|mdx)$/, '');
  const isBlog = relativePath(file).startsWith('src/content/blog/');
  const failures = [];
  const warnings = [];
  const passes = [];
  const targetKeyword = frontmatter.targetKeyword || '';
  const firstParagraph = getFirstParagraph(body);
  const finalSection = body.slice(-700);
  const h2s = getH2s(body);
  const words = wordCount(body);
  const registeredKeywords = registry.get(slug) || [];
  const searchableText = `${frontmatter.title || ''}\n${frontmatter.description || ''}\n${body}`;

  for (const field of requiredFields) {
    if (
      frontmatter[field] === undefined ||
      frontmatter[field] === '' ||
      (Array.isArray(frontmatter[field]) && frontmatter[field].length === 0)
    ) {
      failures.push(`missing frontmatter field: ${field}`);
    }
  }

  if (isBlog) {
    for (const field of blogImageFields) {
      if (!frontmatter[field]) failures.push(`missing blog image field: ${field}`);
    }
    if (frontmatter.ogImage) {
      if (/\.svg(\?|$)/i.test(frontmatter.ogImage)) {
        failures.push('ogImage uses SVG placeholder instead of generated raster image');
      }
      const imagePath = join(root, 'public', frontmatter.ogImage.replace(/^\//, ''));
      if (!existsSync(imagePath)) failures.push(`ogImage file not found: ${frontmatter.ogImage}`);
    }
  }

  if (!registry.has(slug)) {
    failures.push('missing keyword registry entry in scripts/article_keywords_data.py');
  } else if (registeredKeywords.length < 5 || registeredKeywords.length > 15) {
    failures.push(`keyword registry should have 5-15 keywords, found ${registeredKeywords.length}`);
  } else {
    passes.push(`${registeredKeywords.length} registered keywords`);
  }

  if (targetKeyword) {
    const placements = [
      ['title', frontmatter.title],
      ['meta description', frontmatter.description],
      ['first paragraph', firstParagraph],
      ['final section', finalSection],
    ];
    for (const [label, value] of placements) {
      if (!includesKeyword(value, targetKeyword)) {
        failures.push(`${label} does not include targetKeyword "${targetKeyword}"`);
      }
    }
  }

  if (frontmatter.title && frontmatter.title.length > 70) {
    warnings.push(`title is ${frontmatter.title.length} characters; keep near 70 or below`);
  }
  if (frontmatter.description && frontmatter.description.length > 160) {
    warnings.push(`description is ${frontmatter.description.length} characters; keep near 160 or below`);
  }
  if (frontmatter.noindex !== 'false') {
    failures.push('noindex must be false for published SEO articles');
  }
  if (words < 900) {
    warnings.push(`article is ${words} words; consider expanding if search intent is competitive`);
  }
  if (h2s.length < 4) {
    warnings.push(`only ${h2s.length} H2 sections; long-tail coverage may be thin`);
  }

  const secondaryKeywords = Array.isArray(frontmatter.secondaryKeywords) ? frontmatter.secondaryKeywords : [];
  const h2KeywordMatches = h2s.filter((h2) =>
    secondaryKeywords.some((keyword) => includesKeyword(h2, keyword)),
  );
  if (secondaryKeywords.length >= 5 && h2KeywordMatches.length < 3) {
    warnings.push('fewer than 3 H2s include planned long-tail secondary keywords');
  }

  const naturalKeywordMentions = registeredKeywords.filter((keyword) => includesKeyword(searchableText, keyword));
  if (registeredKeywords.length >= 5 && naturalKeywordMentions.length < 5) {
    warnings.push(
      `only ${naturalKeywordMentions.length} registered/internal-link keywords appear naturally in the article`,
    );
  }

  const reportPathForDate = dailyReportFor(frontmatter.publishDate);
  if (frontmatter.publishDate && existsSync(reportPathForDate)) {
    const report = readFileSync(reportPathForDate, 'utf8');
    if (!report.includes(slug)) {
      warnings.push(`daily report exists for ${frontmatter.publishDate}, but does not mention this slug`);
    }
  } else if (frontmatter.publishDate) {
    warnings.push(`missing daily SEO report for ${frontmatter.publishDate}`);
  }

  if (failures.length === 0 && warnings.length === 0) {
    passes.push('ready for publishing');
  }

  return {
    slug,
    file: relativePath(file),
    title: frontmatter.title || slug,
    category: frontmatter.category || 'Uncategorized',
    publishDate: frontmatter.publishDate || 'unknown',
    words,
    failures,
    warnings,
    passes,
  };
}

function statusFor(result) {
  if (result.failures.length) return 'FAIL';
  if (result.warnings.length) return 'WARN';
  return 'PASS';
}

function renderReport(results) {
  const generatedAt = new Date().toISOString();
  const passCount = results.filter((result) => statusFor(result) === 'PASS').length;
  const warnCount = results.filter((result) => statusFor(result) === 'WARN').length;
  const failCount = results.filter((result) => statusFor(result) === 'FAIL').length;
  const byCategory = new Map();

  for (const result of results) {
    byCategory.set(result.category, (byCategory.get(result.category) || 0) + 1);
  }

  const lines = [
    '# InterviewCue Article Audit',
    '',
    `Generated at: ${generatedAt}`,
    '',
    '## Summary',
    '',
    `- Total articles/guides: ${results.length}`,
    `- PASS: ${passCount}`,
    `- WARN: ${warnCount}`,
    `- FAIL: ${failCount}`,
    '',
    '## Topic Counts',
    '',
    '| Topic | Articles |',
    '| --- | ---: |',
    ...[...byCategory.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, count]) => `| ${category} | ${count} |`),
    '',
    '## Article Results',
    '',
    '| Status | Article | Topic | Date | Words | Main issues |',
    '| --- | --- | --- | --- | ---: | --- |',
    ...results
      .sort((a, b) => b.publishDate.localeCompare(a.publishDate) || a.slug.localeCompare(b.slug))
      .map((result) => {
        const status = statusFor(result);
        const issues = [...result.failures, ...result.warnings].slice(0, 3).join('<br>');
        return `| ${status} | \`${result.slug}\` | ${result.category} | ${result.publishDate} | ${result.words} | ${issues || 'Ready'} |`;
      }),
  ];

  const failed = results.filter((result) => result.failures.length);
  const warned = results.filter((result) => !result.failures.length && result.warnings.length);

  if (failed.length) {
    lines.push('', '## Failures To Fix', '');
    for (const result of failed) {
      lines.push(`### ${result.slug}`, '', `File: \`${result.file}\``, '');
      for (const failure of result.failures) lines.push(`- ${failure}`);
      if (result.warnings.length) {
        lines.push('');
        for (const warning of result.warnings) lines.push(`- Warning: ${warning}`);
      }
      lines.push('');
    }
  }

  if (warned.length) {
    lines.push('', '## Warnings To Review', '');
    for (const result of warned) {
      lines.push(`### ${result.slug}`, '', `File: \`${result.file}\``, '');
      for (const warning of result.warnings) lines.push(`- ${warning}`);
      lines.push('');
    }
  }

  return `${lines.join('\n')}\n`;
}

const registry = loadRegistry();
const files = contentDirs.flatMap(listContentFiles);
const results = files.map((file) => auditFile(file, registry));
const report = renderReport(results);
const failures = results.filter((result) => result.failures.length);

if (shouldWrite) {
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, report);
  console.log(`Article audit written to ${relativePath(reportPath)}`);
} else {
  console.log(report);
}

if (failures.length) {
  process.exitCode = 1;
}
