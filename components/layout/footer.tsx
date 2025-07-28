import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { NewsletterForm } from "@/components/ui/newsletter-form"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-foreground"></div>
              <span className="text-xl font-bold">Minimalist</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Curating beautiful, minimalist products for modern living. Quality design meets functional simplicity.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link
                href="/shipping"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Returns & Exchanges
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/support"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Support
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <span>hello@minimalist.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary-foreground/80">Subscribe to our newsletter for updates</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-primary-foreground/80">© {currentYear} Minimalist. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
