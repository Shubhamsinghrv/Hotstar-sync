import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room
from gevent import monkey

monkey.patch_all()

app = Flask(__name__)
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="gevent")

# 🧠 One state per room
room_states = {}

@app.route("/")
def home():
    return "✅ Server is running!", 200

@socketio.on("connect")
def handle_connect():
    print("🔵 A user connected")

@socketio.on("join")
def on_join(data):
    room = data.get("room")
    join_room(room)
    print(f"🟢 User joined room: {room}")

    if room in room_states:
        emit("sync", { "room": room, **room_states[room] }, to=room)

@socketio.on("update")
def handle_update(data):
    room = data.get("room")
    if not room:
        return

    room_states[room] = {
        "timestamp": data["timestamp"],
        "is_playing": data["is_playing"]
    }

    print(f"🔄 Syncing room {room}: {room_states[room]}")
    socketio.emit("sync", { "room": room, **room_states[room] }, to=room)

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 10000))
    print(f"🚀 Server running on port {PORT}")
    socketio.run(app, host="0.0.0.0", port=PORT)

