import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const contentRoots = ['src/content/blog', 'src/content/guides'];
const requiredFields = ['title', 'description', 'publishDate', 'category', 'targetKeyword'];

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(path);
      if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) return [path];
      return [];
    }),
  );
  return files.flat();
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2].replace(/^"|"$/g, '')]),
  );
}

function getBody(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

function normalize(value = '') {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function includesKeyword(value, keyword) {
  return normalize(value).includes(normalize(keyword));
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

const errors = [];

for (const root of contentRoots) {
  const files = await listMarkdownFiles(root);
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const frontmatter = parseFrontmatter(source);
    const body = getBody(source);
    for (const field of requiredFields) {
      if (!frontmatter[field]) errors.push(`${file}: missing ${field}`);
    }
    if (frontmatter.title && frontmatter.title.length > 70) {
      errors.push(`${file}: title is longer than 70 characters`);
    }
    if (frontmatter.description && frontmatter.description.length > 160) {
      errors.push(`${file}: description is longer than 160 characters`);
    }
    if (frontmatter.targetKeyword) {
      const firstParagraph = getFirstParagraph(body);
      const finalSection = body.slice(-700);

      if (!includesKeyword(frontmatter.title, frontmatter.targetKeyword)) {
        errors.push(`${file}: title must include targetKeyword "${frontmatter.targetKeyword}"`);
      }
      if (!includesKeyword(frontmatter.description, frontmatter.targetKeyword)) {
        errors.push(`${file}: description must include targetKeyword "${frontmatter.targetKeyword}"`);
      }
      if (!includesKeyword(firstParagraph, frontmatter.targetKeyword)) {
        errors.push(`${file}: first paragraph must include targetKeyword "${frontmatter.targetKeyword}"`);
      }
      if (!includesKeyword(finalSection, frontmatter.targetKeyword)) {
        errors.push(`${file}: final section must include targetKeyword "${frontmatter.targetKeyword}"`);
      }
    }
    if (file.includes('src\\content\\blog') || file.includes('src/content/blog')) {
      for (const field of ['ogImage', 'imageAlt', 'imagePrompt']) {
        if (!frontmatter[field]) errors.push(`${file}: missing ${field}`);
      }
      if (frontmatter.ogImage) {
        if (/\.svg(\?|$)/i.test(frontmatter.ogImage)) {
          errors.push(`${file}: ogImage must be a generated raster image, not an SVG placeholder`);
        }
        const imagePath = join(process.cwd(), 'public', frontmatter.ogImage.replace(/^\//, ''));
        try {
          await access(imagePath);
        } catch {
          errors.push(`${file}: ogImage file does not exist at ${frontmatter.ogImage}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Content metadata looks good.');
