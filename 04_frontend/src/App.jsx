import React, { useState, useEffect } from 'react'
import Gallery from './components/Gallery'

const API_BASE = 'http://localhost:8000/api'

function App() {
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [rsvpData, setRsvpData] = useState({ name: '', email: '' })
  const [rsvpStatus, setRsvpStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('events') // 'events' or 'gallery'

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const url = category === 'all' 
        ? `${API_BASE}/events` 
        : `${API_BASE}/events?category=${category}`
      const res = await fetch(url)
      const data = await res.json()
      setEvents(data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch events:', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [category])

  const handleRsvp = async (e) => {
    e.preventDefault()
    setRsvpStatus('loading')
    
    try {
      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          name: rsvpData.name,
          email: rsvpData.email
        })
      })
      
      if (res.ok) {
        setRsvpStatus('success')
        setRsvpData({ name: '', email: '' })
      } else {
        setRsvpStatus('error')
      }
    } catch (err) {
      setRsvpStatus('error')
    }
  }

  const categories = ['all', 'Festivals', 'Tech Meetups', 'Cricket', 'Food', 'Networking']

  return (
    <div className="min-h-screen bg-dallas-cream">
      {/* Header */}
      <header className="bg-dallas-navy text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Dallas Desi Events</h1>
          <p className="text-dallas-gold mt-1">Connect with the community</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'events' 
                ? 'border-b-2 border-dallas-navy text-dallas-navy' 
                : 'text-gray-500 hover:text-dallas-navy'
            }`}
          >
            📅 Events
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 px-4 font-medium transition ${
              activeTab === 'gallery' 
                ? 'border-b-2 border-dallas-navy text-dallas-navy' 
                : 'text-gray-500 hover:text-dallas-navy'
            }`}
          >
            📷 Memories Gallery
          </button>
        </div>
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <>
          {/* Category Filter */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    category === cat 
                      ? 'bg-dallas-navy text-white' 
                      : 'bg-white text-dallas-navy hover:bg-dallas-gold'
                  }`}
                >
                  {cat === 'all' ? 'All Events' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="container mx-auto px-4 pb-12">
            {loading ? (
              <p className="text-center text-gray-500">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-center text-gray-500">No events found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <div className="h-40 bg-gradient-to-br from-dallas-navy to-dallas-gold flex items-center justify-center">
                      <span className="text-4xl">📅</span>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold text-dallas-gold bg-dallas-navy px-2 py-1 rounded">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-bold text-dallas-navy mt-2">{event.name}</h3>
                      <p className="text-gray-600 mt-1">📍 {event.location}</p>
                      <p className="text-gray-500 text-sm">📆 {event.date}</p>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="w-full mt-4 bg-dallas-navy text-white py-2 rounded hover:bg-dallas-gold transition font-medium"
                      >
                        RSVP Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && <Gallery />}

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-dallas-navy mb-4">RSVP: {selectedEvent.name}</h2>
            
            {rsvpStatus === 'success' ? (
              <div className="text-center py-8">
                <span className="text-5xl">✅</span>
                <p className="text-green-600 font-semibold mt-4">You're in!</p>
                <p className="text-gray-500 text-sm mt-1">Check your email for confirmation</p>
                <button
                  onClick={() => { setSelectedEvent(null); setRsvpStatus(null); }}
                  className="mt-6 text-dallas-navy underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvp}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={rsvpData.name}
                    onChange={e => setRsvpData({ ...rsvpData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dallas-gold outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={rsvpData.email}
                    onChange={e => setRsvpData({ ...rsvpData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-dallas-gold outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setSelectedEvent(null); setRsvpStatus(null); }}
                    className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={rsvpStatus === 'loading'}
                    className="flex-1 bg-dallas-navy text-white py-2 rounded-lg hover:bg-dallas-gold disabled:opacity-50"
                  >
                    {rsvpStatus === 'loading' ? 'Sending...' : 'Submit RSVP'}
                  </button>
                </div>
                {rsvpStatus === 'error' && (
                  <p className="text-red-500 text-sm mt-3 text-center">Something went wrong. Try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
