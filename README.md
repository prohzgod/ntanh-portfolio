# Nguyen Tuan Anh Portfolio

Astro portfolio site with React islands, Framer Motion interactions, Tailwind CSS, and Keystatic-powered blog content.

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Structure

- `src/pages/index.astro` renders the React portfolio island with `client:load`.
- `src/components/Portfolio.tsx` contains the existing interactive UI.
- `src/content/blog` stores Markdoc blog posts.
- `keystatic.config.ts` defines the local Keystatic CMS schema.

Run the dev server and open `/keystatic` to manage blog posts locally. The CMS is not mounted in production, so deployed builds do not need GitHub OAuth or `KEYSTATIC_*` environment variables.
