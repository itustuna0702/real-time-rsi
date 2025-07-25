from flask import Flask
from flask_socketio import SocketIO
from app.routes.main import main_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your-secret-key'  # Thêm khóa bí mật cho bảo mật
    app.config['DEBUG'] = True  # Bật chế độ debug để dễ phát hiện lỗi

    # Đăng ký blueprint
    app.register_blueprint(main_bp)

    # Khởi tạo SocketIO
    socketio = SocketIO(app, cors_allowed_origins="*")  # Cho phép CORS nếu cần

    return app, socketio