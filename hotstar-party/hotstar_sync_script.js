// Connect to the Flask backend
const socket = io("http://localhost:5001", {
    transports: ["websocket", "polling"],
    withCredentials: true
});

// Function to get the Hotstar video player
function getVideoPlayer() {
    return document.querySelector("video");
}

// Sync the video state when receiving data from the server
socket.on("sync", (data) => {
    const video = getVideoPlayer();
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

// Send video state updates to the server
function sendUpdate() {
    const video = getVideoPlayer();
    if (!video) return;

    socket.emit("update", {
        timestamp: video.currentTime,
        is_playing: !video.paused
    });
}

// Detect play, pause, and seek events
setInterval(() => {
    const video = getVideoPlayer();
    if (video) {
        video.onplay = sendUpdate;
        video.onpause = sendUpdate;
        video.onseeked = sendUpdate;
    }
}, 1000);

// 🔥 Add your new setInterval function here!
setInterval(() => {
    chrome.runtime.sendMessage({ action: "get_sync" }, response => {
        if (!response || response.time === undefined) return;

        try {
            fetch("http://localhost:5001/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId: localStorage.getItem("roomId"),
                    time: response.time
                })
            });
        } catch (err) {
            console.error("❌ Fetch failed:", err);
        }
    });
}, 1000);

