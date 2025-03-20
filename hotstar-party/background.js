chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createRoom") {
    fetch("http://localhost:5001/create_room", { mode: "cors" })
      .then(response => response.json())
      .then(data => sendResponse({ roomId: data.roomId, link: `http://localhost:5001/join?roomId=${data.roomId}` }))
      .catch(error => console.error("Error:", error));
    return true;
  }
});
