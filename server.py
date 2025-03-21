import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from gevent import monkey

monkey.patch_all()  # ✅ Required for gevent to work properly

app = Flask(__name__)
CORS(app, supports_credentials=True)

# ✅ Use gevent as async_mode
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")

# 🧠 Shared video state
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
    socketio.emit("sync", video_state)

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    print(f"🚀 Flask-SocketIO Server Running on port {PORT}")
    socketio.run(app, host="0.0.0.0", port=PORT)

