import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';

const AMAZON_URL = "https://www.amazon.com/s?k=";
const app = express();
const PORT = 3000;

app.use(cors());

// THIS IS THE FETCHER FUNCTION THAT USES AXIOS WITH HEADERS TO EMULATE BROWSER REQUESTS
async function fetchUrl(url: string) {
  try {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://www.amazon.com/',
            'Connection': 'keep-alive',
        }   
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a URL:', error);
    return null;
  }
}

// THIS IS THE API ROUTE, RECEIVES A QUERY STRING KEYWORD AND RETURNS A LIST OF PRODUCTS 
app.get('/api/scrape', (req, res) => {
    const keyword = req.query.keyword as string;
    if (!keyword) {
        return res.status(400).send('Keyword is required');
    }
    // HERE WILL FETCH USING AXIOS, AND PARSE WITH JSDOM, SEARCHING FOR TITLE, REVIEW, RATING, IMAGE
    fetchUrl(`${AMAZON_URL}${keyword}`)
      .then(async (html) => {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const products: any[] = [];
        const items = document.querySelectorAll('div.s-main-slot div[data-component-type="s-search-result"]');
        items.forEach(item => {
          const title = item.querySelector('h2 span')?.textContent?.trim() || null;
          const rating = item.querySelector('span.a-icon-alt')?.textContent?.split(' ')[0] || null;
          const reviews = item
            .querySelector('[data-cy="reviews-block"] span.a-size-base.s-underline-text')
            ?.textContent
            ?.replace(/,/g, '')
            .trim() || null;
          const image = item.querySelector('img.s-image')?.getAttribute('src') || null;
          products.push({ title, rating, reviews, image });
        });
        res.json(products);
      })
      .catch(() => {
        res.status(500).send('Erro ao buscar ou processar a página');
      });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
