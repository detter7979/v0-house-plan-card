"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { HousePlanCard } from "@/components/house-plan-card"
import { Badge } from "@/components/ui/badge"

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="20" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
    />
  </svg>
)

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="3,6 5,6 21,6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"
    />
    <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const favoritePlans = [
  {
    id: "fav1",
    title: "Modern Farmhouse Elite",
    planNumber: "MFE-2024-001",
    imageUrl: "/modern-farmhouse-exterior.png",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2850,
    price: 1450,
    isFavorited: true,
    dateAdded: "2024-01-15",
  },
  {
    id: "fav2",
    title: "Contemporary Ranch House",
    planNumber: "CRH-2024-002",
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 2100,
    price: 1150,
    isFavorited: true,
    dateAdded: "2024-01-12",
  },
  {
    id: "fav3",
    title: "Craftsman Cottage",
    planNumber: "CC-2024-003",
    imageUrl: "/craftsman-cottage-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1950,
    price: 1050,
    isFavorited: true,
    dateAdded: "2024-01-10",
  },
  {
    id: "fav4",
    title: "Tudor Revival Manor",
    planNumber: "TRM-2024-004",
    imageUrl: "/modern-farmhouse-exterior.png",
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3200,
    price: 1850,
    isFavorited: true,
    dateAdded: "2024-01-08",
  },
  {
    id: "fav5",
    title: "Scandinavian Modern",
    planNumber: "SM-2024-005",
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1800,
    price: 950,
    isFavorited: true,
    dateAdded: "2024-01-05",
  },
]

export function FavoritesView() {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [plans, setPlans] = useState(favoritePlans)

  const handleSelectPlan = (planId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlans([...selectedPlans, planId])
    } else {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPlans(plans.map((plan) => plan.id))
    } else {
      setSelectedPlans([])
    }
  }

  const handleFavoriteToggle = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id))
    setSelectedPlans(selectedPlans.filter((planId) => planId !== id))
  }

  const handleQuickView = (id: string) => {
    console.log("Quick view for plan:", id)
  }

  const handleAddToCart = (planIds: string[]) => {
    console.log("Add to cart:", planIds)
    // Reset selection after adding to cart
    setSelectedPlans([])
  }

  const handleRemoveSelected = () => {
    setPlans(plans.filter((plan) => !selectedPlans.includes(plan.id)))
    setSelectedPlans([])
  }

  const getTotalPrice = () => {
    return plans.filter((plan) => selectedPlans.includes(plan.id)).reduce((total, plan) => total + plan.price, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (plans.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">My Favorites</h2>
          <p className="text-muted-foreground">Save house plans you love for easy access later</p>
        </div>

        {/* Empty State */}
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start browsing our house plans and click the heart icon to save your favorites here.
            </p>
            <Button>Browse House Plans</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">My Favorites</h2>
        <p className="text-muted-foreground">
          {plans.length} saved house plan{plans.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedPlans.length === plans.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All ({plans.length})
              </label>
            </div>

            {selectedPlans.length > 0 && (
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{selectedPlans.length} selected</Badge>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAddToCart(selectedPlans)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart ({formatPrice(getTotalPrice())})
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleRemoveSelected}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Selected
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            {/* Selection Checkbox */}
            <div className="absolute top-3 left-3 z-10">
              <Checkbox
                checked={selectedPlans.includes(plan.id)}
                onCheckedChange={(checked) => handleSelectPlan(plan.id, checked as boolean)}
                className="bg-white/90 border-2"
              />
            </div>

            {/* Quick Add to Cart Button */}
            <div className="absolute top-3 right-12 z-10">
              <Button
                size="sm"
                onClick={() => handleAddToCart([plan.id])}
                className="bg-blue-600/90 hover:bg-blue-700/90 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            </div>

            <HousePlanCard {...plan} onFavoriteToggle={handleFavoriteToggle} onQuickView={handleQuickView} />
          </div>
        ))}
      </div>
    </div>
  )
}
