"use client"

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const quickFilters = [
    { label: "Modern", count: "2,400+" },
    { label: "Traditional", count: "1,800+" },
    { label: "Small Homes", count: "950+" },
    { label: "Luxury", count: "650+" },
  ]

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/beautiful-modern-house-exterior-with-large-windows.jpg"
          alt="Beautiful home exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">Find Your Dream Home Plan</h1>
        <p className="text-xl text-white/90 mb-8 text-pretty max-w-2xl mx-auto">
          Discover thousands of professionally designed house plans from award-winning architects and designers
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by style, size, or features..."
              className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur border-0 rounded-full"
            />
            <Button size="lg" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {quickFilters.map((filter) => (
            <Button
              key={filter.label}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur rounded-full"
            >
              {filter.label}
              <span className="ml-2 text-sm opacity-75">({filter.count})</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
