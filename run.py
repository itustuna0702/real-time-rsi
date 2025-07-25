from app import create_app, socketio

app = create_app()

# Khởi tạo SocketIO cho các route
from app.routes.main import init_socketio
init_socketio(socketio)

if __name__ == '__main__':
    socketio.run(app, debug=True)