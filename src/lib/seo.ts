import { site } from './site';

export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return new URL(path, site.url).toString();
}

export function buildTitle(title?: string) {
  if (!title) return site.defaultTitle;
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: absoluteUrl('/favicon.svg'),
    email: site.contact.email,
    contactPoint: {
      '@type': 'ContactPoint',
      email: site.contact.email,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    publisher: {
      '@id': `${site.url}/#organization`,
    },
    inLanguage: 'en',
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${site.url}/#software`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'AI interview coach for software careers',
    operatingSystem: 'Web',
    description: site.description,
    publisher: {
      '@id': `${site.url}/#organization`,
    },
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
