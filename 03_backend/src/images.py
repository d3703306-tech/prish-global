"""
Dallas Desi Event Tracker - Image Gallery API
Backend: FastAPI
v1.1 - Dallas Memories Gallery
SECURED VERSION - EXIF data stripped
"""

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any
import json
import os

app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
IMAGES_FILE = os.path.join(DATA_DIR, 'images.json')

os.makedirs(DATA_DIR, exist_ok=True)

# Sample gallery data (EXIF already stripped - only public fields)
SAMPLE_IMAGES = [
    {
        "id": "img_001",
        "url": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
        "thumbnail_url": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
        "event_id": "evt_001",
        "photographer": "Priya Sharma",
        "caption": "Holi Festival Colors",
        "created_at": "2026-03-15T14:30:00Z"
    },
    {
        "id": "img_002",
        "url": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200",
        "thumbnail_url": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400",
        "event_id": "evt_001",
        "photographer": "Raj Patel",
        "caption": "Dancing at Holi",
        "created_at": "2026-03-15T15:00:00Z"
    },
    {
        "id": "img_003",
        "url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
        "thumbnail_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
        "event_id": "evt_002",
        "photographer": "Anita Desai",
        "caption": "Tech Meetup Discussion",
        "created_at": "2026-03-20T18:00:00Z"
    },
    {
        "id": "img_004",
        "url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200",
        "thumbnail_url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
        "event_id": "evt_003",
        "photographer": "Mike Johnson",
        "caption": "Cricket Match Finals",
        "created_at": "2026-03-22T10:00:00Z"
    }
]

# Initialize images file if not exists
if not os.path.exists(IMAGES_FILE):
    with open(IMAGES_FILE, 'w') as f:
        json.dump(SAMPLE_IMAGES, f, indent=2)

# Public-safe fields only (EXIF stripped)
PUBLIC_FIELDS = ["id", "url", "thumbnail_url", "event_id", "photographer", "caption", "created_at"]

def strip_exif(image: Dict[str, Any]) -> Dict[str, Any]:
    """Remove private EXIF fields from image object"""
    return {k: v for k, v in image.items() if k in PUBLIC_FIELDS}

@app.get("/api/images")
def get_images(
    event_id: Optional[str] = Query(None, description="Filter by event ID"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """
    Get images with optional event filter and pagination
    ✅ SECURE: Only returns public-safe fields (EXIF stripped)
    """
    with open(IMAGES_FILE, 'r') as f:
        images = json.load(f)
    
    # Filter by event if specified
    if event_id:
        images = [img for img in images if img.get('event_id') == event_id]
    
    # Apply pagination
    paginated = images[offset:offset + limit]
    
    # ✅ SECURITY: Strip EXIF before returning
    safe_images = [strip_exif(img) for img in paginated]
    
    return {
        "images": safe_images,
        "total": len(images),
        "limit": limit,
        "offset": offset
    }

@app.get("/api/images/{image_id}")
def get_image(image_id: str):
    """Get single image details"""
    with open(IMAGES_FILE, 'r') as f:
        images = json.load(f)
    
    for img in images:
        if img['id'] == image_id:
            # ✅ SECURITY: Strip EXIF before returning
            return strip_exif(img)
    
    raise HTTPException(status_code=404, detail="Image not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
