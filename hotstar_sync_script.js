// Inject Socket.IO
const script = document.createElement("script");
script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
script.onload = () => {
    console.log("✅ Socket.IO Loaded!");
    initSocket();
};
document.head.appendChild(script);

function initSocket() {
    const socket = io("https://hotstar-sync.onrender.com", {
        transports: ["websocket", "polling"],
        withCredentials: true
    });

    console.log("✅ Socket initialized!", socket);

    let isRemoteAction = false;

    socket.on("sync", (data) => {
        const video = document.querySelector("video");
        if (!video) return;

        console.log("📡 Sync Data Received:", data);

        // Prevent triggering update events
        isRemoteAction = true;

        if (Math.abs(video.currentTime - data.timestamp) > 1) {
            video.currentTime = data.timestamp;
        }

        if (data.is_playing) {
            video.play();
        } else {
            video.pause();
        }

        setTimeout(() => (isRemoteAction = false), 100);  // Small cooldown
    });

    function sendUpdate() {
        if (isRemoteAction) return;  // Don't send updates triggered by sync
        const video = document.querySelector("video");
        if (!video) return;

        socket.emit("update", {
            timestamp: video.currentTime,
            is_playing: !video.paused
        });
    }

    setInterval(() => {
        const video = document.querySelector("video");
        if (video) {
            video.onplay = sendUpdate;
            video.onpause = sendUpdate;
            video.onseeked = sendUpdate;
        }
    }, 1000);
}

