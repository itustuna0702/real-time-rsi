from flask import Blueprint, request, jsonify, render_template

# Thay đổi 'bp' thành 'watchlist_bp' để khớp với cách bạn nhập nó trong __init__.py
watchlist_bp = Blueprint('watchlist', __name__)
watchlist_data = []

@watchlist_bp.route('/watchlist/add', methods=['POST']) # Sử dụng watchlist_bp
def add():
    data = request.json
    watchlist_data.append(data['pair'])
    return jsonify(success=True)

@watchlist_bp.route('/watchlist/data') # Sử dụng watchlist_bp
def get_watchlist_data():
    return jsonify(watchlist_data)

@watchlist_bp.route('/watchlist') # Sử dụng watchlist_bp
def watchlist():
    return render_template('watchlist.html')