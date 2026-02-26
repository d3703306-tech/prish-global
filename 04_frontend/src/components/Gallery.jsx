import React, { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:8000/api'

function Gallery() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_BASE}/images?limit=50`)
      const data = await res.json()
      setImages(data.images || [])
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch images:', err)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dallas-navy">Dallas Memories</h2>
          <p className="text-gray-600 mt-2">Captured moments from our community events</p>
        </div>

        {/* Masonry Gallery */}
        {loading ? (
          <p className="text-center text-gray-500">Loading gallery...</p>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map(image => (
              <div 
                key={image.id}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.thumbnail_url}
                  alt={image.caption}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                  <p className="text-gray-300 text-xs">📷 {image.photographer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 flex justify-between items-center text-white">
                <div>
                  <h3 className="text-xl font-bold">{selectedImage.caption}</h3>
                  <p className="text-gray-400">📷 {selectedImage.photographer}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
