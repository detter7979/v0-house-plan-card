"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// SVG Icons
const CheckCircleIcon = () => (
  <svg className="h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const DownloadIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const EmailIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

interface CheckoutStep4Props {
  checkoutData: any
}

export function CheckoutStep4({ checkoutData }: CheckoutStep4Props) {
  const orderNumber = `HP-${Date.now().toString().slice(-6)}`

  useEffect(() => {
    // Simulate sending confirmation email
    console.log("[v0] Order completed:", orderNumber)
  }, [orderNumber])

  return (
    <div className="space-y-6 text-center">
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <CheckCircleIcon />
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Order Complete!</h2>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been processed successfully.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono font-bold text-lg">{orderNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <EmailIcon />
              <div>
                <h3 className="font-semibold mb-1">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with your order details and download links to{" "}
                  <span className="font-medium">{checkoutData.billingInfo?.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <DownloadIcon />
              <div>
                <h3 className="font-semibold mb-1">Download Your Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Your house plans are ready for immediate download. Access them from your dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href="/dashboard?tab=downloads">
                <DownloadIcon />
                Download Your Plans
              </Link>
            </Button>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/dashboard?tab=orders">View Order Details</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-left space-y-3">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Customer Support</h4>
              <p className="text-muted-foreground">Email us at support@houseplans.com or call 1-800-PLANS-01</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">License Questions</h4>
              <p className="text-muted-foreground">Review our license agreement or contact our licensing team</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Technical Issues</h4>
              <p className="text-muted-foreground">Having trouble downloading? Check our FAQ or contact support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
