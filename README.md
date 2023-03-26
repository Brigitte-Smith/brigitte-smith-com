# brigitte-smith.com

This is the repository for the digital artwork and website of the artist Brigitte Smith. The site is built with [Next.js](https://nextjs.org/) and is hosted at [www.brigitte-smith.com](http://www.brigitte-smith.com).

## Content maintenance

All content and localized text is stored in the [content](https://github.com/Brigitte-Smith/brigitte-smith-com/tree/nextjs-refactor/content) directory of this repository.

### Textual content

Textual content is present in the form of markdown files. It consists of `frontmatter`, which are the values specified at the start of a `.md` file between the `---` dividers and the main content for the associated directory and webpage.

### Content localization

The site is localized for the German and English languages and any text, even if identical for both languages, should be added to both `en.md` and `de.md` files of each directory.

### Working with files

## Releasing changes

There are two main tasks that build and release the assets for the production website.

### Generate images

```bash
$ npm run transformImages
```

### Generate website

```bash
$ npm run transformContent
```

Then the generated content needs to be manually uploaded via FTP.

## Working locally

The development server is started with:

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Generate data from markdown

```bash
$ node ./lib/createDataFile.mjs
```

```bash
$ node ./lib/createLocaleFiles.mjs
```

## Content with markdown

https://commonmark.org/
https://commonmark.org/help/
https://spec.commonmark.org/
