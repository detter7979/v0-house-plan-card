"use client"

import { useState } from "react"
import { HousePlanCard } from "@/components/house-plan-card"

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

interface RelatedPlansCarouselProps {
  plans: Array<{
    id: string
    title: string
    planNumber: string
    imageUrl: string
    bedrooms: number
    bathrooms: number
    squareFootage: number
    price: number
  }>
}

export function RelatedPlansCarousel({ plans }: RelatedPlansCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const itemsPerView = 2
  const maxIndex = Math.max(0, plans.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const handleQuickView = (id: string) => {
    // In a real app, this would open a quick view modal or navigate to the plan
    console.log("Quick view plan:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Related Plans</h3>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {plans.map((plan) => (
            <div key={plan.id} className="flex-shrink-0 w-1/2">
              <HousePlanCard
                id={plan.id}
                title={plan.title}
                planNumber={plan.planNumber}
                imageUrl={plan.imageUrl}
                bedrooms={plan.bedrooms}
                bathrooms={plan.bathrooms}
                squareFootage={plan.squareFootage}
                price={plan.price}
                isFavorited={favorites.has(plan.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onQuickView={handleQuickView}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
