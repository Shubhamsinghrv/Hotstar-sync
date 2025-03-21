import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Use default threading async_mode (no eventlet or gevent)
socketio = SocketIO(app, cors_allowed_origins="*")

video_state = {
    "timestamp": 0,
    "is_playing": False
}

@app.route("/")
def home():
    return "✅ Server is running!", 200

@socketio.on("connect")
def handle_connect():
    print("🔵 A user connected")
    emit("sync", video_state)

@socketio.on("update")
def handle_update(data):
    global video_state
    video_state = data
    print(f"🔄 Syncing video: {video_state}")
    socketio.emit("sync", video_state, to=None)

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    print(f"🚀 Flask-SocketIO Server Running on port {PORT}")
    socketio.run(app, host="0.0.0.0", port=PORT, debug=True, allow_unsafe_werkzeug=True)

