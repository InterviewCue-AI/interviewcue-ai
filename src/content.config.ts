import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('InterviewCue Team'),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
  imageAlt: z.string().optional(),
  imagePrompt: z.string().optional(),
  noindex: z.boolean().default(false),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: contentSchema,
  }),
  guides: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
    schema: contentSchema,
  }),
};
