import { collection, config, fields } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'prohzgod/ntanh-portfolio',
      },
  ui: {
    brand: {
      name: 'Tuan Anh Portfolio',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog posts',
      path: 'src/content/blog/*',
      slugField: 'title',
      entryLayout: 'content',
      format: {
        contentField: 'content',
      },
      columns: ['title', 'publishedAt', 'draft'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            validation: { isRequired: true },
          },
          slug: {
            label: 'Slug',
          },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        publishedAt: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'mdoc',
        }),
      },
    }),
  },
});
