"use client"

import { useState } from "react"
import Link from "next/link"
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="20" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
    />
  </svg>
)

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Browse Plans", href: "#" },
    { name: "Collections", href: "#" },
    { name: "Custom Design", href: "#" },
    { name: "Resources", href: "#" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">HP</span>
          </div>
          <span className="font-bold text-xl">House Plans</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search house plans..." className="pl-10 bg-muted/50" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button - Mobile */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Sign In</DropdownMenuItem>
              <DropdownMenuItem>Create Account</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">My Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard?tab=orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard?tab=favorites">Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard?tab=downloads">Downloads</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="border-t pt-4 mt-4">
                  <Link
                    href="/dashboard"
                    className="text-lg font-medium hover:text-accent transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    My Dashboard
                  </Link>
                  <Link
                    href="/dashboard?tab=orders"
                    className="text-lg font-medium hover:text-accent transition-colors block mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/dashboard?tab=favorites"
                    className="text-lg font-medium hover:text-accent transition-colors block mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Favorites
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
