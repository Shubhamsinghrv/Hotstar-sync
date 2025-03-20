// Inject Socket.IO from localhost
const script = document.createElement("script");
script.src = "https://hotstar-sync.onrender.com/socket.io/socket.io.js"; // Load from local server
script.onload = () => {
    console.log("✅ Socket.IO Loaded Locally!");
    initSocket(); // Start syncing after loading
};
document.head.appendChild(script);

function initSocket() {
    const socket = io("https://hotstar-sync.onrender.com", {
        transports: ["websocket", "polling"],
        withCredentials: true
    });

    console.log("✅ Socket initialized!", socket);

    // Listen for sync updates
    socket.on("sync", (data) => {
        console.log("📡 Sync Data Received:", data);
        const video = document.querySelector("video");
        if (!video) return;

        if (Math.abs(video.currentTime - data.timestamp) > 1) {
            video.currentTime = data.timestamp;
        }
        if (data.is_playing) {
            video.play();
        } else {
            video.pause();
        }
    });

    function sendUpdate() {
        const video = document.querySelector("video");
        if (!video) return;

        socket.emit("update", {
            timestamp: video.currentTime,
            is_playing: !video.paused
        });
    }

    // Attach event listeners once when the video is loaded
    document.addEventListener("DOMContentLoaded", () => {
        const video = document.querySelector("video");
        if (video) {
            video.addEventListener("play", sendUpdate);
            video.addEventListener("pause", sendUpdate);
            video.addEventListener("seeked", sendUpdate);
        }
    });

    // Send periodic updates every second
    setInterval(sendUpdate, 1000);
}

