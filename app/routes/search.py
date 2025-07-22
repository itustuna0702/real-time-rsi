from flask import Blueprint, request, jsonify
import requests
import json
import re

bp = Blueprint('search', __name__)

@bp.route('/search')
def search():
    q = request.args.get('q', '').strip().upper()  # Chuẩn hóa query thành chữ hoa
    print(f"🔍 Truy vấn nhận được: {q}")  # In ra để debug

    if not q:
        return jsonify(results=[])

    # Gửi yêu cầu đến TradingView Symbol Search API
    url = "https://symbol-search.tradingview.com/symbol_search/v3/"
    params = {
        "text": q,  # Tìm kiếm với token từ query
        "hl": "1",
        "exchange": "AMEX,BSE,CBOE,NASDAQ,NSE,NYSE",
        "lang": "vi",  # Ngôn ngữ
        "only_has_options": "true",  # Chỉ những cặp có quyền chọn (tuỳ chọn)
        "domain": "production",
        "sort_by_country": "VN",
        "promo": "true"
    }

    # Headers của TradingView API
    headers = {
        "authority": "symbol-search.tradingview.com",
        "accept": "*/*",
        "accept-language": "vi,en-US;q=0.9,en;q=0.8",
        "dnt": "1",
        "origin": "https://vn.tradingview.com",
        "referer": "https://vn.tradingview.com/",
        "sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0"
    }

    try:
        # Gửi yêu cầu GET đến TradingView API
        res = requests.get(url, headers=headers, params=params)

        # Kiểm tra mã trạng thái HTTP
        print(f"Status Code: {res.status_code}")

        if res.status_code == 200:
            data = res.json()
            print("Data received:")
            print(json.dumps(data, indent=4))  # In dữ liệu với định dạng đẹp

            # Lọc và trả về các symbol tìm được
            results = []
            for item in data.get('symbols', []):
                symbol = item.get("symbol", "")
                description = item.get("description", "")
                exchange = item.get("exchange", "")

                # Loại bỏ các thẻ HTML trong symbol và description
                symbol = re.sub(r'<.*?>', '', symbol)  # Loại bỏ thẻ HTML trong symbol
                description = re.sub(r'<.*?>', '', description)  # Loại bỏ thẻ HTML trong description

                if ":" not in symbol or "/" not in symbol:
                    continue  # Bỏ qua những symbol không hợp lệ

                # Tách tokenA và tokenB từ symbol
                try:
                    tokenA, tokenB = symbol.split(":")[1].split("/")
                    # Tạo cấu trúc kết quả theo yêu cầu: TokenA/TokenB Tên sàn
                    results.append({
                        "token_pair": f"{tokenA}/{tokenB}",
                        "description": description,
                        "exchange": exchange,
                    })
                except Exception as e:
                    print(f"⚠️ Lỗi khi tách symbol: {symbol} - {e}")
                    continue  # Bỏ qua nếu có lỗi trong việc tách symbol
            return jsonify(results=results)
        else:
            print("Lỗi khi gọi TradingView API:", res.status_code)
            return jsonify(results=[])

    except Exception as e:
        print(f"⚠️ Lỗi khi gọi TradingView API: {e}")
        return jsonify(results=[])
