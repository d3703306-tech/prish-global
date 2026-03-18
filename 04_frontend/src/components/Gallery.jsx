import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// Sample gallery images (using placeholder service for demo)
const sampleImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', fullSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600', caption: 'Team Collaboration', category: 'Team' },
  { id: 2, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', fullSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600', caption: 'Office Meeting', category: 'Office' },
  { id: 3, src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', fullSrc: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600', caption: 'Workshop Session', category: 'Events' },
  { id: 4, src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', fullSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600', caption: 'Business Strategy', category: 'Business' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', fullSrc: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600', caption: 'Professional Development', category: 'Team' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', fullSrc: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600', caption: 'Tech Conference', category: 'Events' },
  { id: 7, src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800', fullSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600', caption: 'Leadership Summit', category: 'Business' },
  { id: 8, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', fullSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600', caption: 'Networking Event', category: 'Events' },
  { id: 9, src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800', fullSrc: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600', caption: 'Client Presentation', category: 'Business' },
  { id: 10, src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', fullSrc: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600', caption: 'Innovation Lab', category: 'Team' },
  { id: 11, src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800', fullSrc: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600', caption: 'Training Session', category: 'Office' },
  { id: 12, src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800', fullSrc: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600', caption: 'Team Building', category: 'Team' },
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [filter, setFilter] = useState('All')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === -1) return
    
    if (e.key === 'Escape') {
      setSelectedImage(null)
      setSelectedIndex(-1)
    } else if (e.key === 'ArrowLeft') {
      navigatePrev()
    } else if (e.key === 'ArrowRight') {
      navigateNext()
    }
  }, [selectedIndex])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const filteredImages = filter === 'All' 
    ? sampleImages 
    : sampleImages.filter(img => img.category === filter)

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setSelectedIndex(-1)
  }

  const navigatePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1
      setSelectedIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
    }
  }

  const navigateNext = () => {
    if (selectedIndex < filteredImages.length - 1) {
      const newIndex = selectedIndex + 1
      setSelectedIndex(newIndex)
      setSelectedImage(filteredImages[newIndex])
    }
  }

  const categories = ['All', 'Team', 'Office', 'Events', 'Business']

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm block mb-4">
            Our Gallery
          </span>
          <h2 className="text-4xl font-bold text-white mb-2">PRISH GLOBAL Moments</h2>
          <p className="text-gray-400 mt-2">Captured highlights from our community and events</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                filter === cat 
                  ? 'bg-phantom-gold text-phantom-navy' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="break-inside-avoid cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(image, index)}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium">{image.caption}</p>
                <p className="text-gray-300 text-xs">{image.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <p className="text-center text-gray-500 py-12">No images found in this category.</p>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl w-12 h-12 flex items-center justify-center transition-colors z-10"
            >
              &times;
            </button>

            {/* Navigation Arrows */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigatePrev() }}
                className="absolute left-4 text-white/70 hover:text-phantom-gold text-5xl w-12 h-12 flex items-center justify-center transition-colors"
              >
                &#8249;
              </button>
            )}
            {selectedIndex < filteredImages.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); navigateNext() }}
                className="absolute right-4 text-white/70 hover:text-phantom-gold text-5xl w-12 h-12 flex items-center justify-center transition-colors"
              >
                &#8250;
              </button>
            )}

            {/* Image Container */}
            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <img
                src={selectedImage.fullSrc}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="mt-4 flex justify-between items-center text-white">
                <div>
                  <h3 className="text-xl font-bold">{selectedImage.caption}</h3>
                  <p className="text-gray-400">{selectedImage.category}</p>
                </div>
                
                {/* Counter */}
                <div className="text-gray-400">
                  {selectedIndex + 1} / {filteredImages.length}
                </div>
              </div>

              {/* Keyboard Hints */}
              <div className="mt-2 text-center text-gray-500 text-sm">
                Use ← → arrow keys to navigate • ESC to close
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
