"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
    />
    <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="10,9 9,9 8,9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Image = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <circle cx="8.5" cy="8.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="21,15 16,10 5,21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Archive = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="21,8 21,21 3,21 3,8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <rect x="1" y="3" width="22" height="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="10" y1="12" x2="14" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const downloadableOrders = [
  {
    id: "ORD-2024-001",
    planTitle: "Modern Farmhouse Elite",
    planNumber: "MFE-2024-001",
    orderDate: "2024-01-15",
    licenseType: "Single Build",
    downloadCount: 3,
    maxDownloads: 5,
    files: [
      { name: "Floor Plans - PDF", type: "pdf", size: "2.4 MB", downloaded: true },
      { name: "Elevations - PDF", type: "pdf", size: "1.8 MB", downloaded: true },
      { name: "Construction Details - PDF", type: "pdf", size: "3.2 MB", downloaded: false },
      { name: "Material List - Excel", type: "excel", size: "156 KB", downloaded: true },
      { name: "3D Renderings - ZIP", type: "zip", size: "12.5 MB", downloaded: false },
    ],
  },
  {
    id: "ORD-2024-003",
    planTitle: "Craftsman Cottage",
    planNumber: "CC-2024-003",
    orderDate: "2024-01-08",
    licenseType: "Multiple Build",
    downloadCount: 1,
    maxDownloads: 10,
    files: [
      { name: "Complete Plan Set - PDF", type: "pdf", size: "4.1 MB", downloaded: true },
      { name: "CAD Files - DWG", type: "dwg", size: "8.7 MB", downloaded: false },
      { name: "Specifications - PDF", type: "pdf", size: "892 KB", downloaded: false },
      { name: "Site Plan - PDF", type: "pdf", size: "1.2 MB", downloaded: false },
    ],
  },
  {
    id: "ORD-2023-045",
    planTitle: "Victorian Manor",
    planNumber: "VM-2023-045",
    orderDate: "2023-12-20",
    licenseType: "Commercial",
    downloadCount: 8,
    maxDownloads: -1, // Unlimited
    files: [
      { name: "Architectural Plans - PDF", type: "pdf", size: "5.8 MB", downloaded: true },
      { name: "Structural Plans - PDF", type: "pdf", size: "3.4 MB", downloaded: true },
      { name: "MEP Plans - PDF", type: "pdf", size: "2.9 MB", downloaded: true },
      { name: "CAD Files - DWG", type: "dwg", size: "15.2 MB", downloaded: true },
      { name: "3D Models - SKP", type: "skp", size: "22.1 MB", downloaded: false },
      { name: "Marketing Images - ZIP", type: "zip", size: "45.8 MB", downloaded: true },
    ],
  },
]

export function DownloadsView() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "excel":
      case "dwg":
        return <FileText className="w-4 h-4" />
      case "zip":
      case "skp":
        return <Archive className="w-4 h-4" />
      default:
        return <Image className="w-4 h-4" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "excel":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "dwg":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "zip":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "skp":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTotalFiles = () => {
    return downloadableOrders.reduce((total, order) => total + order.files.length, 0)
  }

  const getDownloadedFiles = () => {
    return downloadableOrders.reduce((total, order) => total + order.files.filter((file) => file.downloaded).length, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Downloads</h2>
        <p className="text-muted-foreground">Access and download your purchased house plan files</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{downloadableOrders.length}</div>
            <p className="text-xs text-muted-foreground">Orders with downloadable files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalFiles()}</div>
            <p className="text-xs text-muted-foreground">{getDownloadedFiles()} downloaded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Download Progress</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((getDownloadedFiles() / getTotalFiles()) * 100)}%</div>
            <Progress value={(getDownloadedFiles() / getTotalFiles()) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Downloads List */}
      <Tabs value={selectedOrder || downloadableOrders[0]?.id} onValueChange={setSelectedOrder}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
          {downloadableOrders.map((order) => (
            <TabsTrigger
              key={order.id}
              value={order.id}
              className="flex flex-col items-start p-4 h-auto data-[state=active]:bg-background"
            >
              <div className="font-medium text-left">{order.planTitle}</div>
              <div className="text-xs text-muted-foreground">#{order.planNumber}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {order.licenseType}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {order.downloadCount}/{order.maxDownloads === -1 ? "∞" : order.maxDownloads} downloads
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {downloadableOrders.map((order) => (
          <TabsContent key={order.id} value={order.id} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{order.planTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Order #{order.id} • Purchased {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{order.licenseType}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.downloadCount}/{order.maxDownloads === -1 ? "∞" : order.maxDownloads} downloads used
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-xs ${getFileTypeColor(file.type)}`}>
                              {file.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{file.size}</span>
                            {file.downloaded && (
                              <Badge variant="secondary" className="text-xs">
                                Downloaded
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant={file.downloaded ? "outline" : "default"}>
                        <Download className="w-4 h-4 mr-2" />
                        {file.downloaded ? "Download Again" : "Download"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
