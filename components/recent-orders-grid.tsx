"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

const recentOrders = [
  {
    id: "ORD-2024-001",
    planTitle: "Modern Farmhouse Elite",
    planNumber: "MFE-2024-001",
    orderDate: "2024-01-15",
    status: "completed",
    price: 1450,
    imageUrl: "/modern-farmhouse-exterior.png",
  },
  {
    id: "ORD-2024-002",
    planTitle: "Contemporary Ranch House",
    planNumber: "CRH-2024-002",
    orderDate: "2024-01-12",
    status: "processing",
    price: 1150,
    imageUrl: "/contemporary-ranch-house-exterior.jpg",
  },
  {
    id: "ORD-2024-003",
    planTitle: "Craftsman Cottage",
    planNumber: "CC-2024-003",
    orderDate: "2024-01-08",
    status: "completed",
    price: 1050,
    imageUrl: "/craftsman-cottage-exterior.jpg",
  },
]

export function RecentOrdersGrid() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Processing</Badge>
        )
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentOrders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={order.imageUrl || "/placeholder.svg"}
              alt={order.planTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base leading-tight">{order.planTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">#{order.planNumber}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{formatDate(order.orderDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-bold text-green-600">{formatPrice(order.price)}</p>
              </div>
            </div>
            {order.status === "completed" && (
              <Button size="sm" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Again
              </Button>
            )}
            {order.status === "processing" && (
              <Button size="sm" variant="outline" className="w-full bg-transparent" disabled>
                Processing...
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
