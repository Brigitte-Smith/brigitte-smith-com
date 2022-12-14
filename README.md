This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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

## Site Structure

/en
/en/home
/en/contact
/en/imprint
/en/person
/en/person/biography
/en/person/exhibitions
/en/person/press
/en/person/press/[press_item]
/en/work
/en/work/[work_category]
/en/work/[work_category]/page/[page_number]
/en/work/[work_category]/[artwork]

/de
/de/home
/de/kontakt
/de/impressum
/de/person
/de/person/lebenslauf
/de/person/austellungen
/de/person/presse
/de/person/presse/[press_item]
/de/arbeit
/de/arbeit/[work_category]
/de/arbeit/[work_category]/seite/[page_number]
/de/arbeit/[work_category]/[artwork]
