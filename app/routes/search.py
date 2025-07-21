from flask import Blueprint, request, jsonify
import requests

bp = Blueprint('search', __name__)

@bp.route('/search')
def search():
    q = request.args.get('q', '').upper()
    if not q:
        return jsonify(results=[])
    
    try:
        # Gọi TradingView symbol search API
        res = requests.get("https://symbol-search.tradingview.com/symbol_search/", params={
            "query": q,
            "type": "crypto",
            "lang": "en"
        })
        data = res.json()

        # Lọc kết quả liên quan đến crypto (vd: BINANCE:DOGE/USDT)
        filtered = []
        for item in data:
            if item.get("symbol", "").count("/") == 1 and "BINANCE" in item.get("symbol", ""):
                symbol = item["symbol"]  # BINANCE:DOGE/USDT
                full_name = item.get("full_name", "")
                description = item.get("description", "")
                exchange = item.get("exchange", "BINANCE")
                base, quote = symbol.split(":")[1].split("/")
                filtered.append({
                    "symbol": symbol,
                    "base": base,
                    "quote": quote,
                    "description": description,
                    "exchange": exchange
                })
        
        return jsonify(results=filtered)
    
    except Exception as e:
        return jsonify(results=[], error=str(e))

