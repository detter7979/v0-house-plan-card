"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HousePlanCard } from "@/components/house-plan-card"
import { RecentOrdersGrid } from "@/components/recent-orders-grid"
import { RecentlyViewedCarousel } from "@/components/recently-viewed-carousel"

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
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

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
    />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="17,6 23,6 23,12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const recommendedPlans = [
  {
    id: "rec1",
    title: "Modern Farmhouse Elite",
    planNumber: "MFE-2024-001",
    imageUrl: "/modern-farmhouse-exterior.png",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFootage: 2850,
    price: 1450,
    isFavorited: false,
  },
  {
    id: "rec2",
    title: "Contemporary Ranch House",
    planNumber: "CRH-2024-002",
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 2100,
    price: 1150,
    isFavorited: true,
  },
  {
    id: "rec3",
    title: "Craftsman Cottage",
    planNumber: "CC-2024-003",
    imageUrl: "/craftsman-cottage-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1950,
    price: 1050,
    isFavorited: false,
  },
]

export function DashboardOverview() {
  const handleFavoriteToggle = (id: string) => {
    console.log("Toggle favorite for plan:", id)
  }

  const handleQuickView = (id: string) => {
    console.log("Quick view for plan:", id)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
            <p className="text-muted-foreground">You have 3 new plan recommendations and 2 pending downloads</p>
          </div>
          <div className="hidden md:block">
            <Badge variant="secondary" className="text-sm">
              Premium Member
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,250</div>
            <p className="text-xs text-muted-foreground">+$2,400 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <Button variant="outline" size="sm">
            View All Orders
          </Button>
        </div>
        <RecentOrdersGrid />
      </div>

      {/* Recently Viewed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Recently Viewed</h3>
          <Button variant="outline" size="sm">
            Clear History
          </Button>
        </div>
        <RecentlyViewedCarousel />
      </div>

      {/* Recommended Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Recommended for You</h3>
            <p className="text-sm text-muted-foreground">Based on your browsing history and preferences</p>
          </div>
          <Button variant="outline" size="sm">
            See More
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedPlans.map((plan) => (
            <HousePlanCard
              key={plan.id}
              {...plan}
              onFavoriteToggle={handleFavoriteToggle}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
