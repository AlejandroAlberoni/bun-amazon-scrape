import './style.css'
import LoaderCircle from '/loader-circle.svg'


const API_URL = "http://localhost:3000";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `

  <div style="display: flex; flex-direction: column; align-items: center;">
    <h1>Amazon Scraper</h1>
    <div style="display: flex; gap: 0.5rem;">
      <input id="search-input" type="text" placeholder="Buscar produto..." style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;" />
      <button id="search-btn" style="padding: 0.5rem 1rem; border-radius: 4px; background: #646cff; color: white; border: none; cursor: pointer;">Scrape</button>
    </div>
    <div id="search-result"></div>
  </div>
`


// Search bar logic
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement | null;
const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
const searchResult = document.getElementById('search-result');

if (searchBtn && searchInput && searchResult) {
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
      searchResult.textContent = 'Digite algo para buscar.';
      return;
    }

    // Loader
    searchResult.innerHTML = `<img src="${LoaderCircle}" alt="Carregando..." class="loader-spin" style="width:32px; height:32px;" /> Buscando...`;
// Loader animation
const style = document.createElement('style');
style.textContent = `
.loader-spin {
  animation: loader-spin 1s linear infinite;
}
@keyframes loader-spin {
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

    try {
      const url = `${API_URL}/api/scrape?keyword=${query}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erro ao buscar dados');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        searchResult.innerHTML = `
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
            ${data.map((item: any) => `
              <div style="border: 1px solid #eee; border-radius: 8px; padding: 1rem; width: 220px; background: #fafaff; box-shadow: 0 2px 8px #0001; display: flex; flex-direction: column; align-items: center;margin-top: 10px;">
                <img src="${item.image || ''}" alt="${item.title || ''}" style="width: 120px; height: 120px; object-fit: contain; margin-bottom: 0.5rem; background: #fff; border-radius: 4px;" />
                <div style="color: #333;font-weight: bold; margin-bottom: 0.5rem; text-align: center;">${item.title || 'Sem título'}</div>
                <div style="color: #888; font-size: 0.95em;">Rating: <b>${item.rating || '-'}</b></div>
                <div style="color: #888; font-size: 0.95em;">Reviews: <b>${item.reviews || '-'}</b></div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        searchResult.textContent = 'Nenhum resultado encontrado.';
      }
    } catch (err: any) {
      searchResult.textContent = 'Erro ao buscar dados: ' + (err.message || err);
    }
  });
}
