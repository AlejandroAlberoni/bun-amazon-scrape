# bun-amazon-scrape

This is a backend to scrape amazon products. The route in **/api/scrape** takes a **keyword** query string, which will be the product we wanna scrape, we parse with JSDOM the Axios html fetched. The dependencies are: Axios, Express and JSDOM.
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

