from flask import Blueprint, request, jsonify, render_template
import random

# Thay đổi 'bp' thành 'rsi_bp' để khớp với cách bạn nhập nó trong __init__.py
rsi_bp = Blueprint('rsi', __name__)

@rsi_bp.route('/rsi') # Sử dụng rsi_bp
def rsi():
    pair = request.args.get('pair')
    return jsonify({"pair": pair, "rsi": random.randint(0, 100)})

@rsi_bp.route('/multirsi') # Sử dụng rsi_bp
def multirsi():
    return render_template('multi_rsi.html')