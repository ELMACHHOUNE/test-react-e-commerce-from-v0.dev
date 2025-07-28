import { Layout } from "@/components/layout/layout"
import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            About <span className="text-primary">Minimalist</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe that less is more. Our carefully curated collection of minimalist products brings beauty,
            functionality, and simplicity to modern living spaces.
          </p>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2020, Minimalist emerged from a simple belief: that our living spaces should inspire calm,
              creativity, and joy. In a world filled with excess, we saw the need for products that prioritize quality
              over quantity, function over flash.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every item in our collection is thoughtfully selected for its design excellence, sustainable materials,
              and timeless appeal. We partner with artisans and designers who share our vision of creating beautiful,
              purposeful objects that enhance daily life.
            </p>
            <CustomButton size="lg" asChild>
              <Link href="/products">Explore Our Collection</Link>
            </CustomButton>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Minimalist workspace"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-muted-foreground text-sm">
                  We believe in products that last, made from premium materials with exceptional craftsmanship.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground text-sm">
                  Environmental responsibility is at the heart of our sourcing and packaging decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Design Excellence</h3>
                <p className="text-muted-foreground text-sm">
                  Every product is selected for its timeless design and functional beauty.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-muted-foreground text-sm">
                  Your satisfaction and experience with our products is our top priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Minimalist, dedicated to bringing you the finest in minimalist design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Sarah Johnson"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <Badge variant="secondary" className="mb-3">
                  Founder & CEO
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Former design director with 15 years of experience in luxury retail and product curation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Michael Chen"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <Badge variant="secondary" className="mb-3">
                  Head of Design
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Award-winning industrial designer passionate about sustainable and functional design solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Emma Davis"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">Emma Davis</h3>
                <Badge variant="secondary" className="mb-3">
                  Customer Experience
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Dedicated to ensuring every customer interaction reflects our commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-muted/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Simplify Your Space?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our carefully curated collection of minimalist products designed to bring beauty and functionality
            to your everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </CustomButton>
            <CustomButton variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </CustomButton>
          </div>
        </section>
      </div>
    </Layout>
  )
}
