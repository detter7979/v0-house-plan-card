"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Bell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
)

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect
      x="1"
      y="4"
      width="22"
      height="16"
      rx="2"
      ry="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <line x1="1" y1="10" x2="23" y2="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export function AccountView() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    company: "Johnson Architecture",
    bio: "Licensed architect with 15 years of experience in residential design. Passionate about sustainable and modern farmhouse styles.",
  })

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    orderUpdates: true,
    newPlans: false,
    priceAlerts: true,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
    console.log("Saving profile:", formData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your profile, preferences, and account security</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/architect-portrait.png" alt="Profile" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Premium Member</Badge>
                <Badge variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
              </div>
              <Switch
                checked={notifications.emailMarketing}
                onCheckedChange={(checked) => handleNotificationChange("emailMarketing", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about order status changes and downloads</p>
              </div>
              <Switch
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Plan Alerts</p>
                <p className="text-sm text-muted-foreground">Be the first to know about new house plan releases</p>
              </div>
              <Switch
                checked={notifications.newPlans}
                onCheckedChange={(checked) => handleNotificationChange("newPlans", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Price Drop Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when favorited plans go on sale</p>
              </div>
              <Switch
                checked={notifications.priceAlerts}
                onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Method</p>
              <p className="text-sm text-muted-foreground">•••• •••• •••• 4242 (Expires 12/26)</p>
            </div>
            <Button variant="outline" size="sm">
              Update Card
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Billing History</p>
              <p className="text-sm text-muted-foreground">View and download your invoices</p>
            </div>
            <Button variant="outline" size="sm">
              View History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
