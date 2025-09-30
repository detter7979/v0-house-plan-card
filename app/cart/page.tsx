"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// SVG Icons
const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const MinusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

const PlusIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const ShoppingBagIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
    />
  </svg>
)

const TagIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
)

interface CartItem {
  id: string
  planNumber: string
  title: string
  image: string
  licenseType: "single" | "multiple"
  basePrice: number
  salePrice?: number
  quantity: number
  bedrooms: number
  bathrooms: number
  sqft: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ])

  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save20") {
      setPromoApplied(true)
      setPromoDiscount(0.2)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice || item.basePrice
    const multiplier = item.licenseType === "multiple" ? 1.5 : 1
    return sum + price * multiplier * item.quantity
  }, 0)

  const promoAmount = subtotal * promoDiscount
  const tax = (subtotal - promoAmount) * 0.08
  const total = subtotal - promoAmount + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBagIcon />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Discover our collection of beautiful house plans</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Plan Image */}
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>

                    {/* Plan Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">Plan #{item.planNumber}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{item.bedrooms} bed</span>
                            <span>{item.bathrooms} bath</span>
                            <span>{item.sqft.toLocaleString()} sq ft</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <TrashIcon />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <Badge variant="secondary">
                            {item.licenseType === "single" ? "Single Build License" : "Multiple Build License"}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {item.salePrice ? (
                              <>
                                <span className="text-lg font-bold text-primary">
                                  ${(item.salePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ${(item.basePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold">
                                ${(item.basePrice * (item.licenseType === "multiple" ? 1.5 : 1)).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <MinusIcon />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied || !promoCode}>
                      <TagIcon />
                    </Button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600">Promo code applied: 20% off</p>}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo discount</span>
                      <span>-${promoAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>

                {/* Trust Elements */}
                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Instant download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>30-day guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
