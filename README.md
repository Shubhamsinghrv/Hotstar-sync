# RS-Sync

**A Chrome Extension + Flask-SocketIO backend to sync Disney+ Hotstar video playback across multiple users in real time!**

---

## 🚀 Features

- 🎥 **Sync video events**: Play, pause, and seek events sync across users.
- ⚡ **Real-time updates**: WebSockets enable instant communication.
- 🌐 **Backend deployable on Render**: Simple deployment process.
- 🧩 **Chrome Extension**: Injects sync logic directly into Hotstar.

---

## 📦 Project Structure

```
Hotstar-sync/
├── background.js
├── content.js
├── hotstar_sync_script.js
├── popup.html
├── popup.js
├── manifest.json
├── server.py           <-- Flask-SocketIO backend
├── requirements.txt    <-- Python dependencies
├── icon.png
└── README.md
```

---

## ✅ Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/hotstar-sync.git
cd hotstar-sync
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Start the Backend Server
```bash
python server.py
```
The server will run at **http://localhost:5001**.

---

## ☁️ Deploy Backend on Render

### Steps to Deploy:
1. Push `server.py` and `requirements.txt` to GitHub.
2. Go to [Render](https://render.com), create a **new Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python server.py`
5. Deploy and get your public URL (e.g., `https://hotstar-sync-server.onrender.com`).

---

## 🧩 Load the Chrome Extension

1. Open `chrome://extensions` in your Chrome browser.
2. Enable **Developer Mode** (toggle on the top right).
3. Click **Load Unpacked** and select the extension folder (where `manifest.json` is).
4. **Update the Socket URL** inside `hotstar_sync_script.js`:

```js
const socket = io("https://your-app.onrender.com", {
    transports: ["websocket"],
    withCredentials: true
});
```

---

## 🔐 Permissions Requested

- **`activeTab`**: To access the currently open Hotstar tab.
- **`scripting`**: To inject JavaScript into Hotstar.
- **`storage`** (optional): To store session data.
- **`https://www.hotstar.com/*`**: To enable script injection on Hotstar pages.

---

## 📦 Build Zip for Distribution

To share the extension with others:
1. **Zip** the entire extension folder (excluding `server.py`).
2. Share the `.zip` file.
3. They can load it via `chrome://extensions` > **Load Unpacked**.

---

## 💡 Future Improvements

- 🎯 Room-based sync support
- 🔐 Authentication & secure sessions
- 📱 Mobile browser support
- 🛡️ Rate limiting / abuse protection

---

## 🙌 Credits

Built with ❤️ using:

- **Flask**
- **Flask-SocketIO**
- **Socket.IO**
- **Chrome Extensions API**

