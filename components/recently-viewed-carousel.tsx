"use client"

import { HousePlanCard } from "@/components/house-plan-card"
import { Button } from "@/components/ui/button"

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="15,18 9,12 15,6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9,18 15,12 9,6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const recentlyViewed = [
  {
    id: "rv1",
    title: "Tudor Revival Manor",
    planNumber: "TRM-2024-001",
    imageUrl: "/modern-farmhouse-exterior.png",
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3200,
    price: 1850,
    isFavorited: false,
  },
  {
    id: "rv2",
    title: "Scandinavian Modern",
    planNumber: "SM-2024-002",
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1800,
    price: 950,
    isFavorited: true,
  },
  {
    id: "rv3",
    title: "Mediterranean Villa",
    planNumber: "MV-2024-003",
    imageUrl: "/craftsman-cottage-exterior.jpg",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2750,
    price: 1550,
    isFavorited: false,
  },
  {
    id: "rv4",
    title: "Prairie Style Home",
    planNumber: "PSH-2024-004",
    imageUrl: "/modern-farmhouse-exterior.png",
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2400,
    price: 1250,
    isFavorited: false,
  },
]

export function RecentlyViewedCarousel() {
  const handleFavoriteToggle = (id: string) => {
    console.log("Toggle favorite for plan:", id)
  }

  const handleQuickView = (id: string) => {
    console.log("Quick view for plan:", id)
  }

  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {recentlyViewed.map((plan) => (
          <div key={plan.id} className="flex-none w-80">
            <HousePlanCard {...plan} onFavoriteToggle={handleFavoriteToggle} onQuickView={handleQuickView} />
          </div>
        ))}
      </div>

      {/* Navigation buttons for larger screens */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-4">
        <Button size="icon" variant="outline" className="rounded-full bg-background shadow-md">
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-4">
        <Button size="icon" variant="outline" className="rounded-full bg-background shadow-md">
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
