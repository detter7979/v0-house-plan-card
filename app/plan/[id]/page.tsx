"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ImageGallery } from "@/components/image-gallery"
import { PlanDetailsContent } from "@/components/plan-details-content"
import { PurchaseCard } from "@/components/purchase-card"
import { RelatedPlansCarousel } from "@/components/related-plans-carousel"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Sample plan data - in a real app this would come from an API
const planData = {
  id: "hp-2024-001",
  title: "Modern Farmhouse Dream",
  planNumber: "HP-2024-001",
  price: 1299,
  salePrice: 999,
  bedrooms: 4,
  bathrooms: 3,
  squareFootage: 2850,
  stories: 2,
  garageSpaces: 2,
  architect: {
    name: "Sarah Mitchell",
    company: "Mitchell Design Studio",
    experience: "15+ years",
    avatar: "/architect-portrait.png",
  },
  images: [
    "/modern-farmhouse-exterior.png",
    "/modern-farmhouse-interior-living-room.jpg",
    "/modern-farmhouse-kitchen.png",
    "/modern-farmhouse-master-bedroom.jpg",
    "/modern-farmhouse-bathroom.jpg",
    "/modern-farmhouse-exterior-back-yard.jpg",
  ],
  floorPlanPreview: "/house-floor-plan-blueprint.jpg",
  description:
    "This stunning modern farmhouse combines contemporary design with rustic charm. Featuring an open-concept living area, gourmet kitchen with oversized island, and a luxurious master suite, this home is perfect for both everyday living and entertaining. The exterior showcases board-and-batten siding, metal roofing, and expansive covered porches.",
  specifications: {
    "Total Square Footage": "2,850 sq ft",
    "Main Floor": "1,450 sq ft",
    "Upper Floor": "1,400 sq ft",
    Bedrooms: "4",
    Bathrooms: "3 (2 full, 1 half)",
    Stories: "2",
    Garage: "2-car attached",
    Foundation: "Basement/Crawl Space/Slab",
    "Roof Pitch": "8:12",
    "Ceiling Height": "9' main floor, 8' upper floor",
    "Exterior Walls": "2x6 construction",
  },
  whatsIncluded: [
    "Complete construction drawings",
    "Foundation plan with details",
    "Floor plans for all levels",
    "Exterior elevations (front, rear, left, right)",
    "Building sections and details",
    "Roof plan and framing details",
    "Electrical plan with outlet locations",
    "Material list and specifications",
    "CAD files (DWG format)",
    "PDF files for easy viewing and printing",
  ],
  reviews: [
    {
      id: 1,
      author: "Mike Johnson",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Absolutely love this design! The open concept works perfectly for our family. The plans were detailed and our contractor had no issues building from them.",
    },
    {
      id: 2,
      author: "Jennifer Smith",
      rating: 5,
      date: "2024-01-08",
      comment:
        "Beautiful modern farmhouse design. The kitchen island is amazing and the master suite is so spacious. Highly recommend!",
    },
    {
      id: 3,
      author: "David Wilson",
      rating: 4,
      date: "2023-12-22",
      comment:
        "Great plans overall. Would have liked a few more storage options but the design is solid and well thought out.",
    },
  ],
  keySpecs: [
    { label: "Bedrooms", value: "4" },
    { label: "Bathrooms", value: "3" },
    { label: "Square Feet", value: "2,850" },
    { label: "Stories", value: "2" },
    { label: "Garage", value: "2-car" },
  ],
}

const relatedPlans = [
  {
    id: "hp-2024-002",
    title: "Craftsman Cottage",
    planNumber: "HP-2024-002",
    imageUrl: "/craftsman-cottage-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1850,
    price: 899,
  },
  {
    id: "hp-2024-003",
    title: "Contemporary Ranch",
    planNumber: "HP-2024-003",
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 2100,
    price: 1099,
  },
  {
    id: "hp-2024-004",
    title: "Traditional Colonial",
    planNumber: "HP-2024-004",
    imageUrl: "/traditional-colonial-house-exterior.jpg",
    bedrooms: 5,
    bathrooms: 4,
    squareFootage: 3200,
    price: 1599,
  },
  {
    id: "hp-2024-005",
    title: "Modern Minimalist",
    planNumber: "HP-2024-005",
    imageUrl: "/modern-minimalist-house-exterior.jpg",
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 2200,
    price: 1199,
  },
]

export default function PlanDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/plans">House Plans</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{planData.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery */}
        <ImageGallery
          images={planData.images}
          title={planData.title}
          selectedIndex={selectedImageIndex}
          onImageSelect={setSelectedImageIndex}
        />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-5 gap-8 mt-8">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 space-y-8">
            <PlanDetailsContent plan={planData} />

            {/* Related Plans Carousel */}
            <div className="pt-8 border-t border-border">
              <RelatedPlansCarousel plans={relatedPlans} />
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2">
            <PurchaseCard plan={planData} />
          </div>
        </div>
      </div>
    </main>
  )
}
