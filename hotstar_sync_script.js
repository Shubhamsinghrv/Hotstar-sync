// Inject Socket.IO from CDN
const socketScript = document.createElement("script");
socketScript.src = "https://cdn.socket.io/3.1.3/socket.io.min.js";
socketScript.onload = () => {
    console.log("✅ Socket.IO Loaded!");
    initSocketSync();
};
document.head.appendChild(socketScript);

function initSocketSync() {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room");

    if (!room) {
        console.warn("❌ No room found. Aborting sync...");
        return;
    }

    const socket = io("https://hotstar-sync.onrender.com", {
        transports: ["websocket", "polling"],
        withCredentials: true
    });

    console.log("✅ Socket initialized for room:", room);
    // 👉 Tell the server we’ve joined a room
    socket.emit("join", { room });

    // Handle incoming sync updates
    socket.on("sync", (data) => {
        const video = document.querySelector("video");
        if (!video || data.room !== room) return;

        console.log("📡 Received sync event:", data);

        if (Math.abs(video.currentTime - data.timestamp) > 1) {
            video.currentTime = data.timestamp;
        }

        if (data.is_playing) {
            video.play();
        } else {
            video.pause();
        }
    });

    // Emit sync updates to server
    function sendUpdate() {
        const video = document.querySelector("video");
        if (!video) return;

        socket.emit("update", {
            room,
            timestamp: video.currentTime,
            is_playing: !video.paused
        });
    }

    // Attach local video event listeners
    function attachVideoListeners() {
        const video = document.querySelector("video");
        if (!video) return;

        video.addEventListener("play", sendUpdate);
        video.addEventListener("pause", sendUpdate);
        video.addEventListener("seeked", sendUpdate);
    }

    // Wait until video is loaded and attach everything
    const interval = setInterval(() => {
        const video = document.querySelector("video");
        if (video) {
            clearInterval(interval);
            attachVideoListeners();
        }
    }, 500);

    // 🔁 Keep sending updates every second
    setInterval(sendUpdate, 1000);
}

// 🔄 Chrome Extension - Background Sync Communication
window.addEventListener("load", () => {
    const video = document.querySelector("video");
    if (!video) return;

    // Tell background to prep socket
    chrome.runtime.sendMessage({ type: "INIT_SOCKET" });

    // Send video events to background
    video.addEventListener("play", () => {
        chrome.runtime.sendMessage({ type: "EMIT_EVENT", event: "play" });
    });

    video.addEventListener("pause", () => {
        chrome.runtime.sendMessage({ type: "EMIT_EVENT", event: "pause" });
    });

    video.addEventListener("seeked", () => {
        chrome.runtime.sendMessage({
            type: "EMIT_EVENT",
            event: "seek",
            data: { time: video.currentTime }
        });
    });

    // Receive sync commands from background
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === "PLAY") video.play();
        if (msg.type === "PAUSE") video.pause();
        if (msg.type === "SEEK") video.currentTime = msg.time;
    });
});

