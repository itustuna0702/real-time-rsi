$(document).ready(function() {
    $('#watchlist-table').DataTable({
        ajax: '/watchlist',
        columns: [
            { data: 'name' },
            { data: 'price' },
            { data: 'rsi' },
            {
                data: null,
                render: (data) => `<button onclick="removeToken('${data.id}')">Remove</button>`
            }
        ]
    });
});

async function addToWatchlist(pair) {
    await fetch('/watchlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pair })
    });
    $('#watchlist-table').DataTable().ajax.reload();
}

async function removeToken(tokenId) {
    await fetch(`/remove/${tokenId}`, { method: 'POST' });
    $('#watchlist-table').DataTable().ajax.reload();
}