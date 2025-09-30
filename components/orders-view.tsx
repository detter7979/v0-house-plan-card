"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

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

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const orders = [
  {
    id: "ORD-2024-001",
    planTitle: "Modern Farmhouse Elite",
    planNumber: "MFE-2024-001",
    orderDate: "2024-01-15",
    status: "completed",
    price: 1450,
    licenseType: "Single Build",
    downloadCount: 3,
    maxDownloads: 5,
  },
  {
    id: "ORD-2024-002",
    planTitle: "Contemporary Ranch House",
    planNumber: "CRH-2024-002",
    orderDate: "2024-01-12",
    status: "processing",
    price: 1150,
    licenseType: "Single Build",
    downloadCount: 0,
    maxDownloads: 5,
  },
  {
    id: "ORD-2024-003",
    planTitle: "Craftsman Cottage",
    planNumber: "CC-2024-003",
    orderDate: "2024-01-08",
    status: "completed",
    price: 1050,
    licenseType: "Multiple Build",
    downloadCount: 1,
    maxDownloads: 10,
  },
  {
    id: "ORD-2023-045",
    planTitle: "Victorian Manor",
    planNumber: "VM-2023-045",
    orderDate: "2023-12-20",
    status: "completed",
    price: 1750,
    licenseType: "Commercial",
    downloadCount: 8,
    maxDownloads: -1, // Unlimited
  },
  {
    id: "ORD-2023-044",
    planTitle: "Tiny House Deluxe",
    planNumber: "THD-2023-044",
    orderDate: "2023-12-15",
    status: "completed",
    price: 450,
    licenseType: "Single Build",
    downloadCount: 2,
    maxDownloads: 5,
  },
]

export function OrdersView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

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
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.planTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.planNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Order History</h2>
        <p className="text-muted-foreground">View and manage all your house plan orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, plan names, or order IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Plan Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.planTitle}</p>
                        <p className="text-sm text-muted-foreground">#{order.planNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(order.orderDate)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{order.licenseType}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {order.downloadCount}/{order.maxDownloads === -1 ? "∞" : order.maxDownloads}
                        <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width:
                                order.maxDownloads === -1
                                  ? "100%"
                                  : `${(order.downloadCount / order.maxDownloads) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">{formatPrice(order.price)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {order.status === "completed" && (
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
