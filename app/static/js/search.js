document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("search-input");
    const suggestions = document.getElementById("suggestions");
    let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

    async function fetchSuggestions(query) {
        const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        return data.results || [];
    }

    input.addEventListener("input", async () => {
        const query = input.value.trim();
        if (query.length < 2) {
            suggestions.innerHTML = "";
            suggestions.classList.add("hidden");
            return;
        }

        const results = await fetchSuggestions(query);

        suggestions.innerHTML = "";
        results.forEach(item => {
            const isStarred = watchlist.includes(item.symbol);
            const li = document.createElement("li");
            li.className = "flex items-center justify-between px-4 py-2 hover:bg-yellow-50 cursor-pointer";

            li.innerHTML = `
                <div class="flex items-center space-x-2">
                    <img src="https://cryptoicons.org/api/icon/${item.base.toLowerCase()}/32" alt="${item.base}" class="w-6 h-6" />
                    <div>
                        <div class="text-yellow-600 font-medium">${item.symbol}</div>
                        <div class="text-xs text-gray-500">${item.description || ''}</div>
                    </div>
                </div>
                <div class="text-xl star ${isStarred ? 'text-yellow-500' : 'text-gray-400'}" data-symbol="${item.symbol}">⭐</div>
            `;

            // Click biểu tượng sao
            li.querySelector(".star").addEventListener("click", (e) => {
                e.stopPropagation();
                const sym = e.target.getAttribute("data-symbol");
                if (watchlist.includes(sym)) {
                    watchlist = watchlist.filter(s => s !== sym);
                } else {
                    watchlist.push(sym);
                }
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                e.target.classList.toggle("text-yellow-500");
                e.target.classList.toggle("text-gray-400");
            });

            // Click vào gợi ý → chuyển route
            li.addEventListener("click", () => {
                const [tokenA, tokenB] = item.symbol.split(":")[1].split("/");
                window.location.href = `/chart/${tokenA}/${tokenB}`;
            });

            suggestions.appendChild(li);
        });

        suggestions.classList.remove("hidden");
    });

    // Tự ẩn khi click ra ngoài
    document.addEventListener("click", function (e) {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.add("hidden");
        }
    });
});
