"use client"

import { useState } from "react"
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const ChevronUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="18,15 12,9 6,15" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon
      points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)

const Home = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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

const Ruler = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.133 9.4L14.6 2.867a1.2 1.2 0 00-1.697 0L2.867 12.9a1.2 1.2 0 000 1.697L9.4 21.133a1.2 1.2 0 001.697 0L21.133 11.1a1.2 1.2 0 000-1.7z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.5 6.5l11 11" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 10.5L10 7" />
  </svg>
)

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

const Layers = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="12,2 2,7 12,12 22,7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="2,17 12,22 22,17" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="2,12 12,17 22,12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export interface FilterState {
  priceRange: [number, number]
  bedrooms: string[]
  bathrooms: string[]
  squareFootage: [number, number]
  homeStyle: string
  stories: string[]
}

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  className?: string
}

const defaultFilters: FilterState = {
  priceRange: [50, 500],
  bedrooms: [],
  bathrooms: [],
  squareFootage: [500, 5000],
  homeStyle: "",
  stories: [],
}

const homeStyles = [
  "Modern",
  "Traditional",
  "Farmhouse",
  "Contemporary",
  "Colonial",
  "Craftsman",
  "Ranch",
  "Victorian",
  "Mediterranean",
  "Tudor",
]

const bedroomOptions = ["1", "2", "3", "4", "5+"]
const bathroomOptions = ["1", "1.5", "2", "2.5", "3+"]
const storyOptions = ["1", "1.5", "2", "3+"]

export function FilterSidebar({ filters, onFiltersChange, className }: FilterSidebarProps) {
  const isMobile = useMobile()
  const [openSections, setOpenSections] = useState({
    price: true,
    bedrooms: true,
    bathrooms: true,
    squareFootage: true,
    homeStyle: true,
    stories: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearAllFilters = () => {
    onFiltersChange(defaultFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (
      filters.priceRange[0] !== defaultFilters.priceRange[0] ||
      filters.priceRange[1] !== defaultFilters.priceRange[1]
    )
      count++
    if (filters.bedrooms.length > 0) count++
    if (filters.bathrooms.length > 0) count++
    if (
      filters.squareFootage[0] !== defaultFilters.squareFootage[0] ||
      filters.squareFootage[1] !== defaultFilters.squareFootage[1]
    )
      count++
    if (filters.homeStyle) count++
    if (filters.stories.length > 0) count++
    return count
  }

  const handleCheckboxChange = (category: "bedrooms" | "bathrooms" | "stories", value: string, checked: boolean) => {
    const currentValues = filters[category]
    if (checked) {
      updateFilter(category, [...currentValues, value])
    } else {
      updateFilter(
        category,
        currentValues.filter((v) => v !== value),
      )
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      </div>

      <Separator />

      {/* Price Range */}
      <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="font-medium">Price Range</span>
          </div>
          {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4 px-2">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}k</span>
              <span>${filters.priceRange[1] >= 500 ? "500k+" : `${filters.priceRange[1]}k`}</span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
              max={500}
              min={50}
              step={25}
              className="w-full"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Bedrooms */}
      <Collapsible open={openSections.bedrooms} onOpenChange={() => toggleSection("bedrooms")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            <span className="font-medium">Bedrooms</span>
            {filters.bedrooms.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {filters.bedrooms.length}
              </Badge>
            )}
          </div>
          {openSections.bedrooms ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4 px-2">
          {bedroomOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`bedroom-${option}`}
                checked={filters.bedrooms.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("bedrooms", option, checked as boolean)}
              />
              <Label htmlFor={`bedroom-${option}`} className="text-sm font-normal">
                {option} {option === "1" ? "Bedroom" : "Bedrooms"}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Bathrooms */}
      <Collapsible open={openSections.bathrooms} onOpenChange={() => toggleSection("bathrooms")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span className="font-medium">Bathrooms</span>
            {filters.bathrooms.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {filters.bathrooms.length}
              </Badge>
            )}
          </div>
          {openSections.bathrooms ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4 px-2">
          {bathroomOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`bathroom-${option}`}
                checked={filters.bathrooms.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("bathrooms", option, checked as boolean)}
              />
              <Label htmlFor={`bathroom-${option}`} className="text-sm font-normal">
                {option} {option === "1" ? "Bathroom" : "Bathrooms"}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Square Footage */}
      <Collapsible open={openSections.squareFootage} onOpenChange={() => toggleSection("squareFootage")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span className="font-medium">Square Footage</span>
          </div>
          {openSections.squareFootage ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4 px-2">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.squareFootage[0]} sq ft</span>
              <span>{filters.squareFootage[1] >= 5000 ? "5000+ sq ft" : `${filters.squareFootage[1]} sq ft`}</span>
            </div>
            <Slider
              value={filters.squareFootage}
              onValueChange={(value) => updateFilter("squareFootage", value as [number, number])}
              max={5000}
              min={500}
              step={100}
              className="w-full"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Home Style */}
      <Collapsible open={openSections.homeStyle} onOpenChange={() => toggleSection("homeStyle")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="font-medium">Home Style</span>
            {filters.homeStyle && (
              <Badge variant="secondary" className="ml-1">
                1
              </Badge>
            )}
          </div>
          {openSections.homeStyle ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 px-2">
          <Select value={filters.homeStyle} onValueChange={(value) => updateFilter("homeStyle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              {homeStyles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Stories */}
      <Collapsible open={openSections.stories} onOpenChange={() => toggleSection("stories")}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:bg-muted/50 rounded-md px-2 transition-colors">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span className="font-medium">Stories</span>
            {filters.stories.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {filters.stories.length}
              </Badge>
            )}
          </div>
          {openSections.stories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4 px-2">
          {storyOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`story-${option}`}
                checked={filters.stories.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange("stories", option, checked as boolean)}
              />
              <Label htmlFor={`story-${option}`} className="text-sm font-normal">
                {option} {option === "1" ? "Story" : "Stories"}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filter House Plans</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className={`w-80 bg-card border rounded-lg p-6 h-fit sticky top-6 ${className}`}>
      <FilterContent />
    </div>
  )
}
