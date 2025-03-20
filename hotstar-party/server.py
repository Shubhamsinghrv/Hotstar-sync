from flask import Flask, jsonify, request
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
rooms = {}

@app.route("/", methods=["GET"])
def home():
    return "Hotstar Watch Party Server is Running!", 200

@app.route("/create_room", methods=["GET"])
def create_room():
    room_id = str(random.randint(1000, 9999))
    rooms[room_id] = {"time": 0}
    return jsonify({"roomId": room_id})

@app.route("/join", methods=["GET"])
def join_room():
    room_id = request.args.get("roomId")
    if room_id in rooms:
        return f"Welcome to the watch party! Room ID: {room_id}", 200
    return "Room not found", 404

@app.route("/sync", methods=["POST"])
def sync():
    data = request.json
    room_id = data.get("roomId")
    time = data.get("time")
    if room_id in rooms:
        rooms[room_id]["time"] = time
    return jsonify({"status": "success"})

@app.route("/get_sync", methods=["GET"])
def get_sync():
    room_id = request.args.get("roomId")
    if room_id in rooms:
        return jsonify({"time": rooms[room_id]["time"]})
    return jsonify({"error": "Room not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
