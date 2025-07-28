import { Layout } from "@/components/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground">Last updated: {currentDate}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Minimalist website and services, you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Minimalist's website for
                personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>modify or copy the materials</li>
                <li>
                  use the materials for any commercial purpose or for any public display (commercial or non-commercial)
                </li>
                <li>attempt to decompile or reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Product Information and Pricing</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We strive to provide accurate product descriptions and pricing information. However, we do not warrant
                that product descriptions or other content is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                All prices are subject to change without notice. We reserve the right to modify or discontinue products
                at any time without prior notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Orders and Payment</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                By placing an order, you represent that you are at least 18 years old and have the legal capacity to
                enter into contracts. We reserve the right to refuse or cancel orders at our discretion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Payment must be received before products are shipped. We accept major credit cards and other payment
                methods as indicated on our website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We will make every effort to ship products within the timeframes specified on our website. However,
                delivery dates are estimates and we are not liable for delays in shipping or delivery.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Risk of loss and title for products pass to you upon delivery to the carrier. Shipping and handling
                charges are non-refundable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 30-day return policy for most items. Products must be returned in their original condition
                and packaging. Custom or personalized items may not be eligible for return.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Refunds will be processed to the original payment method within 5-10 business days after we receive the
                returned item.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                website, to understand our practices regarding the collection and use of your personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Minimalist or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on our website, even if we have been notified orally or in writing of the
                possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of New York, United
                States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or
                location.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to revise these terms of service at any time without notice. By using this website,
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>Email: legal@minimalist.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Design District, New York, NY 10001</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
