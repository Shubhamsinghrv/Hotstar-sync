# 🎬 RS-Sync

A Chrome Extension that lets multiple users **synchronize video playback** on Hotstar using a real-time backend powered by **Flask-SocketIO**. Watch shows, movies, or sports **in sync with friends**, no matter where they are!

---

## 🌐 Live Demo Backend

> Hosted on: `https://hotstar-sync-server.onrender.com`  
> (Replace this with your actual Render URL)

---

## 📦 Project Structure

Hotstar-sync/ ├── background.js ├── content.js ├── hotstar_sync_script.js ├── popup.html ├── popup.js ├── manifest.json ├── server.py <-- Flask-SocketIO backend ├── requirements.txt <-- Python dependencies ├── icon.png └── README.md

---

## 🚀 Features

- 🔁 Sync **play**, **pause**, and **seek** events across all connected users.
- ⚡ Real-time communication via **WebSockets** using Socket.IO.
- 🧩 Easy-to-use Chrome Extension for Hotstar users.
- ☁️ Backend hosted on **Render** for global accessibility.

---

## 🧪 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/hotstar-sync.git
cd hotstar-sync
pip install -r requirements.txt
python server.py
Server will run at http://localhost:5001

Deploying Backend on Render
Push your backend code (e.g. server.py, requirements.txt) to GitHub.

Go to https://render.com, create a new Web Service.

Connect your GitHub repo.

Set build & run commands:

yaml
Copy code
Build Command: pip install -r requirements.txt
Start Command: python server.py
After deploy, get your public URL like https://hotstar-sync-server.onrender.com.

🧩 Load the Chrome Extension
Go to chrome://extensions
Enable Developer Mode
Click "Load unpacked"
Select the project folder (with manifest.json)
✏️ Important
In hotstar_sync_script.js, change the socket connection URL:

js
Copy code
const socket = io("https://your-app.onrender.com", {
    transports: ["websocket"],
    withCredentials: true
});
This makes sure it connects to the live backend!

🔐 Permissions
Your extension requests:

activeTab – to interact with the currently playing Hotstar tab
scripting – to inject JavaScript into the tab
storage – optional, for storing session state (room IDs etc.)
https://www.hotstar.com/* – to allow script injection on Hotstar pages
📦 Build Zip for Distribution
To share with friends:

Zip the entire extension folder (excluding server.py)
Share .zip file
They can load it via chrome://extensions > Load Unpacked
💡 Future Improvements
🎯 Room-based sync
🛡️ Auth and secure sessions
📱 Mobile browser support
🔒 Rate limiting or abuse protection
🙌 Credits

Made with ❤️ using:
Flask
Flask-SocketIO
Socket.IO
Chrome Extensions API
