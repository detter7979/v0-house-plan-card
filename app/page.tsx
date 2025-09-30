"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { TrustSection } from "@/components/trust-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedCollections />
      <TrustSection />
    </main>
  )
}
