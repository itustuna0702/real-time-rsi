# app/__init__.py
from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key' # Change this!

    # Register blueprints
    from .routes.main import main_bp
    app.register_blueprint(main_bp)

    from .routes.search import search_bp # Import and register the new search_bp
    app.register_blueprint(search_bp)

    from .routes.watchlist import watchlist_bp
    app.register_blueprint(watchlist_bp)

    from .routes.rsi import rsi_bp
    app.register_blueprint(rsi_bp)

    socketio.init_app(app)
    return app