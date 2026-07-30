import { site } from '../lib/site';

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    },
  );
}
