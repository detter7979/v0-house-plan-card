"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"

import { cn } from "@/lib/utils"

interface HousePlanCardProps {
  id: string
  title: string
  planNumber: string
  imageUrl?: string
  bedrooms: number
  bathrooms: number
  squareFootage: number
  price: number
  isFavorited?: boolean
  onFavoriteToggle?: (id: string) => void
  onQuickView?: (id: string) => void
  className?: string
}

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Bed = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v4m8-4v4" />
  </svg>
)

const Bath = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 14v6m-3 0h4l2-6h-9l2 6h4zm-9-6h1m7-4V7a3 3 0 00-6 0v3H6l1 7h10l1-7h-4z"
    />
  </svg>
)

const Square = ({ className }: { className?: string }) => (
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

export function HousePlanCard({
  id,
  title,
  planNumber,
  imageUrl,
  bedrooms,
  bathrooms,
  squareFootage,
  price,
  isFavorited = false,
  onFavoriteToggle,
  onQuickView,
  className,
}: HousePlanCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavoriteToggle?.(id)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(id)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatSquareFootage = (sqft: number) => {
    return new Intl.NumberFormat("en-US").format(sqft)
  }

  return (
    <Link href={`/plan/${id}`} className="block">
      <div
        className={cn(
          "group relative bg-card rounded-lg overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${title} - Plan ${planNumber}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Square className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">House Exterior</p>
              </div>
            </div>
          )}

          {/* Favorite Heart Icon */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10",
              isFavorited
                ? "bg-red-500/90 text-white hover:bg-red-600/90"
                : "bg-white/80 text-gray-700 hover:bg-white/90 hover:text-red-500",
            )}
          >
            <Heart
              className={cn("w-4 h-4 transition-all duration-200", isFavorited ? "fill-current" : "hover:fill-current")}
            />
          </button>

          {/* Quick View Button - Shows on Hover */}
          <div
            className={cn(
              "absolute inset-x-4 bottom-4 transition-all duration-300 z-10",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            <button
              onClick={handleQuickView}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Plan Number */}
          <div>
            <h3 className="font-semibold text-lg text-foreground leading-tight mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">Plan #{planNumber}</p>
          </div>

          {/* Badge Row */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              <Bed className="w-4 h-4" />
              <span className="font-medium">{bedrooms}</span>
              <span className="text-muted-foreground">bed{bedrooms !== 1 ? "s" : ""}</span>
            </div>

            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              <Bath className="w-4 h-4" />
              <span className="font-medium">{bathrooms}</span>
              <span className="text-muted-foreground">bath{bathrooms !== 1 ? "s" : ""}</span>
            </div>

            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
              <Square className="w-4 h-4" />
              <span className="font-medium">{formatSquareFootage(squareFootage)}</span>
              <span className="text-muted-foreground">sq ft</span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-border">
            <p className="text-2xl font-bold text-green-500">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
