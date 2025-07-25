document.addEventListener('DOMContentLoaded', () => {
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchOverlayBtn = document.getElementById('closeSearchOverlay');
    const overlaySearchInput = document.getElementById('overlaySearchInput');
    const overlaySearchSuggestions = document.getElementById('overlaySearchSuggestions');
    const searchResultsDisplay = document.getElementById('searchResultsDisplay'); // For displaying actual results

    // Mock suggestions list (replace with real data from your backend/API)
    const suggestionsList = [
        'Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'Cardano (ADA)', 'Ripple (XRP)',
        'Dogecoin (DOGE)', 'Shiba Inu (SHIB)', 'Litecoin (LTC)', 'Chainlink (LINK)',
        'Uniswap (UNI)', 'Polkadot (DOT)', 'Avalanche (AVAX)', 'Cosmos (ATOM)',
        // Add more relevant crypto examples
    ];

    // Function to show/hide the overlay (it's already on the page, just needs to be visible)
    function showSearchOverlay() {
        searchOverlay.style.display = 'flex'; // Use 'flex' to center content
        overlaySearchInput.focus(); // Focus on the input field
        overlaySearchInput.value = ''; // Clear previous search
        overlaySearchSuggestions.innerHTML = ''; // Clear previous suggestions
    }

    // Function to hide the overlay
    function hideSearchOverlay() {
        searchOverlay.style.display = 'none';
    }

    // Since search.html is the dedicated page, the overlay should be visible by default
    // or triggered based on specific interaction. For simplicity, we'll make it visible
    // upon page load or you can manually trigger it.
    // As it's a "search page", it's reasonable to have the input visible and ready.

    // Automatically open the search overlay when the page loads
    showSearchOverlay();

    // Close search overlay button
    closeSearchOverlayBtn.addEventListener('click', hideSearchOverlay);

    // Close search overlay with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.style.display === 'flex') {
            hideSearchOverlay();
        }
    });

    // Handle search input within the overlay
    overlaySearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        overlaySearchSuggestions.innerHTML = ''; // Clear previous suggestions

        if (query) {
            const filteredSuggestions = suggestionsList.filter(item =>
                item.toLowerCase().includes(query)
            );

            if (filteredSuggestions.length > 0) {
                overlaySearchSuggestions.style.display = 'block';
                filteredSuggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.className = 'overlay-suggestion-item';
                    div.textContent = suggestion;
                    div.addEventListener('click', () => {
                        overlaySearchInput.value = suggestion;
                        overlaySearchSuggestions.style.display = 'none';
                        // You can choose to hide the overlay here or keep it open for more searches
                        // hideSearchOverlay(); // Uncomment to close overlay on selection

                        // TODO: Implement actual search and display results
                        console.log(`User selected: ${suggestion}. Now perform actual search.`);
                        searchResultsDisplay.innerHTML = `<h3>Results for "${suggestion}"</h3><p>Loading data...</p>`;
                        // Example of where you'd make an AJAX call to your backend
                        // fetch(`/api/search?q=${encodeURIComponent(suggestion)}`)
                        //     .then(response => response.json())
                        //     .then(data => {
                        //         // Update searchResultsDisplay with data
                        //     })
                        //     .catch(error => console.error('Search error:', error));
                    });
                    overlaySearchSuggestions.appendChild(div);
                });
            } else {
                overlaySearchSuggestions.style.display = 'none';
            }
        } else {
            overlaySearchSuggestions.innerHTML = ''; // Clear suggestions if query is empty
            overlaySearchSuggestions.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside the input/suggestions area
    document.addEventListener('click', (e) => {
        if (!overlaySearchInput.contains(e.target) && !overlaySearchSuggestions.contains(e.target)) {
            overlaySearchSuggestions.style.display = 'none';
        }
    });
});