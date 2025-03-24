import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Initialize SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Shared video state
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
    emit("sync", video_state)  # Send current state only to the new user

@socketio.on("update")
def handle_update(data):
    global video_state
    video_state = data
    print(f"🔄 Syncing video: {video_state}")
    socketio.emit("sync", video_state, skip_sid=request.sid)  # 🚫 Skip sender

if __name__ == "__main__":
    print("🚀 Flask-SocketIO Server Running on port 5001")
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port, debug=True)

