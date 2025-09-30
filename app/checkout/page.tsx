"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckoutStep1 } from "@/components/checkout-step1"
import { CheckoutStep2 } from "@/components/checkout-step2"
import { CheckoutStep3 } from "@/components/checkout-step3"
import { CheckoutStep4 } from "@/components/checkout-step4"

// SVG Icons
const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

interface CheckoutData {
  billingInfo?: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod?: {
    cardNumber: string
    expiryDate: string
    cvv: string
    nameOnCard: string
  }
}

const steps = [
  { id: 1, title: "Review Order", description: "Confirm your plans and license agreement" },
  { id: 2, title: "Billing Info", description: "Enter your billing information" },
  { id: 3, title: "Payment", description: "Complete your payment" },
  { id: 4, title: "Confirmation", description: "Order complete" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const handleStepComplete = (stepData: any) => {
    setCheckoutData((prev) => ({ ...prev, ...stepData }))

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleProcessPayment = async (paymentData: any) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    handleStepComplete({ paymentMethod: paymentData })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart">
                <ArrowLeftIcon />
                Back to Cart
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 ${
                    step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.id < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? <CheckIcon /> : step.id}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <CheckoutStep1 onComplete={handleStepComplete} />}
            {currentStep === 2 && (
              <CheckoutStep2
                onComplete={handleStepComplete}
                onBack={handleBackStep}
                initialData={checkoutData.billingInfo}
              />
            )}
            {currentStep === 3 && (
              <CheckoutStep3
                onComplete={handleProcessPayment}
                onBack={handleBackStep}
                isProcessing={isProcessing}
                billingInfo={checkoutData.billingInfo}
              />
            )}
            {currentStep === 4 && <CheckoutStep4 checkoutData={checkoutData} />}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order items would be displayed here */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Modern Farmhouse Plan</span>
                      <span>$999</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contemporary Ranch Plan</span>
                      <span>$1,349</span>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>$2,348</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo discount</span>
                      <span>-$469.60</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>$150.27</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>$2,028.67</span>
                    </div>
                  </div>

                  {/* Trust Elements */}
                  <div className="pt-4 space-y-2 text-sm text-muted-foreground border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <span>SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <span>30-Day Money Back</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <span>Instant Download</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
