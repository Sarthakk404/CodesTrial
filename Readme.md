# ⚔️ CodesTrial

> *"Submit your code. Face judgment. No survivors."*

An AI-powered dungeon-themed code roaster. Paste your code or drop a GitHub repo URL, choose your punishment level, and receive a brutal (or not so brutal) verdict from the dungeon master.

---

## ✨ Features

- 🕯️ **Three roast severities** — Light, Medium, and ☢ Nuclear
- 📜 **Paste code** directly or **submit a GitHub repo URL**
- 💀 **Meme generation** alongside the roast verdict
- ⚔️ Dungeon-themed UI with pixel art avatars, torches, and atmosphere
- 🖱️ Custom skeleton hand cursor

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | FastAPI (Python) |
| Schemas | Pydantic |
| Styling | Inline CSS + Google Fonts |
| AI | *GROQ_MODEL=llama-3.3-70b-versatile* |

---

## 📁 Project Structure

```
CodesTrial/
├── app/                    # FastAPI backend
│   ├── __init__.py
│   ├── main.py             # API routes & entry point
│   └── roaster.py          # Roast logic & LLM calls
├── schemas/                # Pydantic models
│   ├── __init__.py
│   └── schemas.py          # Prompt, RoastResponse
├── frontend/               # React + Vite frontend
│   ├── public/
│   │   ├── Skeleton_Hand.svg
│   │   └── Arrow.svg
│   ├── src/
│   │   ├── App.jsx         # Main UI component
│   │   └── main.jsx        # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── github.py               # GitHub repo fetching
├── roaster.py              # Roast generation
├── .env                    # API keys (not committed)
└── README.md
```

---

## Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <https://github.com/Sarthakk404/CodesTrial.git>
   cd CodesTrial
   ```

2. Create a virtual environment:
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # On Windows
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.3-70b-versatile
   IMGFLIP_USERNAME=your_imgflip_username
   IMGFLIP_PASSWORD=your_imgflip_password
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Build the frontend (optional for development):
   ```bash
   npm run build
   ```

## Usage

### Running the Application

1. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   # Runs on http://127.0.0.1:8000

2. Start the frontend (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   # Runs on http://localhost:5173

## 🔌 API Endpoints
 
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/roast` | Roast pasted code |
| `POST` | `/roast-github` | Roast a GitHub repo URL |

## ⚙️ Severity Levels
 
| Level | Vibe |
|-------|------|
| 🕯️ Light Roast | A gentle slap on the wrist |
| ⚔️ Medium Roast | Draws blood. Hurts feelings. |
| ☢️ NUCLEAR | No survivors. No mercy. |

## API Keys Setup

### Groq API
1. Sign up at [Groq](https://groq.com)
2. Get your API key from the dashboard
3. Add it to your `.env` file

### Imgflip API
1. Sign up at [Imgflip](https://imgflip.com/api)
2. Get your username and password
3. Add them to your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Disclaimer

This tool is for entertainment purposes only. Code roasting is meant to be fun and educational. Don't take the AI's opinions too seriously - it's just a machine learning model with a bad attitude! 🤖