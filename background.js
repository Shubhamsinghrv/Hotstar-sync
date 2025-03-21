chrome.runtime.onInstalled.addListener(() => {
    console.log("🔥 Hotstar Sync Extension Installed!");
});

// Global state (optional – if needed to track a central room or state)
let currentRoom = null;

// Listener for messages from content/hotstar_sync_script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case "LOG":
            console.log("📩 Message from script:", message.data);
            break;

        case "INIT_SOCKET":
            console.log("🔌 INIT_SOCKET received from content script");
            // Optional: initialize anything global here
            break;

        case "EMIT_EVENT":
            console.log(`🎬 Event: ${message.event}`, message.data || "");
            // Optional: broadcast to other tabs
            break;

        default:
            console.warn("❓ Unknown message type", message);
    }
});

