## Test Project Repository

This is a full stack project for a trainee test.

### Frontend:
The frontend is made to search and view for the amazon products. It will make a AJAX to the backend. **IMPORTANT: PLEASE NOTE THAT ITS USES LOCALHOST ENDPOINT**

- you can install deps using `bun install` or `npm install`
- you can run using `npx vite`

### Backend:
The backend scrapes amazon products and it was made with [Bun](https://bun.sh/). The route in **/api/scrape** takes a **keyword** query string, which will be the product we wanna scrape, we parse with JSDOM the Axios html fetched. The dependencies are: Axios, Express and JSDOM.

- you can install deps using `bun install` or `npm install`
- you can run the backend using `bun run .\index.ts`