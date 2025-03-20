from flask import Flask
import eventlet
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)

# Enable CORS to avoid cross-origin issues
CORS(app, supports_credentials=True)

# Initialize SocketIO with CORS support
socketio = SocketIO(app, cors_allowed_origins="*")

# Store the video state
video_state = {
    "timestamp": 0,
    "is_playing": False
}

# Route to check if server is running
@app.route("/")
def home():
    return "✅ Server is running!", 200

# Handle new WebSocket connections
@socketio.on("connect")
def handle_connect():
    print("🔵 A user connected")
    emit("sync", video_state)  # Send current state to the new user

# Handle video updates from a client
@socketio.on("update")
def handle_update(data):
    global video_state
    video_state = data  # Update global state
    print(f"🔄 Syncing video: {video_state}")  # Debugging log
    socketio.emit("sync", video_state, to=None)  # Sync all clients

# Run the server
if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))  # Render assigns a dynamic port
    print(f"🚀 Flask-SocketIO Server Running on port {PORT}")
    socketio.run(app, host="0.0.0.0", port=PORT, debug=True, allow_unsafe_werkzeug=True)

