"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/dashboard-overview"
import { OrdersView } from "@/components/orders-view"
import { FavoritesView } from "@/components/favorites-view"
import { DownloadsView } from "@/components/downloads-view"
import { AccountView } from "@/components/account-view"

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["dashboard", "orders", "favorites", "downloads", "account"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your house plans, orders, and account settings</p>
        </div>

        {/* Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrdersView />
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <FavoritesView />
          </TabsContent>

          <TabsContent value="downloads" className="mt-6">
            <DownloadsView />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <AccountView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
