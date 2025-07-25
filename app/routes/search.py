from flask import Blueprint, request, jsonify, render_template
import requests

search_bp = Blueprint('search', __name__)

@search_bp.route('/search')
def search_page():
    return render_template('search.html')


@search_bp.route('/api/search-token')
def api_search_token():
    query = request.args.get('q', '').strip()
    if not query:
        return jsonify(results=[])

    try:
        res = requests.get(f"https://api.dexscreener.com/latest/dex/search?q={query}", timeout=5)
        res.raise_for_status()
        pairs = res.json().get("pairs", [])
    except Exception as e:
        print("Dexscreener error:", e)
        return jsonify(results=[])

    results = []
    for p in pairs[:15]:
        base = p.get("baseToken", {})
        quote = p.get("quoteToken", {})
        results.append({
            "tokenA": base.get("symbol", ""),
            "tokenB": quote.get("symbol", ""),
            "chain": p.get("chainId", ""),
            "dex": p.get("dexId", ""),
            "logoA": base.get("logoURI", ""),
            "logoB": quote.get("logoURI", "")
        })
    return jsonify(results=results)
