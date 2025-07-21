document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');

    const mockSuggestions = [
        'Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'Cardano (ADA)',
        'XRP (XRP)', 'Dogecoin (DOGE)', 'Shiba Inu (SHIB)', 'Litecoin (LTC)',
        'Chainlink (LINK)', 'Polkadot (DOT)', 'Avalanche (AVAX)', 'Uniswap (UNI)',
        'Binance Coin (BNB)', 'Tron (TRX)', 'Cosmos (ATOM)', 'Polygon (MATIC)',
        // Add more relevant crypto examples
    ];

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            searchDropdown.innerHTML = ''; // Clear previous suggestions

            if (query.length > 0) {
                const filteredSuggestions = mockSuggestions.filter(item =>
                    item.toLowerCase().includes(query)
                ).slice(0, 10); // Limit to top 10 suggestions

                if (filteredSuggestions.length > 0) {
                    filteredSuggestions.forEach(suggestion => {
                        const div = document.createElement('div');
                        div.classList.add('search-dropdown-item');
                        div.textContent = suggestion;
                        div.addEventListener('click', () => {
                            searchInput.value = suggestion;
                            searchDropdown.style.display = 'none';
                            // Here you can trigger a search action, e.g., redirect to a token page
                            console.log(`Searching for: ${suggestion}`);
                            // Example: window.location.href = `/token/${encodeURIComponent(suggestion.split('(')[0].trim())}`;
                        });
                        searchDropdown.appendChild(div);
                    });
                    searchDropdown.style.display = 'block';
                } else {
                    searchDropdown.style.display = 'none';
                }
            } else {
                searchDropdown.style.display = 'none';
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
                searchDropdown.style.display = 'none';
            }
        });

        // Optional: Handle keyboard navigation in dropdown
        // (More advanced feature, omitted for brevity but recommended for production)
    }
});