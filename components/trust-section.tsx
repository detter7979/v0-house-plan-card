const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7,10 12,15 17,10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
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

const Headphones = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18v-6a9 9 0 0118 0v6" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
    />
  </svg>
)

const features = [
  {
    icon: Download,
    title: "Instant Download",
    description:
      "Get your house plans immediately after purchase. No waiting, no delays - start building your dream home today.",
  },
  {
    icon: Shield,
    title: "Licensed Plans",
    description:
      "All our plans are professionally designed and licensed for construction. Build with confidence and peace of mind.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "Our team of architects and designers are here to help. Get personalized assistance throughout your building journey.",
  },
]

export function TrustSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose Our House Plans?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're committed to providing you with the highest quality house plans and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
