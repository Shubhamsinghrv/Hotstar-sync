const script = document.createElement("script");
script.src = chrome.runtime.getURL("hotstar_sync_script.js");
script.onload = function () {
    console.log("✅ Hotstar Sync Script Injected!");
    this.remove(); // Clean up
};
(document.head || document.documentElement).appendChild(script);

