
<img width="1900" height="996" alt="AmazonScraper" src="https://github.com/user-attachments/assets/8dc2022a-c4cb-401d-b06b-5aa490472623" />

## Test Project Repository

This is a full stack project for a trainee test. There are two main folders, in which you have to run each one to use the functionality.

### Frontend:
The frontend is made to search and view for the amazon products. It will make a AJAX to the backend. **IMPORTANT: PLEASE NOTE THAT ITS USES LOCALHOST ENDPOINT**

- you can navigative to the frontend folder with, e.g.: `cd frontend`
- you can install deps using `bun install` or `npm install`
- you can run using `npx vite`

### Backend:
The backend scrapes amazon products and it was made with [Bun](https://bun.sh/). The route in **/api/scrape** takes a **keyword** query string, which will be the product we wanna scrape, we parse with JSDOM the Axios html fetched. The dependencies are: Axios, Express and JSDOM.

- you can navigative to the backend folder with, e.g.: `cd backend`
- you can install deps using `bun install` or `npm install`
- you can run the backend using `bun run .\index.ts`
