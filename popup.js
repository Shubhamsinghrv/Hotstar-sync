document.getElementById("create-room").addEventListener("click", () => {
    const roomId = Math.random().toString(36).substr(2, 8); // Generate unique ID
    const url = `https://www.hotstar.com/watch-party?room=${roomId}`;
    
    document.getElementById("link").innerHTML = `✅ Share this link: <br> <a href="${url}" target="_blank">${url}</a>`;

    navigator.clipboard.writeText(url).then(() => {
        alert("✅ Watch party link copied! Share with friends.");
    });
});

