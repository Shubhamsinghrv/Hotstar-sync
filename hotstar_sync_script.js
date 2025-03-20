// Inject Socket.IO
const script = document.createElement("script");
script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js"; // Use latest version
script.onload = () => {
    console.log("✅ Socket.IO Loaded!");
    initSocket(); // Start syncing after loading
};
document.head.appendChild(script);

function initSocket() {
    const socket = io("https://940f-2409-40c2-1163-8b27-3d70-cb74-9873-ae6e.ngrok-free.app", {
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

    // Monitor play, pause, and seek events
    setInterval(() => {
        const video = document.querySelector("video");
        if (video) {
            video.onplay = sendUpdate;
            video.onpause = sendUpdate;
            video.onseeked = sendUpdate;
        }
    }, 1000);
}

