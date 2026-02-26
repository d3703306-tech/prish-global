"""
Dallas Desi Event Tracker - RSVP API
Backend: FastAPI
SECURED VERSION - Email hashing implemented
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import json
import os
import hashlib

app = FastAPI()

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
EVENTS_FILE = os.path.join(DATA_DIR, 'events.json')
RSVPS_FILE = os.path.join(DATA_DIR, 'rsvps.json')

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

def hash_email(email: str) -> str:
    """Hash email with SHA-256 for secure storage"""
    return hashlib.sha256(email.strip().lower().encode()).hexdigest()

class RSVPRequest(BaseModel):
    event_id: str
    name: str
    email: str

@app.get("/api/events")
def get_events(category: str = None):
    """List all events, optionally filtered by category"""
    if not os.path.exists(EVENTS_FILE):
        return []
    
    with open(EVENTS_FILE, 'r') as f:
        events = json.load(f)
    
    if category:
        events = [e for e in events if e.get('category') == category]
    
    return events

@app.get("/api/events/{event_id}")
def get_event(event_id: str):
    """Get single event by ID"""
    if not os.path.exists(EVENTS_FILE):
        raise HTTPException(status_code=404, detail="Event not found")
    
    with open(EVENTS_FILE, 'r') as f:
        events = json.load(f)
    
    for event in events:
        if event['id'] == event_id:
            return event
    
    raise HTTPException(status_code=404, detail="Event not found")

@app.post("/api/rsvp")
def create_rsvp(rsvp: RSVPRequest):
    """Create RSVP for an event"""
    
    # ✅ SECURITY FIX: Hash email before storing
    email_hash = hash_email(rsvp.email)
    
    rsvp_data = {
        "id": f"rsvp_{datetime.now().timestamp()}",
        "event_id": rsvp.event_id,
        "name": rsvp.name,
        "email_hash": email_hash,  # ✅ STORING HASH, NOT PLAIN EMAIL
        "created_at": datetime.now().isoformat()
    }
    
    rsvps = []
    if os.path.exists(RSVPS_FILE):
        with open(RSVPS_FILE, 'r') as f:
            rsvps = json.load(f)
    
    rsvps.append(rsvp_data)
    
    with open(RSVPS_FILE, 'w') as f:
        json.dump(rsvps, f, indent=2)
    
    return {"status": "success", "rsvp_id": rsvp_data['id']}

@app.get("/api/rsvp/{event_id}")
def get_rsvps(event_id: str):
    """Get all RSVPs for an event"""
    if not os.path.exists(RSVPS_FILE):
        return []
    
    with open(RSVPS_FILE, 'r') as f:
        rsvps = json.load(f)
    
    event_rsvps = [r for r in rsvps if r['event_id'] == event_id]
    return event_rsvps

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
