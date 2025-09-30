import { Button } from "@/components/ui/button"
import { HousePlanCard } from "@/components/house-plan-card"

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const collections = [
  {
    title: "Best Sellers",
    description: "Our most popular house plans",
    plans: [
      {
        id: "bs1",
        title: "Modern Farmhouse Elite",
        planNumber: "MFE-2024-001",
        imageUrl: "/modern-farmhouse-exterior-with-wrap-around-porch.jpg",
        bedrooms: 4,
        bathrooms: 3.5,
        squareFootage: 2850,
        price: 1450,
        isFavorited: false,
      },
      {
        id: "bs2",
        title: "Craftsman Manor",
        planNumber: "CM-2024-002",
        imageUrl: "/craftsman-style-house-with-stone-and-wood-exterior.jpg",
        bedrooms: 5,
        bathrooms: 4,
        squareFootage: 3200,
        price: 1850,
        isFavorited: true,
      },
      {
        id: "bs3",
        title: "Contemporary Retreat",
        planNumber: "CR-2024-003",
        imageUrl: "/contemporary-house-with-large-glass-windows.jpg",
        bedrooms: 3,
        bathrooms: 2.5,
        squareFootage: 2100,
        price: 1150,
        isFavorited: false,
      },
      {
        id: "bs4",
        title: "Colonial Classic",
        planNumber: "CC-2024-004",
        imageUrl: "/colonial-style-house-with-symmetrical-facade.jpg",
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 2650,
        price: 1350,
        isFavorited: false,
      },
      {
        id: "bs5",
        title: "Ranch Luxury",
        planNumber: "RL-2024-005",
        imageUrl: "/luxury-ranch-house-with-stone-accents.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1950,
        price: 1050,
        isFavorited: true,
      },
      {
        id: "bs6",
        title: "Tudor Revival",
        planNumber: "TR-2024-006",
        imageUrl: "/tudor-style-house-with-half-timber-details.jpg",
        bedrooms: 4,
        bathrooms: 3.5,
        squareFootage: 2750,
        price: 1550,
        isFavorited: false,
      },
    ],
  },
  {
    title: "New Arrivals",
    description: "Fresh designs just added",
    plans: [
      {
        id: "na1",
        title: "Scandinavian Modern",
        planNumber: "SM-2024-007",
        imageUrl: "/scandinavian-modern-house-with-clean-lines.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1800,
        price: 950,
        isFavorited: false,
      },
      {
        id: "na2",
        title: "Mediterranean Villa",
        planNumber: "MV-2024-008",
        imageUrl: "/mediterranean-villa-with-stucco-and-tile-roof.jpg",
        bedrooms: 5,
        bathrooms: 4.5,
        squareFootage: 3800,
        price: 2250,
        isFavorited: false,
      },
      {
        id: "na3",
        title: "Tiny House Deluxe",
        planNumber: "THD-2024-009",
        imageUrl: "/tiny-house-with-modern-design-and-large-windows.jpg",
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 650,
        price: 450,
        isFavorited: true,
      },
      {
        id: "na4",
        title: "Prairie Style",
        planNumber: "PS-2024-010",
        imageUrl: "/prairie-style-house-with-horizontal-lines.jpg",
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 2400,
        price: 1250,
        isFavorited: false,
      },
      {
        id: "na5",
        title: "Coastal Cottage",
        planNumber: "CC-2024-011",
        imageUrl: "/coastal-cottage-with-shingle-siding-and-dormers.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1650,
        price: 850,
        isFavorited: false,
      },
      {
        id: "na6",
        title: "Industrial Loft",
        planNumber: "IL-2024-012",
        imageUrl: "/industrial-loft-style-house-with-metal-and-brick.jpg",
        bedrooms: 2,
        bathrooms: 2,
        squareFootage: 1400,
        price: 750,
        isFavorited: true,
      },
    ],
  },
  {
    title: "Trending",
    description: "Popular searches this month",
    plans: [
      {
        id: "tr1",
        title: "Barndominium Pro",
        planNumber: "BP-2024-013",
        imageUrl: "/barndominium-with-metal-siding-and-large-doors.jpg",
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 2200,
        price: 1100,
        isFavorited: false,
      },
      {
        id: "tr2",
        title: "A-Frame Retreat",
        planNumber: "AFR-2024-014",
        imageUrl: "/a-frame-house-in-forest-setting-with-large-windows.jpg",
        bedrooms: 2,
        bathrooms: 1.5,
        squareFootage: 1200,
        price: 650,
        isFavorited: true,
      },
      {
        id: "tr3",
        title: "Smart Home Future",
        planNumber: "SHF-2024-015",
        imageUrl: "/placeholder.svg?height=300&width=400",
        bedrooms: 4,
        bathrooms: 3,
        squareFootage: 2600,
        price: 1650,
        isFavorited: false,
      },
      {
        id: "tr4",
        title: "Eco Sustainable",
        planNumber: "ES-2024-016",
        imageUrl: "/placeholder.svg?height=300&width=400",
        bedrooms: 3,
        bathrooms: 2,
        squareFootage: 1900,
        price: 1050,
        isFavorited: false,
      },
      {
        id: "tr5",
        title: "Multi-Gen Living",
        planNumber: "MGL-2024-017",
        imageUrl: "/placeholder.svg?height=300&width=400",
        bedrooms: 6,
        bathrooms: 4,
        squareFootage: 3500,
        price: 2050,
        isFavorited: true,
      },
      {
        id: "tr6",
        title: "Container Modern",
        planNumber: "CM-2024-018",
        imageUrl: "/placeholder.svg?height=300&width=400",
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 1100,
        price: 550,
        isFavorited: false,
      },
    ],
  },
]

export function FeaturedCollections() {
  const handleFavoriteToggle = (id: string) => {
    console.log("Toggle favorite for plan:", id)
  }

  const handleQuickView = (id: string) => {
    console.log("Quick view for plan:", id)
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Curated selections of our finest house plans, organized by popularity and style
          </p>
        </div>

        <div className="space-y-16">
          {collections.map((collection) => (
            <div key={collection.title}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-muted-foreground">{collection.description}</p>
                </div>
                <Button variant="outline" className="group bg-transparent">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.plans.map((plan) => (
                  <HousePlanCard
                    key={plan.id}
                    {...plan}
                    onFavoriteToggle={handleFavoriteToggle}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
