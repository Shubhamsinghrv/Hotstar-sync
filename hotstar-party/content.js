document.addEventListener("DOMContentLoaded", () => {
  let video = document.querySelector("video");
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sync" && video) {
      video.currentTime = request.time;
    } else if (request.action === "get_sync" && video) {
      sendResponse({ time: video.currentTime });
    }
  });
});
