"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// SVG Icons
const CreditCardIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
)

const LockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

interface CheckoutStep3Props {
  onComplete: (data: PaymentData) => void
  onBack: () => void
  isProcessing: boolean
  billingInfo?: any
}

export function CheckoutStep3({ onComplete, onBack, isProcessing, billingInfo }: CheckoutStep3Props) {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const [errors, setErrors] = useState<Partial<PaymentData>>({})

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    let formattedValue = value

    // Format card number
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19)
    }

    // Format expiry date
    if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5)
    }

    // Format CVV
    if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<PaymentData> = {}

    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required"
    } else if (formData.cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Card number is invalid"
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date is invalid"
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required"
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV is invalid"
    }

    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCardIcon />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card *</Label>
              <Input
                id="nameOnCard"
                value={formData.nameOnCard}
                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                className={errors.nameOnCard ? "border-destructive" : ""}
                placeholder="John Doe"
              />
              {errors.nameOnCard && <p className="text-sm text-destructive">{errors.nameOnCard}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                className={errors.cardNumber ? "border-destructive" : ""}
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={errors.expiryDate ? "border-destructive" : ""}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className={errors.cvv ? "border-destructive" : ""}
                  placeholder="123"
                />
                {errors.cvv && <p className="text-sm text-destructive">{errors.cvv}</p>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="sm:w-auto bg-transparent"
                disabled={isProcessing}
              >
                Back to Billing
              </Button>
              <Button type="submit" className="flex-1" disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <LockIcon />
            <div>
              <p className="font-medium text-foreground">Your payment is secure</p>
              <p>We use industry-standard SSL encryption to protect your information</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address Summary */}
      {billingInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <p>
                {billingInfo.firstName} {billingInfo.lastName}
              </p>
              <p>{billingInfo.address}</p>
              <p>
                {billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}
              </p>
              <p>{billingInfo.email}</p>
              <p>{billingInfo.phone}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
