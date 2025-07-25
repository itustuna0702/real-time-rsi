from flask import Blueprint, render_template

# Dòng này cần được xóa bỏ vì bạn đang định nghĩa main_bp ở đây
# from app.routes.main import main_bp

main_bp = Blueprint('main', __name__)
# Thêm tuyến đường cho /
@main_bp.route('/')
def index():
    return render_template('index.html')  # Giả sử bạn có tệp index.html
    # Hoặc trả về một chuỗi đơn giản để kiểm tra:
    # return "Welcome to Real-Time RSI App!"

# Hàm xử lý sự kiện SocketIO
def init_socketio(socketio):
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')


@bp.route('/watchlist')
def watchlist():
    return render_template('watchlist.html')

@bp.route("/multi_rsi")
def show_multi_rsi():
    return render_template("multi_rsi.html")

