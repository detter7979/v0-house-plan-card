"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Heart = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
    />
  </svg>
)

interface PurchaseCardProps {
  plan: {
    price: number
    salePrice?: number
    keySpecs: Array<{ label: string; value: string }>
    architect: {
      name: string
      company: string
      experience: string
      avatar: string
    }
    floorPlanPreview: string
    title: string
  }
}

export function PurchaseCard({ plan }: PurchaseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState("single")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const licenseOptions = [
    {
      id: "single",
      name: "Single Build License",
      description: "Build this plan once",
      price: plan.salePrice || plan.price,
      originalPrice: plan.salePrice ? plan.price : undefined,
    },
    {
      id: "multiple",
      name: "Multiple Build License",
      description: "Build this plan up to 5 times",
      price: (plan.salePrice || plan.price) * 1.5,
      originalPrice: plan.salePrice ? plan.price * 1.5 : undefined,
    },
  ]

  const selectedOption = licenseOptions.find((option) => option.id === selectedLicense)!

  return (
    <div className="lg:sticky lg:top-8">
      <Card className="shadow-lg">
        <CardHeader className="space-y-4">
          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-green-600">{formatPrice(selectedOption.price)}</span>
              {selectedOption.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(selectedOption.originalPrice)}
                </span>
              )}
            </div>
            {plan.salePrice && (
              <Badge variant="destructive" className="w-fit">
                Save {formatPrice(plan.price - plan.salePrice)}
              </Badge>
            )}
          </div>

          {/* License Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">License Type</h4>
            {licenseOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <input
                  type="radio"
                  name="license"
                  value={option.id}
                  checked={selectedLicense === option.id}
                  onChange={(e) => setSelectedLicense(e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{option.name}</span>
                    <span className="font-bold text-green-600">{formatPrice(option.price)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button size="lg" className="w-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={`w-5 h-5 mr-2 ${isFavorited ? "fill-current text-red-500" : ""}`} />
              {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>

          <Separator />

          {/* Key Specs Summary */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Key Specifications</h4>
            <div className="grid grid-cols-2 gap-3">
              {plan.keySpecs.map((spec, index) => (
                <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="font-bold text-lg text-foreground">{spec.value}</div>
                  <div className="text-xs text-muted-foreground">{spec.label}</div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Architect Information */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Architect</h4>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={plan.architect.avatar || "/placeholder.svg"} alt={plan.architect.name} />
                <AvatarFallback>
                  {plan.architect.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground">{plan.architect.name}</div>
                <div className="text-sm text-muted-foreground">{plan.architect.company}</div>
                <div className="text-xs text-muted-foreground">{plan.architect.experience}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Floor Plan Preview */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Floor Plan Preview</h4>
            <div className="aspect-[3/2] rounded-lg overflow-hidden bg-muted">
              <img
                src={plan.floorPlanPreview || "/placeholder.svg"}
                alt={`${plan.title} floor plan`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
