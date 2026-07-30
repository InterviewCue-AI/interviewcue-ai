import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getDeployTarget } from '../config/deploy.mjs';

const targetName = process.argv[2] || 'dev';
const target = getDeployTarget(targetName);

if (targetName === 'prod' && target.siteUrl.includes('your-domain.com')) {
  throw new Error('Production siteUrl is still a placeholder. Update config/deploy.mjs before building prod.');
}

const env = {
  ...process.env,
  ASTRO_TELEMETRY_DISABLED: '1',
  PUBLIC_SITE_URL: target.siteUrl,
  PUBLIC_GA_MEASUREMENT_ID: target.gaMeasurementId,
  PUBLIC_APP_HOME_URL: target.appHomeUrl,
  PUBLIC_CTA_LABEL: target.ctaLabel,
  PUBLIC_CTA_HREF: target.ctaHref,
  PUBLIC_CTA_TRACKING_KEY: target.ctaTrackingKey,
};

console.log(`Building InterviewCue for ${targetName}: ${target.siteUrl}`);

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const command = path.join(rootDir, 'node_modules', 'astro', 'bin', 'astro.mjs');

if (!existsSync(command)) {
  throw new Error('Astro binary not found. Run npm install before building.');
}

const result = spawnSync(process.execPath, [command, 'build'], {
  stdio: 'inherit',
  env,
  cwd: rootDir,
});

if (result.error) {
  throw result.error;
}

if ((result.status ?? 1) === 0) {
  const distDir = path.join(rootDir, 'dist');
  const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
  const sitemapUrlset = path.join(distDir, 'sitemap-0.xml');
  const sitemapAlias = path.join(distDir, 'sitemap.xml');
  const lastmod = new Date().toISOString();
  const stylesheet = `<?xml-stylesheet type="text/xsl" href="${target.siteUrl}/sitemap.xsl"?>`;
  const withStylesheet = (xml) =>
    xml.includes('<?xml-stylesheet')
      ? xml
      : xml.replace(/(<\?xml[^>]*\?>)/, `$1${stylesheet}`);

  if (existsSync(sitemapUrlset)) {
    const urlset = withStylesheet(readFileSync(sitemapUrlset, 'utf8')).replace(
      /(<url><loc>[^<]+<\/loc>)(?!<lastmod>)/g,
      `$1<lastmod>${lastmod}</lastmod>`,
    );
    writeFileSync(sitemapUrlset, urlset);
    writeFileSync(sitemapAlias, urlset);
  }

  if (existsSync(sitemapIndex)) {
    const index = withStylesheet(readFileSync(sitemapIndex, 'utf8')).replace(
      /(<sitemap><loc>[^<]+<\/loc>)(?!<lastmod>)/g,
      `$1<lastmod>${lastmod}</lastmod>`,
    );
    writeFileSync(sitemapIndex, index);
  }
}

process.exit(result.status ?? 1);
