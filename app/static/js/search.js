document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById("search-input");
    const resultsTable = document.getElementById("results-table");
    let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

    // Hàm tìm kiếm và gọi API
    async function fetchSuggestions(query) {
        const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
        // const data = await res.json();
        console.log("Data from API:", res);  // Debug để kiểm tra dữ liệu
        return data.results || [];
    }

    input.addEventListener("input", async () => {
        const query = input.value.trim();
        if (query.length < 2) {
            resultsTable.innerHTML = "";
            return;
        }

        const results = await fetchSuggestions(query);
        resultsTable.innerHTML = ""; // Reset bảng kết quả

        if (results.length === 0) {
            resultsTable.innerHTML = "<tr><td colspan='4' class='px-4 py-2 text-center text-gray-500'>No results found</td></tr>";
            return;
        }

        // Lặp qua kết quả và thêm vào bảng
        results.forEach(item => {
            const isStarred = watchlist.includes(item.symbol);
            const tr = document.createElement("tr");

            tr.className = "hover:bg-yellow-50 cursor-pointer";

            tr.innerHTML = `
                <td class="px-4 py-2 border border-gray-300">${item.symbol}</td>
                <td class="px-4 py-2 border border-gray-300">${item.description || 'N/A'}</td>
                <td class="px-4 py-2 border border-gray-300">${item.exchange || 'N/A'}</td>
                <td class="px-4 py-2 border border-gray-300">
                    <button class="star-btn text-xl ${isStarred ? 'text-yellow-500' : 'text-gray-400'}" data-symbol="${item.symbol}">⭐</button>
                </td>
            `;

            // Click vào biểu tượng sao
            tr.querySelector(".star-btn").addEventListener("click", (e) => {
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
            tr.addEventListener("click", () => {
                const [tokenA, tokenB] = item.symbol.split(":")[1].split("/");
                window.location.href = `/chart/${tokenA}/${tokenB}`;
            });

            resultsTable.appendChild(tr);
        });
    });
});
