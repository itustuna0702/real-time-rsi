function openSearchModal() {
  document.getElementById('searchModal').classList.remove('hidden');
  document.getElementById('tokenSearchInput').focus();
}

function closeSearchModal() {
  document.getElementById('searchModal').classList.add('hidden');
}

function goToChart(tokenA, tokenB) {
  window.location.href = `/chart/${tokenA}/${tokenB}`;
}

function getWatchlist() {
  return JSON.parse(localStorage.getItem('watchlist') || '[]');
}

function toggleWatchlist(tokenA, tokenB) {
  const key = `${tokenA}_${tokenB}`;
  let list = getWatchlist();
  if (list.includes(key)) {
    list = list.filter(item => item !== key);
  } else {
    list.push(key);
  }
  localStorage.setItem('watchlist', JSON.stringify(list));
  handleSearchInput(); // refresh list
}

async function handleSearchInput() {
  const query = document.getElementById('tokenSearchInput').value.trim();
  const container = document.getElementById('searchSuggestions');
  container.innerHTML = '';
  if (!query) return;

  const res = await fetch(`/api/search-token?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  const results = data.results || [];
  const watchlist = getWatchlist();

  results.forEach(pair => {
    const key = `${pair.tokenA}_${pair.tokenB}`;
    const isSaved = watchlist.includes(key);

    const div = document.createElement('div');
    div.className = "flex items-center justify-between py-3 px-2 hover:bg-[#2a2a2a] cursor-pointer";

    div.innerHTML = `
      <div class="flex items-center gap-3" onclick="goToChart('${pair.tokenA}','${pair.tokenB}')">
        <img src="${pair.logoA}" class="w-6 h-6 rounded-full" />
        <img src="${pair.logoB}" class="w-6 h-6 rounded-full -ml-2 border-2 border-[#1e1e1e]" />
        <div>
          <div class="font-semibold">${pair.tokenA}/${pair.tokenB} <span class="text-xs text-gray-400">(${pair.chain})</span></div>
          <div class="text-xs text-gray-400">${pair.dex}</div>
        </div>
      </div>
      <button onclick="event.stopPropagation(); toggleWatchlist('${pair.tokenA}','${pair.tokenB}')">
        <i class="fas fa-star ${isSaved ? 'text-yellow-400' : 'text-gray-500'} text-xl"></i>
      </button>
    `;
    container.appendChild(div);
  });
}
