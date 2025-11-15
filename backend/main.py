from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json
import asyncio
import random
import os

app = FastAPI(title="YouTube Nebula Pro API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your React/Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
DATA_DIR = "../data"
videos = []

# -----------------------------
# Load trending videos
# -----------------------------
try:
    file_path = os.path.join(DATA_DIR, "trending_videos.json")

    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:  # skip empty lines
                try:
                    videos.append(json.loads(line))
                except json.JSONDecodeError:
                    print("⚠️ Skipping malformed line in trending_videos.json")

    print(f"✅ Loaded {len(videos)} videos from {file_path}")

except FileNotFoundError:
    print("⚠️ trending_videos.json not found — starting with empty video list.")
    videos = []

# -----------------------------
# API Endpoints
# -----------------------------

@app.get("/top-categories")
def top_categories():
    """Return top YouTube categories by average views."""
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, "top_categories.csv"))
        return df.to_dict(orient="records")
    except FileNotFoundError:
        return [{"category": "Entertainment", "avg(views)": 1487265}]


@app.get("/monthly-trends")
def monthly_trends():
    """Return average monthly trends."""
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, "monthly_trends.csv"))
        return df.to_dict(orient="records")
    except FileNotFoundError:
        return [{"month": "2017-11", "avg(views)": 800000}]


@app.get("/search")
def search(q: str = ""):
    """Search videos by title or video ID."""
    if not q:
        return []
    results = [
        v for v in videos
        if q.lower() in v.get("title", "").lower() or q in v.get("video_id", "")
    ][:10]
    return results


@app.websocket("/ws/live")
async def live_stream(websocket: WebSocket):
    """Simulate live stream updates over WebSocket."""
    await websocket.accept()
    idx = 0
    while True:
        if videos:
            video = videos[idx % len(videos)]
            live_views = video.get("views", 0) + random.randint(100, 10000)
            await websocket.send_json({
                "video_id": video.get("video_id"),
                "title": video.get("title", "Unknown"),
                "views": live_views,
                "likes": video.get("likes", 0) + random.randint(10, 100),
            })
        idx += 1
        await asyncio.sleep(1.5)
