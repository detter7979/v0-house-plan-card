"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Star = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

interface PlanDetailsContentProps {
  plan: {
    title: string
    planNumber: string
    description: string
    specifications: Record<string, string>
    whatsIncluded: string[]
    reviews: Array<{
      id: number
      author: string
      rating: number
      date: string
      comment: string
    }>
  }
}

export function PlanDetailsContent({ plan }: PlanDetailsContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-4 h-4 text-yellow-400" filled={i < rating} />)
  }

  const averageRating = plan.reviews.reduce((sum, review) => sum + review.rating, 0) / plan.reviews.length

  return (
    <div className="space-y-6">
      {/* Plan Title and Number */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{plan.title}</h1>
        <p className="text-lg text-muted-foreground">Plan #{plan.planNumber}</p>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="included">What's Included</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({plan.reviews.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">{plan.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <div className="grid gap-4">
            {Object.entries(plan.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="included" className="mt-6">
          <div className="grid gap-3">
            {plan.whatsIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {/* Reviews Summary */}
            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(Math.round(averageRating))}</div>
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <div className="text-muted-foreground">
                Based on {plan.reviews.length} review{plan.reviews.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {plan.reviews.map((review) => (
                <div key={review.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground">{review.author}</span>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
