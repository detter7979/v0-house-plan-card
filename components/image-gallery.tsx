"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Expand = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    />
  </svg>
)

interface ImageGalleryProps {
  images: string[]
  title: string
  selectedIndex: number
  onImageSelect: (index: number) => void
}

export function ImageGallery({ images, title, selectedIndex, onImageSelect }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted group cursor-pointer">
        <img
          src={images[selectedIndex] || "/placeholder.svg"}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => openLightbox(selectedIndex)}
        />

        {/* Expand Icon */}
        <button
          onClick={() => openLightbox(selectedIndex)}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
        >
          <Expand className="w-5 h-5" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={cn(
              "relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200",
              selectedIndex === index
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-muted-foreground/30",
            )}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main Lightbox Image */}
            <img
              src={images[lightboxIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextLightboxImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 text-white rounded-full">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200",
                    lightboxIndex === index
                      ? "border-white ring-2 ring-white/50"
                      : "border-white/30 hover:border-white/60",
                  )}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
