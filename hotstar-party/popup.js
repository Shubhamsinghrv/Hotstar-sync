document.getElementById("createRoom").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "createRoom" }, response => {
    if (response && response.roomId) {
      localStorage.setItem("roomId", response.roomId);
      document.getElementById("roomLink").innerHTML = `<a href='${response.link}' target='_blank'>Join Room</a>`;
    } else {
      alert("Failed to create room. Try again.");
    }
  });
});
