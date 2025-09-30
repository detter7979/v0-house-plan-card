"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CheckoutStep1Props {
  onComplete: (data: any) => void
}

export function CheckoutStep1({ onComplete }: CheckoutStep1Props) {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToLicense, setAgreedToLicense] = useState(false)

  const cartItems = [
    {
      id: "1",
      planNumber: "HP-2847",
      title: "Modern Farmhouse with Open Concept",
      image: "/modern-farmhouse-exterior.png",
      licenseType: "single",
      basePrice: 1299,
      salePrice: 999,
      quantity: 1,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2847,
    },
    {
      id: "2",
      planNumber: "HP-1892",
      title: "Contemporary Ranch Style Home",
      image: "/contemporary-ranch-house-exterior.jpg",
      licenseType: "multiple",
      basePrice: 899,
      quantity: 1,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1892,
    },
  ]

  const handleContinue = () => {
    if (agreedToTerms && agreedToLicense) {
      onComplete({ reviewComplete: true })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">Plan #{item.planNumber}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{item.bedrooms} bed</span>
                        <span>{item.bathrooms} bath</span>
                        <span>{item.sqft.toLocaleString()} sq ft</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.salePrice ? (
                        <div>
                          <span className="font-bold text-primary">
                            ${(item.salePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            ${(item.basePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">
                          ${(item.basePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Badge variant="secondary">
                    {item.licenseType === "single" ? "Single Build License" : "Multiple Build License"}
                  </Badge>
                </div>
              </div>
              {index < cartItems.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>License Agreement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <h4 className="font-semibold">What's Included:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Complete architectural drawings</li>
              <li>• Foundation and framing plans</li>
              <li>• Electrical and plumbing layouts</li>
              <li>• Material specifications</li>
              <li>• Construction details</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <h4 className="font-semibold">License Types:</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Single Build License:</strong> Build this plan once on your property
              </p>
              <p>
                <strong>Multiple Build License:</strong> Build this plan up to 5 times on your properties
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="license"
                checked={agreedToLicense}
                onCheckedChange={(checked) => setAgreedToLicense(checked as boolean)}
              />
              <label htmlFor="license" className="text-sm leading-relaxed">
                I understand and agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  License Agreement
                </a>{" "}
                for the selected plans
              </label>
            </div>
          </div>

          <Button onClick={handleContinue} disabled={!agreedToTerms || !agreedToLicense} className="w-full" size="lg">
            Continue to Billing Information
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
